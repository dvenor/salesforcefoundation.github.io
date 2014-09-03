---
layout:   post
title:    "Accessing Viewstate from Javascript"
author:   Carlos Ramirez Martinez-Eiroa
date:     2014-09-03 11:00:00
---
If you want to retrieve information from a controller using Javascript, there are multiple ways to do that. You can use the [Ajax Toolkit](https://www.salesforce.com/us/developer/docs/ajax/Content/sforce_api_ajax_introducing.htm) (which uses the SOAP API - no more than 200 records at a time), [Javascript Remoting](https://www.salesforce.com/us/developer/docs/pages/Content/pages_js_remoting.htm), or even the newer (in pilot at the time of this writing) [Javascript Remote Objects](https://www.salesforce.com/us/developer/docs/pages/Content/pages_remote_objects.htm). This [article](https://developer.salesforce.com/blogs/developer-relations/2013/03/using-javascript-with-force-com.html) has a good comparison of some of these technologies.

But what if you just want to access from Javascript data from the controller that is not going to change? For example, a list or a map that was created and populated in the controller constructor and that is going to stay immunable.

You would think that you can use Javascript Remoting to retrieve this data structure from Javascript. However, RemoteAction methods need to be static, thus they can only access static variables. And static variables are not part of the viewstate. They are not preserved in memory either, unlike static variables in Java Servlets. If you try to access a static variable from a static RemoteAction method you will get a null back because Apex controllers don't retain the state of the static variables.

You could think, well, I already created and populated the variable in the constructor, so if I don’t make it static (or transient) it should already be fully constructed and available in the viewstate. That is, it should already be in the client-side, and Javascript should be able to access it. Not completely.

Javascript can access variables in the viewstate (controller properties) using the same notation you would use inside VF elements, BUT only if they are primitives. Complex object types (such as lists or maps) are not directly translated into the equivalent Javascript types. They are basically stored as strings in the viewstate, and Javascript doesn’t have a way of knowing that it’s, for example, a list or a map. There is no information about the data type on the client side.

If you want to transform a complex object type from its viewstate representation into Javascript you have to manually do it yourself. Let’s say for example that the controller has a property that is a map named MyMap, and that this map is created and instantiated in the controller like this:

	public class MyController {

		public Map<String, String> MyMap { public get; set; }

		public MyController() {
			MyMap = new Map<String, String>();
			MyMap.put(‘key1’, ‘value1’);
	    	MyMap.put(‘key2’, ‘value2’);
			MyMap.put(‘key3’, ‘value3’);
    	}
	}

If you want to access this map from Javascript is not enough with trying to do something like this in Javascript:

	var MyJsMap = ‘{!MyMap}’;

If you do that your MyJsMap will be undefined, because Javacript wasn’t able to translate what is stored in the viewstate as MyMap into an actual Javascript map.

Instead, you have to do something like this:

	<script>
		var MyJsMap = {};
	</script>
	
	<apex:repeat value="{!MyMap}" var="key">
		<script>
			MyJsMap['{!key}'] = '{!MyMap[key]}';
		</script>
	</apex:repeat>

You can do exactly the same with a list, or with any other data structure. Now go and have fun passing data around!