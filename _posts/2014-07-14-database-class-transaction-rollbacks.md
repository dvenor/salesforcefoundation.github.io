---
layout:   post
title:    "Database Class and Transaction Rollbacks"
author:   Carlos Ramirez Martinez-Eiroa
date:     2014-07-14 11:00:00
---
While designing the error handling functionality for the [Nonprofit Starter Pack 3.0](http://www.salesforcefoundation.org/help/nonprofitstarterpack/), aka Cumulus, project (a free and [open-source](https://github.com/SalesforceFoundation/Cumulus/) Donor Management System that runs on top of [Salesforce.com](https://www.salesforce.com/)), we discovered a very interesting behavior of the platform that we would like to share with you. Hopefully you’ll find it as interesting as we do.

Our goal was to save an error record to the database, using a custom Error object that we created. To test that behavior we created a test that that would cause an exception to be thrown, which we were then parsing in order to store some information about it in the database. We were using Database.insert in the test in order to have an exception thrown in the code we were trying to test, not in the test itself. With a simple insert the exception would get thrown in the test and we would not get any further down the code. As probably most of you know, if you use the DML methods of the [Database class](https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_database.htm) no exception is thrown if there is an error in one of the records you are trying to manipulate, and you have the option to specify if the operation is still performed on the other records (the ones without errors). This is what the documentation says about the [Database.insert](https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_database.htm#apex_System_Database_insert_2) method:

"_The optional opt_allOrNone parameter specifies whether the operation allows partial success. If you specify false for this parameter and a record fails, the remainder of the DML operation can still succeed._"

However, when writing the tests we found couple of strange things. Let’s describe each case with an example:

1. First we noticed that when performing a **Database.insert** in only one contact, if an exception was thrown at some later point in the code, no other database-related changes that happened in that context would be persisted to the database. In our case the other database operation we were trying to perform was the storage of an error record. Well, no matter we tried to store the error record synchronously or asynchronously (in a future), at the end of the transaction the record would not be there. We could see in the logs that the program inserted our error record, but for some reason the operation seemed to be getting rolled-back.

2. We then noticed something even more strange. If we performed a **Database.insert** of multiple contacts with only one of them causing an exception, and we had a **re-entrancy flag** in the trigger on contact (the typical [flag that will stop a trigger from running more than once](http://developer.force.com/cookbook/recipe/controlling-recursive-triggers)) no error record would be saved either, AND we would see in the logs that that the trigger on contact was running twice.

After much head-scratching and investigation we figure out the issue. It turns out that both cases have the same explanation. Basically what happens when you use Database.insert and some of the records in that insert are responsible for throwing an exception is that the whole operation gets rolled back, and then the **insert is performed again only with the records that succeeded**.

For example, let's say that you have 5 records that you want to insert with a Database.insert call. If 2 of them fail, Salesforce will roll back all database-related operations and then do the insert again with the 3 that succeeded. **HOWEVER**, if you have a reentrancy flag in a trigger, the value of that flag will not be rolled back (after all [rollbacks](https://en.wikipedia.org/wiki/Rollback_(data_management)) affect only database operations). Therefore the second time the code in the trigger will not be run (the reentrancy flag prevents the code from running again).

To the best of our knowledge this behavior is undocumented, and you should keep it in mind when trying to do things such as saving error information to the database. Staying with the Database.insert example, a savepoint is set right when you call Database.insert. If that insert has any side-effects, such as triggers being fired, any code run further down in the stack will be rolled back if any of the records have errors. If you want to store errors or do any other database operation that you don’t want rolled back, you will have to do it after the control has been passed back to the routine that did the initial Database.insert.

_If you’d like to see an example of how we did our tests you can take a look at the [question we posted in Salesforce.StackExchange.com](https://salesforce.stackexchange.com/questions/23462/record-insert-gets-rolled-back-if-reentrancy-flag-exists), and look at the our [Error Handling Test Project](https://github.com/SalesforceFoundation/Error_Handling) referenced there. The main files to look at in that project are (the rest are not related to this issue):_

+ `ERR_Handler.trigger`
+ `ParentAccountUpdater.cls`
+ `RR_Handler_TEST.cls`










