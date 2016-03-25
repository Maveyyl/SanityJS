function error(message, options) {
	if( isUndefined(options) || !isObject(options) )
		options = {};
	options.throw_exception = isDefined(options.throw_exception) ? options.throw_exception : true; 
	options.verbose = isDefined(options.verbose) ? options.verbose : false; 

	if( options.throw_exception )
		throw new TypeError(message);
	else if ( options.verbose )
		console.error("[Error]: " + message);

	// return false, only called if throw_exception at false
	return false;
}

function warn(message, options){
	if( isUndefined(options) || !isObject(options) )
		options = {};
	options.throw_exception = isDefined(options.throw_exception) ? options.throw_exception : true; 
	options.verbose = isDefined(options.verbose) ? options.verbose : false; 

	if( options.verbose )
		console.warn("[Warning]: " + message);
}