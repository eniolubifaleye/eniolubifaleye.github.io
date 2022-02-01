var data = [5, 10, 12, 6]; 
 
var width       = 200; 
var scaleFactor = 10; 
var barHeight   = 20; 
 
var graph = d3.select("body") 
      .append("svg") 
      .attr("width", width) 
      .attr("height", barHeight * data.length + 50)
      //added a black border to show the boundary of the svg
      .style("border", "2px solid black");
        
var bar = graph.selectAll("g") 
      .data(data) 
      .enter() 
      .append("g")
      //change the translate of the y axis to move the bars down 20px and left 40px
      .attr("transform", function(d, i) { 
        return "translate(40," + ((i * barHeight)+20)  + ")" 
      }); 
 
bar.append("rect") 
  .attr("width", function(d) { 
      return d * scaleFactor; 
  }) 
  .attr("height", barHeight - 1); 
 
bar.append("text") 
  .attr("x", function(d) { return (d); }) 
  .attr("y", barHeight / 2) 
  .attr("dy", ".35em") 
  .text(function(d) { return d; }); 

//appending the axis after bar has been appended
//domain is 0 to max of data which is 12
//range is 0 to width of 100 + 20 as 20 is added to compensate for translation of x axis
var xscale = d3.scaleLinear() 
    .domain([0, d3.max(data)]) 
    .range([0, width - 100 + 20]);

//used scaleBand() to add textual axis text for each bar graph
//set the domain as just A, B, C and D as barchart values are arbitrary
var yscale = d3.scaleBand()
        .domain(["A", "B", "C", "D"])
        //height changed to barHeight * data.length
        .range([ barHeight * data.length, 0]);
        
//add x and y axis scales to x and y axis with axisBottom and axisLeft        
var x_axis = d3.axisBottom() 
        .scale(xscale); 
 
var y_axis = d3.axisLeft() 
        .scale(yscale);

//append the y axis to the svg with a translate of x = 40 and y = 20 
//to move the y axis more centre of the svg 
graph.append("g") 
       .attr("transform", "translate(40, 20)") 
       .call(y_axis); 

//append x axis to svg using a translate on x and y axis, x being 20 and y being the
//xAxisTranslate var which was altered to + 60 instead of + 10 to move the xAxis down 60px
//height changed to barHeight * data.length
var xAxisTranslate = barHeight * data.length/2 + 60 ; 
 
graph.append("g") 
            .attr("transform", "translate(40, " + xAxisTranslate  +")") 
            .call(x_axis)