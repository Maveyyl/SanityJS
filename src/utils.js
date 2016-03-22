
sanityjs.isBoolean = isBoolean;
sanityjs.isNumber = isNumber;
sanityjs.isString = isString;
sanityjs.isDate = isDate;
sanityjs.isRegExp = isRegExp;
sanityjs.isError = isError;
sanityjs.isArguments = isArguments;
sanityjs.isFunction = isFunction;
sanityjs.isUndefined = isUndefined;
sanityjs.isDefined = isDefined;
sanityjs.isArray = isArray;
sanityjs.isObject = isObject;
sanityjs.isObjectEmpty = isObjectEmpty;
sanityjs.isEqual = isEqual;

function isBoolean(obj) {  return obj === true || obj === false || toString.call(obj) === '[object Boolean]'; }
function isNumber(obj) {   return toString.call(obj) === '[object Number]'; }
function isString(obj) {    return toString.call(obj) === '[object String]'; }
function isDate(obj) {    return toString.call(obj) === '[object Date]'; }
function isRegExp(obj) {    return toString.call(obj) === '[object RegExp]'; }
function isError(obj) {    return toString.call(obj) === '[object Error]'; }
function isArguments(obj) {    return toString.call(obj) === '[object Arguments]'; }
function isFunction(obj) {    return toString.call(obj) === '[object Function]'; }
function isUndefined(obj) {    return obj === void 0; }
function isDefined(obj) { return !isUndefined(obj); }
function isArray(obj) {    return Array.isArray(obj); }
function isObject(obj) {    return typeof obj === 'object' && !isArray(obj) && !!obj; }
function isObjectEmpty(obj) {    return Object.keys(obj).length === 0; }



// Function lamely stolen from underscore js
// http://underscorejs.org/
function isEqual(a, b, aStack, bStack) {
	// Identical objects are equal. `0 === -0`, but they aren't identical.
	// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	if (a === b) return a !== 0 || 1 / a === 1 / b;
	// A strict comparison is necessary because `null == undefined`.
	if (a === null || b === null) return a === b;

	// Compare `[[Class]]` names.
	var className = toString.call(a);
	if (className !== toString.call(b)) return false;
	switch (className) {
		// Strings, numbers, regular expressions, dates, and booleans are compared by value.
		case '[object RegExp]':
			// RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
		case '[object String]':
			// Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
			// equivalent to `new String("5")`.
			return '' + a === '' + b;
		case '[object Number]':
			// `NaN`s are equivalent, but non-reflexive.
			// Object(NaN) is equivalent to NaN
			if (+a !== +a) return +b !== +b;
			// An `egal` comparison is performed for other numeric values.
			return +a === 0 ? 1 / +a === 1 / b : +a === +b;
		case '[object Date]':
		case '[object Boolean]':
			// Coerce dates and booleans to numeric primitive values. Dates are compared by their
			// millisecond representations. Note that invalid dates with millisecond representations
			// of `NaN` are not equivalent.
			return +a === +b;
	}

	var areArrays = className === '[object Array]';
	if (!areArrays) {
		if (typeof a != 'object' || typeof b != 'object') return false;

		// Objects with different constructors are not equivalent, but `Object`s or `Array`s
		// from different frames are.
		var aCtor = a.constructor,
			bCtor = b.constructor;
		if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
				_.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
			return false;
		}
	}
	// Assume equality for cyclic structures. The algorithm for detecting cyclic
	// structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	// Initializing stack of traversed objects.
	// It's done here since we only need them for objects and arrays comparison.
	aStack = aStack || [];
	bStack = bStack || [];
	var length = aStack.length;
	while (length--) {
		// Linear search. Performance is inversely proportional to the number of
		// unique nested structures.
		if (aStack[length] === a) return bStack[length] === b;
	}

	// Add the first object to the stack of traversed objects.
	aStack.push(a);
	bStack.push(b);

	// Recursively compare objects and arrays.
	if (areArrays) {
		// Compare array lengths to determine if a deep comparison is necessary.
		length = a.length;
		if (length !== b.length) return false;
		// Deep compare the contents, ignoring non-numeric properties.
		while (length--) {
			if (!isEqual(a[length], b[length], aStack, bStack)) return false;
		}
	} else {
		// Deep compare objects.
		var keys = _keys(a),
			key;
		length = keys.length;
		// Ensure that both objects contain the same number of properties before comparing deep equality.
		if (_keys(b).length !== length) return false;
		while (length--) {
			// Deep compare each member
			key = keys[length];
			if (!(_has(b, key) && isEqual(a[key], b[key], aStack, bStack))) return false;
		}
	}
	// Remove the first object from the stack of traversed objects.
	aStack.pop();
	bStack.pop();
	return true;
}
// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.
function _keys(obj){
	if (!isObject(obj)) return [];
	if (Object.keys) return Object.keys(obj);
	var keys = [];
	for (var key in obj) if (_has(obj, key)) keys.push(key);
	// Ahem, IE < 9.
	// if (hasEnumBug) collectNonEnumProps(obj, keys);
	return keys;
}
// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
function _has(obj, key) {
	return obj !== null && Object.prototype.hasOwnProperty.call(obj, key);
}