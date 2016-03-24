# Sanity JS
SanityJS is a Javascript module that helps checking types of objects and parameters. 

## I. API
### 1) Describing a type
#### a) Type object
In order to check the type of an object or a parameter, it is necessary to describe this type to SanityJS.  
For that SanityJS must be provided with a type object.  

The minimalistic type object is a string containing the name of the type, "type_name" or an object of the shape {type:"type_name"}. The second form is useful if the type has to be described more precisely with optional attributes listed in I.6.
The different values that can be used as type are listed in I.5.
Example:
```javascript
	var simple_type = "string";
	var complex_type = { type: "array", not_empty: true };
```

The type object can be complicated and describe the types of elements of an array or an object. This is done thanks to the  attributes "structure" and "sub_type" placed in the type object. It is then possible to describe multiple level of nested objects and arrays.

#### b) Sub Type
A sub type is a type object, it describes the type of the elements of an array.
Example:
```javascript
	var array = [1;2;3];
	var sub_type = { type: "number", not_equal: [0] };
	var array_type = {
		type: "array",
		sub_type: sub_type
	};
```

#### c) Structure
A structure describes the attributes of an object. It is an array of objects that has two attributes: "name" and "type".
The attribute "name" is the name of the attribute in the checked object, and the attribute "type" is the type object of the checked attribute.

Example:
```javascript
	var obj = { a: "1",	b: "2" };
	var structure = [
		{ name: "a", type: "number" },
		{ name: "b", type: "number" }
	];
	var obj_type = {
		type: "object",
		structure: structure
	};
```

### 2) Main functions
* boolean = object_check(obj, type [, name [, options]])
* boolean = arguments_check(argument_types [, options]) 


#### a) object_check
boolean = object_check(object, type [, name [, options]])
Check that the object or JSON string in the parameter "object" is of the type described by "type".

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
	{ name: "d", type: { "type": "array", "sub_type": "number" } } // complex types can be used whenever there's an object type if necessary
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
* equal : 		a value the object should be equal to, does not work with error type
* not_equal : 	an array of values the object shouldn't be equal to, does not work with error type
* not_empty : 	set to true to check if the object is empty

* cb :			custom checking callback function that will be called given obj as parameter, returns true if success, returns false if fail.
* cb_message : 	string that will be logged if cb call fails, optional.
* label : 		string used to name the checked object, is useful in order to retrieve the said object during a custom checking callback.

* length : 		what should be the length of the object if it is an array or a string
* full_check : 	verify the type of all elements of the object if is is an array, check only first element otherwise

* structure : 	the structure of the object if it is an object, must contain attributes "name" and "type"
* sub_type : 	the type of the elements of the object if it is an array, is a type object itself

Prototype of callback function
```javascript
boolean = function cb(obj, type, name, labels)
```

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
		schedule_version = 3;
		tasks_id: [23,24,26,19]
	}
	var cb = function(obj,type,name){
		return obj >= 2;
	};
	var type = {
		type: "object",
		structure: [
			{ name: "date", type: { type:"date" , equal: today } },
			{ name: "schedule_version", type: { type:"number", cb: cb, cb_message: "is not superior to 2" } },
			{ name: "tasks_id" type: { type:"array", sub_type: "number", full_check: true } }
		]
	}
}
	sanityjs.object_check( schedule, type, "schedule" );
```

#### e) Using labels
In this example we have two arrays of unknown size but we know that they must be of the same size. We're going to use labels and callback function to check this constraint.
```javascript
	var obj = {
		array1 = [ 1, 2, 3],
		array2 = [ 4, 5, 6]
	}
	var cb = function(obj, type, name, labels){
		return labels['array1'].length === obj.length;
	};
	var type = {
		type: "object",
		structure: [
			{ name: "array1", type: { type: "array", label: "array1" } },
			{ name: "array2", type: { type: "array", cb: cb, cb_message: "is not of same size than array1" } }
		]
	}
}
	sanityjs.object_check( schedule, type, "schedule" );
```


## II. Features to come
* Possibility to Check order with a optional comparison callback of an array
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

