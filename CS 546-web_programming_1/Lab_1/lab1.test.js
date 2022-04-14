const lab1 = require("./lab1");

// Start of additional test cases for question 1

console.log(lab1.questionOne([1, 2, 3])); 
// should output 14

console.log(lab1.questionOne([20, -30, 10])); 

console.log(lab1.questionOne([4, 9, 23, 56]));

console.log(lab1.questionOne([1, 2123.56473]));

console.log(lab1.questionOne([100]));

console.log(lab1.questionOne(['a', 'b', 'c']));

console.log(lab1.questionOne([]));




// End of additional test cases for question 1




// Start of additional test cases for question 2

console.log(lab1.questionTwo(7)); 
// should output 13 
console.log(lab1.questionTwo(0));
console.log(lab1.questionTwo(1));
console.log(lab1.questionTwo(3));
console.log(lab1.questionTwo(4));
console.log(lab1.questionTwo('a'));
console.log(lab1.questionTwo());
console.log(lab1.questionTwo(' '));
console.log(lab1.questionTwo(-0.567));


// End of additional test cases for question 2



// Start of additional test cases for question 3

console.log(lab1.questionThree("Mr. and Mrs. Dursley, of number four, Privet Drive, were  proud  to  say  that  they  were  perfectly  normal,  thank you  very  much. They  were  the  last  people  youd  expect  to  be  involved in anything strange or mysterious, because they just didn't hold with such nonsense. \n Mr. Dursley was the director of a firm called Grunnings, which  made  drills.  He  was  a  big,  beefy  man  with  hardly  any  neck,  although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son  called  Dudley  and  in  their  opinion  there  was no finer boy anywhere.")); 
// should output 196
console.log(lab1.questionThree("@#^$&$%"));
console.log(lab1.questionThree("hello thsi sjbakjdiphhbddjkcdkvc;JFNSFJCHFQEWIB"));
console.log(lab1.questionThree(123));
console.log(lab1.questionThree("      HELLO        "));





// End of additional test cases for question 3


// Start of additional test cases for question 4

console.log(lab1.questionFour(10)); 
// should output 3628800 
console.log(lab1.questionFour(0));
console.log(lab1.questionFour(4));
console.log(lab1.questionFour(7));
console.log(lab1.questionFour(-10));
console.log(lab1.questionFour("a"));
console.log(lab1.questionFour("@"));
console.log(lab1.questionFour());

// End of additional test cases for question 4
