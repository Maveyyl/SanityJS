var sanityjs = require('./sanityjs.js');
var assert = require("assert");


var options = { "throw_exception": false, "verbose": true };
var object = {
	"undefined": undefined,
	"boolean": true,
	"number": 123,
	"string": "string",
	"stringnum": "123.4",
	"array": [1,2,3],
	"object": {"a":1,"b":2},
	"function": function() {},
	"error": new Error(),
	"date": new Date(),
	"regexp": /./,

	"string_empty":"",
	"array_empty":[],
	"object_empty":{},

	"array_fullcheck": [1,2,3],
	"array_wrong_fullcheck": [1,2,"string"],

	"array_undefined": [undefined,undefined],
	"array_boolean": [true,false],
	"array_number": [1,2],
	"array_string": ["s1", "s2"],
	"array_stringnum": ["123.4","123.45"],
	"array_array":[[1,2],[1,2]],
	"array_object": [{a:1,b:2},{c:3,d:4}],
	"array_function": [function(){}, function(){}],
	"array_error": [new Error(), new Error()],
	"array_date": [new Date(), new Date()],
	"array_regexp": [/./, /../],

	"object_nest": {
		"undefined": undefined,
		"boolean": true,
		"number": 123,
		"string": "string",
		"stringnum": "123.4",
		"array": [1,2,3],
		"object": {"a":1,"b":2},
		"function": function() {},
		"error": new Error(),
		"date": new Date(),
		"regexp": /./,
	},
};


var structure = [];
var r = false;

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
structure = [{ "name": "undefined", "type": "undefined" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "boolean" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "number", "type": "number" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "string", "type": "string" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "stringnum", "type": "stringnum" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array", "type": "array" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object", "type": "object" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "function", "type": "function" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "error", "type": "error" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "date", "type": "date" }];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "regexp", "type": "regexp" }];
assert( sanityjs.object_check(object, structure, "", options) );


// test wrong types
structure = [{ "name": "boolean", "type": "undefined" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "number", "type": "boolean" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "number" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "string" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "stringnum" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "array" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "object" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "function" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "error" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "date" }];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": "regexp" }];
assert( !sanityjs.object_check(object, structure, "", options) );










// testing equality
structure = [{ "name": "undefined", "type": { "type": "undefined", "equal": undefined } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": { "type": "boolean", "equal": true } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "number", "type": { "type": "number", "equal": 123 } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "string", "type": { "type": "string", "equal": "string" } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "stringnum", "type": { "type": "stringnum", "equal": "123.4" } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array", "type": { "type": "array", "equal": [1,2,3] } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object", "type": { "type": "object", "equal": {"a":1,"b":2} } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "function", "type": { "type": "function", "equal": object["function"] } }],
assert( sanityjs.object_check(object, structure, "", options) );
// structure = [{ "name": "error", "type": { "type": "error", "equal": new Error() } }],
// r = sanityjs.object_check(object, structure, "", options) ;
// assert( r );
structure = [{ "name": "date", "type": { "type": "date", "equal": object["date"] } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "regexp", "type": { "type": "regexp", "equal": /./ } }],
assert( sanityjs.object_check(object, structure, "", options) );

// testing wrong equality
structure = [{ "name": "undefined", "type": { "type": "undefined", "equal": 123 } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": { "type": "boolean", "equal": false } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "number", "type": { "type": "number", "equal": 1234 } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "string", "type": { "type": "string", "equal": "string2" } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "stringnum", "type": { "type": "stringnum", "equal": "123.45" } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array", "type": { "type": "array", "equal": [1,2,3,4] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object", "type": { "type": "object", "equal": {"a":1,"b":2,"c":3} } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "function", "type": { "type": "function", "equal": function() {} } }],
assert( !sanityjs.object_check(object, structure, "", options) );
// structure = [{ "name": "error", "type": { "type": "error", "equal": new Error("error") } }],
// r = !sanityjs.object_check(object, structure, "", options) ;
// assert( r );
structure = [{ "name": "date", "type": { "type": "date", "equal": new Date() } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "regexp", "type": { "type": "regexp", "equal": /../ } }],
assert( !sanityjs.object_check(object, structure, "", options) );










// testing non equality
structure = [{ "name": "undefined", "type": { "type": "undefined", "not_equal": [1,2] } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": { "type": "boolean", "not_equal": [false,false] } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "number", "type": { "type": "number", "not_equal": [1,2] } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "string", "type": { "type": "string", "not_equal": ["s1","s2"] } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "stringnum", "type": { "type": "stringnum", "not_equal": ["123.45", "12345"] } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array", "type": { "type": "array", "not_equal": [[1,2],[1,2,3,4],[1,1,1]] } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object", "type": { "type": "object", "not_equal": [{"a":2,"b":2},{"c":3}] } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "function", "type": { "type": "function", "not_equal": [function(){}, function(){}] } }],
assert( sanityjs.object_check(object, structure, "", options) );
// structure = [{ "name": "error", "type": { "type": "error", "not_equal": new Error() } }],
// r = sanityjs.object_check(object, structure, "", options) ;
// assert( r );
structure = [{ "name": "date", "type": { "type": "date", "not_equal": [new Date(), new Date()]} }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "regexp", "type": { "type": "regexp", "not_equal": [/../,/.../] } }],
assert( sanityjs.object_check(object, structure, "", options) );

// testing wrong non equality
structure = [{ "name": "undefined", "type": { "type": "undefined", "not_equal": [123, undefined] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "boolean", "type": { "type": "boolean", "not_equal": [false,true] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "number", "type": { "type": "number", "not_equal": [1234,123] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "string", "type": { "type": "string", "not_equal": ["string2","string"] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "stringnum", "type": { "type": "stringnum", "not_equal": ["123.45","123.4"] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array", "type": { "type": "array", "not_equal": [[1,2,3,4],[1,2,3]] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object", "type": { "type": "object", "not_equal": [{"a":1,"b":2,"c":3}, {"a":1,"b":2}] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "function", "type": { "type": "function", "not_equal": [function() {}, object["function"]] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
// structure = [{ "name": "error", "type": { "type": "error", "not_equal": new Error("error") } }],
// r = !sanityjs.object_check(object, structure, "", options) ;
// assert( r );
structure = [{ "name": "date", "type": { "type": "date", "not_equal": [new Date(), object["date"]] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "regexp", "type": { "type": "regexp", "not_equal": [/../, /./] } }],
assert( !sanityjs.object_check(object, structure, "", options) );
















// testing emptyness
structure = [{ "name": "string", "type": { "type": "string", "not_empty": true } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array", "type": { "type": "array", "not_empty": true } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object", "type": { "type": "object", "not_empty": true } }],
assert( sanityjs.object_check(object, structure, "", options) );

// testing wrong emptyness
structure = [{ "name": "string_empty", "type": { "type": "string", "not_empty": true } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_empty", "type": { "type": "array", "not_empty": true } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_empty", "type": { "type": "object", "not_empty": true } }],
assert( !sanityjs.object_check(object, structure, "", options) );





















// testing length
structure = [{ "name": "string", "type": { "type": "string", "length": 6 } }],
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array", "type": { "type": "array", "length":  3 } }],
assert( sanityjs.object_check(object, structure, "", options) );

// testing wrong length
structure = [{ "name": "string", "type": { "type": "string", "length": 1 } }],
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array", "type": { "type": "array", "length":  1 } }],
assert( !sanityjs.object_check(object, structure, "", options) );







// testing array fullcheck
structure = [{ "name": "array_fullcheck", "type": { "type": "array", "full_check": true, "sub_type":"number"}}];
assert( sanityjs.object_check(object, structure, "", options) );
// testing wrong array fullcheck
structure = [{ "name": "array_wrong_fullcheck", "type": { "type": "array", "full_check": true, "sub_type":"number"}}];
assert( !sanityjs.object_check(object, structure, "", options) );













// testing nesting check in array
structure = [{ "name": "array_undefined", "type": { "type": "array", "sub_type":"undefined"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"boolean"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_number", "type": { "type": "array", "sub_type":"number"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_string", "type": { "type": "array", "sub_type":"string"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_stringnum", "type": { "type": "array", "sub_type":"stringnum"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_array", "type": { "type": "array", "sub_type":"array"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_object", "type": { "type": "array", "sub_type":"object"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_function", "type": { "type": "array", "sub_type":"function"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_error", "type": { "type": "array", "sub_type":"error"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_date", "type": { "type": "array", "sub_type":"date"}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_regexp", "type": { "type": "array", "sub_type":"regexp"}}];
assert( sanityjs.object_check(object, structure, "", options) );

// testing wrong nesting check in array
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"undefined"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_number", "type": { "type": "array", "sub_type":"boolean"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"number"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"string"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"stringnum"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"array"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"object"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"function"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"error"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"date"}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "array_boolean", "type": { "type": "array", "sub_type":"regexp"}}];
assert( !sanityjs.object_check(object, structure, "", options) );








// testing nesting check in objects
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"undefined", "type": "undefined"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "boolean"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"number", "type": "number"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"string", "type": "string"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"stringnum", "type": "stringnum"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"array", "type": "array"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"object", "type": "object"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"function", "type": "function"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"error", "type": "error"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"date", "type": "date"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"regexp", "type": "regexp"}]}}];
assert( sanityjs.object_check(object, structure, "", options) );

// testing wrong nesting check in objects
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "undefined"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"number", "type": "boolean"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "number"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "string"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "stringnum"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "array"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "object"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "function"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "error"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "date"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );
structure = [{ "name": "object_nest", "type": { "type": "object", "structure":[{"name":"boolean", "type": "regexp"}]}}];
assert( !sanityjs.object_check(object, structure, "", options) );



