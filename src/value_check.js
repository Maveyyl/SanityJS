sanityjs.value_check = value_check;

function value_check(value, type, name, options ) {
	if (type !== "undefined" && isUndefined(value))
		return error("Parameter '" + name + "' is undefined.", options);

	if ( !isObject(type) ) 
		type = {type:type};

	// if type is an object, this means it contains more checking rules
	// type.type 			type of value described as a string
	// type.equal 			what the value should be equal to
	// type.not_equal 		what the value shouldn't be equal to
	// type.not_empty 		value shouldn't be empty
	// type.length 			what should be the value's length if value is an array or a string
	// type.structure 		the structure of value if value is an object
	// type.sub_type 		the type of the elements of value if value is an array
	// type.full_check 		verify the type of all elements of value if value is an array, check only first element otherwise
	type.not_empty = type.not_empty || false;
	type.full_check = type.full_check || false;


	var r;
	switch (type.type) {
		case "undefined":
			r = isUndefined(value);
			break;
		case "boolean":
			r = isBoolean(value);
			break;
		case "number":
			r = isNumber(value);

			// if (r && (!isFinite(value) || isNaN(value)))
			//	return error("Parameter " + name + " is of type " + type + " but is Infinite or NaN.",options);
			break;
		case "string":
			r = isString(value);
			if( !r ) break;

			// if length given, test the length of the string
			if( isDefined(type.length) && value.length !== type.length)
				return error("Parameter '" + name + "' of type " + type.type + " is of length " + value.length + " but was expected to be of length " + type.length + ".", options);
			// test emptyness if asked
			if ( type.not_empty && value.length === 0)
				return error("Parameter '" + name + "' of type " + type.type + " is expected not to be empty.", options);
			
			break;
		case "stringnum":
			r = (isString(value) && parseFloat(value)) || isNumber(value);
			break;
		case "array":
			r = isArray(value);
			if( !r ) break;

			// if length given, test the length of the array
			if (isDefined(type.length) && value.length !== type.length)
				return error("Parameter '" + name + "' of type " + type.type + " is of length " + value.length + " but was expected to be of length " + type.length + ".", options);

			if ( type.not_empty && value.length === 0)
				return error("Parameter '" + name + "' of type " + type.type + " is expected not to be empty.", options);

			// if sub_type is not empty, this means the type of the first element will be checked
			if (value.length > 0 && isDefined(type.sub_type)) {
				// if full_check is set, check all elements of array
				if ( type.full_check && type.full_check){
					for (var i = 0; i < value.length; i++){
						if (!value_check(value[i], type.sub_type, name+"["+i+"]", options)) return false;
						// else check only the first one
					}
				}
				else
					if (!value_check(value[0], type.sub_type, name+"[0]", options)) return false;
			}

			break;
		case "object":
			r = isObject(value);
			if( !r ) break;

			// if structure is not empty, this means it must be checked through a structure
			if (isDefined(type.structure))
				if (!object_check(value, type.structure, name, options)) return false;

			// test emptyness if asked
			if (type.not_empty && isObjectEmpty(value))
				return error("Parameter '" + name + "' of type " + type.type + " is expected not to be empty.", options);

			break;
		case "function":
			r = isFunction(value);
			break;
		case "error":
			r = isError(value);
			break;
		case "date":
			r = isDate(value);
			break;
		case "regexp":
			r = isRegExp(value);
			break;
		default:
			return error("Type " + type.type + " cannot be checked, or checker has not implemented this type.", options);
	}

	if (!r)
		return error("Parameter '" + name + "' is not of the type " + type.type + ".", options);

	// test equality if asked
	if (isDefined(type.equal) && !isEqual(value, type.equal))
		return error("Parameter '" + name + "' of value " + value + " is not equal to " + type.equal + ".", options);

	// test inequality if asked
	if (isDefined(type.not_equal) && isArray(type.not_equal) && type.not_equal.length !== 0) {
		for (var y = 0; y < type.not_equal.length; y++) {
			if (isEqual(value, type.not_equal[y]))
				return error("Parameter '" + name + "' is equal to " + type.not_equal[y] + ", it should not.", options);
		}
	}


	return true;
}