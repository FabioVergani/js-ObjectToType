function LowercaseExceptFirst(s){return s.charAt(0).toUpperCase()+s.substring(1)};

function strObj(x){return Object.prototype.toString.call(x)};

function rawObj(o){return Object.create(null,o||{})};

/*
Objects are aggregations of properties. A property can reference an object or a primitive.
Primitives are values, they have no properties.In JavaScript there are 5 primitive types:
undefined, null, boolean, string, number... Everything else is an object!

 undefined
 null
 boolean
 string
 number
+
 global
 date
 error
 function
 array
 object
 regexp
 xmlhttprequest

constructor is a Property of various JavaScript objects:
Array
Boolean
Date
Function Object Property.
Number
Object
RegExp
String


NOTA:
alternate pattern://.match(/^\[object\s(.+)\]$/)[1]
function typeOf(x){return Object.prototype.toString.call(x).slice(8,-1).toLowerCase();};
function typeOf(x){return strObj(x).slice(8,-1).toLowerCase()};
*/

Rgx=Object.freeze(rawObj({
"Pattern":{
	value:{
		PrimitiveTypes:/string|number|boolean|null|undefined/,
	},
	writable:false
}}));
//
function kindOf(x){
	var s=strObj(x).slice(8,-1).toLowerCase(),o=function(v){return{configurable:false,writable:false,value:v}},p=Boolean(x==null?1:(Rgx.Pattern.PrimitiveTypes.test(s)?1:0));
	return rawObj({
		type:o(s),
		isPrimitive:o({
			toString:function(){return String(p)},
			valueOf:function(){return p},
			wrapped:p&&(x!=null&&typeof(x)==='object')?true:false
		})
	})
};






/*
(function(w,m){
	var s,i=0;
	while(s=m[i++]){
		w["is"+LowercaseExceptFirst(s)]=Function("x","return kindOf(x)==="+s);
	};
})(window,[
"global","undefined","null","boolean","string","number",
"date","error","function","array","object","regexp"
]);

"Global",
"Undefined","Null","Boolean","String","Number",
"Date","Error","Function","Array","Object","Regexp"



console.log(isNull(""),isNull(null));


function constructorOf(x){
var r;
try{}finally{return r};
}
*/







//==============
console.clear();
var typesfound=rawObj();
function Test(a,b){
	var o=console;
	o.group();
	o.log("%c"+a,'font-weight:bold');
	//o.dir(b);
	b.forEach(function(x){
		var k=kindOf(x),t=k.type;
		typesfound[t]=t;
		o.log("typekind:",t,"typeof is '"+typeof(x),"'..isPrimitive? "+k.isPrimitive,k.isPrimitive.wrapped?" (wrapped)":"");
	});
	o.groupEnd();
};
//===================================================================================================================================
var indefinito,Empty_arr=[],Simple_arr=[1,2,3],Complex_arr=[[1,2],[3,4]],Empty_obj={},Simple_obj ={a: 1,b: 2},Complex_obj={a:{b: 1}};


Test('#Undefined',[undefined,void(0),indefinito]);
//all: typekind: undefined typeof is undefined ..isPrimitive? true ..Primitive.wrapped? false



Test('#Strings',[
	"",String(""),String(Empty_arr),//""  "" ""
	" ","  ","\t","\n","\r\n","bla",//" " "  " "	" "\n" "\r\n" "bla"
	String(Empty_obj),String(Simple_obj),//"[object Object]" "[object Object]"
	String(Simple_arr),//"1,2,3"
	String("abc"),//"abc"
	String(false),String(true),//"false" "true"
	String(0),String(1),//"0" "1"
	String(undefined),String(indefinito),//"undefined" "undefined"
	String(Object),//"function Object() { [native code] }"
	String(String)//"function String() { [native code] }"
]);
//all: typekind: string typeof is string ..isPrimitive? true ..Primitive.wrapped? false



Test('#Strings-Obj',[
	new String(),
	new String(""),new String("abc"),
	new String(false),new String(true),
	new String(0),new String(1),
	new String(Empty_arr),new String(Simple_arr),
	new String(Empty_obj),new String(Simple_obj),
	new String(undefined),new String(indefinito),new String(Object),new String(String)
]);
//all: typekind: string typeof is object ..isPrimitive? true ..Primitive.wrapped? true



Test('#Numbers',[
	0,1,666.0,3.14,
	Math.PI,//3.141592653589793
	Math.SQRT2,//1.4142135623730951
	Math.SQRT1_2,//0.7071067811865476
	Math.E,//2.718281828459045
	Math.LN2,//0.6931471805599453
	Math.LN10,//2.302585092994046
	Math.LOG2E,//1.4426950408889634
	Math.LOG10E,//0.4342944819032518
	Number(),Number(""),Number(false),Number(0),//0,0,0,0
	Number(true),Number(1)//1,1
]);
//all: typekind: number typeof is number ..isPrimitive? true ..Primitive.wrapped? false

Test('#SpecialNumbers',[
	Number(Empty_arr),//0
	Infinity,//Infinity
	NaN,Number("abc"),Number(Simple_arr),Number(Empty_obj),Number(Simple_obj),
	Number(undefined),Number(indefinito),Number(Object),Number(Number)//NaN
]);
//all: typekind: number typeof is number ..isPrimitive? true ..Primitive.wrapped? false

Test('#Numbers-Obj',[
	new Number(),
	new Number(""),new Number("abc"),
	new Number(false),new Number(true),
	new Number(0),new Number(1),
	new Number(Empty_arr),new Number(Simple_arr),
	new Number(Empty_obj),new Number(Simple_obj),
	new Number(undefined),new Number(indefinito),new Number(Object),new Number(Number)
]);
//all: typekind: number typeof is object ..isPrimitive? true ..Primitive.wrapped? true



Test('#Booleans',[
	true,Boolean("abc"),Boolean(true),Boolean(1),Boolean(Object),Boolean(Boolean),Boolean(Empty_arr),Boolean(Simple_arr),Boolean(Empty_obj),Boolean(Simple_obj),//true
	false,Boolean(),Boolean(""),Boolean(false),Boolean(0),Boolean(undefined),Boolean(indefinito)//false
]);
//all: typekind: boolean typeof is boolean ..isPrimitive? true ..Primitive.wrapped? false

Test('#Booleans-Obj',[
	new Boolean(),
	new Boolean(""),new Boolean("abc"),
	new Boolean(false),new Boolean(true),
	new Boolean(0),new Boolean(1),
	new Boolean(Empty_arr),new Boolean(Simple_arr),
	new Boolean(Empty_obj),new Boolean(Simple_obj),
	new Boolean(undefined),new Boolean(indefinito),new Boolean(Object),new Boolean(Boolean)
]);
//all: typekind: boolean typeof is object ..isPrimitive? true ..Primitive.wrapped? true



Test('#Functions',[
	function(){},//function (){}
	function pippo(){},//function pippo(){}
	Function("a","b","return a + b"),//function anonymous(a,b
	Function(""),//function anonymous() {
	Function()//function anonymous() {
]);
//all: typekind: function typeof is function ..isPrimitive? false ..Primitive.wrapped? false

Test('#FunctionsNative ',[Math.sin,isNaN,Date,Object,Function,]);
//all: typekind: function typeof is function ..isPrimitive? false ..Primitive.wrapped? false
/*
function sin() { [native code] }
function isNaN() { [native code] }
function Date() { [native code] }
function Object() { [native code] }
function Function() { [native code] }
*/

Test('#Functions-Obj',[
	new Function("a","b","return a + b"),//function anonymous(a,b
	new Function(""),new Function()//function anonymous() {
]);
//all: typekind: function typeof is function ..isPrimitive? false ..Primitive.wrapped? false




Test('#Rgxs',[/(zzz)/,/(\b)/gi]);
//all: typekind: regexp typeof is object ..isPrimitive? false ..Primitive.wrapped? true

Test('#Rgxs-Obj',[
	new RegExp(),//\/(?:)/
	new RegExp("(\w)","i")//\/(w)/i
]);
//all: typekind: regexp typeof is object ..isPrimitive? false ..Primitive.wrapped? true



Test('#Dates',[/*All2String: "Sun Apr 20 2014 18:18:20 GMT+0200 (W. Europe Daylight Time)"*/
	Date(),Date(""),
	Date("December 17,1995 03:24:00"),Date("1995-12-17T03:24:00"),
	Date(1995,11,17),Date(1995,11,17,3,24,0),Date(98,1),
	Date(false),Date(0),
	Date(true),Date(1)
]);
//all:typekind: string typeof is string ..isPrimitive? true ..Primitive.wrapped? false

Test('#Dates-Obj',[
	new Date(""),//Invalid Date
	new Date(),//Sun Apr 20 2014 18:18:20 GMT+0200 (W. Europe Daylight Time)
	new Date("1995-12-17T03:24:00"),// Sun Dec 17 1995 04:24:00 GMT+0100 (W. Europe Standard Time)
	new Date(1995,11,17),//Sun Dec 17 1995 00:00:00 GMT+0100 (W. Europe Standard Time)
	new Date("December 17,1995 03:24:00"),new Date(1995,11,17,3,24,0),//Sun Dec 17 1995 03:24:00 GMT+0100 (W. Europe Standard Time)
	new Date(false),new Date(0),new Date(true),new Date(1),//Thu Jan 01 1970 01:00:00 GMT+0100 (W. Europe Standard Time)
	new Date(98,1)//Sun Feb 01 1998 00:00:00 GMT+0100 (W. Europe Standard Time)
]);
//all:typekind: date typeof is object ..isPrimitive? false ..Primitive.wrapped? false



Test('#Errors',[
	new Error("Error-message"),//Error
	new URIError("URI Error-message"),//URIError
	new TypeError("Type Error-message"),//TypeError
	new SyntaxError("Syntax Error-message"),//SyntaxError
	new ReferenceError("Reference Error-message"),//ReferenceError
	new RangeError("Range Error-message"),//RangeError
	new EvalError("Eval Error-message")//EvalError
]);
//all: typekind: error typeof is object ..isPrimitive? false ..Primitive.wrapped? true



Test('#Objects',[
	null,//null
	Empty_obj,Simple_obj,Complex_obj,Object()//Object
]);
//null, typekind: null typeof is object ..isPrimitive? true
//other: typekind: object typeof is object ..isPrimitive? false ..Primitive.wrapped? true

Test('#Objects-Obj',[
	new Object(),new Object(undefined),new Object(Empty_obj),new Object(Simple_obj),//Object
	new Object(""),//String
	new Object(0),new Object(1),//Number
	new Object(false),new Object(true)//Boolean
]);
/*
typekind: object typeof is object ..isPrimitive? false
typekind: string typeof is object ..isPrimitive? true
typekind: number typeof is object ..isPrimitive? true
typekind: boolean typeof is object ..isPrimitive? true
*/



Test('#Array',[Empty_arr,Simple_arr,Complex_arr]);//Array[0],Array[3],Array[2]
//all: typekind: array typeof is object ..isPrimitive? false

Test('#Array-Obj',[
	new Array(),new Array(0),//Array[0]
	new Array(1,2,3),//Array[3]
	new Array(""),new Array(undefined),new Array(false),new Array(1),new Array(true),//Array[1]
	new Array(Empty_arr),new Array(Simple_arr)//Array[1]
]);
//all: typekind: array typeof is object ..isPrimitive? false ..Primitive.wrapped? true



Test('#XMLHttpRequest',[new XMLHttpRequest()]);
//typekind: xmlhttprequest typeof is object ..isPrimitive? false ..Primitive.wrapped? true



Test('#DOM',[window,document,document.body,document.createElement('a')]);
/*
typekind: global typeof is object ..isPrimitive? false ..Primitive.wrapped? true
typekind: htmldocument typeof is object ..isPrimitive? false ..Primitive.wrapped? true
typekind: htmlbodyelement typeof is object ..isPrimitive? false ..Primitive.wrapped? true
typekind: htmlanchorelement typeof is object ..isPrimitive? false ..Primitive.wrapped? true
*/





//=========================
console.debug(typesfound);
