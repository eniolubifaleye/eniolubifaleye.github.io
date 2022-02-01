var data = [5, 10, 12, 6]; 

//define variable myColor1 which is a scaleLinear, wtih the domain being 0 to the max
//value in data array and then the range is white and blue
//the lower the value the closer the colour is to white
var myColor1 = d3.scaleLinear().domain([0, d3.max(data)]).range(["white", "blue"]); 
 
var width       = 200; 
var scaleFactor = 10; 
var barHeight   = 20; 
 
var graph = d3.select("body") 
      .append("svg") 
      .attr("width", width) 
      .attr("height", barHeight * data.length + 50)
      .style("border", "2px solid black");
        
var bar = graph.selectAll("g") 
      .data(data) 
      .enter() 
      .append("g") 
      .attr("transform", function(d, i) { 
        return "translate(20," + i * barHeight  + ")" 
      }); 
 
bar.append("rect") 
  .attr("width", function(d) { 
      return d * scaleFactor; 
  })
  //fill the bar with the color associated with the value based on the variable 
  //myColor1 and the data 
  .attr("fill", function(d){return myColor1(d) })
  .attr("height", barHeight - 1); 
 
bar.append("text") 
  .attr("x", function(d) { return (d); }) 
  .attr("y", barHeight / 2) 
  .attr("dy", ".35em")
  //made the text white
  .style("fill", "white")
  .text(function(d) { return d; }); 

//appending the axis after bar has been appended
//domain is 0 to max of data which is 12
//range is 0 to width of 100 + 20 as 20 is added to compensate for translation of x axis
var xscale = d3.scaleLinear() 
    .domain([0, d3.max(data)]) 
    .range([0, width - 100 + 20]);
 

var yscale = d3.scaleBand()
        .domain(["A", "B", "C", "D"])
        //height changed to barHeight * data.length
        .range([ barHeight * data.length, 0]);
        
//add x and y axis scales to x and y axis with axisBottom and axisLeft        
var x_axis = d3.axisBottom() 
        .scale(xscale); 
 
var y_axis = d3.axisLeft() 
        .scale(yscale);

//append the y axis to the svg with a translate of x = 20 to allow for gap for y axis text
//if any. 
graph.append("g") 
       .attr("transform", "translate(20, 0)") 
       .call(y_axis); 

//append x axis to svg using a translate on x and y axis, x being 20 and y being the
//xAxisTranslate var which was altered to + 40 instead of + 10
//height changed to barHeight * data.length
var xAxisTranslate = barHeight * data.length/2 + 40 ; 
 
graph.append("g") 
            .attr("transform", "translate(20, " + xAxisTranslate  +")") 
            .call(x_axis)