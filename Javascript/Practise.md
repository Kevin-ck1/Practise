

```
console.log("Hello World")
```



**Variables**

let, const used to assign variables

let --- when using let we can assign the variable differnt values

let age = 30

console.log(age)

age = 31

console.log(age)

//const on the othe hand we cant reassign the variable

const me = 20

me = 20 // In this we get an error



**Date Types**

They include ; - String, Numbers, Boolean, null,Undefined

const name = 'John';

const age = 30;

const iscool = true;

const rating = 4.5

## Concatenation

`console.log("My name is "+me + " Hello")

### Concatenation using Template Strings = Backticks

 ` console.log(`My name is ${me} two`)

`const s = "Hello, World"

To get length of the string

`console.log(s.length);

To change the case

`console.log(s.toUpperCase());

`console.log(s.substr(0,5).toUpperCase());

Change to an array

`console.log(s.split('')) //This splits by letters

To create an array of words, using the comma and space as separators

`console.log(s.split(', ')) // The separators placed inside the quotes



## Arrays

//They are variable that hold multiple values

const numbers = new Array (1,2,3,4,5) //This is the first method, *new* is a constractor

console.log(numbers);



//Method two -- Eleminating use of constracors



const fruits = ['apple', 'mango', 'banana', 10, true]

console.log(fruits)

//To extract a particular item from the array

// i.e to extract mango from the array



`console.log(fruits[1]) // This is similar to python

To add a value to the array

`fruits[5] = 'cake'

`console.log(fruits)

The above method is not the best

 .push() can be used to add a value to the end of an array

`fruits.push('milk')

`console.log(fruits)

//To add item to the begining

`fruits.unshift('bread')

`console.log(fruits)

//To remove the last item in an array

`fruits.pop()

`console.log(fruits)

//TO check index of an item

`console.log(fruits.indexOf('apple'));

## Objects = Key value pairs

```js
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  hobbies: ['music', 'movies', 'sports'],
  address: {
      street: 'Harambe Road',
      city: 'Nairobi',
      state: 'NA'
  }
}


```



To get the whole object

```js
console.log(person);
```



TO get a specific item in the object

```javascript
console.log(person.firstName, person.lastName);
```





``` js
//To get the movies
console.log(person.hobbies[1]);

//To destructure the items in the object, to get new variables from the object

 const {firstName, age, address:{city}} = person

 console.log(city);



 //TO add a property

 person.email = "doe@gmail.com"

 console.log(person)



 //arrays of objects



 const todos = [

   {

     id: 1,

     text: 'Take out trash',

     isComplete: true

   },

   {

​    id: 2,

​    text: 'Call the hospital',

​    isComplete: true

  },

  {

​    id: 1,

​    text: 'Cook supper',

​    isComplete: false

  },

 ];



 //To get an item from the array

 console.log(todos[1].text);

 //The above array can be changed to json format, as shown below



 const todosJson = JSON.stringify(todos);

 console.log(todosJson);
```



# Loops

```js
const todos = [
    {
        id:1,
        text: "Wake up",
        isComplete: true
    },
    {
        id:2,
        text: "Bath",
        isComplete: true
    },
    {
        id:3,
        text: "Eat Breakfast",
        isComplete: false
    },
]
console.log(todos)
//For 
//for (let i=0; i<=10; i++){
   // console.log(i);
//}

//while

let i = 0;
while(i<10){
    console.log(i);
    i++;
}

//Loopping through an array
for (i=0; i<todos.length; i++){
    console.log(todos[i].text)
};

//FOr item in items
for (todo of todos){
    console.log(todo)
    //console.log(todo.text)
}
```



### High order array methods - forEach, map, filter

``` js
//forEach, map, filter

todos.forEach(function(todo){
    console.log(todo.text)
});

//map, return an array of 
const todotext = todos.map(function(todo){
    return todo.text;
});

console.log(todotext); 

const todoCompleted = todos.filter(function(todo){
    return todo.isComplete == true;
});

console.log(todoCompleted); 

//Combining the functions
const todoCompleted1 = todos.filter(function(todo){
    return todo.isComplete == true;
}).map(function(todo){
    return todo.text;
});

console.log(todoCompleted1); 
```



## Conditionals

``` js
const x = 02;

if (x == 10){
    console.log('x is 10')
} else if(x == 0){
    console.log('x is zero')
} else {
    console.log('x is not 10')
}

const y = 10;
const z = 5;
if(z > 5 || y > 5){

    console.log("Code is okay")
}
// NOte that to use or we use the double pipe caracte ||
//To use and we use &&
```



### Tanary Operator

```js
//Tanary Operator, short hand if operator
const n = 11;

const color = n >10 ? 'red': 'blue';
console.log(color);

//Evaluating the color
switch(color){
    case 'red':
        console.log('Color is red');
        break;
    case 'blue':
        console.log('COlor is blue');
        break;
    default:
        console.log('Color is not Red or Blue')
}
```



## Functions

```js
function addNum(num1, num2){
    console.log(num1 +num2);
};

addNum(4,5);

//Setting default values for the function
function addNum(num1=1, num2=2){
    console.log(num1 +num2);
};

addNum();

//In the function we can return a value
function addNum(num1=1, num2=2){
    return num1 + num2;
};

console.log(addNum(2,6));

//Using arrow function notation

const addNum1 = (num1=1, num2=2) => {
    return num1 + num2;
};

console.log(addNum1(2,7));

// we can slim done the above code
const addNum2 = (num1=1, num2=2) => num1 + num2;
console.log(addNum2(3,7));
```

## OPP

```js
// OOP

//Constractor function
function Person(firstName, lastName, dob){
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
    //Adding methods to the object
    this.BithYear = function(){
        return this.dob.getFullYear();
    }
    this.fullName = function(){
        return `${this.firstName} ${this.lastName}`;
    }
}

//Instantiate object

const person1 = new Person('John', 'Doe', '2-2-1995')
console.log(person1);
console.log(person1.fullName());

//Prototype
function Person(firstName, lastName, dob){
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
    
}

Person.prototype.BithYear  = function(){
    return this.dob.getFullYear();
}
Person.prototype.fullName = function(){
    return `${this.firstName} ${this.lastName}`;
}

//Instantiate object

const person1 = new Person('John', 'Doe', '2-2-1995')
console.log(person1);
console.log(person1.fullName());

//Class
class Person {
    constructor(firstName, lastName, dob){
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = new Date(dob); 
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
//Instantiate object

const person1 = new Person('John', 'Doe', '2-2-1995')
console.log(person1);
console.log(person1.fullName());

```



## DOM

### Selectors

```js
//DOM
//Selectors == Single and Multiple

//Single Element Selectors
console.log(document.getElementById('my-form'));
console.log(document.querySelector('h1'));

//Multiple Element Selector
console.log(document.querySelectorAll('h1'));

//Looping through
const items = document.querySelectorAll('.item');

items.forEach((item) => console.log(item));

//Manipulating the DOM
const ul = document.querySelector('.items');
//ul.remove(); -- Removing the whole element
//ul.lastElementChild.remove(); 
//ul.firstElementChild.remove();

ul.firstElementChild.textContent = 'Hello';

//TO select and change the secong item

ul.children[1].innerText = "Brad";

//Manipulating the style

const btn = document.querySelector('.btn');
btn.style.background = 'Red';
```



### Events

```js
//Event listners
const btn = document.querySelector('.btn');

btn.addEventListener('click',(event)=>{
    event.preventDefault();
    console.log(event.target); // give the object clicked
    console.log(event.target.className)

    //To manipulate the dom after and event
    document.querySelector('#my-form').style.background = 'red';
    
    //To add a class
    document.querySelector('body').classList.add('bg-dark');

})
```

### FOrm

```js
const myform = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myform.addEventListener('submit', onSubmit);

function onSubmit(event){
    event.preventDefault();
    console.log(nameInput.value);

    //Validating the form inputs
    if(nameInput.value == '' || emailInput == ''){
        alert('Please Fill in all fields')
    } else {
        const li = document.createElement('li');
        //li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
        li.innerText = `${nameInput.value} : ${emailInput.value}`;
        userList.appendChild(li);

        //clear the fields
        nameInput.value = '';
        emailInput.value = '';
    }
}

```

