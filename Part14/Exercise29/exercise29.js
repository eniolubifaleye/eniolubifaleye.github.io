// Set Dimensions 
const xSize  = 600;   const ySize  = 600; 
const margin = 40; 
const xMax   = xSize - margin*2; 
const yMax   = ySize - margin*2; 
 
// Create Random Points 
const numPoints = 100; 
const data      = []; 
for (let i = 0; i < numPoints; i++)  {  data.push( {x: i/100, y: Math.sin( 6.2 * i/100 ) }  );   }
 
// Get the 'limits' of the data - the full extent (mins and max) 
// so the plotted data fits perfectly  
const xExtent = d3.extent( data, d=>{ return d.x } ); 
const yExtent = d3.extent( data, d=>{ return d.y } ); 

//define variable myColor1 which is a scaleLinear, wtih the domain being 0 to the max
//value in data array and then the range is white and blue
//the lower the value the closer the colour is to white
var myColor1 = d3.scaleLinear().domain(xExtent).range(["white", "blue"]);
 
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
svg.append("path") 
   .datum(data) 
   .attr("fill", "none") 
   .attr("stroke", "blue")
   .attr("stroke-width", 1.5) 
   .attr("d", d3.line() 
                .x(function(d) { return x(d.x)  }) 
                .y(function(d) { return y(d.y)  }) 
   );

//Added dots on the line based on its data points 
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
   .attr("r", 4)
   //changed the colour of thhe dots based on the d3 colour method and the data
   //x value
   .style("fill", function(d) { return myColor1(d.x)});