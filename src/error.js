function error(message, options) {
	if( options.throw_exception )
		throw new TypeError(message);
	else if ( options.verbose )
		console.log(message);

	// return false, only called if throw_exception at false
	return false;
}