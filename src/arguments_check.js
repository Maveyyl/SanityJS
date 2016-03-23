sanityjs.arguments_check = arguments_check;

function arguments_check(argument_types, options) {
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