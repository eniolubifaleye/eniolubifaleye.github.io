d3.selectAll(".test").style('color','blue'); 

let newspan = d3.select("body").append('span'); 
newspan.text('hello'); 
    
//create an array that holds the numerical values 1 to 10 
let count1 = ['1','2','3','4', '5', '6', '7', '8', '9', '10'];
    
//for loop looping through the length of count array
for (var i = 0; i <= count1.length; i++) {
    //append a new div to the body
    var newdiv = d3.select("body").append("div");
        
    //if the element indexed inside the count1 array is less than 7 set the colour
    //to red else set the colour to greenn
    if(count1[i] < 7){
    		newdiv.text(i).style("color", "red");
    }else{
    	newdiv.text(i).style("color", "green");
    }
};
//Exercise 4
//Use select to select the first element of the Divs created use .text to 
//create new text with the text "start" and use .style to change the colour to purple
var p = d3.select("div").text("Start").style("color", "purple");
    