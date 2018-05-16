---
layout:   post
title:    "Why we removed (most of) our custom Error Handling"
author:   Carlos Ramirez Martinez-Eiroa
date:     2018-05-16 15:00:00

excerpt: "Writing a generic error handler is a common thing to do–nearly everyone ends up doing it at some point. We did it for NPSP and HEDA. But, it turns out it has non-obvious drawbacks, which we'd like to share with you."
---
# Why we removed (most of) our custom Error Handling

Some time ago, circa 2014, we decided to implement our own custom error handling in [NPSP](http://www.salesforce.org/nonprofit/nonprofit-success-pack/), as described in the post titled [“How the Nonprofit Starter Pack does Error Handling on Salesforce"](http://developer.salesforce.org/#blog/post/2015/02/03/how-npsp-does-error-handling-on-salesforce.html).

Our main goal was to have the org's admin be the one who gets notified when errors happen, instead of us, the package publisher. That's because in most cases it is up to the admin to fix issues caused by unhandled exceptions in their org, as these were usually caused by validation rules or code outside of our package.

When we developed [HEDA](http://www.salesforce.org/highered/data-architecture/), we adopted this same error handling approach. 

Writing a generic error handler is a common thing to do–nearly everyone ends up doing it at some point, because it seems like an obvious improvement. But, it turns out that after using this approach in production for a while, we've discovered a couple non-obvious drawbacks, related to cases where the errors  **aren't** actually propagated correctly.

In the rest of this post, we'll dig into the technical details of these problems, and why we changed our error handling approach back to the way it was before. I hope this post helps you understand why you shouldn't implement this kind generic error handling either (without you having to learn it the hard way!).

1. The first problem can be a pretty major one in some cases. If we **catch the exception**, the **transaction succeeds** from a platform point of view (if we are in the simple single transaction case - we'll look at multiple transactions in point #2). If the transaction gets started by an actual user, she sees the error message and the admin is notified about the problem. All good so far. But  the issue comes when the client is another application, such as the Data Loader, instead of an actual user. In that case the external application thinks the transaction succeeded. That's a problem, because if the application doesn't know the transaction failed, it won't retry it or take whatever other action it needs to in order to address the failure.

2. The second problem has to do with how the platform supports **savepoints**. All our logic gets routed through our [Trigger Handler](https://github.com/SalesforceFoundation/HEDAP/blob/master/src/classes/TDTM_TriggerHandler.cls) dispatcher class, which calls the right classes to run, in the right order. The run method is static, but unfortunately a savepoint cannot be static. This means that if the Trigger Handler dispatcher gets called more than once, because it runs a second or third time as a result of changes to records, the errors in the following runs of Trigger Handler will be lost. 

   For example, let's say the user makes a change to object A, which causes the dispatcher to call classes X, Y, Z. If an exception gets thrown in classes X, Y or Z, we catch it and display an error to the user (in addition to notifying the admin and storing the error, if the system was configured to do that). But then, if class Z makes a change in object B which causes the dispatcher to call class W, and an exception gets thrown in class W, we would notify the admin and store the error, but the user would NOT see the error message. The **original transaction would not be rolled back** either. That's because the page the user was interacting with, which caused the code to run, would be in a separate transaction from the one that threw the error. Therefore, the original try-catch from the first transaction, cannot catch the exception.

   ![alt text](https://developer.salesforce.org/assets/images/removing-error-handling.png "Error Propagation Sequence Diagram")

   This would also apply to external applications, if the original transaction that happened as the result of the external call succeeded, but subsequent ones failed.

3. The last issue, though a minor one compared with the other two, is that every time you set up a savepoint, you consume a DML statement. Which obviously affects your limits.

Because of all this, we decided to remove our error handling approach from any code that runs synchronously. We still kept it, including storing error info, and notifying by email or Chatter, for asynchronous jobs (scheduled jobs mainly). These aren't usually triggered by an external application, and there wouldn't be a way to display an error to a user anyway. Many admins don't go periodically into Setup to see if their scheduled jobs failed, and thus we feel this still provides value.

We hope this is informational for you, and helps you better understand error handling and transaction behavior on the Salesforce platform. Until next time!

