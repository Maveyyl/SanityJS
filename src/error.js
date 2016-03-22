function error(message, options) {
	// if options is set, options is object, throw_exception is defined && throw_exception is false
	if (!isUndefined(options) && isObject(options) && !isUndefined(options.throw_exception) && !options.throw_exception) {
		// if verbose is undefined or verbose is true
		if (isUndefined(options.verbose) || (!isUndefined(options.verbose) && options.verbose))
			// log the message
			console.log(message);
	}
	// if options is not set or options is not an object or throw_exception is unset or throw_exception is true
	else {
		// throw exception
		throw new TypeError(message);
	}

	// return false only called if throw_exception at false
	return false;
}