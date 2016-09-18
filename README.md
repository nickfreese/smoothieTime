# Smoothie Time
JS Framework for Dynamic Content and Data

---------------------------------------

The goal of smoothieTime is to create a simple way for developers to sync up with their backends in a flexible manner utilizing jquery AJAX.

See the example.html file for example markup of smoothieTime integration.

---------------------------------------
***USAGE***
---------------------------------------

You build out the "Fruitlist" object which smoothieTime uses to appropriately parse and distribute your content/data.

Within Fruitlist you have two objects: 'titleBased' and 'outerScript'.

***titleBased*** is used for content.  Each property should have the same name as a property in your JSON response object.  Each titleBased property should be set to an array containing the id's for each dom element to place the value of the same property in your JSON response.  

***outerScript*** works just the same except instead of distributing content, it distributes JavaScript.  Just line up the property names to your backend object and smoothie time will JSON parse the value of each property and place it into the corresponding outerScript property.

Since smoothieTime is asynchronous so you can refresh content when needed, you can listen for the 'blenddone' event which will be triggered when smoothieTime has finished parsing your JSON response.

After all of the Fruitlist and settings markup (see: EXAMPLE OF FRUITLIST AND SETTINGS).  You can make a call to your server to grab your JSON using the 'orchardVisit' function.  Its parameters are as follows.

- sendOrder = The data to send
- responseType = Datatype of response (JSON or JSONP).  Defaults to JSON.
- orchard = url
- partial = If 0 smoothieTime shows the loading shield.  If 1 smoothieTime Won't show loadng screen.  This only applies if the loading screen is enabled.
```javascript
orchardVisit({sendOrder}, responseType, orchard, partial);
```

Example:
```javascript
orchardVisit({}, 'json', 'example.com/json.php', 0);
```

----------------------------------------
***LOADING SHIELD***
----------------------------------------

*REQUIRED!!! include the following above smoothieTime.js:


```javascript
var smoothieSettings = {
    loadingScreen: false
};
```


smoothieTime comes with a built in loading shield.  To use the shield, set the 'loadingScreen' property to 'true'.  The shield is completely CSS driven Its styles are included in  smoothieTimeCSS.  Feel free to edit to match your brand.

The function "toggleShield(1);" can be called to turn the loading screen on if it is enabled.  "toggleShield(0);" can be used to turn it off.  Turning the loading screen on first thing can help UX by keeping the user from seeing placeholder or pages without content.

*****CUSTOM LOADING WIDGETS*****

since if you would like to add either your own loading shield or create a loading shield that apply to individual content areas you can utilize the 'blenddone' event. Turn your shield off when your content is ready.

-----------------------------------------------------------
***EXAMPLE OF FRUITLIST AND SETTINGS***
-----------------------------------------------------------

```javascript
var smoothieSettings = {
    loadingScreen: true //loading screen set to true
};


//main the config object
var fruitList = {
// line up property names with dom elements
    titleBased: {
        apple:["page-title", "display-title-bottom"],//puts the value of apple in each element defined by ID in the array
        pear:["some-content"],
        banana:["some-content-again"],
        styles:["server-side-styles"]
	   },
// the outerScript object is for dynamically populating js to the document.  These scripts can be accessed by calling "fruitList.outerScript.myScriptName".  replacing myScriptName with the name of your script.
    outerScript: {
        yogurt:{}//parses JSON value of yogurt in response into value of fruitList.outerScript.yogurt
    }

}
```
--------------------------------------------
***HAVE FUN!***
--------------------------------------------

