---
layout:   post
title:    "Table-Driven Trigger Management (TDTM)"
author:   Carlos Ramirez Martinez-Eiroa
date:  2014-11-24 11:00:00
excerpt: "Table-Driven Trigger Management (TDTM), is the approach we take in the Nonprofit Starter Pack to trigger management. As you probably are aware of, large custom applications or packages, such as the NPSP, may end up with a large number of triggers, including multiple triggers on the same Object. These triggers are often written by different developers and even consulting companies, and interact with each other in sometimes-unpredictable ways. Under these circumstances, it becomes very hard to understand, and even more to debug, any issues that may crop up. To make it easier for us and for our users to know what happens when a user interacts with a record, we have developed the TDTM architectural design."
---
**Table-Driven Trigger Management** (TDTM), is the approach we take in the **Nonprofit Starter Pack** to trigger management. As you probably are aware of, large custom applications or packages, such as the NPSP, may end up with a large number of triggers, including multiple triggers on the same Object. These triggers are often written by different developers and even consulting companies, and interact with each other in sometimes-unpredictable ways. Under these circumstances, it becomes very hard to understand, and even more to debug, any issues that may crop up. To make it easier for us and for our users to know what happens when a user interacts with a record, we have developed the TDTM architectural design.

## Technical Overview
With this design, only one trigger exists per object (one for Contact, one for Account, One for Opportunity, etc.), both for standard and for custom objects. The only thing these triggers do is calling our **Trigger Handler** ([TDTM_TriggerHandler](https://github.com/SalesforceFoundation/Cumulus/blob/dev/src/classes/TDTM_TriggerHandler.cls)), passing it all the environment information. All the actual business logic to run when an action is performed on a record is stored in plain old classes. We created a custom object to store what classes to run for which objects, under which actions. In this object we also define if the class is active or inactive, and if the logic is going to be run synchronously or asynchronously. The Trigger Handler is then charged with the task of calling these classes when appropriate. This has the added advantage of allowing us to centralize error handling for triggers around the Trigger Handler.

Of course, we want this design to be extensible. We want to be able to add new classes and have our Trigger Handler run them. Also, we are storing the information of which classes to run (plus the details mentioned above), as strings in our custom object. Therefore we need to instantiate the classes to run dynamically. And in order to make sure that they can actually be run, they need to implement the [TDTM_Runnable](https://github.com/SalesforceFoundation/Cumulus/blob/dev/src/classes/TDTM_Runnable.cls) interface.

The code in our TDTM_TriggerHandler class that creates an instance of each class to run and checks if it implements the required interface, looks like this:

    if(classToRunRecord != null) {
        String classToRunName = String.valueOf(classToRunRecord.get('Class__c'));
      Type classType = Type.forName(classToRunName);
          
      if(classType != null) {     
        Object classInstance = classType.newInstance();

           if(classInstance instanceof TDTM_Runnable) {
               TDTM_Runnable classToRun = (TDTM_Runnable)classInstance;

Then we just need to have entries in our **Trigger_Handler__c** custom object, like this:
![TDTM Settings](/assets/images/TDTM_Settings.png)
 
The screenshot above is the TDTM Settings section of the NPSP Settings tab. This page allows you to see all the classes that are going to run when a user interacts with each Object type. Here you can also add your own classes to work in conjunction with the NPSP TDTM design. Any class that your create must implement the TDTM_Runnable interface, and therefore have a “run” method with the necessary parameters, and you also need to create an entry on this page for your class. You could also create the record directly against the npsp\__Trigger_Handler__c object, using the Force.com IDE or the Developer Console, for example, and the entry would be displayed here. 

You can create new entries using the form at the bottom on this page, but you cannot edit or delete existing ones. This is by design. The functionality controlled by the settings displayed on this page is critical for the correct functioning of the NPSP, and we want to make sure that anyone that wishes to modify it is sure of what he/she is doing. Thus, to edit one of the existing entries, or one you created yourself, you’ll have to directly interact with the npsp\__Trigger_Handler__c custom object. You could do that, for example, by running anonymous Apex through the Developer Console.

Regarding deployment, keep in mind that if you are developing your own custom TDTM class in a sandbox, you not only need to migrate the code to production, but you have to migrate/recreate this record.

## Example
This is an example of a class that is not part of the NPSP package, but that follows the TDTM design:

    global without sharing class OpportunityMemberCreation_TDTM extends npsp.TDTM_Runnable {
  
      // the main entry point for TDTM to invoke our trigger handlers.
      global override DmlWrapper run(List<SObject> newlist,   List<SObject> oldlist, npsp.TDTM_Runnable.Action triggerAction, Schema.DescribeSObjectResult objResult) {
      DmlWrapper dmlWrapper = null;

      if (triggerAction == npsp.TDTM_Runnable.Action.AfterInsert) {
        dmlWrapper = new DmlWrapper();
        List<Opportunity> newOppList = (List<Opportunity>)newlist;        
        List<CampaignMember> members_to_add = new List<CampaignMember>();
              
            for (Opportunity o : newOppList) {
              if (o.isClosed && o.isWon && o.CampaignId != null && o.npe01__Contact_Id_For_Role__c != null) {
                CampaignMember cm = new CampaignMember(CampaignId = o.CampaignId, ContactId = o.npe01__Contact_Id_for_Role__c, Status = 'Responded');
                if(o.Referred_By__c != null) {
                  cm.Referrer__c = o.Referred_By__c;
                } 
                members_to_add.add(cm); 
              }
            }
            if(!members_to_add.isEmpty()) {
              dmlWrapper.objectsToInsert.addAll((List<Sobject>)members_to_add);
            }
        }
      return dmlWrapper;
      }
    }

This class creates a new CampaignMember for each closed-won opportunity belonging to a campaign, that has a contact role defined. It also creates a relationship between the contact that referred the opportunity and the campaign member. (This class is taken from the DF14 “Extend and Customize the Nonprofit Starter Pack” session. Full recording available online.)

Note the **“global”** class declaration. This is necessary for our TDTM implementation classes to be dynamically instantiated from our Trigger Handler. If you use the “public” identifier instead, you will not get an error, but won’t see the expected behavior. It will be as if the class doesn’t exist or is inactive.

## Additional Information

Another interesting component of this design that we use internally and that is also available for you, as you can see in the example above, is our **DmlWrapper**. This is a class that we use to store all (or most of) the records to perform DML on in the current transaction. This way we can just make one DML operation of each type (insert, update, etc.) at the end of the transaction. DML can also be performed at any point during the transaction, if there are operations or business logic that requires it (for example the creation of a record with a reference to other record created in the same transaction), but any other independent DML can be saved for the end.  

This is the beginning of the DmlWrapper declaration, where we can see the data structures that we use to store the records to the processed: 

    global class DmlWrapper {
        global List<SObject> objectsToInsert = new List<SObject>(); 
        global List<SObject> objectsToUpdate = new List<SObject>();
        global List<SObject> objectsToDelete = new List<SObject>();
        global List<SObject> objectsToUndelete = new List<SObject>();
        ...
        
One more interesting aspect of DmlWrapper is that Salesforce has a limit of 10 different types of objects DML can be performed upon in a single call. Switching between different types of objects, even if the same type is repeated again, is counted as a new type every time. See the section “Creating Records for Multiple Object Types” at [Apex Dml Limitations](https://www.salesforce.com/us/developer/docs/apexcode/Content/langCon_apex_dml_limitations.htm). To avoid hitting this limit, we group all records of the same type before performing the DML operation. See the method “groupSObjects” in [TDTM_Runnable](https://github.com/SalesforceFoundation/Cumulus/blob/dev/src/classes/TDTM_Runnable.cls) for details.

## Conclussion

I hope this gives you a good idea of what the Table-Driven Trigger Management pattern is, how we use it at the Nonprofit Starter Pack, and how you can use it yourself to extend the trigger design in the NPSP, or even in your own independent applications. All the code in the Nonprofit Starter Pack is open source, so feel free to check it out at our [NPSP Github repository](https://github.com/SalesforceFoundation/Cumulus). If you have questions, you can find a vibrant and helpful community at the [Power of Us Hub](https://powerofus.force.com/). Happy coding!
