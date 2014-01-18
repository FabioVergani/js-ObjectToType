Object.toType=function(o){return Object.prototype.toString.call(o).match(/\[object\s(\w+)\]/i)[1].toLowerCase()};



/*
/\s([a-z]+)/i
/\s([a-z]+)/i
/(\[object\s)([a-z]+)(\])/i
/\[object\s(\w+)\]/i
*/


//
var Cases=[
new ReferenceError,
function(){},
new Date,
/a-z/,
'',' ','abc',new String("abc"),
false,true,new Boolean(1),
0,1,new Number(3),Infinity,
[],[1,2,3],
{},
Math,JSON,null,undefined
];
/*
[object Error]
[object Function]
[object Date]
[object RegExp]
[object String]
[object Boolean]
[object Number]
[object Array]
[object Object]
[object Math]
[object JSON]
[object Null]
[object Undefined]
*/


//Cases.length=1;
Cases.forEach(function(x){
/*
var m=Object.prototype.toString.call(x).match(/\[object\s(\w+)\]/i)
console.dir(m);
console.log(m[1]);
*/
console.log(Object.toType(x),"\t",typeof x,x)
});
//
/*
error object ReferenceError {stack: (...)}
function function function (){}
date object Sat Jan 18 2014 21:47:36 GMT+0100 (W. Europe Standard Time)
regexp object /a-z/
string string
string string
string string abc
string object String {0: "a", 1: "b", 2: "c", length: 3}
boolean boolean false
boolean boolean true
boolean object Boolean {}
number number 0
number number 1
number object Number {}
number number Infinity
array object []
array object [1, 2, 3]
object object Object {}
math object
MathConstructor
json object JSON {}
null object null
undefined undefined undefined
*/







