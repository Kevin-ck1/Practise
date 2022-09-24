# JavaScript

## Introduction

### Changing  Html Content 

`getElementById()` is one of the most used methods of JS. The method is used to change html content.

```html
<!DOCTYPE html>
<html>
<body>

<h2>What Can JavaScript Do?</h2>

<p id="demo">JavaScript can change HTML content.</p>

<button type="button" onclick='document.getElementById("demo").innerHTML = "Hello JavaScript!"'>Click Me!</button>

</body>
</html>
```

 In the above code, when the button is clicked it triggers the function `getElementByIds()` , the function in return replaces the content in the `demo id` with the one indicated in the function.

Note that we use `.innerHtml` to change the elements enclosed by the html tags.

### Changing Attributes Values

An example of an attribute is the `src` attribute, used to import images to the `img` tag, we can change the contents as follows.

```html
<button onclick="document.getElementById('myImage').src='pic_bulbon.gif'">Turn on the light</button>

<img id="myImage" src="pic_bulboff.gif" style="width:100px">

<button onclick="document.getElementById('myImage').src='pic_bulboff.gif'">Turn off the light</button>
```



### Hiding Html elements

We can use JS to hide elements, by using `.style.display` and setting it to `none`

```html
<p id="demo">JavaScript can hide HTML elements.</p>

<button type="button" onclick="document.getElementById('demo').style.display='none'"> 		Click Me!
</button>
```

Upon clicking the button, the content in the `p tag` will disappear, in the display.

### Show Hidden Content

We can hide the html content directly on the html tag, and to display it use we use the same `.style.display` and set the value to `block`

```html
<p id="demo" style="display:none">Hello JavaScript!</p>

<button type="button" onclick="document.getElementById('demo').style.display='block'"> 		Click Me! 
</button>
```



## JS Output

To output elements, we can use `document.getElementById()` or `document.write()` 

### document.write()

Note that, while using `document.write()` after the page has loaded, will overwrite any content that has already loaded.

```html
<!DOCTYPE html>
<html>
<body>

<h2>My First Web Page</h2>
<p>My first paragraph.</p>

<button type="button" onclick="document.write(5 + 6)">Try it</button>

</body>
</html> 
```

 In the above code, once the button is pressed, the `h2` and `p` elements, will be deleted, from the display.



### **Alert Box**

To display an alert box, we use `window.alert()` or its short hand syntax `alert()` 

```html
<script>
window.alert(5 + 6);
</script>

or

<script>
alert(5 + 6);
</script>
```



### console.log()

It is for testing purposes, e.g we can console log values from a function to check if the function outputs as required.

```html
<script>
console.log(5 + 6);
</script>
```

### print

To print the page we use `window.print()`

```html
<button onclick="window.print()">Print this page</button>
```



## Data Types

Data Types in JS include:

​		strings -- "Elements enclosed in quotes"

​		numbers -- both decimals and whole numbers are in this category i.e 3, 3.565

​		Booleans -- true and false,

​		arrays -- enclosed in box brackets[], similar to list in python e.g `var a = [1,  3, "Dog"]

​		objects -- similar to dictionaries in python, contain key value pairs.

​							e.g var car = {color: "blue", make: "Volvo"}

​		functions 

```js
//To check the data type

<script>
var x = NaN;
document.getElementById("demo").innerHTML = typeof x;
</script>
```





## Functions 

To declare a function 

```js
function name_of_function(parameter1, parameter2){
    //Write code in this part
}
```



## Objects 

 Similar to dictionaries in python, contain key value pairs.

An example of an object `var car = {color: "blue", make: "Volvo"}`

Their are two methods to access values of key in objects,

Method 1 --- `objectName.propertyname` e.g `car.color` 

Method 2 --- `objectName["propertyname"]` e.g `car['color']`



## Events

Html Events are actions that happen to an html page.

Example of the events

*  Page finishing to load
* Change in an input field
* Button click

JS in return, reacts to this events, e.g

```js
//When the button is clicked, the p tag is populated with the time
<button onclick="document.getElementById('demo').innerHTML=Date()">The time is?</button>
<p id="demo"></p>

//To apply the change to the button tag, itself we use (this.innerHTML)

<button onclick="this.innerHTML=Date()">The time is?</button>
```



Most of the time,  the actions code can be long, hence the events attributes call on function instead

```js
<p>Click the button to display the date.</p>

<button onclick="displayDate()">The time is?</button>

<script>
function displayDate() {
  document.getElementById("demo").innerHTML = Date();
}
</script>

<p id="demo"></p>
```



Some of the common html events, are

* onclick
* onload
* onmouseover
* onmouseout
* onchange
* onkeydown



## Strings

To find the length of a string we use `.length`

```js
//To find the length of car variable

var len = car.length
```

To insert double or single quotes into a string we use `\` as an escape character

```js
var x = 'It\'s alright.';

var x = "We are the so-called \"Vikings\" from the north.";

var x = "The character \\ is called backslash.";
```

If a JavaScript statement does not fit on one line, the best place to break  it is after an operator:

```js
<script>
document.getElementById("demo").innerHTML = "Hello \
Dolly!";
</script>
```



To  find the index of an element in a string , by use of  `.indexOf()`

```js
<script>
var sentence = "Please locate where 'locate' occurs!";
var pos = sentence.indexOf("locate");
document.getElementById("demo").innerHTML = pos;
</script>
```

The above code returns 7, because the position of `l` is the one that it returned.

To return the position of the second `locate` we use `.lastIndexOf()`, this returns the last instance of the element

```js
<script>
var sentence = "Please locate where 'locate' occurs!";
var pos = sentence.lastIndexOf("locate");
document.getElementById("demo").innerHTML = pos;
</script>

//This will give a value of 21
```

Note, `.indexOf()` starts the count from the beginning and increases the value as it goes to the right.

For `.lastIndexOf()` starts from the last value as it goes to the first.

Both `indexOf()`, and `lastIndexOf()` return -1 if the text is not found.

Both methods accept a second parameter as the starting position for the  search:

```js
var str = "Please locate where 'locate' occurs!";
var pos = str.indexOf("locate", 15);

//indexOf()--will start the count the count from 15, onwards, giving a value of 21

var str = "Please locate where 'locate' occurs!";
var pos = str.lastIndexOf("locate", 15);

// .lastIndexOf in this code will start the count from 15, as it decreases, giving a value of 7,
```

​	

To search for an item in a string, we use `.search()`

```js
var str = "Please locate where 'locate' occurs!";
var pos = str.search("locate");
```



### Extracting String Parts

There are 3 methods for extracting a part of a string:

- slice(start, end)
- substring(*start*, *end*)
- substr(*start*, *length*)

`slice()` extracts a part of a string and returns the  extracted part in a new string.

```js
//This outputs banana
var str = "Apple, Banana, Kiwi";
var res = str.slice(7, 13);



//If you omit the second parameter, the method will slice out the rest of the string:
//Hence to output banana, and kiwi

var str = "Apple, Banana, Kiwi";
var res = str.slice(7);

//Note that slice can accept necative indexes, hence to output the same as above
var res = str.slice(-12);
```



`substring()` is similar to `slice()`. The difference is that `substring()` cannot accept negative indexes.

```js
//To output banana using substring
var str = "Apple, Banana, Kiwi";
var res = str.substr(7, 13);
```



`substr()` is similar to `slice()`. The difference is  that the second parameter specifies the **length**  of the extracted part.

```js
//To output banana,
var str = "Apple, Banana, Kiwi";
var res = str.substr(7, 6);

//If you omit the second parameter, substr() will slice out the rest of the string.
```



### Replacing String Content

The `replace()` method replaces a specified value with another  value in a string:

```js
str = "Please visit Microsoft!";
var n = str.replace("Microsoft", "W3Schools");
```

By default, the `replace()` method replaces **only the first** match:

By default, the `replace()` method is case sensitive. Writing MICROSOFT (with  upper-case) will not work:

```js
//To replace case insensitive, use a regular expression with an /i flag (insensitive):
var n = str.replace(/MICROSOFT/i, "W3Schools");

//To replace all matches
str = "Please visit Microsoft and Microsoft!";
var n = str.replace(/Microsoft/g, "W3Schools");
```



### Converting to upper or lower case

```js
//To convert to lowercase
var text2 = text1.toLowerCase(); 

//To conver to uppercase
var text2 = text1.toUpperCase();
```



### Join Strings

We use `.concat()`

```js
var text1 = "Hello";
var text2 = "World";
var text3 = text1.concat(" ", text2);
```



### Trim

The `trim()` method removes whitespace from both sides of a string:

```js
var str = "       Hello World!        ";
alert(str.trim()); 

//To enable support for older browsers, we use replace instead
var str = "       Hello World!        ";
alert(str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
```



### Extracting String Characters

There are 3 methods for extracting string characters:

- charAt(*position*)
- charCodeAt(*position*)
- Property access [ ]

The `charAt()` method returns the character at a specified  index (position) in a string:

The `charCodeAt()` method returns the unicode of the character  at a specified index in a string: The method returns a UTF-16 code (an integer between 0 and 65535).

ECMAScript 5 (2009) allows property access [ ] on strings:

```js
//charAt()
var str = "HELLO WORLD";
str.charAt(0);            // returns H 

//charCodeAt()
var str = "HELLO WORLD";
str.charCodeAt(0);         // returns 72 

//property access
 var str = "HELLO WORLD";
str[0];                   // returns H 
```



### Split

To split a string, we use `.split()`

```js
var txt = "a,b,c,d,e";   // String
txt.split(",");          // Split on commas
txt.split(" ");          // Split on spaces
txt.split("|");          // Split on pipe 
```

### Iterate a string

```js
<script>
var str = "Hello";
var arr = str.split("");
var text = "";
var i;
for (i = 0; i < arr.length; i++) {
  text += arr[i] + "<br>"
}
document.getElementById("demo").innerHTML = text;
</script>
```







## Numbers

They can be either a whole number or a decimal

Exponential notation can be used;

```js
var x = 123e5;    // 12300000
var y = 123e-5;   // 0.00123 
```



### Precision

Integers (numbers without a period or exponent notation) are accurate up to 15 digits.

```js
var x = 999999999999999;   // x will be 999999999999999
var y = 9999999999999999;  // y will be 10000000000000000 
```

The maximum number of decimals is 17, but floating point arithmetic is not  always 100% accurate:

```js
 var x = 0.2 + 0.1;         // x will be 0.30000000000000004 


//to fix the broblem, IT helps to multiple then divide
var x = (0.2 * 10 + 0.1 * 10) / 10;       // x will be 0.3
```



### Hexadecimal

JavaScript interprets numeric constants as hexadecimal if they are preceded by  0x.

```js
 var x = 0xFF;        // x will be 255 
```



By default, JavaScript displays numbers as **base 10** decimals.

But you can use the `toString()` method to output numbers from **base 2**  to **base 36**.

Hexadecimal is **base 16**. Decimal is **base 10**.  Octal is **base 8**. Binary is **base 2**.

```js
var myNumber = 32;
myNumber.toString(10);  // returns 32
myNumber.toString(32);  // returns 10
myNumber.toString(16);  // returns 20
myNumber.toString(8);   // returns 40
myNumber.toString(2);   // returns 100000
```



### The toString() Method

The `toString()` method returns a number as a string.

```js
var x = 123;
x.toString();            // returns 123 from variable x
(123).toString();        // returns 123 from literal 123
(100 + 23).toString();   // returns 123 from expression 100 + 23 
```



### The toExponential() Method

`toExponential()` returns a string, with a number rounded and written using exponential notation.

A parameter defines the number of characters behind the decimal point:

```js
var x = 9.656;
x.toExponential(2);     // returns 9.66e+0
x.toExponential(4);     // returns 9.6560e+0
x.toExponential(6);     // returns 9.656000e+0 
```



### The toFixed() Method

`toFixed()` returns a string, with the number  written with a specified number of  decimals:

```js
var x = 9.656;
x.toFixed(0);           // returns 10
x.toFixed(2);           // returns 9.66
x.toFixed(4);           // returns 9.6560
x.toFixed(6);           // returns 9.656000 
```



### The toPrecision() Method

`toPrecision()` returns a string, with a number written with a  specified length:

```js
var x = 9.656;
x.toPrecision();        // returns 9.656
x.toPrecision(2);       // returns 9.7
x.toPrecision(4);       // returns 9.656
x.toPrecision(6);       // returns 9.65600 
```



### The valueOf() Method

`valueOf()` returns a number as a number.

```js
var x = 123;
x.valueOf();            // returns 123 from variable x
(123).valueOf();        // returns 123 from literal 123
(100 + 23).valueOf();   // returns 123 from expression 100 + 23 
```



### Converting Variables to Numbers

There are 3 JavaScript methods that can be used  to convert variables to numbers:

- The `Number()` method
- The `parseInt()` method
- The `parseFloat()` method

```js
//Using the number() function
Number(true);          // returns 1
Number(false);         // returns 0
Number("10");          // returns 10

//Number function on dates
Number(new Date("2017-09-30"));    // returns 1506729600000

//parseInt() returns a whole number
parseInt("10");         // returns 10
parseInt("10.33");      // returns 10
parseInt("10 20 30");   // returns 10


//parseFloat() returns a number, note that only the first number is returned
parseFloat("10");        // returns 10
parseFloat("10.33");     // returns 10.33
parseFloat("10 20 30");  // returns 10
```





## Arrays

There are two methods for creating arrays

* First Method:

  ```js
  var car = ["Volvo", "Toyota", "BMW"]
  ```

* Second Method:

  ```js
  var car = new Array("Volvo", "Toyota", "BMW")
  ```

**Note** an array can contain a  sting, a number, an object or an another array

An array within an array, an object within an array.

### Access Element of an array

To retrieve an array element, we use its index position to retrieve it

```js
//In the car array, to select Toyota
car[1]
```



### Change an Element

To  change an element in the array

```js
//In the car array to replace Volvo with Honda

car[0] = "Honda" 

//Doing a console log for car, results in Array(3) [ "Honda", "Toyota", "BMW" ]
```



### Length of an array

To find the length or the number of elements in the array, the `.length` property is used

```js
car.length //returns 3
```



### Iterate

To iterate elements of an array

```js
//Using for
<script>
var fruits, text, fLen, i;
fruits = ["Banana", "Orange", "Apple", "Mango"];
fLen = fruits.length;

text = "<ul>";
for (i = 0; i < fLen; i++) {
  text += "<li>" + fruits[i] + "</li>";
}
text += "</ul>";

document.getElementById("demo").innerHTML = text;
</script>


//Using forEach
var fruits, text;
fruits = ["Banana", "Orange", "Apple", "Mango"];

text = "<ul>";
fruits.forEach(myFunction);
text += "</ul>";

function myFunction(value) {
  text += "<li>" + value + "</li>";
} 
```





### Adding Elements to the Array

* To add an element to the **last position** of the array, with use of `.push()` and `.length` 

  ```js
  //To add volvo to the car array using .push()
  car.push("Volvo")
  
  //Using .length
  car[car.length] = "VOlvo" 
  
  //car.length gives the position where we add the element at that position
  ```

* To add an element at the **first position**, with the use of `.unshift()`

  ```js
  //To add Range to the car list
  car.unshift("Range")
  
  //Note the above code will return the length of the code
  ```



* To add an element in another location rather than the first or last place, using `.splice()`

  ```js
  car.splice(1, 0, "Volvo", "Honda")
  
  //The first parameter(2), defines where the added element is to be placed
  //The second parameter(0), specifies the number of elements to be deleted
  //The rest are the elements to be added
  
  //Note that .splice(), returns the deleted elements
  //Hnce from the below array to retrive "volve and honda"
  
  car = [ "Range", "Volvo", "Honda", "Toyota", "BMW" ]
  
  //Using splice, to delete
  
  car.splice(1, 2)  //REturns -- Array [ "Volvo", "Honda" ]
  ```

  



### Removing/Deleting an Element

* To remove the **last element** of an array, we use `.pop()`

  ```js
  //To remove the last element
  car.pop() 
  
  //Note that, in the above code, it returns the value of the removed element,
  
  var a = car.pop() 
  // the variable a will have the value of the item removed from the car array
  ```



* To remove the **first element ** by use of, `shift()`

  ```js
  //To remove the first elemnt,
  car.shift()
  
  //Note, just as in pop, 
  var a = car.shift()
  //The value of the variable a will be the value of the removed element
  ```

  

* To delete an element that is neither in the first or last position, we use `.delete`

  ```js
  delete car[0];           // Changes the first element in fruits to undefined 
  
  //Checking on the array car
  
  console.log(car) //This results in -- Array(3) [ <1 empty slot>, "Toyota", "BMW" ]
  ```



* Using `.splice()` to delete elements

  ```js
  //Using splice, to delete two elements, starting with the one at index(1)
  
  car.splice(1, 2)  
  
  ```

//Note, the splice method will remove the elements from the original array
  ```
  
  



### Check if an element is an array

​```js
//Method 1
Array.isArray(fruits);   // returns true 

//Method 2

fruits instanceof Array;   // returns true 
  ```



### Converting array to string

To do the conversion, `.string()` is used

```js
//To convert the car array into string
car.string()
```

`.join()` can also be used to convert an array to a string

```js
car.join()			 //It will return --- "Honda,Toyota,BMW,Volvo"


//To specify a sepator, you can place the separator inside the brackets

car.join("*")		 //This returns -- Honda*Toyota*BMW*Volvo"
```





### Merging/Concatenating arrays

The `concat()` method is used to join up two arrays,

```js
var boys = ["John", "Tom", "Brian"];
var girls = ["Carol", "June", "Mercy"];

var children = boys.concat(girls)


//We can merge more than two elements
var mergedArray= array1.concat(array1, array2, array3 ...)

//WE can also merge strings 
var array = array1.concat("Hello")
```



### Slice()

It slices an array into a new array

```js
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = fruits.slice(1);

//In the above code slice() creates a new array that starts from the index(1), but the original array will still contain all it elements

```

The slice() function can accept a second argument, the second argument is to contain the position of the element to stop the slice, element whose position is stated in the second argument would not be selected.

```js
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = fruits.slice(1, 3); //Returns -- `[ "Orange", "Lemon" ]

//Note that Apple is in the index 3, and it is not included into the array
```



### toString()

The `.toString()` can be used to convert array elements, into a string separated by commas

```js
fruits.toString();  //Returns --- "Banana,Orange,Lemon,Apple,Mango"
```

 



### Sorting an Array

#### Sorting String Elements

The `.sort()` function sorts the elements inside the array alphabetically.

```js
fruits.sort() //Returns -- Array(5) [ "Apple", "Banana", "Lemon", "Mango", "Orange" ]
```

#### Sorting in Descending order 

The `.reverse()` reverses the array order, hence to sort the items into a descending order, we first sort them, then reverse.

```js
fruits.sort()
fruits.reverse() //Returns -- Array(5) [ "Orange", "Mango", "Lemon", "Banana", "Apple"]
```

#### Sorting Numbers  

Note, the JS does not sort numbers, properly, this is because while sorting it takes number as strings, hence while comparing `"100"` and `"25"` , it takes `25` as the bigger number since `2` is bigger than `1` 

To fix the sorting issues in numbers 

```js
var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return a - b}); 

//Returns-- Array(6) [ 1, 5, 10, 25, 40, 100 ]
```



To sort the number in **descending order**

```js
var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return b - a});
```



#### Compare Function

While sorting the numbers we used the `compare function` --> `(function(a, b){return a - b})`

While sorting, the function compares two values `a` and `b` ,

* If the result of the subtraction is `-ve` , then `a` will be place before `b`

* If the result is `+ve`, then `b` will be place in-front  of `a` 

* If the result is 0 then the values are sorted as is

* The function loops, for every elements

  

#### Sorting at Random

Using `.sort()`, To sort an array in random

```js
var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return 0.5 - Math.random()});
```

Note that using `.sort()` is not that accurate, in that it favors some values over the other.

For proper sorting, we use **The Fisher Yates Method**

```js
var points = [40, 100, 1, 5, 25, 10];

for (i = points.length -1; i > 0; i--) {
  j = Math.floor(Math.random() * i)
  k = points[i]
  points[i] = points[j]
  points[j] = k
} 
```



#### Location of  Highest/Lowest Array Value

To get the the values, we will have to sort the array, in ascending order then taken the first and last element.

```js
var points = [40, 100, 1, 5, 25, 10];

points.sort(function(a, b){return a - b});

points[0]  //To get the lowest value

points[-1] //To get the highest value
```



#### Math.max.apply() & Math.min.apply()

The above function can be used to find both the max and min, without sorting 

```js
var points = [40, 100, 1, 5, 25, 10];

Math.max.apply(null, points) //Returns -- 100

Math.min.apply(null, points) // Returns -- 1
```



We can also use home made function, to find the max and min

```js
//To find the max
function myArrayMax(arr) {
  var len = arr.length;
  var max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
} 

//To find the min
function myArrayMin(arr) {
  var len = arr.length;
  var min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
} 

```



#### Sorting Object Arrays

```js
var cars = [
  {type:"Volvo", year:2016},
  {type:"Saab", year:2001},
  {type:"BMW", year:2010}
]; 
```

The object has two properties, `type` and `year` , note that one contains a string and the other a number

To sort using`year` which contains `Numbers` is easier

```js
cars.sort(function(a, b){return a.year - b.year}); 
```



To sort `type` which contains, `Strings` is a bit difficult

```js
cars.sort(function(a, b){
  var x = a.type.toLowerCase();
  var y = b.type.toLowerCase();
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0;
}); 
```

 



### Addition Array Functions

#### forEach()

The `forEach()` method calls a function once for every element in the array.

In short, it calls for the execution of a function, 

The function called accepts 3 variables;

* The item value
* The item index
* The array itself

To use the `forEach` to iterate an array

```js
var numbers = [45, 4, 9, 16, 25];
var txt = "";

numbers.forEach(myFunction);

function myFunction(value, index, array){
    txt = txt + value + "<br>"
}


//Note in this example, only the value is used, hence we can pass only the value to our function
function myFunction(value){
    txt = txt + value + "<br>"
}
```



#### Array.map()

It is used to create a new array by performing an action to the original array,

Note that the original array stays intact

The function called accepts 3 variables;

* The item value
* The item index
* The array itself

```js
//To multiple by 2, each elements in the Numbers array, then place the result into a new array

var numbers = [45, 4, 9, 16, 25];

var numbers2 = numbers.map(myFunction);

function myFunction(value, index, array){
    return value * 2;
}
```





#### Array.filter()

It is used to return a new condition that passes a certain condition

The function called accepts 3 variables;

* The item value
* The item index
* The array itself

Note, that it is not a must to pass all three variables to the function, we can pass only the variable that is to be used

```js
//To get a new array from the original numbers array, 
//The new array is to have values greater than 18
var numbers = [45, 4, 9, 16, 25];

var numbers1 = numbers.filter(myFunction);

function myFunction(value, index, array){
    return value > 18;
}

```



#### Array.reduce()

It does not return an array, rather it returns a single value.  It does so by reducing all elements to a single element.

The method works from `left to right`

It is useful in adding up elements of an array.

Note that the function takes 4 arguments:

- The total (the initial value / previously returned value)
- The item value
- The item index 
- The array itself

```js
var numbers1 = [45, 4, 9, 16, 25];
var sum = numbers1.reduce(myFunction);

function myFunction(total, value, index, array) {
  return total + value;
} 
```



The `reduce()` function can accept an initial value. i.e from the numbers array we can add the sum of the numbers to 100

```js
var numbers1 = [45, 4, 9, 16, 25];
var sum = numbers1.reduce(myFunction, 100);

function myFunction(total, value, index, array) {
  return total + value;
```



#### Array.reduceRight()

Similar to reduce, but reduce the element from the right to the left

```js
var numbers1 = [45, 4, 9, 16, 25];
var sum = numbers1.reduceRight(myFunction);

function myFunction(total, value, index, array) {
  return total + value;
```





#### Array.every()

It checks if **all** the elements, pass a certain condition. It returns a **Boolean** value

```js
var numbers = [45, 4, 9, 16, 25];
var allOver18 = numbers.every(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}

//In this case the value of allover18 is -- false
```



#### Array.some()

It checks if **some** the elements, pass a certain condition.  It returns a **Boolean** value

```js
var numbers = [45, 4, 9, 16, 25];
var allOver18 = numbers.some(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}

//In this case the value of allover18 is -- True
```



#### Array.indexOf()

It searches an element in an array and returns its position(index)

```js
var fruits = ["Apple", "Orange", "Apple", "Mango"];
var a = fruits.indexOf("Apple");

//The value of a -- 0
```

The method accepts two arguments --- `array.indexOf(item, start)`

* The item
* Position two start the search

Note if the item is absent, the function returns `-1`

If there are more than one element, the function returns the first item, Note it starts the search from the left.

#### Array.lastIndexOf()

It searches for an element in an array and returns, its position(index)

Note: It searches from the right to the left

The method accepts two arguments --- `array.indexOf(item, start)`

* The item
* Position two start the search



```js
var fruits = ["Apple", "Orange", "Apple", "Mango"];
var a = fruits.lastIndexOf("Apple");

// The value of a --- 2,
//Note it returns the index of the second instance of Apple
```



#### Array.find()

It finds the first item that passes the test of a function

The function called accepts 3 arguments;

* The item value
* The item index
* The array itself



```js
//To find the first item that has a value greater than 18

var numbers = [4, 9, 16, 25, 29];

var first = numbers.find(myFunction);

function myFunction(value, index, array){
    return value > 18;
}

//first returns -- 25
```



#### Array.findIndex()

It returns the index of the item that passes the test of a function

The function called accepts 3 arguments;

* The item value
* The item index
* The array itself

```js
//To find the positon of the first item on the list that is greater than 18

var numbers = [4, 9, 16, 25, 29];

var first = numbers.findIndex(myFunction);

function myFunction(value, index, array){
    return value > 18;
}

//The value of first --- 3,
//Which is the position of 25
```



## Dates

By default JS uses the browser's time zone and display it as a string

There are 4 ways to create date objects

* new Date()
* new Date(year, month, day, hour, minutes, seconds, milliseconds)
* new Date(milliseconds)
* new Date(date string)



**new Date()**

This returns the current browser time

```js
new Date() //Returns --- Date Sun Oct 04 2020 23:53:40 GMT+0300 (East Africa Time)
```

**new Date(year, month, day, hour, minutes, seconds, milliseconds)**

This returns the values specified in the argument, note the `year` and `month` are compulsory, the rest are option

```js
new Date(2018, 11, 24, 10, 33, 30, 0) 

//Returns -- Date Mon Dec 24 2018 10:33:30 GMT+0300 (East Africa Time)

new Date(2018, 11, 24, 10, 33)
//Returns -- Date Mon Dec 24 2018 10:33:00 GMT+0300 (East Africa Time)
```

 

**new Date(milliseconds)**

This accepts a single argument(milliseconds), it gives the date by adding the milliseconds to `January 01, 1970, 00:00:00 UTC (Universal Time Coordinated).` 

```js
new Date(100000000);

//Returns -- Date Fri Jan 02 1970 06:46:40 GMT+0300 (East Africa Time)
```



**new Date(date string)**

This accepts a string of date and converts it to JS Date Object

```js
new Date("October 13, 2014 11:13:00");

//Returns -- Date Mon Oct 13 2014 11:13:00 GMT+0300 (East Africa Time)
```



### Displaying Dates

By Default, the date is displayed as a string

`Wed Mar 25 2015 03:00:00 GMT+0300 (East Africa Time)`

**Convert to UTC**

To convert the date to `UTC` time format we use `toUTCString()`

```js
var d = new Date()

d === Date Mon Oct 05 2020 00:06:54 GMT+0300 (East Africa Time)

d.toUTCString() // Returns -- "Sun, 04 Oct 2020 21:06:54 GMT"
```



**toDateString()**

We use this method to convert the dat to a more readable format

```js
var d = new Date()

d === Date Mon Oct 05 2020 00:06:54 GMT+0300 (East Africa Time)

d.toDateString() //Returns -- Mon Oct 05 2020"
```



**ISO standard format**

To convert to the iso standard

```js
d.toISOString(); // Returns -- "2020-10-04T21:06:54.984Z"
```



### Parsing Dates

If we parse a date, we convert it into milliseconds format

```js
var msec = Date.parse("March 21, 2012");

//This returns -- 1332277200000
```

We can also do the reverse, convert milliseconds to date

```js
var d = Date(msec)

//It returns -- "Sat Oct 10 2020 20:58:03 GMT+0300 (East Africa Time)"
```



### Date Methods

**getTime()**

Gets the number of milliseconds since, January 1, 1970

**getFullYear()**

It returns the year of date in 4 digits

```js
var d = new Date()

d.getFullYear

//This Returns -- 2020
```



**getMonth()**

It returns the month of a date from (0 to 11), January being 0 and December being 11

```js
var d = new Date()

d.getMonth + 1

//Note we add one to get the correct month -- 10 for October

//To get the month as a string
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
months[d.getMonth()];

//This returns -- October
```



**getDate()**

It returns the day of the date, in numbers from (1 - 31)

```js
var d = new Date()
d.getDate()

//Returns -- 10
```

**getHours()**

It returns the hour in number ranging from ( 0 - 23)

```js
var d = new Date()
d.getHours() // Returns -- 22
```



**getMinutes() and getSeconds()**

It returns a number with the range (0 - 59)

```js
var d = new Date()

d.getMinutes() //Retrurn -- 16

d.getSeconds()  // Returns -- 50
```

**getMilliseconds**

Returns a number of the range (0 - 999)

```js
d.getMilliseconds() //Returns -- 393
```



**getDay()**

It returns the weekday of the date, as a number between (0 - 6), with Sunday as 0 and Saturday as 1

```js
d.getDay() // Returns -- 6
```

Note that the above gives the local time of the browser, to get the UTC time

```js
d.getUTCTime
d.getUTCFullYear
d.getUTCMonth
d.getUTCDate()
d.getUTCHours

//Note we just add UTC after get
```



### Set Date Methods

They are used to set a part of a date, the notation is similar to that of getTime, we only replace get with set

```js
setDate() 	 //Set the day as a number (1-31)
setFullYear() 	//Set the year (optionally month and day)
setHours() 	//Set the hour (0-23)
setMilliseconds() 	//Set the milliseconds (0-999)
setMinutes() 	//Set the minutes (0-59)
setMonth() 	//Set the month (0-11)
setSeconds() 	//Set the seconds (0-59)
setTime() 	//Set the time (milliseconds since January 1, 1970)

//Example to set the the year to 2019
d.setFullYear(2019)
```



## Math

The `Math.` function, facilitates, mathematical operations

* **Math.round()**

  It rounds a number to its nearest integer

  ```js
  Math.round(4.7) //Returns -- 5
  ```

* **Math.pow**

  To raise a number to a power

  ```js
  //To raise x to the power of y
  Math.pow(x, y)
  ```

* **Math.sqrt()**

  It is used to find the square root of a number

  ```js
  //To find the square root of 81
  
  Math.sqrt(81) //Returns -- 9
  ```

* **Math.abs()**

  Used to return the absolute value of a number

  ```js
  Math.abs(-4.7) //Returns -- 4.7
  ```

* **Math.ceil()**

  Rounds up a value to the nearest integer

  ```js
  Math.ceil(4.7) //Returns -- 5
  ```

  

* **Math.floor()**

  Rounds down a value to the nearest integer

  ```js
  Math.floor(4.7) //Returns -- 4
  ```

* **Math.sin() / Math.cos()**

  It calculates the sine of angle, not that the angle calculated is in radians,

  To calculate the sin of an angle in degrees, we will have to convert it by `x PI / 180`

  ```js
  //To find sine of an angle
  Math.sin(90 * Math.PI / 180);
  
  //To find the cosine of an angle
  Math.cos(0 * Math.PI / 180);  
  ```

  