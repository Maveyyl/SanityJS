# Sanity JS

## I. API
### 1) Main functions
* boolean = arguments_check(argument_types [, options]) 
* boolean = object_check(object, structure [, name [, options]])
* boolean = value_check(value, type [, name [, options]] ) 

#### a) arguments_check
boolean = arguments_check(argument_types [, options])  
A function allowing a simple and quick way to check a function argument's type
```javascript
function foo(arg1, arg2, arg3){
	sanityjs.arguments_check(["string","number"]);
}
```
This code checks that both arg1 and arg2 are defined, and that arg1 is a string and arg2 is a number.

#### b) object_check
boolean = object_check(object, structure [, name [, options]])
```javascript
var obj = {
	"a": "hello ",
	"b": "world!",
	"c": 123,
	"d": [1,2,3]
};
var structure = [ // an array to describe an object
	{ name: "a", type: "string" }, // in this object there's an attribute called "a" that is a string
	{ name: "b", type: "string" }, // ....
	{ name: "c", type: "number" },
	{ name: "d", type: { "type": "array", "sub_type": "number" } }
];
sanityjs.object_check( obj, structure, "obj" );
```
This code checks that the object obj corresponds to the structure given.
The parameter name will be printed in case of error. While going deeper in the value's structure, it'll be enriched with the name of the attributes and index number of array's elements.
If first elements of attribute "d" isn't a number, it'll print "obj.d[0]"

#### c) value_check
boolean = value_check(value, type [, name [, options]] ) 
```javascript
var obj = "hello world!";
var type = "string";
sanityjs.value_check( obj, type, "obj" );
```
This code checks that the given value corresponds to the type given

### 2) Util functions
Here is the list of available util functions, their name are self-explanatory.
* boolean = isBoolean( obj )
* boolean = isNumber( obj )
* boolean = isString( obj )
* boolean = isDate( obj )
* boolean = isRegExp( obj )
* boolean = isError( obj )
* boolean = isArguments( obj )
* boolean = isFunction( obj )
* boolean = isUndefined( obj )
* boolean = isDefined( obj )
* boolean = isArray( obj )
* boolean = isObject( obj )
* boolean = isObjectEmpty( obj )
* boolean = isEqual( obj1, obj2 )

### 3) Use cases

### 4) Options
Flags that can be put in Options:
* verbose : If true, all check errors will log on the console a description of the error.
* throw_exception : If true, all check errors will throw a TypeError exception, if false, check errors will just end the function call and return false.

### 5) Checkable types
* undefined
* boolean
* number
* string
* stringnum
* array
* object
* function
* error
* date
* regexp

### 6) Checkable properties
Here is the list of all checkable properties to a given value.

* type : type of the value, described as a string (see CHeckable types)
* equal : what the value should be equal to
* not_equal : what the value shouldn't be equal to
* not_empty : set to true to check if the value is empty
* length : what should be the length of value if it is an array or a string
* structure : the structure of value if it is an object
* sub_type : the type of the elements of value if it is an array
* full_check : verify the type of all elements of the value if is is an array, check only first element otherwise


## II. TODO
* Remove the object check function and make value_check more generic
* A label system allowing constraints between different values properties
* Allow JSON to be given instead of object for object_check
* Possibility to have many types to check per value
