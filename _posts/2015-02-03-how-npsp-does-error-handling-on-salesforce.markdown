---
layout:   post
title:    "How the Nonprofit Starter Pack does Error Handling on Salesforce"
author:   Carlos Ramirez Martinez-Eiroa
date:     2015-02-03 13:00:00

excerpt: "Error handling on the Salesforce platform is challenging, given that all changes are reverted by default if an error occurs. This includes any data changes and any outbound messages. In this post we explain how to take transaction control away from the platform in order to be able to store error records and send error notifications in the NPSP package."
---

# Goals
Our goals regarding error handling are:

* To be able to store error information in the org where the error occurred
* To be able to send error notifications (email, chatter) from the org where the error occurred

# Challenge
The challenge in doing error handling on the Salesforce platform is that when an error occurs, all changes to the system are undone. This includes any kind of error record stored, and any type of notification that we tried to send.

If any __unhandled exception__ (exception that is not caught by our code) occurs, or if any record in the context is flagged as containing an error through the use of the `addError` method, the whole transaction is rolled back. This makes it impossible to store custom errors or to send error notifications, as the storing of the error records or the creation of Chatter post would also be rolled back. The emails containing error notifications would never be sent, as the transaction rollback pulls them from the queue they were put in.

# Solution
Our solution is based on __taking transaction control__ away from the platform. 

To be able to store errors and send error notifications, we set savepoints at all possible request entry points (triggers*, controller, future methods, batch classes), and wrap all the business logic in a `try-catch`. 

If any exception occurs, we do as follows:

1. We catch it
2. We roll back in the catch block
3. We create and store an error record
4. We send error notifications

There is a caveat here, in the case of __triggers__. Since the earliest point where we can set a savepoint is the trigger, when we do a rollback the initial operation that caused the trigger to run is not rolled back. Only everything that happens in or after the trigger is. For the specific cases where we do not want to store an error record, and we want instead to roll everything back, including the original operation, we use `addError` to force the platform to do the rollback for us. We do this by setting the flag `isPropogateErrorsFromTrigger` to true in `TDTM_TriggerHandler`.

_*You could argue that a trigger is not an entry point, as it needs to be called from some other code in the platform, such a controller, a future, a batch, or even the data loader. However, we consider it an entry point to our application given that it can be called from standard VisualForce pages or some other standard platform code that we don’t have access to - the trigger thus becoming our de facto entry point._


# Technical Details
The following details must be understood in order to effectively do error handling in the project.

## Triggers
Error handling in triggers is already set up for the whole application (in `TDTM_TriggerHandler`). There should be only one trigger per object, and they should implement `TDTM_Runnable`. Classes that implement `TDTM_Runnable` don’t need to catch exceptions or perform any other error-handling task. There is nothing to do in the trigger itself. See any of our existing triggers for an example. Read additional details regarding our approach to triggers in this [Table-Driven Trigger Management post](http://developer.salesforcefoundation.org/#blog/post/2014/11/24/table-driven-trigger-management.html).

In order to provide feedback to the user when an exception occurs and is caught by `TDTM_TriggerHandler`, we try to add it to the page with `ApexPages.addMessage` (in the `getErrors` method of the `ERR_Handler` class).

In the cases where want the original DML operation that caused the trigger to run to be rolled back as well, we set the `isPropogateErrorsFromTrigger` property of `TDTM_TriggerHandler` to true.

## “Normal” Classes
Normal classes (non-trigger, non-controller, non-future, non-batch) can throw exceptions. They should not catch them, and they should not use the `addError` method (unless it's something that is not really an error, and thus you don’t want to halt execution, store an error record, or send error notifications).

If you throw an exception in a class that is being called from a __trigger__, keep in mind that the throwing of the exception will __only make the arm of the transaction where you throw it to get reverted__. That is, if you throw an exception in the BEFORE, only the BEFORE part of the transaction will get reverted. Same for the AFTER. 

If you use the `addError` method, the whole transaction will be rolled back. No error record will be stored, and no error notification will be sent.

Instead of throwing exceptions or using `addError` to control transaction rollbacks in classes that are called from triggers, it is advisable to check for the conditions that need to be met on each side of the trigger transaction (BEFORE or AFTER).

## Controllers and Futures
If you create a new public method  that performs DML* in a controller or a future method, follow this design:

_*This is especially critical if more than one DML operation is performed, because if there is more than one and exception that is NOT the first one is thrown in the try block, the previous DML operations don’t get rolled back automatically. We need to do that manually._

1. If it’s a controller, make sure that the page contains the `<apex:pageMessages />` element

2. Set a `Savepoint` at the very beginning of the method:

        Savepoint sp = Database.setSavepoint();

3. Wrap all the code that does the actual work in a `try-catch`

4. Put all the business logic in the `try` block

5. In the `catch` block, roll back to the savepoint
	
	    Database.rollback(sp);

6. Then process the error (still in the `catch` block)

        ERR_Handler.processError(e, ERR_Handler_API.Context.MYCONTEXT);

This will store it in the database (is enabled in the settings), and send the email notification or post to Chatter (according to the settings).

### Example
This is an example of how the whole block might look when called from a controller:

	Savepoint sp = Database.setSavepoint();
	try {
		//One of these operations could cause a class called from a trigger to throw an exception
		update contactsToBeUpdated;
		delete contactsToBeDeleted;
	} catch(Exception e) {
		Database.rollback(sp);
    	ERR_Handler.processError(e, ERR_Handler_API.Context.STTG);
    }

Optionally, if you have more than one DML statement and it’s ok for all the DML to be performed at the very end of your action method, you can use the `TDTM_Runnable.DmlWrapper` class, as in the method `saveBatch` of `BDE_BatchEntry_CTRL`. That is, all objects to insert are added to `dmlWrapper.objectsToInsert`, all objects to update are added to `dmlWrapper.objectsToUpdate`, etc. At the end of the method, right before the catch block, you will execute the following command:

    TDTM_TriggerHandler.processDML(dmlWrapper);

## Batch Classes
In general, you will not want to follow the pattern outlined above for controllers and future methods in the execute method of batch classes. If you do this, the system will not know that the batch job failed. The job will be flagged as successful in the `AsyncApexJob` table, and will show as such in the Apex Jobs page. Also, our custom batch progress widget (`UTIL_JobProgress.component`) will think it succeeded.

However, most of our batch classes implement the `UTIL_MasterSchedulableHelper.UTIL_IRecurring` interface, which requires the implementation of a `executeReturnStatus` method. This is the method that launches the actual batch job. You can follow the pattern outlined above in this method, and it will create an error record and send error notifications if the batch cannot be successfully launched.

## Database Class
As a side note, you should not use the `Database` DML methods unless absolutely necessary. If you do, you need to understand their behavior very well. You have to be aware that, if certain types of errors occur, they will roll back and run again only with the records that succeeded on the first run, as described in our [Database Class and Transaction Rollbacks](http://developer.salesforcefoundation.org/#blog/post/2014/07/14/database-class-transaction-rollbacks.html) post.
