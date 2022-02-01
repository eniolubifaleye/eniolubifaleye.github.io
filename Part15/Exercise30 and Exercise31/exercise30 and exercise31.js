//edit the data to have 12 values
//var data = [3, 4, 8, 12]; 
var data = [3, 4, 8, 12, 16, 20 ,24, 30, 36, 42, 50, 58]; 
 
const xSize  = 400;   const ySize  = 400; 
const margin = 40; 
const xMax   = xSize - margin*2; 
const yMax   = ySize - margin*2; 
 
// Append SVG Object to the Page 
const svg = d3.select("body") 
              .append("svg") 
              .attr('width',  xSize  ) 
              .attr('height', ySize  ) 
              .append("g") 
              .attr("transform","translate(" + xSize/2 + "," + ySize/2 + ")"); 
 
const radius = Math.min(xSize, ySize) / 2; 

//edit to have 12 different colours 
//var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c', "yellow", "blue", "pink", "indigo", "black", "grey", "brown"]);
 
// Generate the pie 
var pie = d3.pie(); 
 
// Generate the arcs 
var arc = d3.arc() 
      .innerRadius(0) 
      .outerRadius(radius); 
 
//Generate groups 
var arcs = svg.selectAll("arc") 
      .data(pie(data)) 
      .enter() 
      .append("g") 
      .attr("class", "arc") 
 
//Draw arc paths 
arcs.append("path") 
  .attr("fill", function(d, i) { 
    return color(i); 
  })
  .attr("d", arc);
 
//https://stackoverflow.com/questions/23186497/having-trouble-adding-text-lables-to-pie-chart-using-d3-js 
//adding the text to the pie chart  
arcs.append("text")
	.attr("fill", "white")
  //adding a translate to position the text at the arcs centroid position
  //The arc.centroid() function is used to compute the midpoint of the centerline of the arc
  .attr("transform", function(d){ return "translate(" + arc.centroid(d) +")"; })
  
  //anchor the text to the middle of each arc
	.attr("text-anchor", "middle")
  //return the value of each arc
  .text(function(d) { return d.value; }); 

