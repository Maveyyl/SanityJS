# Sanity JS

## API
### Main functions
* boolean = arguments_check(argument_types, options) 
* boolean = object_check(object, structure, name, options)
* boolean = value_check(value, type, name, options ) 

#### arguments_check
boolean = arguments_check(argument_types, options) 

#### object_check
boolean = object_check(object, structure, name, options)

#### value_check
boolean = value_check(value, type, name, options ) 


### Util functions
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

### Use cases

### Options
Flags that can be put in Options:
* verbose : If true, all check errors will log on the console a description of the error.
* throw_exception : If true, all check errors will throw a TypeError exception, if false, check errors will just end the function call and return false.

### Checkable types
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

### Checkable properties
Here is the list of all checkable properties to a given value.

* type : type of the value, described as a string (see CHeckable types)
* equal : what the value should be equal to
* not_equal : what the value shouldn't be equal to
* not_empty : set to true to check if the value is empty
* length : what should be the length of value if it is an array or a string
* structure : the structure of value if it is an object
* sub_type : the type of the elements of value if it is an array
* full_check : verify the type of all elements of the value if is is an array, check only first element otherwise


## TODO
* Remove the object check function
* A label system allowing constraints between different values properties
* Allow JSON to be given instead of object for object_check
