# Sanity JS
SanityJS is a Javascript module that helps checking types of objects and parameters. 

## I. API
### 1) Describing a type
In order to check the type of an object or a parameter, it is necessary to describe this type to SanityJS.  
For that SanityJS must be provided with a type object.  

The minimalistic type object is a string containing the name of the type, "type_name", the different values that can be used here are listed in I.5, or an object of the shape {type:"type_name"}. The second form is useful if the type has to be described more precisely with optional attributes listed in I.6.

The type object can be complicated and describe the types of an object elements or an array elements thanks to attributes called "structure" and "sub_type" that are type object themselves. It is then possible to describe multiple level of nested objects and arrays.


### 2) Main functions
* boolean = object_check(obj, type [, name [, options]])
* boolean = arguments_check(argument_types [, options]) 


#### a) object_check
boolean = object_check(object, type [, name [, options]])
```javascript
var obj = "hello world!";
var type = "string";
sanityjs.object_check( obj, type );
```
Previous code checks that the object obj is a string
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
Previous code checks that the object obj corresponds to the structure given.
The parameter name will be printed in case of error. While going deeper in the value's structure, it'll be enriched with the name of the attributes and index number of array's elements.
If first elements of attribute "d" isn't a number, it'll print "obj.d[0]"



#### b) arguments_check
boolean = arguments_check(argument_types [, options])  
A function allowing a simple and quick way to check a function argument's type by giving an array of types.
```javascript
function foo(arg1, arg2, arg3){
	sanityjs.arguments_check(["string","number"]);
}
```
This code checks that both arg1 and arg2 are defined, and that arg1 is a string and arg2 is a number.



### 3) Util functions
Here is the list of available util functions, their name are self-explanatory.
* boolean = isBoolean( obj )
* boolean = isNumber( obj )
* boolean = isInteger( obj )
* boolean = isFloat( obj )
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


### 4) Options
Flags that can be put in Options:
* verbose : If true, all check errors will log on the console a description of the error.
* throw_exception : If true, all check errors will throw a TypeError exception, if false, check errors will just end the function call and return false.

### 5) Checkable types
* undefined
* boolean
* number
* integer
* float
* string
* stringnum
* array
* object
* function
* error
* date
* regexp

### 6) Checkable properties
Here is the list of all checkable properties to a given object, they are attributes of a type object

* type : 		type of the object, described as a string (see CHeckable types)
* equal : 		what the object should be equal to, does not work with error type
* not_equal : 	what the object shouldn't be equal to, does not work with error type
* not_empty : 	set to true to check if the object is empty
* length : 		what should be the length of the object if it is an array or a string
* full_check : 	verify the type of all elements of the object if is is an array, check only first element otherwise

* structure : 	the structure of the object if it is an object, is a type object itself
* sub_type : 	the type of the elements of the object if it is an array, is a type object itself


### 7) Examples
#### a) Verifying simple arguments
```javascript
function foo(arg1, arg2, arg3){
	sanityjs.arguments_check(["string","number"]);
}
```
#### b) Verifying complex arguments
```javascript
function foo(arg1, arg2, arg3){
	sanityjs.arguments_check(
		[
			{type:"string", not_empty:true} ,
			{type:"array", length:4, sub_type: { type:"string", not_empty:true}}
		]
	);
}
```
#### c) Verifying a variable
```javascript
	var strnum = "123.4";
	sanityjs.object_check( strnum, "stringnum" );
```

#### d) Verifying complex variables
```javascript
	var today = new Date();
	var schedule = {
		date: new Date(),
		tasks_id: [23,24,26,19]
	}
	var type = {
		type: "object",
		structure: [
			{ type: "date" , equal: today },
			{ type: "array", sub_type: "number", full_check: true }
		]
	}
}
	sanityjs.object_check( schedule, type, "schedule" );
```


## II. Features to come
* Implement invalid states checking for numbers
* Possibility to check if a value is between a range, with a optional comparison callback
* Possibility to Check order with a optional comparison callback of an array
* Possibility to give a JSON to object_check instead of only javascript objects
* A label system allowing constraints between different object properties
* Possibility to have many types to check per object

The comparison callback would have this shape:
```javascript
function compare(a, b) {
	if (a inferior to b)
		return -1;
	if (a superior to b)
		return 1;
	// a equals b
	return 0;
}
```
This is the shape used by Array.sort compare function callback

## III. Dev
### 1) Developping
There is no dependencie for the module itself but there are for the Grunt directive.  
The Grunt directive will concatenate the source files into one, then verify the syntax of the ouput, then uglify and minify it. It'll output files "sanityjs.js" and "sanityjs.min.js".  

Source files used by the Grunt directive are in the folder src/.  

Once the development is done, run the command "Grunt" in the root folder of the module.

### 2) Testing
Run  
```
node test.js  
```
or  
```
npm test  
```
in the root folder of the module. If there is a problem, an assertion will occure, else some logs will appear and the program will terminate properly.  
  
New unit test should be added into test.js file


### 3) Using
SanityJS can be used in Nodejs and in the browser.

