const width  = 500; 
const height = 500; 
 
const data   = [10, 15, 20, 25, 30]; 
// Note different valid ways of specifying color 
const colors = ['#ffffcc','red','rgb(0,255,0)','#31a354','#006837']; 
 
const svg = d3.select("body") 
            .append("svg") 
            .attr("width", width) 
            .attr("height", height); 
 
var g = svg.selectAll("g") 
            .data(data) 
            .enter() 
            .append("g") 
            .attr("transform", function(d, i) { 
                return "translate(0,0)"; 
            }) 
 
g.append("circle") 
  .attr("cx", function(d, i) { 
    return i*100 + 50; 
  }) 
  .attr("cy", function(d, i) { 
    return 100; 
  }) 
  .attr("r", function(d) { 
    return d*1.5; 
  }) 
  .attr("fill", function(d, i){ 
    return colors[i]; 
  }) 
 
g.append("text") 
 .attr("x", function(d, i) { 
    return i * 100 + 40; 
 }) 
 .attr("y", 105) 
 .attr("stroke", "teal") 
 .attr("font-size", "12px") 
 .attr("font-family", "sans-serif") 
 .text(function(d) { 
    return d; 
 });
 
 //adding squares from the same data
 //same g variable is used 
 //instead of appending circle as seen above, rect is appended instead
 //the rect's attributes are set just like in the circles 
 //with each element in the data Array getting multiplied by a set value to allow for good
 //display on the page, with the functions function(d,i)
 g.append("rect") 
  .attr("x", function(d, i) { 
    return i*100; 
  }) 
  .attr("y", function(d, i) { 
    return 250; 
  }) 
  .attr("width", function(d) { 
    return d*3; 
  })
  .attr("height", function(d) { 
    return d*3; 
  }) 
  .attr("fill", function(d, i){ 
    return colors[i]; 
  })
  
  //text is also appended like in code for circles but once again with data manipulation
  //using the function function(d,i) to alter each element in the data array
  //x and y of text is altered so that it visually looks like its in the centre of each square
  g.append("text") 
 .attr("x", function(d, i) { 
    return i * 100 + 10; 
 }) 
 .attr("y", function(d, i) { 
    return i * 5 + 270; 
 }) 
 .attr("stroke", "teal") 
 .attr("font-size", "12px") 
 .attr("font-family", "sans-serif") 
 .text(function(d) { 
    return d; 
 });

//update function to remove the svg elements
 function updateEnterRemove(){
 
 //create a new empty array to hold the updated data set based on the
 //old data set getting popped
 		let newArray = [];
    data.pop();
    
    
    //for loop to push contents of popped data array into newArray
    for (var i = 0; i < data.length; i++){
    		newArray.push(data[i]);
    }
   
   //console log to see new Array reduce
 		console.log(newArray)
   
   //update exit to remove the svg elements as the newArray is reducing
   d3.select("body")
   .selectAll("g")
   .data(newArray)
   .exit()
   .remove();
 }