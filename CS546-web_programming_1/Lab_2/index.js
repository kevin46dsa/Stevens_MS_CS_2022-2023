const array = require('./arrayUtils');
const string = require('./stringUtils');
const object = require('./objUtils');
//mean


try {
	// Should Pass
	const meanOne = array.mean([2, 3, 4]);
	console.log(' passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = array.mean(1234);
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}
//medianSquared
try {
	// Should Pass
	const meanOne = array.medianSquared([4, 1, 2]);
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = array.medianSquared();
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}
//maxElement
try {
	// Should Pass
	const meanOne = array.maxElement([5, 6, 7]);
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = array.maxElement();
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}

//fill
try {
	// Should Pass
	const meanOne = array.fill(5, 'airplane');
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = array.fill(-4);
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}

//countRepeating
try {
	// Should Pass
	const meanOne = array.countRepeating([
		7,
		'7',
		13,
		true,
		true,
		true,
		'Hello',
		'Hello',
		'hello',
	]);
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = array.countRepeating({ a: 1, b: 2, c: 'Patrick' });
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}
//is Equal not done giving error
try {
	// Should Pass
	const meanOne = array.isEqual([1, 2, 3], [3, 1, 2]);
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = array.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]]);
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}

//camelCase

try {
	// Should Pass
	const meanOne = string.camelCase('How now brown cow');
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = string.camelCase(['Hello', 'World']);
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}
//replace char
try {
	// Should Pass
	const meanOne = string.replaceChar('Hello, How are you? I hope you are well');
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = string.replaceChar(123);
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}
//MashUp
try {
	// Should Pass
	const meanOne = string.mashUp('hello', 'world');
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = string.mashUp('h', 'e');
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}
//makeArrays
try {
	// Should Pass
	const meanOne = object.makeArrays([
		{ a: 3, b: 7, c: 5 }, { x: 2, y: 3}
	]);
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = object.makeArrays([]);
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}
//isDeepEqual 

try {
	// Should Pass
	const meanOne = object.isDeepEqual(
		{ a: { sA: 'Hello', sB: 'There', sC: 'Class' }, b: 7, c: true, d: 'Test' },
		{ c: true, b: 7, d: 'Test', a: { sB: 'There', sC: 'Class', sA: 'Hello' } }
	);
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = object.isDeepEqual('foo', 'bar');
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}

//computeObject

try {
	// Should Pass
	const meanOne = object.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
	console.log('passed successfully');
} catch (e) {
	console.error('failed test case');
}
try {
	// Should Fail
	const meanTwo = object.computeObject('test', n => n * 2);
	console.error('Did not make error');
} catch (e) {
	console.log('failed successfully');
}
