function checkNumber(number){  
    if(!number) throw "Input must be provided"
    if (number.trim().length === 0)
            throw 'Input cannot be just spaces';
    number = Number(number) // Convert string to Int
	if(!number)	throw "Input Must Be a Number";
    if(!Number.isInteger(number)) throw " Input Must Be an Integer"
    if (typeof number !== "number") throw 'Input must be a number';
}

function checkString(string){
    if(!string) throw "Input must be provided"
        if (typeof string !== 'string') throw 'input must be a string';
        if (string.trim().length === 0)
            throw 'Input cannot be an empty string or string with just spaces';
        string = string.trim();
        return string;
}

function checkURL(string){
    if(!string) throw "Input must be provided"
        if (typeof string !== 'string') throw 'input must be a string';
        if (string.trim().length === 0)
            throw 'Input cannot be an empty string or string with just spaces';
        string = string.trim();
        if(!isValidUrl(string)) throw "Enter Valid URL"
        return string;
}

const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}


module.exports = {
    checkNumber,
    checkString,
    checkURL
}