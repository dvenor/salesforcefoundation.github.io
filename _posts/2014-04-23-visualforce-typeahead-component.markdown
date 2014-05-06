---
layout: post
title:  "Visualforce Typeahead Component"
date:   2014-04-23 12:00:00
author: Evan Callahan
---
Here is something I hope will be helpful to you.

A few months back, I researched “typeahead” components&nbsp;- controls that let you search for data as you type -&nbsp;for use on Visualforce pages. When you want to provide a lookup to related data on a page, this can provide&nbsp;much better usability than the standard Salesforce lookup control.

[![typeahead-readme-image](http://groundwired.files.wordpress.com/2014/04/typeahead-readme-image.png?w=600&amp;h=314)](http://groundwired.files.wordpress.com/2014/04/typeahead-readme-image.png)

The most popular open-source typeahead components appear to be [jQueryUI’s autocomplete](http://jqueryui.com/autocomplete/) and [typeahead.js from Twitter](http://twitter.github.io/typeahead.js/). I found several helpful examples of the jQueryUI approach, but I wanted to try to the latest version of Twitter typeahead.js instead – primarily because I found it was easier to use with Javascript remoting to query the data rather than the Salesforce REST API. (Using the REST API consumes API calls, which are limited, while remoting does not.)

After I got typeahead.js working on my own page for an internal project, I thought it would be interesting to create a reusable Visualforce component. Introducing [visualforce-typeahead](https://github.com/SalesforceFoundation/visualforce-typeahead), an open-source project you can find and install on Github.

I designed the component with plenty of attributes so that you can customize its behavior, but as they all have default values it is extremely easy to get started with the component – just add it to your page and it works:

{% highlight html %}
<h3>Account Name:</h3>
<c:Typeahead object=”Account” />
{% endhighlight %}

I also created a 4-minute video to introduce the component:

<span class="embed-youtube" style="text-align:center; display: block;"><iframe class="youtube-player" type="text/html" src="http://www.youtube.com/embed/Cc87v39Z9tY?version=3&amp;rel=1&amp;fs=1&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent" frameborder="0" data-ratio="0.6318181818181818" data-width="440" data-height="278" style="display: block; margin: 0px; width: 440px; height: 278px;"></iframe></span>

You can install the component and resources into your own Salesforce account (or sandbox) using [this link](https://githubsfdeploy.herokuapp.com/?owner=SalesforceFoundation&amp;repo=visualforce-typeahead).

Please give it a try and leave your feedback, or fork [the project on Github](https://github.com/SalesforceFoundation/visualforce-typeahead). -ejc