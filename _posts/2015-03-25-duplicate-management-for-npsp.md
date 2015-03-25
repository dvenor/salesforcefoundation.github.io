---
layout:   post
title:    "Duplicate Management for the Nonprofit Starter Pack"
author:   Nicolas Campbell
date:     2015-03-25 11:00:00
excerpt: "Managing duplicates and keeping your data clean requires good tools and a sophisticated strategy. Learn how the Nonprofit Starter Pack can help you deduplicate your data and keep it clean."
---
With the recent [Spring '15 Release](https://help.salesforce.com/help/pdfs/en/salesforce_spring15_release_notes.pdf), Salesforce introduced [Data.com Duplicate Management](https://help.salesforce.com/apex/HTViewHelpDoc?id=managing_duplicates_overview.htm&language=en_US), an out-of-box way to prevent accidental creation of duplicate records and help keep your data clean. This new feature is a great tool for users of the Nonprofit Starter Pack, and we recommend that you take advantage of it. Unfortunately, Data.com Duplicate Management is not a silver bullet, as no single tool can be.

# Perfectly Clean Data

Duplicate data will always be a problem, and perfectly clean data seems only to be found in the land of unicorns and fairy tales. The best your organization can do is implement a strategy to avoid entering duplicate records, and perform some cleansing and maintenance on a regular basis.

# Duplicate Management Strategy

1. Do Your Research
2. Start with a Clean Slate
    - Find the Right Tool
    - Be Careful!
    - Use Multiple Passes
3. Prevent New Duplicates
    - ALWAYS Search First
    - Catch Duplicates
4. Rinse and Repeat on a Regular Basis

## Do Your Research

The first step in combatting duplicates is understanding the enemy. Search for answers to questions like:

- How big of a problem are duplicates for my organization?
- Which objects have the worst duplication problems?
  - Contacts?
  - Leads?
  - Accounts?
  - Custom Objects?
- Where are these duplicates coming from?
  - Bad manual data entry?
  - Data imports?
  - External integrations?
- What fields do my duplicates tend to have in common?
  - Is Email a good field to use when trying to catch duplicate? Phone number? Address?

## Start with a Clean Slate

Before on-the-fly duplicate catching can properly do its job, your organization needs a clean starting point for your data, relatively free of duplicates. To get to this point, you will have to manually comb through thousands of records... just kidding.

#### Find the Right Tool

Unfortunately the Data.com Duplicate Management tool doesn't support de-duplication of your existing data, but there are some great tools out there to do just that.

[CRMFusion's DemandTools](https://www.crmfusion.com/demandtools/) is a wonderful data cleansing tool, and is free for nonprofits. Some find the learning curve can be a bit steep for DemandTools and the software is Windows only, but it's packed with powerful features. [Cloudingo](http://cloudingo.com) is a paid de-duplication tool that is discounted at 75% for nonprofits. Cloudingo is easier to use but less full-featured than DemandTools; for example, DemandTools can de-duplicate custom objects, and Cloudingo cannot.

Both of the above solutions come with built-in scenarios for business contacts and records that don't tend to work with nonprofit data, so you'll have to build your matching scenarios from scratch. Spend some time building and testing your matching rules. Doing so will also be useful later in preventing new duplicates.

And . . . if you’ve spent some time building great NPSP-compatible matching rules that you'd like to share with other nonprofit Salesforce users like yourself, we encourage you to share them on the [Power of Us Hub](https://powerofus.force.com/PUBlogin)!

#### Be Careful!

Your database didn't sprout up hundreds of duplicates overnight, and the problem won't be fixed in a few minutes of work. De-duplication takes time and attention, and while these tools can merge hundreds of records in a single click, special care should be taken at every step of the way, because **MERGING IS DESTRUCTIVE!** The record that “loses” during a merge is deleted, and data is copied over to the winning (or "master") record.

A mistake in a merge often means having to restore data manually from a backup file, as there's no undo button after merging duplicates. **Make sure you’ve backed up data and all related objects for the object you're de-duping.** Demandtools has a backup function, but you're already [downloading your weekly data export, right?](https://powerofus.force.com/articles/Resource/maintaining-an-effective-salesforce-backup)

#### Use Multiple Passes

An important concept when de-duplicating existing data is the use of multiple passes. Armed with your knowledge from step 1 about the type of duplicates you're dealing with, create new matching rules for each object you're catching duplicates from, tailored to the trends you've noticed in your data.

The more rigid and specific you can make your duplicate rules, the more certain you can be about finding positive matches, which means less manual work of combing through the results. Looser rules will catch more duplicates, but will also contain more false positives, requiring you to sort through the potential duplicates, and to select which matches to merge.

For each object, run the most specific rules first, i.e. the ones with the most fields needed for a match. Merge as many duplicates as you can before moving on to less specific rules.

## Prevent New Duplicates

Finally we're getting to the original subject for this blog post, the new Data.com Duplicate Management feature. Once your data is in a good place, you'll want to prevent new duplicates from being entered.

For Account, Contact, and Lead data imports, [CRMFusion's PeopleImport](http://www.crmfusion.com/peopleimport/) is another wonderful tool for matching on existing data.

For manual data entry, the first step is (drumroll, please):

#### ALWAYS Search Before Entering a New Record

Don't click that New button! The first step that all your data entry users need to take is to use the search function extensively before ever clicking New Contact or New Account.

#### Catch Duplicates

If your users are correctly searching before entering new data, the duplicate rules you're about to set up with Data.com Duplicate Management will never have anything to catch! Nevertheless, the rules can be super useful for forgetful users, and for reporting duplicates from external integrations.

Go to Setup > Administer > Data.com Administration > Duplicate Management > Matching Rules. The feature comes with a Standard Contact Matching Rule which isn't very useful for typical nonprofit data; ignore it. You can use one or more of the packaged NPSP matching rules, or you can create your own based on your experience with merging existing duplicates.

A caveat: if you're using the standard NPSP methodology of workflow rules copying emails and phone numbers in conjunction with the Preferred Email / Preferred Phone picklist fields, then you won't be able to use the standard Email and Phone fields to catch duplicates, as those fields are populated after contact creation. (If you're using NPSP and don't understand any of what I just wrote, this probably applies to you.) The packaged NPSP contact matching rules match on Personal Email or Work Email to avoid this problem.

Once you have matching rules set up, it's time to create Duplicate Rules, which defines what happens when a user tries to enter a duplicate. Information on how to set these up [can be found here](https://help.salesforce.com/apex/HTViewHelpDoc?id=duplicate_rules_create.htm&language=en_US).

# An Important Note on Data Imports and External Integrations

If you regularly import external data, and especially if you have external integrations that create the objects you've just set up duplicate rules for, be extra careful in setting the duplicate rules to Block or to show an Alert. Both of these options will prevent records from being inserted and you'll lose all that data, even though the Alert option allows users manually entering records to save the record anyway. The Report option is safe to use with data imports and external integrations, and allows you to manually merge duplicates after the fact.

# That's All, Folks

Rendezvous on the [Power of Us Hub](https://powerofus.force.com/PUBlogin) for all your duplicate related questions.


