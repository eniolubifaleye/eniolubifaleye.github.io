// Set Dimensions 
const xSize  = 600;   const ySize  = 600; 
const margin = 40; 
const xMax   = xSize - margin*2; 
const yMax   = ySize - margin*2; 
 
// Create Random Points 
const numPoints = 100; 
const data      = []; 
for (let i = 0; i < numPoints; i++)  {  data.push( {x: i/100, y: Math.sin( 6.2 * i/100 ) }  );   }


//to add only a select few data points to dots
//create an array that would have the selected data points by pushing every 4th element into a new array and then use that array as the data for the text
const dataDots = [];

for (let i = 0; i < data.length; i++){
	dataDots.push(data[i]);
  i = i+4;
}

// create random points for Second Line
const dataCosine = []; 
for (let i = 0; i < numPoints; i++)  {  dataCosine.push( {x: i/100, y: Math.cos( 6.2 * i/100 ) }  );   }
 
// Get the 'limits' of the data - the full extent (mins and max) 
// so the plotted data fits perfectly  
const xExtent = d3.extent( data, d=>{ return d.x } ); 
const yExtent = d3.extent( data, d=>{ return d.y } );

const xExtentCos = d3.extent( dataCosine, d=>{ return d.x } ); 
const yExtentCos = d3.extent( dataCosine, d=>{ return d.y } );

 
// Append SVG Object to the Page 
const svg = d3.select("body") 
              .append("svg") 
              .attr('width',  xSize  ) 
              .attr('height', ySize  ) 
              .append("g") 
              .attr("transform","translate(" + margin + "," + margin + ")"); 
 
// X Axis 
const x = d3.scaleLinear() 
            .domain([ xExtent[0], xExtent[1] ]) 
            .range([0, xMax]); 
 
// bottom 
svg.append("g") 
   .attr("transform", "translate(0," + yMax + ")") 
   .call(d3.axisBottom(x)) 
   .attr('color', 'green'); // make bottom axis green 
 
// top 
svg.append("g") 
   .call(d3.axisTop(x)); 
 
// Y Axis 
const y = d3.scaleLinear() 
            .domain([ yExtent[0], yExtent[1] ]) 
            .range([ yMax, 0]); 
 
// left y axis 
svg.append("g") 
   .call(d3.axisLeft(y)); 
 
// right y axis 
svg.append("g") 
   .attr("transform", `translate(${yMax},0)`) 
   .call(d3.axisRight(y)); 
 
// Add the line 
var sine = svg.append("path") 
   .datum(data) 
   .attr("fill", "none") 
   .attr("stroke", "steelblue") 
   .attr("stroke-width", 1.5) 
   .attr("d", d3.line() 
                .x(function(d) { return x(d.x)  }) 
                .y(function(d) { return y(d.y)  }) 
   );
   
//https://stackoverflow.com/questions/12266967/d3-js-how-to-add-labels-to-scatter-points-on-graph
//variable dot which has the data of all the data points binded to g tag
//this will allow for the text to also be appended to the g tag
var dot = svg.selectAll("g")
                .data(data)
                .enter()
                .append("g");

//select all dots which are to be entered and appended as circles
//with each dot being binded to the data from data array
//the circles atrributes are then set below
dot.selectAll("dot") 
   .data(data)  
   .enter() 
   .append("circle") 
   .attr("cx", function (d) { return x(d.x) } ) 
   .attr("cy", function (d) { return y(d.y) } ) 
   .attr("r", 2) 
   .style("fill", "black");
   
//http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e
//used to format the x and y values from the data points
//.2n used to format the data points to 2 decimal places 
//bind the array of the reduced data points for the text
dot.data(dataDots)  
  .enter()
  .append("text")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y); })
  .text(function(d) {
  		return d3.format(".2n")((d.x)) + " , " + d3.format(".2n")((d.y))
      
    });

// Add the Cosine line and colour it red 
var cosine = svg.append("path") 
   .datum(dataCosine) 
   .attr("fill", "none") 
   .attr("stroke", "red") 
   .attr("stroke-width", 1.5) 
   .attr("d", d3.line() 
                .x(function(d) { return x(d.x)  }) 
                .y(function(d) { return y(d.y)  }) 
   ); 
     
//https://stackoverflow.com/questions/33881962/triangle-scatter-plot-with-d3-js
//http://using-d3js.com/05_10_symbols.html
//initialise a variable traingle to hold the symbol triangle
//initialise the size of the triangles to be 20 square pixels
var triangleSymbol = d3.symbol().type(d3.symbolTriangle).size(20);   
   
var triangle = svg.selectAll("dot")
           .data(dataCosine)
           .enter()
           .append("path")
           
           //The d attribute defines a path to be drawn. triangle to be drawn on the dataCosine path
           .attr("d", triangleSymbol)
           
           //transform attribute added with the fuction
           //that translates the triangle along the x and y axis - each data point, 
           //to position each triangle onto a data point.
           .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
           //set the colour of the triangles to red 
           .style("fill", "red")   