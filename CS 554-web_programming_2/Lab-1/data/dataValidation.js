const { ObjectId } = require('mongodb');

function checkUsername(string){
        if(!string) throw "No Username";
    
        if(typeof string != "string") throw "Username must be a string";
        
        string = string.trim();
        if(string.length === 0) throw "Cannot have empty a Username";
    
        if(string.split(" ").length > 1) throw "Username cannot have spaces inside";
        
        var letterNumber = /^[0-9a-zA-Z]+$/; // Used Refrence : https://www.w3resource.com/javascript/form/letters-numbers-field.php
        let result = string.match(letterNumber);
        if(!(result == string && typeof result === "object")) throw "Username should be AlphaNumeric"
    
        if(!(string.split("").length >= 4)) throw "Username should have atleast 4 characters";
    
        return string;
    
    }

   function checkName(string){
        if(!string) throw "No name";
    
        if(typeof string != "string") throw "name must be a string";
        
        string = string.trim();
        if(string.length === 0) throw "Cannot have empty a name";
        
        // fix RegEx to check only alphabets and space

        var letterNumber = /^[a-zA-Z ]+$/; // Used Refrence : https://www.w3resource.com/javascript/form/letters-numbers-field.php
        let result = string.match(letterNumber);
        if(!(result == string && typeof result === "object")) throw "name should be only alphabets or have a space in between"
        return string;
    }
    
  function checkPassword(password){  // check if we have to trim
        if(!password) throw " Please enter a password";
    
        if(typeof password != "string") throw "Password must be a string";
        
        password = password.trim();
        if(password.length === 0) throw "Cannot have empty Password";
    
        if(password.split(" ").length > 1) throw "Password has Spaces inside";
        
        var letterNumber = /^[0-9a-zA-Z!@#$%^&*(),.?":{}|<>]+$/; //not sure what all is considred as special char confirm once on slack
        let result = password.match(letterNumber);
        if(!(result == password && typeof result === "object")) throw "Password can include AlphaNumeric and have Special Chars"
    
        if(!(password.split("").length >= 6)) throw "Password should have atleast 6 characters";
    }

    function checkPageNum(pagenum){
        if(!pagenum) throw "Please enter pagenumber"
        
        //pagenum = pagenum.trim();
        if (pagenum.trim().length === 0)throw 'Input cannot be just spaces';
        pagenum = Number(pagenum) // Convert string to Int
        if(!pagenum)	throw "input Must Be a Number";
        if(!Number.isInteger(pagenum)) throw " page number Must Be an Integer"
        if (typeof pagenum !== "number") throw 'input must be a number';
        if(pagenum <= 0) throw " number cannot be lesser than or equal to 0"
        return pagenum
    }

    function checkPageNumRoute(number){
        if(!number) throw "Input must be provided"
    if (number.trim().length === 0)
            throw 'Input cannot be just spaces';
    number = Number(number) // Convert string to Int
	if(!number)	throw "input Must Be a Number";
    if(!Number.isInteger(number)) throw " input Must Be an Integer"
    if (typeof number !== "number") throw 'input must be a number';
    if(number <= 0) throw " number cannot be lesser than or equal to 0"
    }

    function checkID(id) {
        if (!id) throw `Error: You must provide a valid ID`;
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0)
            throw 'Id cannot be an empty string or just spaces';
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        return id;
    }

    function checkString(string) {
        if (typeof string !== 'string') throw 'input must be a string';
        if (string.trim().length === 0)
            throw 'Input cannot be an empty string or string with just spaces';
        string = string.trim();
        return string;
    }
  
    module.exports = {
        checkName,
        checkPageNum,
        checkPassword,
        checkUsername,
        checkID,
        checkString,
        checkPageNumRoute
    };