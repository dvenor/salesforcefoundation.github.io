---
layout:   post
title:    "Why Nonprofits Love the NPSP’s Open-Source Development Model"
author:   Jon Michael Varese
date:     2014-05-20 12:00:00
---
What’s the longest you’ve ever waited for a feature request to show up in a product? Three months? Six months? A year? Maybe two?

Wait no more. The latest release of the Salesforce.com Foundation’s [Nonprofit Starter Pack](http://www.salesforcefoundation.org/help/nonprofitstarterpack/) (NPSP) will make it even easier for members of the development community to solve problems or create feature enhancements—almost immediately.

To set the scene . . .

Earlier this month, Tom Gleason, of [Friends of Ngong Road](http://www.ngongroad.org/), a nonprofit that provides education for poverty-stricken children in Nairobi, Kenya, posted a question in the [Power of Us Hub](http://www.salesforcefoundation.org/help/power-of-us-hub/). “Is there a way,” he asked, “to adjust the number of payments allowed in my Schedule Payments option?” Gleason went on to say that he needed to schedule tracking for 26 payroll deduction donations instead of 12—the maximum number allowed by the Nonprofit Starter Pack.

Then along came Thomas Taylor, a Salesforce consultant with [CRM Science](http://www.crmscience.com/), and a [Salesforce MVP](http://www.salesforce.com/mvp/). Mr. Taylor investigated the NPSP code in its GitHub repository, and discovered that the maximum number of scheduled payments was actually hard-coded into the product. With a few pointers from the Salesforce.com Foundation’s Technology and Products team, Mr. Taylor was able to develop a fix that made the maximum number of scheduled payments configurable by any user.

[![Payment Wizard controller class](http://www.salesforcefoundation.org/wp-content/uploads/2014/05/opensource1b.png "The original schedule payments code in GitHub (red), and Mr. Taylor’s fix (green).")](http://www.salesforcefoundation.org/wp-content/uploads/2014/05/opensource1b.png)

*The original schedule payments code in GitHub (red), and Mr. Taylor’s fix (green).*

Taylor developed and checked in the fix for approval in less than twenty-four hours. The next day the Salesforce.com Foundation Product team reviewed the fix and accepted it as an enhanced feature. Mr. Taylor’s contribution will appear in the next release of the Nonprofit Starter Pack (version 3.0), scheduled for general availability sometime soon.

“To go from a community question to an externally developed, committed, and tested solution within two days is a great first example of why we invested in an improved infrastructure to support community contributions,” says Jason Lantz, the Lead Release Operations Engineer at the Salesforce.com Foundation. “Normally such feature requests would come in and go onto our backlog, where they would wait to be prioritized, and taken up for development—eventually.”

Mr. Lantz went on to highlight the speed with which community contributions can be folded into the product, largely because the heavy lifting has already been done by the community.

> “We can never match the power of our awesome community,” Lantz says. “When we collaborate, everyone wins.”

[![Mr. Taylor's contribution in Salesforce](http://www.salesforcefoundation.org/wp-content/uploads/2014/05/opensource2.png)](http://www.salesforcefoundation.org/wp-content/uploads/2014/05/opensource2.png)

*Mr. Taylor’s contribution in Salesforce.*

Thomas Taylor, whose roughly ten lines of code have received an avalanche of praise from his fellow community members, is a bit more modest. “I am honored that I’ve received so much attention for the first ‘official’ community contribution to the Nonprofit Starter Pack’s upcoming release,” he says. “But there are many people who have made far more extensive volunteer contributions to the NPSP code over the years. In my estimation, the credit is really due to the Salesforce.com Foundation’s Technology and Products team, who have created an infrastructure for the new release of the Nonprofit Starter Pack that makes it easier to streamline and automate community contributions.”

As for Mr. Gleason and his many colleagues in both Kenya and the United States, the feature enhancement will translate directly into increased productivity for the organization. “Enabling Salesforce to compute 26 (bi-monthly) donations for us, means that we no longer have to compute the amounts by hand, or hand type thank you/acknowledgement letters. ANY short cut that saves us time, or makes it easier and faster for us to track donations, gives us more time to focus on what’s really important—the children of Kenya.”

To learn more about the Salesforce.com Foundation’s Nonprofit Starter Pack open-source project, visit the NPSP’s [repository](https://github.com/SalesforceFoundation/Cumulus) on GitHub.