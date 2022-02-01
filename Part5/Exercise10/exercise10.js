let heartfailurecsv = 'https://raw.githubusercontent.com/akmand/datasets/master/heart_failure.csv'; 
/* 
age,anaemia,creatinine_phosphokinase,diabetes,ejection_fraction,high_blood_pressure,platelets,serum_creatini
ne,serum_sodium,sex,smoking,time,DEATH_EVENT 
75,0,582,0,20,1,265000,1.9,130,1,0,4,1 
55,0,7861,0,38,0,263358.03,1.1,136,1,0,6,1 

65,0,146,0,20,0,162000,1.3,129,1,1,7,1 
50,1,111,0,20,0,210000,1.9,137,1,0,7,1 
*/ 

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
   
   //create array to hold the age ranges to be displayed
   let rangeArray = ["Age Range 1-30: ", "Age Range 31-40: ", " Age Range 41-60: ", "Age Range 61-100: "];
   
   //as previous exercises create method chaining to display the data
   var p =  d3.select("body") 
        						//modified selectAll to  select all paragraphs
                   .selectAll("p")
                   .data(rangeArray)
                   //create new paragraphs
                   .enter()
                   //modified append to append paragraph elements
                   .append("p")
                   //add text from countArray and display it 
                   .text(function (d, i) { 
                        return d; 
                    })
                    //style inline block to allow the paragraph containing the age ranges and counts
                    //to be on the same line
                    .style("display", "inline-block");
                    
    var p = d3.select("body")
    								.selectAll("p")
                    .data(countArray)
                    .append("p")
                    .text(function (r, i) { 
                        return r; 
                    })
                    //style inline block to allow the paragraph containing the age ranges and counts
                    //to be on the same line
                    //change the colour of the text to red and then set the margin to 30px to create
                    //a gap between paragraphs
                    .style("display", "inline-block")
                    .style("color", "red")
                    .style("margin", "30px")
}); 