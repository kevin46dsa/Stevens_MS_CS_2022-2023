const camelCase = function camelCase(string) {
	// Refrence https://thewebdev.info/2021/04/17/how-to-convert-any-string-into-camel-case-with-javascript/
	stringexists(string);

	stringtype(string);
	stringLen(string);

	let input = string.trim();
	return input
		.replace(/(?:^\w|\[A-Z\]|\b\w)/g, (word, index) => {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, '');
};

const replaceChar = function replaceChar(string) {
	stringexists(string);

	stringtype(string);
	stringLen(string);

	let input = string.trim();
	let inputsplit = input.split('');
	let len = inputsplit.length;
	let char1 = inputsplit[0];
	let bufferstr = [inputsplit[0]];
	let count = 0;

	for (let i = 1; i < len; i++) {
		if (
			inputsplit[i] == char1.toUpperCase() ||
			inputsplit[i] == char1.toLowerCase()
		) {
			let x = replace(count);
			bufferstr.push(x);
			count++;
		} else bufferstr.push(inputsplit[i]);
	}
	let final = bufferstr.join('');
	return final;
};

const mashUp = function mashUp(string1, string2) {
	stringexists(string1);
	stringexists(string2);

	stringtype(string1);
	stringtype(string2);
	strinmashlen(string1);
	strinmashlen(string2);

	input1 = string1.trim();
	input2 = string2.trim();

	const char1 = input1[0];
	const char2 = input2[0];
	const replaced1 = input1.replace(char1, char2);
	const replaced2 = input2.replace(char2, char1);
	const char3 = replaced1[1];
	const char4 = replaced2[1];
	const replaced3 = replaced1.replace(char3, char4);
	const replaced4 = replaced2.replace(char4, char3);

	finalstring = replaced3 + ' ' + replaced4;

	return finalstring;
};

function stringexists(string) {
	if (string === undefined || string === null) throw 'Input is undefined';
	else return true;
}

function stringtype(string) {
	if (!(typeof string === 'string' || string instanceof String))
		throw 'input is not string datatype';
}

function stringLen(string) {
	let trim = string.trim();
	if (trim.length <= 0) throw 'There is no char in the string';
}

function strinmashlen(string) {
	let trim = string.trim();
	if (trim.length <= 1) throw 'string needs at least 2 char';
}

function replace(count) {
	if (count % 2 == 0) return '*';
	else return '$';
}

module.exports = {
	//Insert function names
	camelCase,
	replaceChar,
	mashUp,
};
