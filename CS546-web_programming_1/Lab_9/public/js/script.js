(function() {

function isPrime(num) {
  if (num === 0){
    return false;
  }
  else if (num===1)
  {
    return false;
  }
  else if(num === 2)
  {
    return true;
  }else
  {
    for(var x = 2; x < num; x++)
    {
      if(num % x === 0)
      {
        return false;
      }
    }
    return true;  
  }
  }

  function isValid(num){
    if(!num) throw "Please enter a number"
    if(num.trim().length === 0) throw "you need to enter a valid input";
    let numSplit = num.split('');
    if(numSplit[0] === "-") throw `${num} Should be a Positive Number `
  }

  const primeForm = document.getElementById("prime-form");
  

    if (primeForm) {
      const primeNumberElement = document.getElementById("Primenumber");
      
      const errorContainer = document.getElementById("error-container");
      
  
      const resultContainer = document.getElementById("result-container");
      
  
      
      primeForm.addEventListener("submit", event => {
        event.preventDefault();
  
        try {

          
          // hide containers by default
          errorContainer.hidden = true
          
          resultContainer.hidden = true
          
  
          // Values come from inputs as strings, no matter what :(
          const primeNumberValue = primeNumberElement.value;
          
          isValid(primeNumberValue);

          const parsedprimeNumberValue = parseInt(primeNumberValue);
      
          const result = isPrime(parsedprimeNumberValue);

          resultContainer.textContent = result.toString().toUpperCase();
          resultContainer.hidden = false;
          

          var li = document.createElement("li");
          li.setAttribute("class", result ? "is-prime" : "not-prime");
		      li.appendChild(document.createTextNode(result ? `${primeNumberValue} is a Prime Number` : `${primeNumberValue} is NOT a Prime Number`));
		    
		      var attempts = document.getElementById("attempts");
		      attempts.appendChild(li);
          
       
        } catch (e) {
          const message = typeof e === "string" ? e : e.message;  //used code from Code Base
          errorContainer.textContent = e;
          errorContainer.hidden = false;
          
        }
      });
    }
}) ();


// to do
//Hidded of result and error
//css
//validate html

//read thru spec again 
//attention to detail

// ask doubt when i click enter the text still stays on the text box but its considred as a entry
 