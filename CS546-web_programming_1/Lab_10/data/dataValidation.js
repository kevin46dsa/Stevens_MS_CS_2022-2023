module.exports = {

checkUsername:function checkUsername(string){
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

},

checkPassword:function checkPassword(password){  // check if we have to trim
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
};