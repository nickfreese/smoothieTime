/*--smoothieTime.  Mix our script and content seemlessly into one delectable application. --*/
/*-- smoothieTime is a Javascript Framework for dynamic --*/

/*

Copyright (c) 2016 Nicholas Freese

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/


/*-------------------- utility functions --------------------*/

var setVendorPrefix = function(element, property, value) {
  element.style["webkit" + property] = value;
  element.style["Moz" + property] = value;
  element.style["ms" + property] = value;
  element.style["o" + property] = value;
}

//vendor event Listeners
var setVendorListener = function(element, property, value) {
  element.addEventListener('webkit'+property, value, false);
  element.addEventListener('Moz'+property, value, false);
  element.addEventListener('ms'+property, value, false);
  element.addEventListener('o'+property, value, false);
}



//if no loading screen exists, create it.
var theSuspenseIsKillingMe = function(){
if(smoothieSettings){   
if(smoothieSettings.loadingScreen == true){
if(document.getElementsByClassName('shielded')[0]){
}else{
var shield = document.createElement('DIV');
shield.className = "shielded";
shield.innerHTML = '<div class="smotthieLoadWrap"><div class="smoothieLoader"></div></div>';
document.getElementsByTagName('body')[0].appendChild(shield);
}
}
}
}

theSuspenseIsKillingMe();//initialize Loading screen

//turn the loading shield on or off with parameter
var toggleShield = function(shieldStatus){
if(smoothieSettings.loadingScreen == true){
if(shieldStatus == 0){
setTimeout(function(){
setVendorPrefix(document.getElementsByClassName('shielded')[0], 'Transform', 'translateX(-100%)');
}, 500);
}
else{
setVendorPrefix(document.getElementsByClassName('shielded')[0], 'Transform', 'translateX(0%)');
}
}
}


//initialize  global vars
var callbackCount = 0;//tracks number of successful smoothies.

//create custom event to fire when blend function finishes.  can be used for managing outerScript data and for setting custom loading screens
var blendFinished = new CustomEvent('blenddone', { 'detail': fruitList.outerScript });

//----------------makes ajax requests

//sendOrder = the data to send; responseType = datatype of response (JSON or JSONP); orchard = url; partial = won't show loadng screen if only updating some content.
var orchardVisit =  function(sendOrder, responseType, orchard, partial){
if(partial == 0){
toggleShield(1);
}
callbackStatus = true;//begin request

if(responseType !== "jsonp" || responseType !== "JSONP"){
responseType = "json";
}

//send ajax for
$.ajax({
  type: 'POST',
  url: orchard,
  dataType: responseType,
  data: sendOrder,
  success: function(response, err){
  blend(response);  //blend up the response into the document/script
  }
  
});

}

//-------------------------uses orchard response and fruitlist to populate dom.

var blend = function(response){

//----titleBased-----
for(var prop in fruitList.titleBased){
for(i=0;i<fruitList.titleBased[prop].length;i++){
    document.getElementById(fruitList.titleBased[prop][i]).innerHTML = response[prop];
	}
	
}

//---outerScript - set returned value to an object which is globally accessible.---
for(var prop in fruitList.outerScript){
    if(response[prop]){
    fruitList.outerScript[prop] = JSON.parse(response[prop]);
    }
	
}

//---signals that the response is ready to use---
callbackCount = callbackCount + 1;
document.dispatchEvent(blendFinished);
toggleShield(0);
}
