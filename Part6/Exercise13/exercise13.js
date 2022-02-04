//load small csv file from github repository
let svgElements = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Exercise12File.csv";

function svgScene(){
    d3.csv(svgElements, function(data) { 

        //return the data loaded in by csv callback function
        return data;

    // then() used to return a promise of csv callback function
    // so that data can be loaded before any updates to data and variables, arrays are made 
    }).then(function(d){

        //Create SVG element 
        var svg = d3.select("body") 
                     .append("svg") 
                     .attr("width",  400) 
                     .attr("height", 260)

                     //adding border and background color of light blue 
                     .style("border", '2px solid black')
                     .style("background-color", "lightblue");

         //https://dataviz.shef.ac.uk/blog/26/08/2020/D3js-for-data-visualisation
         //adding rects from csv file using enter() method and binding the csv
         //data to the rectangles attributes

        //https://stackoverflow.com/questions/40902011/using-d3-nest-to-slice-csv-data
        //used a filter to filter the csv file to only contain rect data
        //this prevents all the data being used to create rect; didnt want to include
        //circle data
        var shapeFilter1 = d.filter(d=>d.Shape==="rect");

        var rectangles = svg.selectAll("rect")
            .data(shapeFilter1)
            .enter()
            .append("rect")
            
            //for the attributes, use an inline function to go through the binded data and
            //assign the corresponding data for each attribute e.g. "height" to its 
            //respective feild
            .attr("height", function(d,i) {  return d.Height; })
            .attr("width", function(d,i) {  return d.Width; })
            .attr("x", function(d,i) { return d.xPosition })
            .attr("y", function(d,i) { return d.yPosition })
            .attr("fill", function(d,i) { return d.Colour})

        //used a filter to filter the csv file to only contain circle data
        //this prevents all the data being used to create circles; didnt want to include
        //rect data
        var shapeFilter2 = d.filter(d=>d.Shape==="circle");

        //adding circles from csv file using enter() method and binding the csv
        //data to the circles attributes 
       var circle = svg.selectAll("circle")
                        .data(shapeFilter2)
                        .enter()
                        .append("circle")
                        .attr("r", function(d,i) {  return d.Radius; })
                        .attr("cx", function(d,i) { return d.xPosition })
                        .attr("cy", function(d,i) { return d.yPosition })
                        .attr("fill", function(d,i) { return d.Colour})

      
      //remove the circles attrributes from the filtered data set shapeFilter3
      let shapeFilter3 = shapeFilter2.pop();
  		
      //use d3. timeout function to create a delay for what happens inside the function
      //inside the function
      d3.timeout(function(){
      
      			//update the circles data file to be the new 'empty' data file
      			circle.data(shapeFilter2)
            	//call exit().remove() to enter exit status and remove the circle from the svg
              //it is removed since the updated data has no data so a circle cant be drawn
      				.exit()
              
              //transition in the exit() section to reduce opacity to 0 like the sun has set
              .transition() 
              .duration(3000)
              //transformed the position of the y so that sunset animation can be achieved
              .attr("transform", "translate(0,150)")
              .style("opacity", 0)
              .remove();
      
      //the delay was for 4000 ms which is 4 seconds 
			}, 2000);
     });
     
}     
svgScene();