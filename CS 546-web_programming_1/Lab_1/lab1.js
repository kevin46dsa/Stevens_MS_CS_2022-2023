
const questionOne = function questionOne(arr) {
    // Implement question 1 here
    //implemented so that the size of the input array can be of any size
    let input = arr;
    let len = input.length;
    // insert edge case control

    if(len < 1){
        let message = "No input";
        return message;   
    }
    else{

        const Sqr = input.map(x => x * x); // using map function to get the square of every element in the array
        //console.log(Sqr);

        let sumSqr = 0;
        for (i = 0; i < len; i++) {
            sumSqr += Sqr[i]; // Adding all the squared elements to sumSqr
        }
    return sumSqr;
    }    
} 




const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    input = num;
    
    
    //insert edge case control
    
    if(isNaN(input) || input === null || input === " "){ //refrence https://stackoverflow.com/questions/54027176/checking-input-type-in-js
        return NaN;
    }
    else if(input < 1 ){   
        return 0; // fibonacci of anything lesser than 1 is 0
    }
    else if(input === 1){
        return 1;  // fibonacci of 1 is 1
    }
    else
    {
        let counter1 = 0;
        let counter2 = 1;
        let fibValue = 1; // initial value of fibvalue is 1 as the fibvalue for index 1 is already returned in elseif 
        for(i=1;i<input;i++){

            fibValue = counter1 + counter2;
            counter1 = counter2;
            counter2 = fibValue;
        }
        return fibValue;
    }
    
}


const questionThree = function questionThree(text) {
    // Implement question 3 here
    let input = text;
    

    if (typeof input === 'string' || input instanceof String){  // Refrence https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
        let counter = 0;
        let lowcaseinput = input.toLowerCase();
         let vowels = ["a", "e", "i", "o", "u"];
         for (let allchar of lowcaseinput) {     // loop to match each char of the string with individual vowel
             if (vowels.includes(allchar)) {     // used refrence from https://www.javascripttutorial.net/es6/javascript-string-includes/
                    counter++;
                 }
         }
        return counter

    }
    else{
        return "Not a string";
    }
      
}


const questionFour = function questionFour(num) {
    // Implement question 4 here
let input = num;


// filter out test case;

if(isNaN(input) || input === null || input === " " || input < 0 ){ //refrence https://stackoverflow.com/questions/54027176/checking-input-type-in-js
    return NaN;
}
else{   
let factorial = 1;
for(i=1;i<=num;i++)
{
  counter1 = i                      
  factorial = counter1 * factorial;  // factorial(n) = n * (n - 1) * (n - 2) ... * 1

}

return factorial;

}
}



module.exports = {
    firstName: "KEVIN", 
    lastName: "DSA", 
    studentId: "20009000",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
}; 