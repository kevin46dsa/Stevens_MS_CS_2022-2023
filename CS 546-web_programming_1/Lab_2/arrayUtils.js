const mean = function mean(array) {
	let input = array;

	let check = inputchecking(input);
	let check2 = isnumber(input);
	if (check === false || check2 === false) {
		throw 'there is something wrong';
	} else {
		let len = input.length;
		let sum = 0;
		for (i = 0; i < len; i++) {
			sum += input[i]; // Adding all the elements to sum
		}

		let sumMean = sum / len;
		return sumMean;
	}
};

const medianSquared = function medianSquared(array) {
	let input = array;
	let check = inputchecking(input);
	let check2 = isnumber(input);
	if (check === false || check2 === false) {
		throw 'there is something wrong';
	} else {
		input.sort((a, b) => a - b); // https://www.w3schools.com/jsref/jsref_sort.asp
		let len = input.length;
		let med = 0;

		if (len % 2 == 0) {
			let midpoint = [input[len / 2], input[len / 2 - 1]];
			console.log(midpoint);
			med = mean(midpoint);
		} else {
			med = input[Math.round(len / 2) - 1]; //(len-1)/2//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
		}

		let medianSq = med * med;
		return medianSq;
	}
};

const maxElement = function maxElement(array) {
	let input = array;
	let check = inputchecking(input);
	let check2 = isnumber(input);
	if (check === false || check2 === false) {
		throw 'there is something wrong';
	} else {
		let len = input.length;
		// Initialize maximum element
		let maxarr = input[0];
		let index;

		for (let i = 1; i < len; i++) {
			if (input[i] > maxarr) {
				maxarr = input[i];
				index = i;
			}
		}

		const max = {};
		max[maxarr] = index;
		return max;
	}
};

const fill = function fill(end, value) {
	let input = end;
	let val = value;
	let check = fillCheck(input);
	if (check === false) {
		throw 'there is something wrong';
	} else {
		const array = [];

		if (!val) {
			for (i = 0; i < input; i++) {
				array[i] = i;
			}
		} else {
			for (i = 0; i < input; i++) {
				array[i] = val;
			}
		}
		return array;
	}
};

const countRepeating = function countRepeating(array) {
	let input = array;
	let check = inputchecking(input);
	if (check === false) {
		throw 'there is something wrong';
	} else {
		let len = input.length;
		const counts = {};
		if (len === 0) return counts;
		else {
			for (let i = 0; i < len; i++) {
				if (counts[input[i]]) {
					counts[input[i]] += 1;
				} else {
					counts[input[i]] = 1;
				}
			}

			for (let prop in counts) {
				if (counts[prop] <= 1) {
					delete counts[prop];
				}
			}
			return counts;
		}
	}
};

const isEqual = function isEqual(arrayOne, arrayTwo) {
	
	let check1 = inputchecking(arrayOne);
	let check2 = inputchecking(arrayTwo);
	if (check1 === false || check2 === false) {
		throw 'there is something wrong';
	} else {
		let input1 = arrayOne;
		let input2 = arrayTwo;
		let input1len = input1.length;
		let input2len = input2.length;

		if (input1len != input2len) return false;

		// Sort both arrays

		let input1sort = arraysort(input1);
		let input2sort = arraysort(input2);

		// Linearly compare elements
		for (let i = 0; i < input1len; i++)
			if (input1sort[i] != input2sort[i]) return false;

		// If all elements were same.

		return true;
	}
};

function inputchecking(array) {
	if (array === undefined || array === null) {
		throw 'Input is undefined';
	} else if (!Array.isArray(array)) {
		throw 'Input is not array datatype';
	} else {
		return true;
	}
}
function isnumber(array) {
	let len = array.length;
	if (len === 0) {
		throw 'The input is empty';
	} else {
		for (let i = 0; i < len; i++) {
			if (!(typeof array[i] === 'number'))
				throw `Array element ${array[i]} is not a number`;
		}
	}
}

function fillCheck(end) {
	if (end === undefined || end === null) throw 'Input is undefined';
	else if (!(typeof end === 'number')) throw 'Input is not a number';
	else if (end <= 0) throw 'Input is negative or 0';
}

function arraysort(array) {
	for (let i in array) {
		if (Array.isArray(i)) {
			arraysort(i);
		}
	}
}

module.exports = {
	//Insert function names
	mean,
	medianSquared,
	maxElement,
	fill,
	countRepeating,
	isEqual,
};
