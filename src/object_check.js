sanityjs.object_check = object_check;

function object_check(obj, type, name, options, labels ) {

	if ( !isObject(type) ) 
		type = {type:type};

	if( isString(obj) && type.type !=="string" && type.type !== "stringnum" ){
		try{
			obj = JSON.parse(obj);
		} catch(e){}
	}
		
	if (type.type !== "undefined" && isUndefined(obj) )
		return error("Parameter '" + name + "' is undefined.", options);


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
	type.not_empty = type.not_empty || false;
	type.full_check = type.full_check || false;
	
	if( isUndefined( labels ) )
		labels = {};


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
					for (i = 0; i < obj.length; i++){
						if (!object_check(obj[i], type.sub_type, name+"["+i+"]", options, labels)) return false;
						// else check only the first one
					}
				}
				else
					if (!object_check(obj[0], type.sub_type, name+"[0]", options, labels)) return false;
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
					if (!object_check(obj[type.structure[i].name], type.structure[i].type, name + "." + type.structure[i].name, options, labels)) return false;
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

	// test equality if asked
	if (isDefined(type.equal) && !isEqual(obj, type.equal))
		return error("Parameter '" + name + "' of value " + obj + " is not equal to " + type.equal + ".", options);

	// test inequality if asked
	if (isDefined(type.not_equal) && isArray(type.not_equal) && type.not_equal.length !== 0) {
		for (i = 0; i < type.not_equal.length; i++) {
			if ( isEqual(obj, type.not_equal[i]) )
				return error("Parameter '" + name + "' is equal to " + type.not_equal[i] + ", it should not.", options);
		}
	}

	// call cb on obj
	if( isDefined(type.cb) && isFunction(type.cb) ){
		r = type.cb(obj, type, name, labels);
		if( !r ){
			if( isDefined(type.cb_message) )
				return error("Parameter '" + name + "' " + type.cb_message, options);
			else
				return error("Parameter '" + name + "' failed passing the callback.", options);
		}
	}


	// handling labels
	if( isDefined(type.label) && isString(type.label) )
		labels[type.label] = obj;

	return true;
}