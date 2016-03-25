/*! sanityjs 2016-03-25 */
(function(){ 
	var sanityjs = {};

	var array_length_warning = 20;
	var recursion_count_warn = 20;
	var recursion_count_log = 3;

	
	sanityjs.isBoolean = isBoolean;
	sanityjs.isNumber = isNumber;
	sanityjs.isInteger = isInteger;
	sanityjs.isFloat = isFloat;
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
	function isNumber(obj) {   return toString.call(obj) === '[object Number]'; } // positive for NaN and Infinity
	function isInteger(obj) { return  isNumber(obj) && obj % 1 === 0; } // negative for NaN and Infinity
	function isFloat(obj) { return  isNumber(obj) && obj % 1 !== 0; } // negative for NaN and Infinity
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

	function error(message, options) {
		if( isUndefined(options) || !isObject(options) )
			options = {};
		options.throw_exception = isDefined(options.throw_exception) ? options.throw_exception : true; 
		options.verbose = isDefined(options.verbose) ? options.verbose : false; 
	
		if( options.throw_exception )
			throw new TypeError(message);
		else if ( options.verbose )
			console.error("[SanityJS Error]: " + message);
	
		// return false, only called if throw_exception at false
		return false;
	}
	
	function warn(message, options){
		if( isUndefined(options) || !isObject(options) )
			options = {};
		options.throw_exception = isDefined(options.throw_exception) ? options.throw_exception : true; 
		options.verbose = isDefined(options.verbose) ? options.verbose : false; 
	
		if( options.verbose )
			console.warn("[SanityJS Warning]: " + message);
	}
	
	function log(message, options){
		if( isUndefined(options) || !isObject(options) )
			options = {};
		options.throw_exception = isDefined(options.throw_exception) ? options.throw_exception : true; 
		options.verbose = isDefined(options.verbose) ? options.verbose : false; 
	
		if( options.verbose )
			console.log("[SanityJS Log]: " + message);
	}

	sanityjs.object_check = object_check;
	
	function object_check(obj, type, name, options, ctx, recursion_count ) {  
		// if no type or bad type given, return
		if( isUndefined(type) || (!isObject(type) && !isString(type)) )
			return error("Bad second parameter type. It's a mandatory argument, must be a string or an object", options);
	
		// if type is a string, set it as an object
		if ( isString(type) ) 
			type = {type:type};
	
		// if type is not explicitely the type "undefined" and obj is undefined, returns immediatly
		// not a mandatory line, but is clearer
		if (type.type !== "undefined" && isUndefined(obj) )
			return error("Parameter '" + name + "' is undefined.", options);
	
		// if object is a string, and type isn't a string or a stringnum, then obj is a JSON
		if( isString(obj) && type.type !=="string" && type.type !== "stringnum" ){
			try{
				obj = JSON.parse(obj);
			}catch(e){
				// if fails, then it's likely that a string is checked while expected to be something else
				// if JSON parse fails while actually trying to parse a JSON, then no error will be stated
				warn("JSON parse of " + name + " failed. If this object wasn't intended to be a JSON then ignore this warning.", options);
			}
		}
	
	
		// handling ctx creation and recursion count
		ctx = ctx || {};
		ctx.labels = ctx.labels || {};
		ctx.recursion_depth = ctx.recursion_depth || 0;
		ctx.recursion_count_warned = isDefined(ctx.recursion_count_warned) ? ctx.recursion_count_warned : false;
		recursion_count = isDefined(recursion_count)? recursion_count : -1;
		recursion_count++;
		if( recursion_count > recursion_count_warn && !ctx.recursion_count_warned ){
			warn( "Object depth reached " + recursion_count_warn + ". Behavior beyond this depth can't be guaranteed and checker might slow down." , options);
			ctx.recursion_count_warned = true;
		}
		if( recursion_count > ctx.recursion_depth )
			ctx.recursion_depth = recursion_count;
	
	
		// if type is an object, this means it contains more checking rules
		// type.type 			type of obj described as a string
	
		// type.equal 			what obj should be equal to
		// type.not_equal 		what obj shouldn't be equal to
		// type.not_empty 		obj shouldn't be empty
	
		// type.cb				function that will be called given obj as parameter
		// type.cb_message		string that will be displayed if cb call fails
		// type.label 			label that is used to store and remember this object during the recursion
	
		// type.length 			what should be obj's length if obj is an array or a string
		// type.full_check 		verify the type of all elements of obj if obj is an array, check only first element otherwise
	
		// type.structure 		the structure of obj if obj is an object
		// type.sub_type 		the type of the elements of obj if obj is an array
		type.not_empty = isDefined(type.not_empty) ? type.not_empty : false;
		type.full_check = isDefined(type.full_check) ? type.full_check : false;
		
	
	
		var r;
		var i;
		switch (type.type) {
			case "undefined":
				r = isUndefined(obj);
				break;
			case "boolean":
				r = isBoolean(obj);
				break;
			case "number":
				r = isNumber(obj);
				if( !r ) break;
	
				if ( isNaN(obj) )
					return error("Parameter " + name + " is NaN.", options);
				if ( !isFinite(obj) )
					return error("Parameter " + name + " is of type " + type.type + " but is Infinite.", options);
				break;
			case "integer":
				r = isInteger(obj);
				break;
			case "float":
				r = isFloat(obj);
				break;
			case "string":
				r = isString(obj);
				if( !r ) break;
	
				// if length given, test the length of the string
				if( isDefined(type.length) && obj.length !== type.length)
					return error("Parameter '" + name + "' of type " + type.type + " is of length " + obj.length + " but was expected to be of length " + type.length + ".", options);
				// test emptyness if asked
				if ( type.not_empty && obj.length === 0)
					return error("Parameter '" + name + "' of type " + type.type + " is expected not to be empty.", options);
				
				break;
			case "stringnum":
				r = (isString(obj) && parseFloat(obj)) || isNumber(obj);
				break;
			case "array":
				r = isArray(obj);
				if( !r ) break;
	
				// if length given, test the length of the array
				if (isDefined(type.length) && obj.length !== type.length)
					return error("Parameter '" + name + "' of type " + type.type + " is of length " + obj.length + " but was expected to be of length " + type.length + ".", options);
	
				if ( type.not_empty && obj.length === 0)
					return error("Parameter '" + name + "' of type " + type.type + " is expected not to be empty.", options);
	
				// if sub_type is not empty, this means the type of the first element will be checked
				if (obj.length > 0 && isDefined(type.sub_type)) {
					// if full_check is set, check all elements of array
					if ( type.full_check && type.full_check){
						if( obj.length > array_length_warning )
							warn("Full check requested on the array "+name+" of length superior to " + array_length_warning +". This can cause the checker to be slow.", options);
						for (i = 0; i < obj.length; i++){
							if (!object_check(obj[i], type.sub_type, name+"["+i+"]", options, ctx, recursion_count)) return false;
							// else check only the first one
						}
					}
					else
						if (!object_check(obj[0], type.sub_type, name+"[0]", options, ctx, recursion_count)) return false;
				}
	
				break;
			case "object":
				r = isObject(obj);
				if( !r ) break;
	
				// if structure is not empty, this means it must be checked through a structure
				if (isDefined(type.structure)){
					// objects are described with an array of objects containing informations and structures of the fields
					for (i = 0; i < type.structure.length; i++) {
						// for each field, check obj of the vield
						if (!object_check(obj[type.structure[i].name], type.structure[i].type, name + "." + type.structure[i].name, options, ctx, recursion_count)) return false;
					}
				}
	
				// test emptyness if asked
				if (type.not_empty && isObjectEmpty(obj))
					return error("Parameter '" + name + "' of type " + type.type + " is expected not to be empty.", options);
	
				break;
			case "function":
				r = isFunction(obj);
				break;
			case "error":
				r = isError(obj);
				break;
			case "date":
				r = isDate(obj);
				break;
			case "regexp":
				r = isRegExp(obj);
				break;
			default:
				return error("Type " + type.type + " cannot be checked, or checker has not implemented this type.", options);
		}
	
		if (!r)
			return error("Parameter '" + name + "' is not of the type " + type.type + ".", options);
	
		// // test equality if asked
		// if (isDefined(type.equal) && !isEqual(obj, type.equal))
		// 	return error("Parameter '" + name + "' of value " + obj + " is not equal to " + type.equal + ".", options);
	
		// test equality if asked
		if (isDefined(type.equal) && isArray(type.equal) && type.equal.length !== 0) {
			var equal = false;
			for (i = 0; i < type.equal.length; i++) {
				if ( isEqual(obj, type.equal[i]) )
					equal = true;
			}
			if( !equal )
				return error("Parameter '" + name + "' of value " + obj + " should be equal to one of these values: " + type.equal + ".", options);
		}
	
		// test inequality if asked
		if (isDefined(type.not_equal) && isArray(type.not_equal) && type.not_equal.length !== 0) {
			for (i = 0; i < type.not_equal.length; i++) {
				if ( isEqual(obj, type.not_equal[i]) )
					return error("Parameter '" + name + "' is equal to " + type.not_equal[i] + ", it should not.", options);
			}
		}
	
		// call cb on obj
		if( isDefined(type.cb) && isFunction(type.cb) ){
			r = type.cb(obj, type, name, ctx.labels);
			if( !r ){
				if( isDefined(type.cb_message) )
					return error("Parameter '" + name + "' " + type.cb_message, options);
				else
					return error("Parameter '" + name + "' failed passing the callback.", options);
			}
		}
	
		// handling labels
		if( isDefined(type.label) && isString(type.label) )
			ctx.labels[type.label] = obj;
	
		// logging success for first object
		if( recursion_count === 0 && ctx.recursion_depth >= recursion_count_log )
			log("Object " + name + " has been successfuly checked with " + ctx.recursion_depth + " recursion depth.", options );
	
		return true;
	}

	sanityjs.arguments_check = arguments_check;
	
	function arguments_check(argument_types, options) {
	
		// if no argument_types or bad argument_types given, returns
		if( isUndefined(argument_types) || (!isArray(argument_types)) )
			return error("Bad fist parameter type. It's a mandatory argument, must be an array of types.", options);
	
		// get caller's arguments
		caller_arguments = Array.prototype.slice.call(arguments.callee.caller.arguments);
		// get caller's arguments name
		caller_arguments_names = arguments.callee.caller.toString()
			.replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg,'')
			.match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
			.split(/,/);
	
		// if given argument types is higher than actual arguments, return error
		// equal or lower argument types is accepted
		if (argument_types.length > caller_arguments.length)
			return error("Function called with " + caller_arguments.length + " arguments, was expecting " + argument_types.length + ".", options);
	
		// verify each argument
		for (var i = 0; i < argument_types.length; i++) {
			if (!object_check(caller_arguments[i], argument_types[i], caller_arguments_names[i], options)) return false;
		}
	
		return true;
	}

	if( typeof module !== 'undefined' && module.exports )
		module.exports = sanityjs;
	
	this.sanityjs = sanityjs;
})();