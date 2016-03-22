sanityjs.object_check = object_check;

function object_check(object, structure, name, options) {
	name = name || "";
	// objects are described with an array of objects containing informations and structures of the fields
	for (var i = 0; i < structure.length; i++) {
		// for each field, check the value of the vield
		if (!value_check(object[structure[i].name], structure[i].type, name + "." +structure[i].name, options)) return false;
	}

	return true;
}