(function() {

function isPrime(num) {

  if (num===1)
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

  const primeForm = document.getElementById("prime-form");
  

    if (primeForm) {
      const primeNumberElement = document.getElementById("Primenumber");
      
      const errorContainer = document.getElementById("error-container");
      const errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
  
      const resultContainer = document.getElementById("result-container");
      const resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];
  
      
      primeForm.addEventListener("submit", event => {
        event.preventDefault();
  
        try {
          // hide containers by default
          errorContainer.classList.add("hidden");
          resultContainer.classList.add("hidden");
  
          // Values come from inputs as strings, no matter what :(
          const primeNumberValue = primeNumberElement.value;
          if(primeNumberValue.trim().length === 0) throw "you need to enter a valid input";
          const parsedprimeNumberValue = parseInt(primeNumberValue);
      
          const result = isPrime(parsedprimeNumberValue);

          resultTextElement.textContent = result;
          resultContainer.classList.remove("hidden");

          var li = document.createElement("li");
          li.setAttribute("class", result ? "is-prime" : "not-prime");
		      li.appendChild(document.createTextNode(result ? `${primeNumberValue} is a Prime Number` : `${primeNumberValue} is NOT a Prime Number`));
		    
		      var attempts = document.getElementById("attempts");
		      attempts.appendChild(li);
          
          resultTextElement.textContent = result;
          resultContainer.classList.remove("hidden");
        } catch (e) {
          const message = typeof e === "string" ? e : e.message;  //used code from Code Base
          errorTextElement.textContent = e;
          errorContainer.classList.remove("hidden");
        }
      });
    }
}) ();



// to do
//input checking
//Hidded of result and error
//css
//validate html
//watch sirs video again 
//read thru spec again 
//attention to detail

// ask doubt when i click enter the text still stays on the text box but its considred as a entry
 