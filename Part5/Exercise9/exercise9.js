let titaniccsv = 'https://raw.githubusercontent.com/dsindy/kaggle-titanic/master/data/test.csv'; 
/* 
PassengerId,Pclass,Name,Sex,Age,SibSp,Parch,Ticket,Fare,Cabin,Embarked 
892,3,"Kelly, Mr. James",male,34.5,0,0,330911,7.8292,,Q 
893,3,"Wilkes, Mrs. James (Ellen Needs)",female,47,1,0,363272,7,,S 
894,2,"Myles, Mr. Thomas Francis",male,62,0,0,240276,9.6875,,Q 
895,3,"Wirz, Mr. Albert",male,27,0,0,315154,8.6625,,S 
*/ 

// http://learnjsdata.com/read_data.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
// link to allow me to manipulate data after being parse in callback function

d3.csv(titaniccsv, function(data) { 
  
  //return the data loaded in by csv callback function
	return data;    

// then() used to return a promise of csv callback function
// so that data can be loaded before any updates to data and variables are made 
}).then(function(d){
    //variables to hold the counters for male and female
    let maleCount = 0;
    let femaleCount = 0;

    //variables to hold the counters for mr, mrs, miss and master
    let mrCount = 0;
    let mrsCount = 0;
    let missCount = 0;
    let masterCount = 0;
    
    //for loop to loop through the length of the data set from the csv file
    for (var i = 0; i < d.length; i++){
    
    		//if statements to go through each index of the data
        //using includes to check that the string in each relevant coloumn contains the specified
       	//string, if sos
        //increase the relevant counter by 1
    		if(d[i].Name.includes("Mr")){
        		mrCount++;
        }
        if(d[i].Name.includes("Mrs")){
        		mrsCount++;
        }
        if(d[i].Name.includes("Miss")){
        		missCount++;
        }
        if(d[i].Name.includes("Master")){
        		masterCount++;
        }
        if(d[i].Sex === "male"){
        		maleCount++;
        }
        if(d[i].Sex === "female"){
        		femaleCount++;
        }
    }
		
    //create an array countArray to hold the counts
    let countArray = [];
    
    //push the counts to an array called countArray
    countArray.push(mrCount);
    countArray.push(mrsCount);
    countArray.push(missCount);
    countArray.push(masterCount);
    countArray.push(maleCount);
    countArray.push(femaleCount);
    
    
    //create an array for the counter labels and then store the counter label for each relevant 
    //criteria to count
    let countLabelArray = ["Count of Mr: ", "Count of Mrs: ", "Count of Miss: ", "Count of Master: ", "Count of Male: ", "Count of Female: "];
    
   //as previous exercises create method chaining to display the data
   var p =  d3.select("body") 
        	     //modified selectAll to  select all paragraphs
               .selectAll("p")
               .data(countLabelArray)
               //create new paragraphs
               .enter()
               //modified append to append paragraph elements
               .append("p")
               //add text from countLabelArray and display it 
               .text(function (d, i) { 
                        return d; 
                 })
               //style inline block to allow the paragraph containing the count labels and the data
               //to be on the same line
               .style("display", "inline-block");
    
     var p = d3.select("body")
    						.selectAll("p")
                .data(countArray)
                .append("p")
                .text(function (r, i) { 
                     return r; 
                 })
                //style inline block to allow the paragraph containing the count labels and counts
                //to be on the same line
                //change the colour of the text to red and then set the margin to 30px to create
                //a gap between paragraphs
                .style("display", "inline-block")
                .style("color", "red")
                 .style("margin", "30px") 
    
    //print the result of the for loop and if statements 
    console.log("-------------------Results------------------");
    console.log("Count of Mr: " + mrCount);
    console.log("Count of Mrs: " + mrsCount);
    console.log("Count of Miss: " + missCount);
    console.log("Count of Master: " + masterCount);
    console.log("Count of Male: " + maleCount);
    console.log("Count of Female: " + femaleCount);
});