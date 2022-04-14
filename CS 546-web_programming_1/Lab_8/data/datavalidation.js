 function checkString(string){
        if(!string) throw "Input must be provided"
        if (typeof string !== 'string') throw 'input must be a string';
        if (string.trim().length === 0)
            throw 'Input cannot be an empty string or string with just spaces';
        string = string.trim();
        return string;
}

function checkNumber(number){  //need to complete this
    if(!number) throw "Input must be provided"
    if (number.trim().length === 0)
            throw 'Input cannot be just spaces';
    number = Number(number) // Convert string to Int
	if(!number)	throw "ID Must Be a Number";
    if(!Number.isInteger(number)) throw " ID Must Be an Integer"
    if (typeof number !== "number") throw 'input must be a number';
}

module.exports = {
    checkString,
    checkNumber
}