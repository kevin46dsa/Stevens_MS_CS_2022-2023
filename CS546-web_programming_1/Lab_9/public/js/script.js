(function() {

function isPrime(num) {

    if (num === 2) {
      return `${num} is a prime number`;
    } else if (num > 1) {
      for (var i = 2; i < num; i++) {
  
        if (num % i !== 0) {
          return `${num} is a prime number`;
        } else if (num === i * i) {
          return `${num} is NOT a prime number`;
        } else {
          return `${num} is NOT a prime number`;
        }
      }
    } else {
      return `${num} is NOT a prime number`;
    }
  
  }

  
  const primeForm = document.getElementById("prime-form");
  
    if (primeForm) {
      // We can store references to our elements; it's better to
      // store them once rather than re-query the DOM traversal each time
      // that the event runs.
      const primeNumberElement = document.getElementById("Primenumber");
      
  
      const errorContainer = document.getElementById("error-container");
      const errorTextElement = errorContainer.getElementsByClassName(
        "text-goes-here"
     )[0];
  
      const resultContainer = document.getElementById("result-container");
      const resultTextElement = resultContainer.getElementsByClassName(
        "text-goes-here"
      )[0];
  
      // We can take advantage of functional scoping; our event listener has access to its outer functional scope
      // This means that these variables are accessible in our callback
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
          li.setAttribute("id","attempts");
		      li.appendChild(document.createTextNode(`${result}`));
		    
		      var attempts = document.getElementById("attempts");
		      attempts.appendChild(li);
          
          resultTextElement.textContent = result;
          resultContainer.classList.remove("hidden");
        } catch (e) {
          const message = typeof e === "string" ? e : e.message;
          errorTextElement.textContent = e;
          errorContainer.classList.remove("hidden");
        }
      });
    }
}) ();



// to do

//Hidded of result and error
//set class for result ie for prime and not prime
//css
//validate html
// check if it works without server
//watch sirs video again 
//read thru spec again 
//attention to detail


 