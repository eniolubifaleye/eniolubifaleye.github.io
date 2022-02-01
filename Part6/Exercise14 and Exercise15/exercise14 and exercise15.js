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
    
    let rangeArray = [
				{"Range":"Age Range 1-30"}, 
				{"Range":"Age Range 31-40"}, 
                  {"Range":"Age Range 41-60"},
                  {"Range":"Age Range 61-100"}
                  ];
    
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
 
 
//changed the width and scale factor from width:200, scaleFactor:10 to width:400, scaleFactor:2
//this is to allow for the heartfailure csv to be correctly displayed
//var width = 200; 
//var scaleFactor = 10; 

var width = 400;
var scaleFactor = 2;
//altered barHeight to 40 from 20
var barHeight   = 40; 
 
var graph = d3.select("body") 
      .append("svg") 
      .attr("width", width) 
      .attr("height", barHeight * countArray.length); 
      
 
var bar = graph.selectAll("g") 
      //.data(data)
      //changed the data to take in the heart failure count array
      .data(countArray)
      .enter() 
      .append("g") 
      .attr("transform", function(d, i) {
      //changed the starting position of the bar by translating the position + 20 px
        return "translate(10," + i * barHeight + ")"; 
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
  .attr("x", function(d) { return (d*scaleFactor); }) 
  .attr("y", barHeight / 2) 
  .attr("dy", ".35em") 
  .text(function(d) { return d; });
  
//print the ranges for the individual bars to the console  
for(var i = 0; i < rangeArray.length; i++){
		console.log(rangeArray[i].Range);
}

 });
 