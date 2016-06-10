---
layout:   post
title:    "Table-Driven Trigger Management (TDTM)"
author:   Carlos Ramirez Martinez-Eiroa
date:  2016-06-10 11:00:00
excerpt: "Table-Driven Trigger Management (TDTM), is the Nonprofit Starter Pack's approach to trigger management. As you probably know, large custom applications or packages, such as the NPSP, can often wind up with a large number of triggers, including multiple triggers on the same Object (a very bad practice). These multiple triggers are often written by different developers and even consulting companies, and can interact with each other in sometimes-unpredictable ways. Under these circumstances, problems become very hard to understand, and even harder to debug. TDTM makes it easier for us and for our users to know what happens when a user interacts with a record."
---
**Table-Driven Trigger Management** (TDTM), is the Nonprofit Starter Pack's approach to trigger management. As you probably know, large custom applications or packages, such as the NPSP, can often wind up with a large number of triggers, including multiple triggers on the same Object (a very bad practice). These multiple triggers are often written by different developers and even consulting companies, and can interact with each other in sometimes-unpredictable ways. Under these circumstances, problems become very hard to understand, and even harder to debug. TDTM makes it easier for us and for our users to know what happens when a user interacts with a record.

## Technical Overview
**NOTE:** _We're using class names without prefixes throughout this article. This naming convention matches what's in our [Github repository](https://github.com/SalesforceFoundation/Cumulus). However, the classes inside the NPSP managed package all use the npsp prefix._

In our TDTM design, one trigger and one trigger only exists for each object (one for Contact, one for Account, one for Opportunity, and so on), both for standard and for custom objects. These triggers call our **Trigger Handler** ([`TDTM_TriggerHandler`](https://github.com/SalesforceFoundation/Cumulus/blob/dev/src/classes/TDTM_TriggerHandler.cls))---that's it---and pass it all the environment information. The actual business logic that needs to run when an action occurs on a record is stored in plain old classes. We created a custom object, Trigger_Handler__c, to store which **classes** should run for each **object**, along with the related **actions**. In this object we also define whether the class is active or inactive, and whether the logic is going to be run synchronously or asynchronously. The Trigger Handler is then charged with the task of calling these classes when appropriate, which provides the added advantage of allowing us to centralize error handling for triggers around the Trigger Handler.

That leaves us with the following fields in our Trigger_Handler__c custom object:

  * **Class__c**: the class to run
  * **Object__c**: the object that, when being modified, will make the class run
  * **Trigger_Action__c**: the actions on which the class will run (before insert, after update, and so on)
  * **Load_Order__c**: the order in which classes for the same object, and with the same actions, will run
  * **Asynchronous__c**: a flag that specifies whether the class will run synchronously or asynchronously

Of course, we want this design to be extensible. We want to be able to add new classes and have our Trigger Handler run them. We're also storing the information about which classes to run (plus the details mentioned above), as strings in our custom object. Therefore we need to instantiate the classes to run dynamically. These classes also need to implement the [`TDTM_Runnable`](https://github.com/SalesforceFoundation/Cumulus/blob/dev/src/classes/TDTM_Runnable.cls) interface, in order to ensure that they can actually be run.

The code in our `TDTM_TriggerHandler` class that creates an instance of each class to run, and checks to see if the class implements the required interface, looks like this:

    if(classToRunRecord != null) {
        String classToRunName = String.valueOf(classToRunRecord.get('Class__c'));
      Type classType = Type.forName(classToRunName);
          
      if(classType != null) {     
        Object classInstance = classType.newInstance();

           if(classInstance instanceof TDTM_Runnable) {
               TDTM_Runnable classToRun = (TDTM_Runnable)classInstance;

Then we just need to have entries in our **`Trigger_Handler__c`** custom object, like this:

![TDTM Settings](/assets/images/TDTM_Settings.png)
 
The screenshot above is from the Trigger Configuration page in NPSP Settings (**System Tools** | **Trigger Configuration**). This page allows you to see all the classes that are going to run when a user interacts with each Object type. Here you can also add your own classes to work in conjunction with the NPSP TDTM design. Any class that you create must implement the `TDTM_Runnable` interface, and therefore have a `run` method with the necessary parameters. You also need to create an entry on this page for your class. Alternatively, you could create the record directly against the `Trigger_Handler__c` object, using the Force.com IDE or the Developer Console, for example, and the entry would be displayed here. 

You can create new entries using the form at the bottom on this page, but you cannot edit or delete existing entries. This is by design. The functionality controlled by these settings is critical to the NPSP, and we want to make sure that anyone who wants to modify it knows what they're is doing. Thus, to edit one of the existing entries, or one you created yourself, you’ll have to interact directly with the `Trigger_Handler__c` custom object. You could do that, for example, by running anonymous Apex through the Developer Console.

**WARNING**: Any modification to these settings will drastically alter the behavior of the NPSP, and may in fact cause cascading issues down the road. As with any major change, we strongly suggest that you make changes in a sandbox first. Test the new behavior and apply that change to your production instance only after you've ensured the stability of your system. As a nonprofit organization, you're entitled to a select number of free sandboxes, and this is a great use for them.

## Deployment Example

Keep in mind that if you're developing your own custom TDTM class in a sandbox, you not only need to migrate the code to production, but you have to migrate/recreate the appropriate record.

Here's an example of a class that's not part of the NPSP package, but that follows the TDTM design:

    global without sharing class OpportunityMemberCreation_TDTM extends npsp.TDTM_Runnable {
  
      // the main entry point for TDTM to invoke our trigger handlers.
      global override npsp.TDTM_Runnable.DmlWrapper run(List<SObject> newlist, List<SObject> oldlist, npsp.TDTM_Runnable.Action triggerAction, Schema.DescribeSObjectResult objResult) {
      
      npsp.TDTM_Runnable.DmlWrapper dmlWrapper = null;

      if (triggerAction == npsp.TDTM_Runnable.Action.AfterInsert) {
      
        dmlWrapper = new npsp.TDTM_Runnable.DmlWrapper();
        List<Opportunity> newOppList = (List<Opportunity>)newlist;        
        List<CampaignMember> members_to_add = new List<CampaignMember>();
              
            for (Opportunity o : newOppList) {
            
              if (o.isClosed && o.isWon && o.CampaignId != null 
              && o.npe01__Contact_Id_For_Role__c != null) {
              
                CampaignMember cm = new CampaignMember(CampaignId = o.CampaignId, 
                ContactId = o.npe01__Contact_Id_for_Role__c, 
                Status = 'Responded');
                
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

This class creates a new `CampaignMember` for each Closed-Won Opportunity belonging to a Campaign that has a Contact role defined. It also creates a relationship between the referring Contact and the new Campaign member. (This class is taken from the DF14 “Extend and Customize the Nonprofit Starter Pack” session. Full recording available online.)

Note the **`global`** class declaration. This declaration is necessary for our TDTM implementation classes to be dynamically instantiated from our Trigger Handler. If you use the `public` identifier instead, you won't get an error, but you won’t see the expected behavior either. It will appear as if the class doesn’t exist or is inactive.

## Additional Information

Another interesting component of this design that we use internally and that's also available for you is our **`DmlWrapper`** (see above). We use this class to store all (or most of) the records on which we want to perform DML in the current transaction. This lets us make just one DML operation of each type (insert, update, etc.) at the end of the transaction. DML can also happen at any point during the transaction, if there are operations or business logic that require it (for example the creation of a record with a reference to another record created in the same transaction), but we can save any other independent DML for the end.  

This is the beginning of the `DmlWrapper` declaration, where we can see the data structures that we use to store the records we want processed: 

    global class DmlWrapper {
        global List<SObject> objectsToInsert = new List<SObject>(); 
        global List<SObject> objectsToUpdate = new List<SObject>();
        global List<SObject> objectsToDelete = new List<SObject>();
        global List<SObject> objectsToUndelete = new List<SObject>();
        ...
        
One more interesting aspect of `DmlWrapper` is that Salesforce has a limit of 10 different types of objects upon which DML can be performed in a single call. Switching between different types of objects, even if the same type is repeated again, counts toward you limit every time. See “Creating Records for Multiple Object Types” at [Things You Should Know about Data in Apex](https://www.salesforce.com/us/developer/docs/apexcode/Content/langCon_apex_dml_limitations.htm). To avoid hitting this limit, we group all records of the same type before performing the DML operation. See the method `groupSObjects` in [`TDTM_Runnable`](https://github.com/SalesforceFoundation/Cumulus/blob/dev/src/classes/TDTM_Runnable.cls) for details.

## Conclusion

I hope this gives you a good idea of what the Table-Driven Trigger Management pattern is, how we use it in the Nonprofit Starter Pack, and how you can use it yourself to extend the trigger design in the NPSP, or even in your own independent applications. All the code in the Nonprofit Starter Pack is open source, so feel free to check it out at our [NPSP Github repository](https://github.com/SalesforceFoundation/Cumulus). If you have questions, you can find a vibrant and helpful community at the [Power of Us Hub](https://powerofus.force.com/). Happy coding!
