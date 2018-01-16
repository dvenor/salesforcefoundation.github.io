---
layout:   post
title:    "HEDA and TDTM 2017 Highlights"
date:     2018-01-15 12:00:00
author:   Xinnan Li
excerpt:  "The Higher Education Data Architecture (HEDA) has undergone some exciting changes to give developers more flexibility with HEDA integrations and custom development, including a new field to manage triggers, new enhancements on trigger filtering, and a Table-Driven Trigger Management (TDTM) API method"
---

# HEDA and TDTM 2017 Highlights


## Introduction


In 2017, the Higher Education Data Architecture (HEDA) has undergone some exciting changes to give developers more flexibility with HEDA integrations and custom development, including a new field to manage triggers, new enhancements on trigger filtering, and a Table-Driven Trigger Management (TDTM) API method.

In this article, we highlight two fields: User Managed and Owned by Namespace. These TDTM enhancements make it easier to maintain your Trigger Handler definitions---both for HEDA Trigger Handlers and for other packages or classes in your org.

## A Bit of Background on Trigger Management


If you're less familiar with Apex triggers and Table-Driven Trigger Management, here's a quick recap. Trigger Handler is a custom object in HEDA that lets you control the order in which classes fire for an object along with other configuration settings such as field filtering. So, for example, you can specify the order that classes on the Contact object fire when updating a Contact record. That order is controlled by records in a database table that you can easily reorder (hence the name *Table-Driven* Trigger Management). For more about the basics of TDTM, read [Table-Driven Trigger Management Overview](https://powerofus.force.com/articles/Resource/Table-Driven-Trigger-Management-TDTM-Overview).

## User Managed Field


### Use Cases

-   Admins want to disable a HEDA Trigger Handler
-   Admins want to alter the configuration of a HEDA Trigger Handler

Ease of customization has always been a part of the HEDA platform, and TDTM is no exception. You can customize HEDA Trigger Handlers to better serve your business purposes. For example, one of the Trigger Handlers might not be necessary in a given system configuration. No problem! Admins can simply deactivate the Trigger Handler, and it won't run. In addition, sometimes admins need to modify Trigger Handlers, such as reordering their sequence or adding custom filtering.

However, HEDA is released every two weeks and **each upgrade resets the default HEDA Trigger Handlers**. How do we prevent this and allow you to keep your customizations?

The User Managed checkbox field protects changes you've made to Trigger Handlers. Setting User Managed to true on a Trigger Handler allows you to keep your changes intact so they're not overwritten during a push upgrade. In other words, the User Managed field is the "guard" that tells HEDA, "I have changed---don't reset me!"

In HEDA 1.37, we introduced Owned by Namespace, another field that expands the functionality of User Managed.

## Owned by Namespace Field


### Use Cases

-   Developers want to create their own Trigger Handlers
-   ISVs want to use the TDTM framework and create Trigger Handlers in their packages

Owned by Namespace allows developers or admins to group together their Trigger Handlers logically. The namespace identifies the package or class that the Trigger Handler belongs to. Like in this example, the "my_namespace" value tells you that this Trigger Handler is part of your custom configuration, whether it's in a managed package, unmananaged package, or a custom class. The HEDA Trigger Handlers use "hed" in the Owned by Namespace field.

![Trigger Handler Owned by Namespace](/assets/images/trigger_handler_owned_by_namespace.png)

In many cases, HEDA is not the only package installed in an organization. ISVs often create their own Trigger Handlers in their packages using the TDTM framework. Owned by Namespace isolates other packages from HEDA for the purpose of default management. Even if you aren't packaging your custom Apex classes, we recommend specifying an Owned by Namespace value for all Trigger Handler objects that you have created, to easily distinguish your own Trigger Handlers from others.

Any Owned by Namespace value works as long as it has not been used by another managed package already. In your source control system, you can store your Trigger Handler definitions in a class. Then, pass your configuration into the HEDA TDTM Global API and HEDA performs the processing for you.

By the way, if a Trigger Handler object does not have an Owned by Namespace value, you can still protect the Trigger Handler object by enabling User Managed. (This behavior has not changed!)

For more on how to create custom Apex classes that use TDTM and Trigger Handlers, including a deployment example, read the [TDTM blog post by our own Carlos Martinez-Eiroa](http://developer.salesforce.org/#blog/post/2016/06/10/table-driven-trigger-management.html).

## Conclusion


We hope this post helps you understand recent enhancements to default Trigger Handler management. Please feel free to let us know if you need any help or have feedback on these changes. We would love to hear from you so that we can build a product that best serves the education community.

Did you know that you can even make your own contributions to the HEDA package? HEDA, like other Salesforce.org products, benefits from community-contributed features and bug fixes. You can create your own pull requests at the [HEDA Github repository](https://github.com/SalesforceFoundation/HEDAP). We're glad to assist you with merging your pull request, and would love to recognize you in the community for your work!