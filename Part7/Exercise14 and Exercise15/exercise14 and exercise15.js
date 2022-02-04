let heartfailurecsv = 'https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv';  

d3.csv(heartfailurecsv, function(data) { 

		//return the data loaded in by csv callback function
    return data;

// then() used to return a promise of csv callback function
// so that data can be loaded before any updates to data and variables, arrays are made 
}).then(function(d){
    
    //variables that hold the count for the relative age ranges for heart failure
		let countU30 = 0;
		let count3140 = 0;
		let count4160 = 0;
		let count61100 = 0;
    
    //arrays to hold all the ages and array to hold all the counters for when the 
    //calculation has been completed
    let ageArray = [];
		let countArray = [];
    
    //array to hold the range array of ages for the counts
    let rangeArray = ["Age Range 61-100", "Age Range 41-60", "Age Range 31-40", "Age Range 1-30"];
    
    //for lop to loop through the entire dataset and add all the ages to the ageArray
    for(var j = 0; j < d.length; j++){
    		ageArray.push(d[j].age);
    };
    
    //for loop to go through the ageArray 
    for (var i = 0; i < ageArray.length; i++){
    
    //various if statements for the different age ranges. if an age falls into an age
    //range, add one to the ages relative counter
   		if (ageArray[i] <= 30){
      	countU30++;
      }
      if (ageArray[i] >= 31 && ageArray[i] <= 40){
      	count3140++;
      }
      if (ageArray[i] >= 41 && ageArray[i] <= 60){
      	count4160++;
      }
      if (ageArray[i] >= 61 && ageArray[i] <= 100){
      	count61100++;
      }
   }
   
   //push the final counters into 
   countArray.push(countU30);
   countArray.push(count3140);
   countArray.push(count4160);
   countArray.push(count61100);
 
 
//changed the width and scale factor from width:200, scaleFactor:10 to width:500, scaleFactor:2
//this is to allow for the heartfailure csv to be correctly displayed
//var width = 200; 
//var scaleFactor = 10; 

var width = 450;
var scaleFactor = 2;
var barHeight   = 40; 
 
var graph = d3.select("body") 
      .append("svg") 
      .attr("width", width)
      .style("border", "2px solid black")
      //change the height of the svg container to allow for x axis
      .attr("height", barHeight * countArray.length + 80); 
 
var bar = graph.selectAll("g") 
      //.data(data)
      //changed the data to take in the heart failure count array
      .data(countArray)
      .enter() 
      .append("g") 
      .attr("transform", function(d, i) {
      //changed the starting position of the bar by translating the x position + 130 px
      //and y position + 20px
        return "translate(130," + ((i * barHeight) + 20) + ")"; 
      }); 
            
bar.append("rect") 
  .attr("width", function(d) { 
      return d * scaleFactor; 
  }) 
  .attr("height", barHeight - 1)
  .attr("fill", function(d, i){ 
  
  //set a threshold for the bars
  //base colour of bar is blue. if the number of heartfailures in each age range is above 100, 
  //change the colour of the bar to red
  	if (d > 100){
    	return "red";
    }else{
    	return "blue";
    }
  
  });
 
bar.append("text")
	//altered the text position to just past the bar so that all text values can be viewed properly
  .attr("x", function(d) { return (d*scaleFactor + 7); }) 
  .attr("y", barHeight / 2) 
  .attr("dy", ".35em") 
  .text(function(d) { return d; });
  

//appending the axis after bar has been appended
//domain is 0 to max of countArray
//range is 0 to max value in countArray * scaleFactor
var xscale = d3.scaleLinear() 
    .domain([0, d3.max(countArray)]) 
    .range([0, d3.max(countArray) * scaleFactor]);
    
//used scaleBand() to add textual axis text for each bar graph
//set the domain as rangeArray
var yscale = d3.scaleBand()
        .domain(rangeArray)
        //height of y axis changed to barHeight * data.length
        .range([ barHeight * countArray.length, 0]);

//add x and y axis scales to x and y axis with axisBottom and axisLeft        
var x_axis = d3.axisBottom() 
        .scale(xscale);
        
var y_axis = d3.axisLeft() 
        .scale(yscale);

//append the y axis to the svg with a translate of x = 130 and y = 20 
//to move the y axis more centre of the svg 
graph.append("g") 
       .attr("transform", "translate(130, 20)") 
       .call(y_axis);        

//xAxisTranslate var which was altered to + 100 instead of + 10 to move the xAxis down 100px
var xAxisTranslate = barHeight * countArray.length/2 + 100 ; 

//move xAxis along x axis 130px
graph.append("g") 
            .attr("transform", "translate(130, " + xAxisTranslate  +")") 
            .call(x_axis)
            
// add x and y axis labels 
//x label positioning
graph.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", (width / 2) + 130) 
    .attr("y", barHeight + 180)
    .text("Number of people with heart failure");          
 
//y label positioning
graph.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 8)
    .attr("x", -60)
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .text("Age Range (years)");

 });
 