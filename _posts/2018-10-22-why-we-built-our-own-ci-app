---
layout:   post
title:    "Why We Built Our Own CI App"
author: Jason Lantz

excerpt: "The story of MetaCI, a crazy idea that now power Salesforce.org's Product Delivery team's daily work"
---

# Why We Built Our Own CI App

It's a natural tendency of developers to want to build things themselves.  If you've ever known a developer who wrote their own issue tracker or project management system, you may have some bias the next time you hear such a pitch.  It's understandable for engineering leaders to build up a bias when one of their developers makes the recommendation to build their own X.  I faced just such a challenge in November, 2016 trying to figure out how to pitch my boss on the idea of building our own CI app.  I knew I had a bit of a reputation for wanting to build things myself, usually accompanied by a statement like “it'll be easy” which was rarely true.

First, a little bit of background.  [Salesforce.org](http://salesforce.org/) creates products with releases every 2 weeks to tens of thousands of nonprofit and education customers.  My team (Release Engineering) runs the tooling and processes for scalable and agile team development and release of these products.  All our products are built on the Salesforce platform as managed packages and share a common characteristic: our runtime environment is a Salesforce org instance, not our local machines or a virtual machine.  Our build scripts are really just API clients to deploy our code and run tests.  Recognizing that we're kind of an edge case in the CI world, we have invested resources over the years in creating [CumulusCI](https://github.com/SFDO-Tooling/CumulusCI), a Python framework for portable automation for the development of managed packages on the Salesforce platform.

After our initial prototyping of CumulusCI proved that we could effectively encapsulate all the automation needs of our projects, we set out to find a cloud based CI system where we could run our fancy new automation framework on commits to Github.  We already had our logic wrapped in Python classes which were easy to run.  For example, to build a feature branch requires just a single command in CumulusCI's command line interface:

```
`cci flow run ci_feature --org dev`
```

We found some limitations in almost all existing cloud CI systems given our unique needs:

1. **Burstable Concurrency**: Our build concurrency needs fluctuate regularly from 0 up to 90 concurrent builds.  However, most cloud CI systems require paying to reserve your peak capacity for the whole month.  Either you pay a lot for capacity you rarely use or you deal with long build queues when you really need peak concurrency, usually at the end of a sprint when stress levels are already high.
2. **External Resource Sharing**: We need to control build concurrency for some builds in an intelligent way. Some of our builds run against persistent Salesforce orgs which requires limiting concurrency per org to one build at a time.  We needed a CI system that queues builds when their Salesforce org was already being used by another build.
3. **Domain Specific UX**: Our builds have a lot of unique information.  We track which Salesforce org the build was run against, Salesforce platform governor limits for our test methods, etc.  Ideally, our builds should have a UX that effectively presents this information instead of hides it in log files.
4. **Common Dependencies for All Projects**: Through our investment in CumulusCI, we were at a point where all our projects used a common set of dependencies to run all their automation.  We didn't need a CI system that could build any language in a VM, we needed a system that could run CumulusCI as fast and reliably as possible.

In line with our culture, we viewed these limitations not as blockers but instead as a call to innovate.  I wrote up a proposal doc outlining the challenges with existing CI systems and pitching the idea of building our own CI app on [Django](https://www.djangoproject.com/) that could tap into our Python based automation and run on [Heroku](https://heroku.com/) for burstable scalability.  It was indeed a crazy idea, but the pitch was to give us 2 weeks to prototype the solution.  The pitch worked and after 2 weeks we had a prototype of what is now [MetaCI](https://github.com/SFDO-Tooling/MetaCI) running builds on Heroku.  The prototype helped us win support to continue building our own CI app.  In January, 2017 (2 months later) we went live with our custom CI app for all our projects.

We're now 22 months and 40,000+ builds into this crazy idea experiment and it's easy to take our release engineering zen for granted.  The tension between developers and release engineers over backlogged build queues is a thing of the past.  We've integrated MetaCI with [Hirefire.io](http://hirefire.io/) to automatically scale up our worker dynos as our build queue grows allowing all builds to run concurrently where possible.  The entirety of the logic needed to handle the challenge of external resource blocking which had me on a years long search of a solution was solved in [46 lines of nicely formatted Python code](https://github.com/SFDO-Tooling/MetaCI/blob/master/metaci/build/tasks.py#L81-L127).  Best of all, we've been able to create a first class user experience for our team based on the Salesforce specific information for our builds.

The experience of running CI inside a single Heroku app definitely puts us in new territory and has brought some unanticipated benefits.  We're using [Heroku Pipelines](https://devcenter.heroku.com/articles/pipelines) and [Heroku CI](https://devcenter.heroku.com/articles/heroku-ci) to manage the deployments of changes to MetaCI.  Heroku CI is a great system for testing Heroku based applications.  We have a staging site where we can test out changes before deploying to our production CI site with the click of a button.  Heroku's container system lends itself well to our situation of a common set of tooling dependencies for all our projects as the compiled slug allows quick and easy scaling of dynos to handle load.  We've benefited from addons such as New Relic and Sentry, and it brings great peace of mind to have all our build and test result data living in a single, industry standard Postgresql database.

Thus far, I haven't even mentioned my favorite feature of MetaCI: it's open source!  As we provide solutions to common challenges of running CI that scales across multiple Salesforce projects, we make those solutions available to the entire Salesforce ecosystem, including open source community projects like those found in the newly created (and expanding) [SFDO-Community](https://github.com/SFDO-Community) Github organization.

This is just the first in a series of posts we'll be writing about our innovation in release engineering at Salesforce.org.  If you share a passion for seeing innovative, if sometimes crazy ideas, come to life to solve seemingly impossible challenges, check back for future posts.  Better yet, [consider joining our growing team](https://salesforce.wd1.myworkdayjobs.com/en-US/External_Career_Site/job/California---Remote/Performance-Engineer---Salesforceorg_JR20212-1).

Resources related to this article:

Our production instance of MetaCI:
[https://mrbelvedereci.herokuapp.com](https://mrbelvedereci.herokuapp.com/)

CumulusCI's Documentation
[http://cumulusci.readthedocs.io](http://cumulusci.readthedocs.io/)

Github Repositories
https://github.com/SFDO-Tooling/MetaCI
https://github.com/SFDO-Tooling/CumulusCI
