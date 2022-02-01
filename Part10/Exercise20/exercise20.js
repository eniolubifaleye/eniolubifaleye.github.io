const width  = 400; 
const height = 300; 
 
var data = [10, 15, 20, 25, 30]; 
var svg = d3.select("body") 
    .append("svg") 
    .attr("width", width) 
    .attr("height", height); 
 
var xscale = d3.scaleLinear() 
    //.domain([0, d3.max(data)]) 
    .range([0, width - 100]);
    
//top scale for top X - axis    
var xscale1 = d3.scaleLinear() 
    .domain([0, d3.max(data)]) 
    .range([0, width - 100]); 
 
var yscale = d3.scaleLinear() 
        .domain([0, d3.max(data)]) 
        .range([height/2, 0]);

//right scale for right Y - axis
var yscale1 = d3.scaleLinear() 
        .domain([0, d3.max(data)]) 
        .range([height/2, 0]); 
 
var x_axis = d3.axisBottom() 
        .scale(xscale); 
 
var y_axis = d3.axisLeft() 
        .scale(yscale);

//creating the right and top X and Y axis and adding thier relative scales 
var x_axis1 = d3.axisTop() 
        .scale(xscale1); 
 
var y_axis1 = d3.axisRight() 
        .scale(yscale1);
 		
    
    //altered translate Y value of left Y-axis to 30 so that all 4 axis can be shown on the
    //page
    svg.append("g") 
       .attr("transform", "translate(50, 30)") 
       .call(y_axis); 
   
   //appending the right Y-axis
   //altering the translate coords to 350 from y-axis left's 50 so that it is at the end
   //of x axis range
   //altered translate Y to 30 so that all 4 axis can be shown on the page
   //set the colour of the axis to blue
   svg.append("g")
   		.attr("transform", "translate(350, 30)") 
      .call(y_axis1)
      .style("color", "blue");
 
var xAxisTranslate = height/2 + 30; 
 
    svg.append("g") 
            .attr("transform", "translate(50, " + xAxisTranslate  +")") 
            .call(x_axis)
    
    //appending the top X-axis
    //altering the translate coords by removing the xAxisTranslate and setting the Y value
    //to 30. altered translate Y to 30 so that all 4 axis can be shown on the page
    //set the colour of the axis to blue
    svg.append("g") 
            .attr("transform", "translate(50, 30)") 
            .call(x_axis1)
            .style("color", "blue");