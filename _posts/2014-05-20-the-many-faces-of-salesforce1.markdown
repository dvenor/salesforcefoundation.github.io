---
layout:   post
title:    "The Many Faces of Salesforce1"
date:     2014-05-20 12:00:00
author:   Nick Bailey
excerpt:  "As the Salesforce1 platform grows, so do the number of ways that you can customize and build on the platform. One of those changes that we've been thinking about lately is the proliferation of places where you can customize the UI."
---
As the Salesforce1 platform grows, so do the number of ways that you can customize and build on the platform. One of those changes that we've been thinking about lately is the proliferation of places where you can customize the UI.

Not too long ago, you had roughly 3 key decisions to make about your UI when building features on the Salesforce platform.

* Standard Salesforce header, yes or no?
* Standard Salesforce styling, yes or no?
* Do you want the sidebar?

Basically, do you want your feature to exist within the standard Salesforce browser "tabbed" interface and do you want your page to look like the Salesforce UI or are you going your own route? Generally, it was pretty easy to figure out how you were going to proceed.

Oh, how that has changed!

No longer are Salesforce Developers relegated to Visualforce pages that exist as a tab or a standalone page. We can create UI from scratch in Tabs, Chatter Profiles, Chatter Actions, Canvas, Mobile Cards, etc. In addition to all of these new containers, each of these comes in standard Salesforce Aloha browser interface and mobile Salesforce1 flavors!

The phrase "With great power, comes great responsibility" comes to mind. These platform additions open up a whole new world of possibility, but they also mean that we need to change our approach to developing user experiences and custom UI on the Salesforce platform.

The explosion of consumer technology and mobile usage has resulted in greater demand for great user experiences in business applications. As [detailed in this post](http://www.nickhbailey.com/2014/04/17/user-experience-matters-in-business-applications-too/), I believe that we must meet that demand and deliver world-class experiences if we want to get the most out of enterprise applications.

While we certainly haven't figured it all out yet, there are a couple key considerations that the Foundation Business Applications team has been working through that I'd like to share.

###What are you doing?

It is important to start by understanding what you are trying to accomplish with the feature you are developing before digging into the actual development of it. Let's look at all the possibilities

* Visualforce Pages - Pages with no specific Salesforce context (i.e. - no header and standard styling) are best suited for full custom web app development in which no Salesforce navigation is required
* Visualforce Tabs - This container for Visualforce pages can be in Salesforce desktop or Salesforce1 mobile, well-suited for custom applications with many functions that exist within the Salesforce app context.
*View Overrides - A slightly different container for Visualforce pages that overrides the standard view of a record
* Chatter Profile Subtab Apps - These appear on User profiles in Chatter and can be created for viewing your profile or for viewing others' profiles. As you might imagine, these are well suited for functionality related to a specific User, like setting Community preferences or displaying a constituent's donation history.
* Actions/Publisher Actions - As the name implies, these are action-oriented. They have a smaller viewport for UI and are best suited for doing things, particularly helping users complete common actions quickly.
* Canvas - Canvas allows you to easily integrate existing applications from other platforms into Salesforce. These apps may or may not have both desktop and mobile interface built already, which is an important consideration.
* Mobile Cards - Mobile-specific interfaces that are displayed on database records in the Salesforce1 mobile interface. The size of the UI is pretty limited, but they are very handy for adding custom functionality to the standard mobile UI.

Understanding the strengths and weaknesses of each of these options is important when deciding if any or all of them apply to the application you are building. It may determine how you handle responsiveness and styling, as we'll discuss in the next sections. 

###Responsiveness

In addition to the reasons we already know responsive design is important (like varying device size, screen resolution, and orientation), there are a few Salesforce1-specific considerations that make it even more important. If you want the Visualforce pages that you develop to be used in more than one location, such as a Visualforce Tab AND on a Chatter Profile Subtab App, then the content must respond to the size of the container. Consider the following possible container widths for this requirement.

1. Visualforce tab on 27" Apple Monitor: 2560px
2. Visualforce tab on 15" MacbookPro: 1425px
3. Visualforce tab on 15" MacbookPro Retina: 1680px (scaled down from what the display is capable of, 2880px)
4. Subtab app in desktop browser: 750px (constrained by the Salesforce1 platform, not device size)
5. Visualforce tab or subtab app on iPhone: 640px
6. Visualforce tab or subtab app on iPad: 1536px OR 2048px depending on orientation

Eesh, that's a lot of ground to cover! As you can see, the size of UI containers can be constrained by either the user's device or by the Salesforce platform.

There are two approaches to this problem.

1. Use a responsive design to resize your interface to match the size of the container
2. Design completely separate mobile and desktop interfaces

We use a combination of both. It is hard to design apps that work well in both a desktop and mobile use case. It is sometimes easier from a development perspective to create 2 different pages, but it adds technical debt and requires you to make changes in multiple places. In either case, you will almost certainly be dealing with multiple device sizes and your applications should adjust accordingly.

Dynamic styling

In addition to traditional responsive design, we also need to think about dynamic styling. Most Force.com developers have plenty of experience designing pages that match the styling and markup of the browser-based Aloha interface. However, those styles aren't compatible with the new look and feel of the Salesforce1 mobile app and the markup is inappropriate for mobile.

Again, there are a couple approaches we can take.

1. Create two different Visualforce pages with the appropriate styling
2. Dynamically load the correct styles depending on the user’s context.

The former approach makes sense if you are creating two different pages for desktop and mobile anyway. However, if you are attempting to create pages that work in any user context, the latter approach is a better candidate.

At the Salesforce Foundation, we're taking the latter approach. We use our own custom Salesforce1-styled flavor of the Bootstrap UI framework because it makes creating mobile-first responsive designs dead simple. However, the Bootstrap styling as it stands doesn't fit quite right. So, we have created two flavors of css, one for browser-based context and one for the Salesforce1 context. This helps standardize our development patterns while also allowing us to create UI that looks contextually appropriate. We then dynamically load the appropriate style sheet depending on the context at run time.

We plan to share some of this work publicly as we think other Force.com teams would benefit from having an easy way to create Salesforce1 responsive designs. More on that soon...
