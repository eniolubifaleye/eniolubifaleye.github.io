//load small csv file from github repository
let svgElements = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Exercise12File.csv";

d3.csv(svgElements, function(data) { 

		//return the data loaded in by csv callback function
    return data;

// then() used to return a promise of csv callback function
// so that data can be loaded before any updates to data and variables, arrays are made 
}).then(function(d){
		
    //arrays created to hold respective data points for each svg element shape
    //in the scene
		let shapeArray = [];
    let heightArray = [];
    let radiusArray = [];
    let colourArray = [];
		let widthArray = [];
    let xPositionArray = [];
    let yPositionArray = [];
    
    //for loop to loop through data passed in to  store respective data points
    //for shapes into respective arrats
    //+ used infront of numerical datas to change them from string into integer
    //when parsed into the program.
    for(var i = 0; i < d.length; i++){
    		shapeArray.push(d[i].Shape);
        heightArray.push(+d[i].Height);
        widthArray.push(+d[i].Width);
        radiusArray.push(+d[i].Radius);
        colourArray.push(d[i].Colour);
        xPositionArray.push(+d[i].xPosition);
        yPositionArray.push(+d[i].yPosition);
    };
    
    //Create SVG element 
    var svg = d3.select("body") 
    						 .append("svg") 
    						 .attr("width",  400) 
    						 .attr("height", 260)
                 
                 //adding border and background color of light blue 
    						 .style("border", '2px solid black')
                 .style("background-color", "lightblue");
    
    //adding the blue rectangle in the midle of the svg area
     svg.append(shapeArray[0])
   		.attr("x", xPositionArray[0]) 
      .attr("y", yPositionArray[0]) 
      .attr("width", widthArray[0]) 
      .attr("height", heightArray[0]) 
      .attr("fill", colourArray[0]);
     
    //adding the green rectangle on the left hand side of the svg area 
    svg.append(shapeArray[1])
   		.attr("x", xPositionArray[1]) 
      .attr("y", yPositionArray[1]) 
      .attr("width", widthArray[1]) 
      .attr("height", heightArray[1]) 
      .attr("fill", colourArray[1]);
      
   
   //addigthe green rectangle on the right hand side of the svg area
   svg.append(shapeArray[2])
   		.attr("x", xPositionArray[2]) 
      .attr("y", yPositionArray[2]) 
      .attr("width", widthArray[2]) 
      .attr("height", heightArray[2]) 
      .attr("fill", colourArray[2]);
      
   svg.append(shapeArray[3])
   		.attr("cx", xPositionArray[3]) 
      .attr("cy", yPositionArray[3]) 
      .attr("r", radiusArray[3])
      .attr("fill", colourArray[3]);
 });