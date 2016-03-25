var sanityjs = require('./sanityjs.js');
var assert = require("assert");


var options = { "throw_exception": false, "verbose": true };
var object = {
	"undefined": 				undefined,
	"boolean": 					true,
	"number": 					123,
	"integer": 					123,
	"float": 					123.4,
	"string": 					"string",
	"stringnum": 				"123.4",
	"array": 					[1,2,3],
	"object": 					{"a":1,"b":2},
	"function": 				function() {},
	"error": 					new Error(),
	"date": 					new Date(),
	"regexp": 					/./,

	"string_empty": 			"",
	"array_empty": 				[],
	"object_empty": 			{},

	"array_fullcheck": 			[1,2,3],
	"array_wrong_fullcheck": 	[1,2,"string"],
	"array_long": 				[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],

	"NaN": 						NaN,
	"Infinity": 				Infinity,

	"array_undefined":  		[undefined,undefined],
	"array_boolean": 			[true,false],
	"array_number": 			[1,2],
	"array_integer": 			[1,2],
	"array_float": 				[1.2,2.3],
	"array_string": 			["s1", "s2"],
	"array_stringnum": 			["123.4","123.45"],
	"array_array": 				[[1,2],[1,2]],
	"array_object": 			[{a:1,b:2},{c:3,d:4}],
	"array_function": 			[function(){}, function(){}],
	"array_error": 				[new Error(), new Error()],
	"array_date": 				[new Date(), new Date()],
	"array_regexp": 			[/./, /../],
};


// undefined
// boolean
// number
// string
// stringnum
// array
// object
// function
// error
// date
// regexp


// testing types
assert( sanityjs.object_check( object["undefined"], { type: "undefined" }, 	"undefined", 	options	) );
assert( sanityjs.object_check( object["boolean"], 	{ type: "boolean" }, 	"boolean", 		options	) );
assert( sanityjs.object_check( object["number"], 	{ type: "number" }, 	"number", 		options	) );
assert( sanityjs.object_check( object["integer"], 	{ type: "integer" }, 	"integer", 		options	) );
assert( sanityjs.object_check( object["float"], 	{ type: "float" }, 		"float", 		options	) );
assert( sanityjs.object_check( object["string"], 	{ type: "string" }, 	"string", 		options	) );
assert( sanityjs.object_check( object["stringnum"], { type: "stringnum" }, 	"stringnum", 	options	) );
assert( sanityjs.object_check( object["array"], 	{ type: "array" }, 		"array", 		options	) );
assert( sanityjs.object_check( object["object"], 	{ type: "object" }, 	"object", 		options	) );
assert( sanityjs.object_check( object["function"], 	{ type: "function" }, 	"function", 	options	) );
assert( sanityjs.object_check( object["error"], 	{ type: "error" }, 		"error", 		options	) );
assert( sanityjs.object_check( object["date"], 		{ type: "date" }, 		"date", 		options	) );
assert( sanityjs.object_check( object["regexp"], 	{ type: "regexp" }, 	"regexp", 		options	) );

// test wrong types
assert( !sanityjs.object_check( object["boolean"], 	{ type: "undefined"}, 	"boolean", 	options ) );
assert( !sanityjs.object_check( object["number"], 	{ type: "boolean"}, 	"number", 	options ) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "number"}, 		"boolean", 	options ) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "integer" }, 	"boolean", 	options	) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "float" }, 		"boolean", 	options	) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "string"}, 		"boolean", 	options ) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "stringnum"}, 	"boolean", 	options ) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "array"}, 		"boolean", 	options ) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "object"}, 		"boolean", 	options ) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "function"}, 	"boolean", 	options ) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "error"}, 		"boolean", 	options ) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "date"}, 		"boolean", 	options ) );
assert( !sanityjs.object_check( object["boolean"], 	{ type: "regexp"}, 		"boolean", 	options ) );







// testing equality
assert( sanityjs.object_check( object["undefined"], 	{ type: "undefined", 	equal: undefined }, 			"undefined", 	options) );
assert( sanityjs.object_check( object["boolean"], 		{ type: "boolean", 		equal: true }, 					"boolean", 		options) );
assert( sanityjs.object_check( object["number"], 		{ type: "number", 		equal: 123 }, 					"number", 		options) );
assert( sanityjs.object_check( object["integer"], 		{ type: "integer", 		equal: 123 }, 					"integer", 		options) );
assert( sanityjs.object_check( object["float"], 		{ type: "float", 		equal: 123.4 }, 				"float", 		options) );
assert( sanityjs.object_check( object["string"], 		{ type: "string",		equal: "string" }, 				"string", 		options) );
assert( sanityjs.object_check( object["stringnum"], 	{ type: "stringnum", 	equal: "123.4" }, 				"stringnum", 	options) );
assert( sanityjs.object_check( object["array"], 		{ type: "array", 		equal: [1,2,3] }, 				"array", 		options) );
assert( sanityjs.object_check( object["object"], 		{ type: "object", 		equal: {"a":1,"b":2} }, 		"object", 		options) );
assert( sanityjs.object_check( object["function"], 		{ type: "function", 	equal: object["function"] }, 	"function", 	options) );
// assert( sanityjs.object_check( object["error"], 		{ type: "error", 		equal: new Error() }, 			"error",		options) );
assert( sanityjs.object_check( object["date"], 			{ type: "date", 		equal: object["date"] }, 		"date", 		options) );
assert( sanityjs.object_check( object["regexp"], 		{ type: "regexp", 		equal: /./ }, 					"regexp", 		options) );


// testing wrong equality
assert( !sanityjs.object_check( object["undefined"], 	{ type: "undefined", 	equal: 123 }, 					"undefined", 	options) );
assert( !sanityjs.object_check( object["boolean"], 		{ type: "boolean", 		equal: false }, 				"boolean", 		options) );
assert( !sanityjs.object_check( object["number"], 		{ type: "number", 		equal: 1234 }, 					"number", 		options) );
assert( !sanityjs.object_check( object["integer"], 		{ type: "integer", 		equal: 1234 }, 					"integer", 		options) );
assert( !sanityjs.object_check( object["float"], 		{ type: "float", 		equal: 123.45 }, 				"float", 		options) );
assert( !sanityjs.object_check( object["string"], 		{ type: "string",		equal: "string2" }, 			"string", 		options) );
assert( !sanityjs.object_check( object["stringnum"], 	{ type: "stringnum", 	equal: "123.45" }, 				"stringnum", 	options) );
assert( !sanityjs.object_check( object["array"], 		{ type: "array", 		equal: [1,2,3,4] }, 			"array", 		options) );
assert( !sanityjs.object_check( object["object"], 		{ type: "object", 		equal: {"a":1,"b":2,"c":3} }, 	"object", 		options) );
assert( !sanityjs.object_check( object["function"], 	{ type: "function", 	equal: function(){} }, 			"function", 	options) );
// assert( !sanityjs.object_check( object["error"], 	{ type: "error", 		equal: new Error() }, 			"error",		options) );
assert( !sanityjs.object_check( object["date"], 		{ type: "date", 		equal: new Date() }, 			"date", 		options) );
assert( !sanityjs.object_check( object["regexp"], 		{ type: "regexp", 		equal: /../ }, 					"regexp", 		options) );










// testing non equality
assert( sanityjs.object_check( object["undefined"], 	{ type: "undefined", 	not_equal: [1,2] }, 						"undefined", 	options) );
assert( sanityjs.object_check( object["boolean"], 		{ type: "boolean", 		not_equal: [false,false] }, 				"boolean", 		options) );
assert( sanityjs.object_check( object["number"], 		{ type: "number", 		not_equal: [1,2] }, 						"number", 		options) );
assert( sanityjs.object_check( object["integer"], 		{ type: "integer", 		not_equal: [1,2] }, 						"number", 		options) );
assert( sanityjs.object_check( object["float"], 		{ type: "float", 		not_equal: [1.1,2.2] }, 					"number", 		options) );
assert( sanityjs.object_check( object["string"], 		{ type: "string",		not_equal: ["s1","s2"] }, 					"string", 		options) );
assert( sanityjs.object_check( object["stringnum"], 	{ type: "stringnum", 	not_equal: ["123.45", "12345"] }, 			"stringnum", 	options) );
assert( sanityjs.object_check( object["array"], 		{ type: "array", 		not_equal: [[1,2],[1,2,3,4],[1,1,1]] }, 	"array", 		options) );
assert( sanityjs.object_check( object["object"], 		{ type: "object", 		not_equal: [{"a":2,"b":2},{"c":3}] }, 		"object", 		options) );
assert( sanityjs.object_check( object["function"], 		{ type: "function", 	not_equal: [function(){}, function(){}] }, 	"function", 	options) );
// assert( sanityjs.object_check( object["error"], 		{ type: "error", 		not_equal: [new Error(), new Error()] }, 	"error",		options) );
assert( sanityjs.object_check( object["date"], 			{ type: "date", 		not_equal: [new Date(), new Date()] }, 		"date", 		options) );
assert( sanityjs.object_check( object["regexp"], 		{ type: "regexp", 		not_equal: [/../,/.../] }, 					"regexp", 		options) );

// testing wrong non equality
assert( !sanityjs.object_check( object["undefined"], 	{ type: "undefined", 	not_equal: [123, undefined] }, 						"undefined", 	options) );
assert( !sanityjs.object_check( object["boolean"], 		{ type: "boolean", 		not_equal: [false,true] }, 							"boolean", 		options) );
assert( !sanityjs.object_check( object["number"], 		{ type: "number", 		not_equal: [1234,123] }, 							"number", 		options) );
assert( !sanityjs.object_check( object["integer"], 		{ type: "integer", 		not_equal: [1234,123] }, 							"integer", 		options) );
assert( !sanityjs.object_check( object["float"], 		{ type: "float", 		not_equal: [123.5,123.4] }, 						"float", 		options) );
assert( !sanityjs.object_check( object["string"], 		{ type: "string",		not_equal: ["string2","string"] }, 					"string", 		options) );
assert( !sanityjs.object_check( object["stringnum"], 	{ type: "stringnum", 	not_equal: ["123.45","123.4"] }, 					"stringnum", 	options) );
assert( !sanityjs.object_check( object["array"], 		{ type: "array", 		not_equal: [[1,2,3,4],[1,2,3]] }, 					"array", 		options) );
assert( !sanityjs.object_check( object["object"], 		{ type: "object", 		not_equal: [{"a":1}, {"a":1,"b":2}] }, 				"object", 		options) );
assert( !sanityjs.object_check( object["function"], 	{ type: "function", 	not_equal: [function(){}, object["function"]] }, 	"function", 	options) );
// assert( !sanityjs.object_check( object["error"], 	{ type: "error", 		not_equal: [new Error(), new Error()] }, 			"error",		options) );
assert( !sanityjs.object_check( object["date"], 		{ type: "date", 		not_equal: [new Date(), object["date"]] }, 			"date", 		options) );
assert( !sanityjs.object_check( object["regexp"], 		{ type: "regexp", 		not_equal: [/../, /./] }, 							"regexp", 		options) );











// testing emptyness
assert( sanityjs.object_check( object["string"], 	{ type: "string", 	not_empty: true }, 	"string", 	options) );
assert( sanityjs.object_check( object["array"], 	{ type: "array", 	not_empty: true }, 	"array", 	options) );
assert( sanityjs.object_check( object["object"], 	{ type: "object", 	not_empty: true }, 	"object", 	options) );

// testing wrong emptyness
assert( !sanityjs.object_check( object["string_empty"], 	{ type: "string", 	not_empty: true }, 	"string_empty", 	options) );
assert( !sanityjs.object_check( object["array_empty"], 		{ type: "array", 	not_empty: true }, 	"array_empty", 		options) );
assert( !sanityjs.object_check( object["object_empty"], 	{ type: "object", 	not_empty: true }, 	"object_empty", 	options) );







// testing length
assert( sanityjs.object_check( object["string"], 	{ type: "string", 	length: 6 }, 	"string", 	options) );
assert( sanityjs.object_check( object["array"], 	{ type: "array", 	length: 3 }, 	"array", 	options) );

// testing wrong length
assert( !sanityjs.object_check( object["string"], 	{ type: "string", 	length: 1 }, 	"string", 	options) );
assert( !sanityjs.object_check( object["array"], 	{ type: "array", 	length: 1 }, 	"array", 	options) );






// testing array fullcheck
assert( sanityjs.object_check( object["array_fullcheck"], { type: "array", full_check: true, sub_type: "number" }, "array_fullcheck", options) );

// testing wrong array fullcheck
assert( !sanityjs.object_check( object["array_wrong_fullcheck"], { type: "array", full_check: true, sub_type: "number" }, "array_wrong_fullcheck", options) );

// testing array fullcheck warning message
assert( sanityjs.object_check( object["array_long"], { type: "array", full_check: true, sub_type: "number" }, "array_long", options) );



// testing NaN and Infinity
assert( !sanityjs.object_check( object["NaN"], 			{ type: "number" }, 	"NaN", 			options	) );
assert( !sanityjs.object_check( object["Infinity"], 	{ type: "number" }, 	"Infinity", 	options	) );


// testing custom function
var numcheck = function(obj){
	return obj > 100 && obj < 200;
};
var numcheck2 = function(obj){
	return obj > 0 && obj < 100;
};
var cb_message = "is not between 0 and 100";
assert( sanityjs.object_check( object["number"], 	{ type: "number", cb: numcheck }, 							"number", options ) );
assert( !sanityjs.object_check( object["number"], 	{ type: "number", cb: numcheck2, cb_message: cb_message }, 	"number", options ) );






// testing nesting check in array
assert( sanityjs.object_check( object["array_undefined"], 	{ type: "array", sub_type: "undefined" }, 	"array_undefined", options) );
assert( sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "boolean" }, 	"array_boolean", options) );
assert( sanityjs.object_check( object["array_number"], 		{ type: "array", sub_type: "number" }, 		"array_number", options) );
assert( sanityjs.object_check( object["array_integer"], 	{ type: "array", sub_type: "integer" }, 	"array_integer", options) );
assert( sanityjs.object_check( object["array_float"], 		{ type: "array", sub_type: "float" }, 		"array_float", options) );
assert( sanityjs.object_check( object["array_string"], 		{ type: "array", sub_type: "string" }, 		"array_string", options) );
assert( sanityjs.object_check( object["array_stringnum"], 	{ type: "array", sub_type: "stringnum" }, 	"array_stringnum", options) );
assert( sanityjs.object_check( object["array_array"], 		{ type: "array", sub_type: "array" }, 		"array_array", options) );
assert( sanityjs.object_check( object["array_object"], 		{ type: "array", sub_type: "object" }, 		"array_object", options) );
assert( sanityjs.object_check( object["array_function"], 	{ type: "array", sub_type: "function" }, 	"array_function", options) );
assert( sanityjs.object_check( object["array_error"], 		{ type: "array", sub_type: "error" }, 		"array_error", options) );
assert( sanityjs.object_check( object["array_date"], 		{ type: "array", sub_type: "date" }, 		"array_date", options) );
assert( sanityjs.object_check( object["array_regexp"], 		{ type: "array", sub_type: "regexp" }, 		"array_regexp", options) );


// testing wrong nesting check in array
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "undefined" }, 	"array_boolean", options) );
assert( !sanityjs.object_check( object["array_number"], 	{ type: "array", sub_type: "boolean" }, 	"array_number", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "number" }, 		"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "integer" }, 	"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "float" }, 		"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "string" }, 		"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "stringnum" }, 	"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "array" }, 		"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "object" }, 		"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "function" }, 	"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "error" }, 		"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "date" }, 		"array_boolean", options) );
assert( !sanityjs.object_check( object["array_boolean"], 	{ type: "array", sub_type: "regexp" }, 		"array_boolean", options) );









// testing nesting check in objects
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "undefined", 	type: "undefined" }] }, 	"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "boolean" }] }, 		"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "number", 	type: "number" }] }, 		"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "integer", 	type: "integer" }] }, 		"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "float", 		type: "float" }] }, 		"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "string", 	type: "string" }] }, 		"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "stringnum", 	type: "stringnum" }] }, 	"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "array", 		type: "array" }] }, 		"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "object", 	type: "object" }] }, 		"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "function", 	type: "function" }] }, 		"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "error", 		type: "error" }] }, 		"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "date", 		type: "date" }] }, 			"object", options) );
assert( sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "regexp", 	type: "regexp" }] }, 		"object", options) );


// testing wrong nesting check in objects
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "undefined" }] }, 	"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "number", 	type: "boolean" }] }, 		"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "number" }] }, 		"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "integer" }] }, 		"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "float" }] }, 		"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "string" }] }, 		"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "stringnum" }] }, 	"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "array" }] }, 		"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "object" }] }, 		"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "function" }] }, 		"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "error" }] }, 		"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "date" }] }, 			"object", options) );
assert( !sanityjs.object_check( object, 	{ type: "object", structure: [{ name: "boolean", 	type: "regexp" }] }, 		"object", options) );



// testing giving a JSON to object_check
assert( sanityjs.object_check( JSON.stringify(object), { type: "object", structure: [{ name: "boolean", 	type: "boolean" }] }, 	"object", options) );
assert( !sanityjs.object_check( JSON.stringify(object), { type: "object", structure: [{ name: "boolean", 	type: "undefined" }] }, 	"object", options) );
// testing a non parsable string
assert( !sanityjs.object_check( "string", { type: "object", structure: [{ name: "boolean", 	type: "undefined" }] }, 	"object", options) );
// testing a string to be a string
assert( sanityjs.object_check( object['string'], "string", "string", options) );
// testing a string as another type
assert( !sanityjs.object_check( object['string'], "boolean", "string", options) );



// testing labels
var size_check = function( obj, type, name, labels ){
	return labels["array1"].length === obj.length;
};
structure = {
	type: "object",
	structure: [
		{ name: "array", type: { type: "array", label: "array1"} },
		{ name: "array", type: { type: "array", cb: size_check } }
	]
}
assert( sanityjs.object_check( object, structure, "object", options) );

structure = {
	type: "object",
	structure: [
		{ name: "array", type: { type: "array", label: "array1"} },
		{ name: "array_array", type: { type: "array", cb: size_check } }
	]
}
assert( !sanityjs.object_check( object, structure, "object", options) );





// testing arguments check
function f1(a,b,c){
	assert( sanityjs.arguments_check(["boolean","number","string"], options) );
}
f1(object.boolean, object.number, object.string);
// testing wrong arguments check
function f2(a,b,c){
	assert(! sanityjs.arguments_check(["boolean","number","string"], options) );
}
f2(object.boolean, object.boolean, object.boolean);




console.log("Test successfully done.");
process.exit(0);