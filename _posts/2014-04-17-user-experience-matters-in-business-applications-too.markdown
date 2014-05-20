---
layout:   post
title:    "User Experience Matters in Business Applications Too"
date:     2014-04-17 12:00:00
author:   Nick Bailey
excerpt:  "I’ve recently undergone a shift in how I think about business application development. This change has developed while working on several projects at the Salesforce Foundation, such as finding better ways to get sales contracts signed. Here is what it boils down to:

### Users > Business Goals > Technology"
---
My team and I build database applications for business users and, like many in the field, this means that I have spent a lot of my career taking risks and making mistakes. Mistakes and failures are great if you choose to take them as learning opportunities. But, it is really hard for me when long-held assumptions are challenged.

I’ve recently undergone a shift in how I think about business application development. This change has developed while working on several projects at the Salesforce Foundation, such as finding better ways to get sales contracts signed. Here is what it boils down to:

### Users > Business Goals > Technology

Unknowingly, I’ve spent a rather long time operating with that scenario reversed in my head, most likely because I am a technologist. It is far easier for me to take the stance that technology is more important than the end user’s experience.

The faulty logic goes something like this:

1. End Users of enterprise applications work for a business, so they must be in service of the business.
2. The business has goals that they would like technology to assist them with, so they must adopt the technology that best meets their needs.
3. Therefore, end users must learn to use the technology to help the business achieve it’s goals, regardless of how painful that experience might be.

Put another way:

###End users should be in service of the application, working hard and taking any necessary steps to use it properly.

This mentality is ingrained in techie culture. Just look at the [nicknames for “User Errors” in wikipedia](http://en.wikipedia.org/wiki/User_error):

* **PEBCAK** (“Problem Exists Between Chair and Keyboard”)
* **PICNIC** (“Problem In Chair Not In Computer”)
* **ID-10T** error (“Idiot error”)

Harsh! Instead of shouldering the burden of not providing a user experience that is intuitive and easy to use, we just blame (and poke fun at!) Users for not knowing the proper way to [wave a dead chicken](http://dictionary.reference.com/browse/wave+a+dead+chicken).

The solution, then, often leads to finding ways to prevent Users from using the app improperly. Not to pick on Salesforce Validation Rules, they can be put to good use, but they are a great example of this line of thinking. Validation Rules are put in place to prevent Users from putting bad data into the database, or force a certain pattern of behavior. When you violate a Validation Rule, you are prevented from completing your task and get a glaring error on your page letting you know just how wrong you are. No one likes being told they are wrong. There is an emotional component in play that is too often overlooked. My personal reaction is usually frustration trending toward anger if the error message doesn’t tell me how to correct the mistake. This is not the reaction I want users to have.

I think a better approach is incenting your Users to use the app the right way. A slight distinction, but this small shift in mentality can go a long way toward delighting Users. Make your app so delightful to use, so intuitive, that the rules are implied and require less intrusive enforcement.

###Applications should be in service of the end user, making it easy for them to complete tasks and delivering a delightful experience.

User experience comes first. If users of your app aren’t delighted, then they aren’t getting what they need out of your application. Which probably also means they aren’t giving you or the business what you need out of the application. If people don’t or won’t use your app, technical perfection is meaningless.

This concept is all over the consumer product world, but doesn’t feel like the prevailing methodology in the enterprise business application development world.

While user experience is paramount, we must also meet business goals and maintain great data. We shouldn’t have to make a choice between proper data architecture, meeting the needs of the business, and a great user experience. So, application development teams must find ways to accomplish all of these goals.

###Great applications deliver an experience that simultaneously makes the end user, the business, and the database happy.

It seems obvious to me when said that way but, admittedly, it was not how I was operating (nor, I suspect, a number of other individuals and teams building database applications).

You can’t meet business needs alone, or deliver great user experiences alone. You can’t have one without the other because, individually, they fall short of the overall goal. No matter how much value or emphasis we place on user experience, if your database is not working properly or your application is not meeting the most basic needs of your business then a great user experience is meaningless. Conversely, If you pay no attention to user experience, then the Users of your app spend their day frustrated when using your app and are most likely trying to find ways to do their work without using the application, which renders the application meaningless.

Anyone that has purchased licenses from the Salesforce Foundation has experienced, first-hand, what imbalance looks like. The contract signing process isn’t exactly frictionless, it goes something like this:

1. Foundation Account Executive (AE) emails a pdf of a contract to customer
2. Customer receives email
3. Customer prints attached Contract
4. Customer signs printed Contract
5. Customer scans signed Contract
6. Customer emails pdf of signed Contract back to AE
7. AE receives email
8. AE downloads email to local hard drive
9. AE navigates to the Contract in Salesforce
10. AE uploads signed contract pdf as attachment
11. AE updates the database record to send it for provisioning.

This process works and, on paper, it meets the needs of the business. The Foundation can donate and discount Salesforce licenses for customers, we end up with a signed contract, and customers get their licenses provisioned. But, it’s a notoriously long process in need of an improved user experience for both the AE and the customer.

Trying to balance user experience with business goals is a great problem to be solving for, because it means your app isn’t failing. If your current app is failing, you don’t have time or energy to spend on improving the user experience. As co-conspirator Kevin Bromer put it:

###Is User Experience a Right or a Privilege?

We agree that there is merit to both but, in reality, it is a privilege. You can do work and use applications in the absence of a decent User Experience (as proven by our contract signing process). And, while it has taken me a while to get here, I also believe that:

###If you and your team want to be in the business of delivering great applications *you must treat User Experience as a right*.

If we revisit the previous example while bringing the user experience into balance with business needs, the process might look something more like this.

1. Foundation Account Executive (AE) emails a link to customer
2. Customer receives email and clicks link
3. Customer can view the contract and optionally download a pdf
4. Customer clicks “I agree” to e-sign the contract
5. The database is instantly updated with a digitally signed pdf attachment and is automatically sent for provisioning

We are still meeting the needs of the business, but we are also providing a much better user experience both for the customer and for the Account Executive. It saves time for everyone involved and is more in line with our customer’s expectations for this type of transaction. This is a real feature that we have in pilot at the Salesforce Foundation thanks to some killer work and investment of time from Evan Callahan to make it happen.

Delighting Users, whether your internal business users or your customers, requires putting the user experience first in business application design. It must be in balance with the needs of the business so that work is getting done properly. By providing great experiences in business applications, users have positive emotional responses to their experiences because the application makes their lives and tasks easier rather than being a hurdle to accomplishing a task. In turn, this increases usage of the application which serves the needs of the business.

When you are doing it right, in addition to having an application that works well and meets all the requirements, you get rewarded by someone letting you know that you’ve delighted them with a great experience.

[![gorav-seth-comment](http://nickhbailey.files.wordpress.com/2014/04/user__gorav_seth___power_of_us_hub.png?w=590)](http://nickhbailey.files.wordpress.com/2014/04/user__gorav_seth___power_of_us_hub.png?w=590)