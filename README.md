# smoothieTime
JS Framework for Dynamic content and Data

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


//SmothieTime is a JS Framework for Dynamic web Applications.  The goal of smoothieTime is to create a simple way for developers to sync up with their backends in a flexible manner utilizing jquery AJAX.

also see the example.html file for example markup of smoothieTime integration.

------------------------------------------------------------------
------------------------------USAGE------------------------------
------------------------------------------------------------------

What smoothieTime Does:  You build out the "Fruitlist" Object which smoothieTime uses to apropriately parse and distribute your content/data.

Within Fruitlist you have two objects: 'titleBased' and 'outerScript'.  

titleBased is used for content.  Each property should have the same name as a property in your JSON response object.  Each titleBased property should be set to an array containing the id's for each dom element to place the value of the same property in your JSON response.  

outerScript works just the same except instead of distributing content, it distributes JavaScript.  Just line up the property names to your backend object and smoothie time will JSON parse the value of each property and place it into the corresponding outerScript property.

Since smoothieTime is asyncrounous to let you refresh content when needed, you can listen for the 'blenddone' event which will be triggered when smothieTime has finished parsing your JSON response.

------------------------------------------------------------------
---------------------------LOADING SHIELD-------------------
------------------------------------------------------------------

*REQUIRED!!! include the following above smoothieTime.js:

/*------------------------*/
,,,
var smoothieSettings = {
    loadingScreen: false
};
,,,
/*------------------------*/

smoothieTime comes with a built in loading shield.  To use the shield, set the 'loadingScreen' property to 'true'.  The shield is completely CSS driven Its styles are included in  smoothieTimeCSS.  Feel free to edit to match your brand.

The function "toggleShield(1);" can be called to turn the loading screen on if it is enabled.  "toggleShield(0);" can be used to turn it off.  Turning the loading screen on first thing can help UX by keeping the user from seeing placeholder or pages without content.

*****CUSTOM LOADING WIDGETS*****

since if you would like to add either your own loading shield or create a loading shield that apply to individual content areas you can utilize the 'blenddone' event. Turn your shield off when your content is ready.

------------------------------------------------------------------------------------------
------------------------EXAMPLE OF FRUITLIST AND SETTINGS------------------------------
------------------------------------------------------------------------------------------
,,,
var smoothieSettings = {
    loadingScreen: true
};


//main the config object
var fruitList = {
// line up property names with dom elements
    titleBased: {
        apple:["page-title", "display-title-bottom"],
        pear:["some-content"],
        banana:["some-content-again"],
        styles:["server-side-styles"]
	   },
// the outerScript object is for dynamically populating js to the document.  These scripts can be accessed by calling "fruitList.outerScript.myScriptName".  replacing myScriptName with the name of your script.
    outerScript: {
        yogurt:{}
    }

}
,,,
-------------------------------------------------------------------------------------------
--------------------------------HAVE FUN!--------------------------------------------------
-------------------------------------------------------------------------------------------

