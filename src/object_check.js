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