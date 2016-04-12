sanityjs.object_check = object_check;

function object_check(obj, type, name, options, ctx, recursion_count ) {  
	// checking name, needs to be done first because next error message exploit this value
	if( isUndefined(name) || !isString(name) ){
		warn("Bad third parameter 'name' in function object_check. It should be a string. Default empty name used instead.", options);
		name = "";
	}

	// if no type or bad type given, return
	if( isUndefined(type) || (!isObject(type) && !isString(type) && !isArray(type)) )
		return error("Bad second parameter 'type' for obj '"+name+"' in function object_check. It's a mandatory argument, must be a string or an object", options);

	// if type is an array, we're checking many types
	if( isArray(type) ){
		var t;
		var nb_type = type.length;
		for(t=0;t<nb_type;t++)
			if( object_check(obj, type[t], name, options, ctx, recursion_count) )
				return true;
		return false;
	}

	// if type is a string, set it as an object
	if ( isString(type) ) 
		type = {type:type};


	// if object is a string, and type given isn't string or stringnum, then obj is a JSON and should be parsed
	if( isString(obj) && type.type !=="string" && type.type !== "stringnum" ){
		try{
			obj = JSON.parse(obj);
		}catch(e){
			// if fails, then it's likely that a string is checked while expected to be something else
			// if JSON parse fails while actually trying to parse a JSON, then no error will be stated
			warn("JSON parse of " + name + " failed. If this object wasn't intended to be a JSON then ignore this warning.", options);
		}
	}

	// if type is not explicitely the type "undefined" and obj is undefined, returns immediatly
	// not a mandatory line, but is clearer
	if (type.type !== "undefined" && isUndefined(obj) )
		return error("Object '" + name + "' is undefined.", options);



	// handling ctx, ctx attributes and recursion count creation
	if( isUndefined(ctx) || !isObject(ctx) ){
		if(  isDefined(ctx) && !isObject(ctx) )
			warn("Bad fifth parameter 'ctx' for obj '"+name+"' in function object_check. It should be an object. Recovered by overwriting.", options);
		ctx = {};
	}
	if( isUndefined(ctx.labels) || !isObject(ctx.labels) ){
		if( isDefined(ctx.labels) && !isObject(ctx.labels) )
			warn("Bad argument 'labels' of parameter 'ctx' for obj '"+name+"' in function object_check. It should be an object. Recovered by overwriting.", options);
		ctx.labels = {};
	}
	if( isUndefined(ctx.recursion_depth) || !isInteger(ctx.recursion_depth) ){
		if( isDefined(ctx.recursion_depth) && !isObject(ctx.recursion_depth) )
			warn("Bad argument 'recursion_depth' of parameter 'ctx' for obj '"+name+"' in function object_check. It should be an integer. Recovered by overwriting.", options);
		ctx.recursion_depth = 0;
	}
	if( isUndefined(ctx.recursion_count_warned) || !isBoolean(ctx.recursion_count_warned) ){
		if( isDefined(ctx.recursion_count_warned) && !isBoolean(ctx.recursion_count_warned) )
			warn("Bad argument 'recursion_count_warned' of parameter 'ctx' for obj '"+name+"' in function object_check. It should be a boolean. Recovered by overwriting.", options);
		ctx.recursion_count_warned = false;
	}

	if( isUndefined(recursion_count) || !isInteger(recursion_count) ){
		if( isDefined(recursion_count) && !isInteger(recursion_count) )
			warn("Bad sixth parameter 'recursion_count' for obj '"+name+"' in function object_check. It should be an integer. Recovered by overwriting.", options);
		recursion_count = -1;
	}


	// verifying recursion count and warning if recursion is too deep
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
	
	// testing type parameters sanity
	if( isDefined(type.equal) && !isArray(type.equal) )
		return error("Bad equal parameter for object " +name+ ". It should be an array", options);
	if( isDefined(type.not_equal) && !isArray(type.not_equal) )
		return error("Bad not_equal parameter for object " +name+ ". It should be an array", options);
	if( isDefined(type.cb) && !isFunction(type.cb) )
		return error("Bad cb parameter for object " +name+ ". It should be a function", options);
	if( isDefined(type.cb_message) && !isString(type.cb_message) )
		return error("Bad cb_message parameter for object " +name+ ". It should be a string", options);
	if( isDefined(type.label) && !isString(type.label) )
		return error("Bad label parameter for object " +name+ ". It should be a string", options);
	if( isDefined(type.length) && !isInteger(type.length) )
		return error("Bad length parameter for object " +name+ ". It should be an integer", options);
	if( isDefined(type.structure) && !isArray(type.structure) )
		return error("Bad structure parameter for object " +name+ ". It should be an array", options);
	if( isDefined(type.sub_type) && ( !isObject(type.sub_type) && !isString(type.sub_type) ) )
		return error("Bad sub_type parameter for object " +name+ ". It should be an object", options);


	var r;
	var i;
	switch (type.type) {
		case "defined":
			r = isDefined(obj);
			break;
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
				return error("Object " + name + " is NaN.", options);
			if ( !isFinite(obj) )
				return error("Object " + name + " is of type " + type.type + " but is Infinite.", options);
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
				return error("Object '" + name + "' of type " + type.type + " is of length " + obj.length + " but was expected to be of length " + type.length + ".", options);
			// test emptyness if asked
			if ( type.not_empty && obj.length === 0)
				return error("Object '" + name + "' of type " + type.type + " is expected not to be empty.", options);
			
			break;
		case "stringnum":
			r = (isString(obj) && parseFloat(obj)) || isNumber(obj);
			break;
		case "array":
			r = isArray(obj);
			if( !r ) break;

			// if length given, test the length of the array
			if (isDefined(type.length) && obj.length !== type.length)
				return error("Object '" + name + "' of type " + type.type + " is of length " + obj.length + " but was expected to be of length " + type.length + ".", options);

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
	if (isDefined(type.equal) && type.equal.length !== 0) {
		var equal = false;
		for (i = 0; i < type.equal.length; i++) {
			if ( isEqual(obj, type.equal[i]) )
				equal = true;
		}
		if( !equal )
			return error("Parameter '" + name + "' of value " + obj + " should be equal to one of these values: " + type.equal + ".", options);
	}

	// test inequality if asked
	if (isDefined(type.not_equal) && type.not_equal.length !== 0) {
		for (i = 0; i < type.not_equal.length; i++) {
			if ( isEqual(obj, type.not_equal[i]) )
				return error("Parameter '" + name + "' is equal to " + type.not_equal[i] + ", it should not.", options);
		}
	}

	// handling labels
	if( isDefined(type.label) )
		ctx.labels[type.label] = obj;


	// call cb on obj
	if( isDefined(type.cb) ){
		r = type.cb(obj, type, name, ctx.labels);
		if( !r ){
			if( isDefined(type.cb_message) )
				return error("Parameter '" + name + "' " + type.cb_message, options);
			else
				return error("Parameter '" + name + "' failed passing the callback.", options);
		}
	}

	// logging success for first object
	if( recursion_count === 0 && ctx.recursion_depth >= recursion_count_log )
		log("Object " + name + " has been successfuly checked with " + ctx.recursion_depth + " recursion depth.", options );

	return true;
}