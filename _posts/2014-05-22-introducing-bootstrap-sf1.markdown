---
layout:   post
title:    "Introducing Bootstrap SF1"
author:   Ryan Foster
date:     2014-05-22 12:00:00
excerpt:  "We have lots of projects and a small team. We love Bootstrap because it allows our entire team to easily and rapidly prototype and build responsive UI. We also love the SFDC styleguide for Salesforce1 apps for its great look and feel. Wouldn't it be awesome if the two were merged? Well, that's the goal of Bootstrap SF1: to blend Bootstrap easy with Salesforce1 awesome."
---
*UDPATE 8/6/2014*: There has been some discussion here, and with folks over at the company (we are not in fact the same organization), about this project and how it relates to the SFDC styleguide. After rereading this post I also realized that I should have made a few things more clear:

  * The SFDC Styleguide is excellent work.
  * The fine people who created the SFDC Styleguide have different requirements than I might, which explains many of their design decisions.
  * This project is *NOT* a replacement for the SFDC Styleguide, our goal is to make the process of keeping this in-sync with the styleguide fluid and automatic. But the truth will always be in the SFDC Styleguide.

I have also gone ahead and updated a little of the content in this post to better reflect the purpose and sentiment behind the project.

Have fun!

Ryan

*END UDPATE*

We have lots of projects and a small team. We love Bootstrap because it allows our entire team to easily and rapidly prototype and build responsive UI. We also love the SFDC styleguide for Salesforce1 apps for its great look and feel. Wouldn't it be awesome if the two were merged? Well, that's the goal of [Bootstrap SF1](http://developer.salesforcefoundation.org/bootstrap-sf1/): to blend Bootstrap easy with Salesforce1 awesome.

Bootstrap SF1 is a theme for Bootstrap that aims for general consistency with the SFDC styleguide. Why? So that we can quickly build apps for Salesforce1. But we aren't trying to match the styleguide exactly because we have some more diverse needs (and have our own opinions). Our projects are diverse and may be deployed as Visualforce pages for use in Salesforce1 or in the standard UI for both mobile and desktop. We also deploy projects out on Heroku from time to time. We also need the base theme to be easy to extend and maintain and need it to be easier to wield than the styles in the styleguide.

With all of this in mind, I started the project with a few goals:

* Use [Less](http://lesscss.org) for CSS development. Less makes it easy to write extensible CSS, especially as Bootstrap is developed using Less.
* Make local theme development easy with [Grunt](http://gruntjs.com/). The theme documentation is easy to spin up locally, which makes testing and iteration easy and efficient.
* Provide new components to make the juicy bits of the styleguide, such as cards and icons, easy to wield.
* Never force anyone to use numeric class names for the custom icons . . . seriously.
* Automatically generate a namespaced CSS file so that the theme is easy to use even in Visualforce pages with the header enabled.

### Fair Warning

Oh, I should give a little warning, this project is pretty new to the world. We are using it in a few projects, but it is under active development and has a few rough edges. We're also planning to make it more complete and consistent with the styleguide. If you are reading this in the future, ignore this warning, I am sure everything is done . . . Okay, with that out of the way let's move along.

### The Goods

In the [theme](http://developer.salesforcefoundation.org/bootstrap-sf1/pages/theme.html) section of the docs you can see a big list of common Bootstrap elements with some Salesforce1 goodness. But the real fun happens on the [new icons](http://developer.salesforcefoundation.org/bootstrap-sf1/pages/icons.html) and especially in the [new components](http://developer.salesforcefoundation.org/bootstrap-sf1/pages/new.html) sections of the docs.

(Updated) You may be thinking to yourself, "Why not just include the SFDC styleguide CSS file in your project?" Well, we started there, and in many cases that would be a very reasonable approach, but for various reasons we wanted to use markup and styling conventions more inline with Bootstrap. Our team is more familiar with Bootstrap and the SFDC Styleguide presented its own learning curve. In addition, as we often deploy projects that will be rendered in Salesforce1 or Visualforce pages in the browser we need to make it as easy as possible to swap out different CSS. To mitigate some of the markup opinions of the SFDC Styleguide we have abstracted some of their styles into more Bootstrap-esque classes. Case in point, take this example from the Styleguide:

{% highlight html %}
<article class="mam bg-1 border border--3 brm">
  <header class="clear pam border-bottom border--5">
    <h1 class="fl man fw-normal f5 text-color-1">Contacts</h1>
    <a href="javascript:void(0)" title="More" class="fr">
      <span class="fl f5 text-color-1">More</span>
      <span class="lh-16 fl mls f6 text-color-3 icon-utility-right"></span>
    </a>
  </header>
  <ul class="man pan list-plain">
    <li class="pam border-bottom border--5">
      <div class="mbs flag flag--rev">
        <div class="flag--body">
          <span class="f3 text-color-1 fw-semibold">Jonathan Perilla-Jones</span>
        </div>
        <div class="flag--image prm">
                        <div class="icon icon--contact brs bgs-100 a-mid sq-30"></div>
        </div>
      </div>
      <ul class="list-plain man pan">
        <li class="f5 text-color-2">Director of Consumer Sales</li>
        <li class="f5 text-color-2">United Partners</li>
        <li class="f5 text-color-2">(415)432-5456</li>
      </ul>
    </li>
    <li class="pam border-bottom border--5">
      <div class="mbs flag flag--rev">
        <div class="flag--body">
          <span class="f3 text-color-1 fw-semibold">Jonathan Perilla-Jones</span>
        </div>
        <div class="flag--image prm">
                        <div class="icon icon--contact brs bgs-100 a-mid sq-30"></div>
        </div>
      </div>
      <ul class="list-plain man pan">
        <li class="f5 text-color-2">Director of Consumer Sales</li>
        <li class="f5 text-color-2">United Partners</li>
        <li class="f5 text-color-2">(415)432-5456</li>
      </ul>
    </li>
    <li class="pam">
      <div class="mbs flag flag--rev">
        <div class="flag--body">
          <span class="f3 text-color-1 fw-semibold">Jonathan Perilla-Jones</span>
        </div>
        <div class="flag--image prm">
                        <div class="icon icon--contact brs bgs-100 a-mid sq-30"></div>
        </div>
      </div>
      <ul class="list-plain man pan">
        <li class="f5 text-color-2">Director of Consumer Sales</li>
        <li class="f5 text-color-2">United Partners</li>
        <li class="f5 text-color-2">(415)432-5456</li>
      </ul>
    </li>
  </ul>
</article>
{% endhighlight %}

![SFDC Styleguide cards]({{ site.url }}/assets/sfdc-cards.png)

One thing I wanted to do was make the markup a little cleaner, less opinionated (so that it is easier to make CSS changes without changing markup), and more consistent with Bootstrap. As such you can create the same list in Bootstrap SF1 like so: 

{% highlight html %}
<div class="card-list context-contact">
  <div class="card-list-heading">
    <h3>Contacts</h3>
  </div>
  <div class="card">
    <div class="card-heading">
      Jonathan Perilla-Jones
    </div>
    <ul class="card-detail">
      <li>Director of Consumer Sales</li>
      <li>United Partners</li>
      <li>(415)432-5456</li>
    </ul>
  </div> <!-- end card -->
  <div class="card">
    <div class="card-heading">
      Jonathan Perilla-Jones
    </div>
    <ul class="card-detail">
      <li>Director of Consumer Sales</li>
      <li>United Partners</li>
      <li>(415)432-5456</li>
    </ul>
  </div> <!-- end card -->
  <div class="card">
    <div class="card-heading">
      Jonathan Perilla-Jones
    </div>
    <ul class="card-detail">
      <li>Director of Consumer Sales</li>
      <li>United Partners</li>
      <li>(415)432-5456</li>
    </ul>
  </div> <!-- end card -->
</div>
{% endhighlight %}

Now, the really fun part is at the top. See that class `context-contact`? That class applies the icons to each card in the list. Have a list of mixed cards? No problem, just move the class on the card directly and you guessed it, swap in `context-account` or `context-event`. If you have something custom you can use a custom icon like `context-c-heart`. (Refer to the [complete list of icons](http://developer.salesforcefoundation.org/bootstrap-sf1/pages/icons.html) for more examples.)

#### For example:

{% highlight html %}
<div class="card-list">
  <div class="card-list-heading">
    <h3>Related</h3>
  </div>
  <div class="card context-contact">
    <div class="card-heading">
      Jonathan Perilla-Jones
    </div>
    <ul class="card-detail">
      <li>Director of Consumer Sales</li>
      <li>United Partners</li>
      <li>(415)432-5456</li>
    </ul>
  </div> 
  <div class="card context-account">
    <div class="card-heading">
      ACME Publishing
    </div>
    <ul class="card-detail">
      <li>1337 Oat Street</li>
      <li>Gothem, GA 41234</li>
    </ul>
  </div>
  <div class="card context-c-heart">
    <div class="card-heading">
      Heart Donation
    </div>
    <ul class="card-detail">
      <li>3 hours old</li>
      <li>May 22, 2014</li>
    </ul>
  </div>
</div>
{% endhighlight %}

#### Renders like so:

![SFDC Styleguide cards]({{ site.url }}/assets/bootstrap-sf1-cards.png)

## Jump in!

I really hope you find this project to be of benefit as you build your own awesome apps for Salesforce1. Here at the Foundation we are really taking our own medicine and have made Bootstrap-SF1 our default starting point for our projects moving forward. Expect to see the project expand and grow over the next few months.

You can check out the [getting started](http://developer.salesforcefoundation.org/bootstrap-sf1/index.html#getting-started) guide if you want to jump right in and start using the theme.

### Contribute

We also welcome your help and collaboration with the theme. If you see something missing and aren't afraid of a little LESS, fork the [repo on github](https://github.com/SalesforceFoundation/bootstrap-sf1) and [spin up the local dev server](http://developer.salesforcefoundation.org/bootstrap-sf1/index.html#development).

You can also log any issues you find over on the [issue tracker on github](https://github.com/SalesforceFoundation/bootstrap-sf1/issues).
