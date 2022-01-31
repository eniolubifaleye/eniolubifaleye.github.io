var bodyElement = d3.select("body"); 
var div = bodyElement.append("div"); 
div.text("Hello World!"); 
 
// same as 
 
//Exercise 5 Chaining. Adding style() to change hello world to green on the same line 
d3.select("body").append("div").text("Hello World!").style("color", "green"); 