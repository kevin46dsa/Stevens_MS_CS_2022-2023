const makeArrays = function makeArrays(objects) {
	//if(objects===undefined) throw "Input is undefined"
	//if(!Array.isArray(objects)) throw "Input is not array datatype"
	//if(objects.length===0) throw 'array is empty'
	inputchecking(objects)
	elementinarray(objects);
	let input = objects;

	let array = [];
	let converted = [];

	input.forEach((element) => {
		converted = Object.entries(element);
		let convertlen = converted.length;
		for (let i = 0; i < convertlen; i++) {
			array.push(converted[i]);
		}
	});

	return array;
};

const isDeepEqual = function isDeepEqual(obj1, obj2) {
	// refrence https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
	objtest(obj1);
	objtest(obj2);
	const input1 = Object.keys(obj1);
	const input2 = Object.keys(obj2);
	if (input1.length !== input2.length) {
		return false;
	}
	for (const key of input1) {
		const val1 = obj1[key];
		const val2 = obj2[key];
		const areObjects = isObject(val1) && isObject(val2);

		if (
			(areObjects && !isDeepEqual(val1, val2)) ||
			(!areObjects && val1 !== val2)
		) {
			return false;
		}
	}
	return true;
};

const computeObject = function computeObject(object, func) {
	if (object === undefined || object === null)
		throw 'object is null or undefined';
	else if (!(typeof object === 'object')) throw 'object is not object datatype';
	else if (func === undefined || func === null || !(typeof func === 'function'))
		throw 'Function is either undefined or not of the right datatype';

	let input = object;

	
	let operation = func;
	const newobj = input;

	for (var key in input) {
		if (input.hasOwnProperty(key)) {
			newobj[key] = operation(input[key]);
		}
	}

	return newobj;
};

function isObject(object) {
	return object != null && typeof object === 'object';
}

function objtest(object) {
	if (object === null && object === undefined && typeof object === 'object')
		throw 'input is either null or not object datatype';
}

function inputchecking(array) {
	if (array === undefined || array === null) throw 'Input is undefined';
	else if (!Array.isArray(array)) throw 'Input is not array datatype';
	else if (array.length <= 0) throw 'the array is empty';
	else return;
}

function elementinarray(array) {
	let count = 0;
	array.forEach((element) => {
		if (!(typeof element === 'object')) {
			throw 'element in the array is not a object';
		} else if (typeof element === 'object') {
			count++;
			for (var prop in element) {
				if (!(element.hasOwnProperty(prop)))
					throw 'the object inside the array is empty';
			}
		}
	});

	if (count < 2) throw 'the array needs at least 2 elements(Objects)';

	return;
}

module.exports = {
	//Insert function names
	makeArrays,
	isDeepEqual,
	computeObject,
};
