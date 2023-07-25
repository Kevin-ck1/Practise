# Rust

To create a new project, run the below

```shell
cargo new **Name_of_project**
```

* Note, `cargo` is a package installer used in rust, it is similar to `pip` or `npm`, for python and JavaScript respectively.
* The above will create some sample files that will help in the creating of the project. 
  * cargo.toml & cargo.lock => shows the dependencies used for the project. `cargo.tmol` is editable and`.lock` is not editable. 
  * Hence to install external libraries, we can input them in the `.toml` 
  * `main.rs` - contains the project file where we will do the coding

`#![allow(unused)]` - On the main.rs file at the top, we can add this line of code, this will remove errors that arise due do variables that have been declared but not used.

Alternatively, to create a new project we can simply, create a `main.rs`, and in the file start with the `main()` function, because this is the start of all rust programs'.

Setting up libraries into the `main.rs` file;

* To import a library to the program, we use the keyword `use`, then followed by the library, then the specific library we want. For instance to install the input output library which is a standard library under rust,

  ```rust
  use std::io;
  ```

* To install all libraries inside **io**

  ```rust
  use std::io::*;
  ```

* To use an external library, e.g libray to generate random values, we are to import it as follows;

  ```rust 
  use rand::Rng; // To generate random values
  ```

  * Note that `rand` is not , a standard rust library hence to incorporate it, we will introduce it into the `cargo.toml` file, which will install it

    ```toml
    [dependencies]
    rand = "0.8.5"
    ```

* To install various libraries(crates) at once, we can use nested paths, as shown below

  ```rust
  use std::io::{Write, BufRead, BufReader, ErrorKind};
  ```



## Functions

To create a function we will use the keyword `fn`, and not every rust program starts with the `main()` function.

```rust
fn main() {
    println!("Hello, world!");
}
```



## Running a program

To run the program;

* cd into the directory with `main.rs` file => `cd  src`

* on the shell run `rustc main.rs` ==> this compiles the program,  and creates an executable file i.e `main.exe` and also the accompanying file `main.pdb`
* then run `./main`, we on a **shell** and `main.exe` if on a **command prompt**

If we are on VS Code, with the use of the extension `rust-analyzer`,  we can run a function with the generated run button at the top of a function.



To run the program if it has been created by **cargo** ; run the below command

```shell
cargo run
```





## Structure

`println!("String here")` - to print someting

`let`  - used to declare variable, with the use of **let** alone, the variable declared, is immutable, i.e the variable value cannot be changed. Think of this as `const` in **javascript**

`let mut` - The variable declared is mutable, hence can be changed... can be equated to 	`let` in **javascript**.

Hence declaring a mutable variable of type string;



## Comments

To write a comment;

```rust
//This is a single line comment
//Single line comments starts with a double slash

/* 
This is a multiline comment
Everything between is a comment
*/
```



## Variables

`let`  - used to declare variable, with the use of **let** alone, the variable declared, is immutable, i.e the variable value cannot be changed. Think of this as `const` in **javascript**

`let mut` - The variable declared is mutable, hence can be changed... can be equated to 	`let` in **javascript**.

**Data Types**



**Integers + Boolean**

1. *i32* - This is a signed 32 bit integer 

   ```rust
   let mut x:i32 = 45;
   ```

2. *i64* - This is a signed 64 bit integer - This allows us to store large numbers into the variable

   ```rust
   let mut x:i64 = 45;
   ```

3. *u64 or u32* - This allows us to store unsigned integers, i.e non negative values.

   ```rust
   let mut x: u64 = 45;
   ```

4. *f32 or f64* - This is used to declare float in rust, ie f32 has 6 digits of precision while f64 has 14 digits of precision

   ```rust
   let x:f32 = 34.34;
   ```

5. *bool* - To declare Boolean values

   ```rust
   let b: bool = false;
   ```

**Summary on intergers**

The are divided into *signed and unsigned*

* *signed intergers* - They include both -ve and +ve numbers => i8,i16,i32,i64,i128,isize
* *unsigned intergers* - They include only +ve numbers => u8,u16,u32,u64,u128,usize







**Strings**

A string can be declared using `String` and `&str`.

* `&str` - can also be used as `&'static str`  - it creates string slices

```shell
let greeting: &str = "Nice To meet you";
```

* `String`

```rust
//To create an empty String variable
let mut name: String = String::new();

//Various ways to populate a string
name.push('K') //Used to populate single characters
//The below two methods are used to populate str 
name.push_str("Kevin");
name = "Kevin".to_string();

//To create and populate a string
let name: String = String::from("Kevin")
```



```rust
let s = "Hello".to_string();
```



## Constants 

They can be declared outside the global scope

```rust
const MAX_NUM:u32 = 20;

fn main(){
    println!("{}", MAX_NUM)
}
```

Note that with constants, it is a must to declare the type of variable. 

Also the name of the variable should be in uppercase.

Also constants are immutable

## If Else Statements

```rust
fn main(){
    let n = 40;

    if n < 30 {
        println!("This number is less than 30");
    } else{
        println!("This number is greater than 30")
    }
}
```

*if-else*

```rust
let n = 35;

    if n < 30 {
        println!("This number is less than 30");
    }else if  n < 40{
        println!("This number is between 30 and 40")
    } else{
        println!("This number is greater than 40")
    }
```



## Loop

To run a function continuously we use the loop key word

```rust
fn main(){
    let mut n = 0;

    //To run a function continuously we use loop
    loop{
        n+= 1;
        println!("The value of n is {}", n);
    }
}
```

The above function will print the statement when it is run, to stop it use `ctrl + c`

To break the function inside the code, we can use an if statement, to do so.

```rust
fn main(){
    let mut n = 0;

    //To run a function continuously we use loop
    loop{
        n+= 1;

        if n > 10{
            break;
        }

        println!("The value of n is {}", n);
    }
}
```



 **continue** - It can be used to skip a statement, for instance in the above example if we want to skip 7

```rust
fn main(){
    let mut n = 0;

    //To run a function continuously we use loop
    loop{
        n+= 1;

        if n == 7{
            continue;
        }

        if n > 10{
            break;
        }

        println!("The value of n is {}", n);
    }
}
```



## While loop

```rust
fn main(){
    let mut n = 1;

    while n <= 50{
        //if n is a multiple of 5
        if n%5 == 0 {
            println!("n is {}", n);
        }
        
        n+=1;
    }
}
```





## For Loop

```rust
fn main(){
    for i in 1..11{
        println!("The number is {}", i)
    }
}
```

Not in the above `1..11` indicates the range between 1 and 11

Hence creating a range variable and iterating through it

```rust
fn main(){
    //Defining a range
    let numbers = 30..51;

    for i in numbers{
        println!("The number is {}", i)
    }
}
```



## Enum

It stores data in a similar way to a list.

To define an enum we use the keyword `enum` and inside the brackets we input the data that we want to store. For instance we can create an enum named direction and input the directions *up, left, down and right*

```rust
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

//To access the value of an enum
let mut player_direction = Direction::Up;

```

To manipulate the enum created, we normally use the **match** statement which is similar to the switch statement in other languages.

```rust
//To manipulate the enum
match player_direction {
    Direction::Up => println!("We are Heading Up!"),
    Direction::Down => println!("We are going Down!"),
    Direction::Left => println!("Left is right!"),
    Direction::Right => println!("Going Right!"),
}
```

If we run the above code, the line `We areHeading Up!` will be printed, this is because the value of *player_direction* is up.

## impl

It used in conjunction with other data defined data types, in that it used to add functionality to the data type.

For instance we can create an enum called Day that houses the days of the week. And to the enum we can attach the function **is_weekend**, to check if the day is a weekend.

```rust
fn main(){
    enum Day {
        Monday, Tuesday, Wednesday, Thursday, Friday,
        Saturday, Sunday,
    }

    impl Day {
        fn is_weekend(&self) -> bool {
            match self {
                Day::Saturday | Day::Sunday => true,
                _ => false
            }
        }
    }

    let mut today = Day::Monday;

    println!("Today is a weekend: {}", today.is_weekend())
}
```

Note that the *impl* is followed by the name of the data type/structure that we are adding the functionality. 

In the `is_weekend(&self)` function we have passed in the keyword **&self**, this enables us to access the members of the **enum**, we are able to have access to the days *Monday, Tuesday....*



Note that in the above is an independent implementation.

For straits we use  *implement traits **for** types* - Note the keyword **for**, we will discuss further in the traits section.



## Tuple

It is a data structures that can store data of different types. It can be thought of as a list.

```rust
fn main(){
   let  tup1 = (20, "Rust", 3.5, false);

   //To access the value of tupple we use its index
   println!("{}",tup1.1);
}
```

Note that in the above it is not necessary to declare the type of the data inside the tuple.

We can also nest a tuple inside a tupple

```rust
//Creating a tuple inise a tuple
let tup2 = (20, "Rust", 3.5, false, (1,4,7));

//To access a value inside the tuple inisde the tuple
println!("{}", (tup2.4).1);
```



We can also extract the values inside a tuple and place them into separate variable

```rust
let (a, b, c, d) = tup1;
println!("{}: {}: {}",a , b, c, d);
```









## Struct

It is a data structure that stores multiple types of data i.e it can store strings, integers, floats, booleans e.t.c in one.

It can also be thought as a class/object, in that we create a class instructor which we in-turn use it to create the object properties.

To create a struct we use the `struct` key word, followed by the name of the struct and inside the curly brackets the fields of the struct, in the below example we have created the **Customer** struct, which has the fields *name, address and balance*.

```rust
struct Customer{
    name: String,
    address: String,
    balance:f32,
}
```

To create an instance of a struct object, i.e to create a struct named bob

```rust
//To creat a struct instance
let mut bob = Customer{
    name: String::from("Bob Smith"),
    address: "555 Main St".to_string(),
    balance: 234.50,
};

//To comfirm if the the bob object is created
println!("{}", bob.name);
```



To change an item in the struct, it will be similar to that of a hashtable.

```rust
bob.address = "502 Main St".to_string();
```

With structs we can also use abstract data types, i.e data whose type is unknown.

```rust
struct Rectangle<T,U>{
        length: T,
        width: U,
    }

    let mut rec = Rectangle{
        length: 10,
        width: 2.4,
    };

    println!("The area is {} x {}", rec.length, rec.width);
```



## Struct Tuple

In this case instead of defining the field(keys) of the struct, we simply input the data types of the data to be stored in the form of a tuple

```rust
fn main(){
    //Create tuple struct
    struct Color(u8, u8, u8);

    //To create an instance of the struct named red
    let mut red = Color(255, 0, 0);

    //To change the value of a member
    red.1 = 50;

    //To access value of the struct we use the dot syntax + index value
    println!("red is {}, {}, {}", red.0, red.1, red.2);
}
```



## Traits

A **trait** can be defined as a collection of methods. Methods that are used in several types i.e several **structs** can be compiled under one housing called the **trait**. Note that functions in a trait can be used by any struct.

We declare a trait using the `trait` keyword followed by the name of the trait.

In the below example, we define the **trait** `Shape`, which houses the functions `new` and `area`, which will be used by the **structs**; `Rectangle` and `Circle`.

```rust
fn main(){
    //To create a trait
    trait Shape {
        //Constructor that returns a Shape
        fn new(length: f32, width:f32) -> Self;

        //Area function
        fn area(&self) -> f32;
    }

    //Defining Rectangle and Circle struct
    struct Rectangle {length: f32, width:f32}
    struct Circle {length: f32, width: f32}

    impl Shape for Rectangle {
        //Constructor - Create the shape oject
        fn new(length: f32, width:f32) -> Self {
            return Rectangle{length, width};
        }

        fn area(&self) -> f32 {
            return self.length * self.width;
        }

    }

    impl Shape for Circle {
        //Constructor - Create the shape oject
        fn new(length: f32, width:f32) -> Self {
            return Circle{length, width};
        }

        fn area(&self) -> f32 {
            return (self.length/2.0).powf(2.0)*PI;
        }

    }

    //Creating the circle and rectangle shapes
    // let rec: Rectangle = Shape::new(10.0, 10.0);
    // let circ: Circle = Shape::new(10.0, 10.0);

    // println!("Rec Area:{}", rec.area());
    // println!("Circ Area:{}", circ.area());
    
    let rec1 = Rectangle{width: 10.0, length:10.0};

    println!("Rec Area:{}", rec1.area());
    
}
```

Note that with the `fn new()` function of the `Shape` strait,  we can create  an instance of a struct. `let rec: Rectangle = Shape::new(10.0, 10.0);`,

If we create the struct the old way, `let rec1 = Rectangle{width: 10.0, length:10.0};`, we will still be able to access the functions inside the `shape` trait.





## Functions

A function is declared with the use of the `fn` keyword, followed by the name function. The `main()` is an example of a function.

Note that functions can be declared inside or outside the main function.

```rust
fn print_num(num:u32){
    for n in 1..num {
        println!("{}", n)
    }
}
fn main(){
    print_num(10);
}
```

In the above function we have created the function `print_num`, which accepts a variable named `num`, which is of the type `u32`.  The function iterates and prints the values of integers in the `range 1..num`.

The function is then called inside the `main` function, and the value `10` is passed to it. 

To return a value from a function we will have to specify the type of value to be returned. In the below example since we want to check if a value is even, we are going to specify the value to be returned as even. 

```rust
fn main(){
    fn is_even(num:u32) -> bool {
        return num % 2 == 0;
    }

    is_even(10);
}
```

Calling a function inside another function

```rust
//To combine functions
fn print_even(num:u32){
    for n in 1..num{
        if is_even(n){
            println!("{} is even", n)
        }
        else{
            println!("{} is odd", n)
        }
    }
}
```

To return multiple values from a function

```rust
 //To return multiple values
    fn get_1(x: i32) -> (i32, i32){
        return (x+1, x+2);
    }

    let (v1, v2) = get_1(1);
    println!("{} & {}", v1, v2)
```

### Pass a value to a function by referencing

Due to the effect of ownership, if a variable is used inside a function without referencing, the variable will not be available to be used elsewhere. In the below example the variable `blue` , is used in the function `print_color` without reference it. Note that if we use the `blue` outside the function, it will not execute.

```rust
fn main(){
    //Creating a struct instance
    struct Color {
        red: u8,
        green: u8,
        blue: u8
    }

    let blue = Color{red: 0, green:0, blue:255};

    //creating a function
    fn print_color(c: Color){
        println!("R:{}, G:{}, B:{}", c.red, c.green, c.blue);
    }

    print_color(blue);

    println!("{}", blue.blue); //This will through an error
}
```

To solve the above, we will use referencing on the variables.

To incorporate reference to a function, we will use the **&**, while defining the variable type as shown below

```rust
//creating a function
fn print_color(c: &Color){
    println!("R:{}, G:{}, B:{}", c.red, c.green, c.blue);
}

print_color(&blue);

println!("{}", blue.blue);
```



Note that we use the **&** , both while calling the function and also while defining the function type while defining the function.

To make the variable mutable we will use the **&mut** instead, noting that also the `blue` variable will be made to be mutable.

```rust
struct Color {
    red: u8,
    green: u8,
    blue: u8
}

let mut blue = Color{red: 0, green:0, blue:255};

//creating a function
fn print_color(c: &mut Color){
    c.blue = 200;
    println!("R:{}, G:{}, B:{}", c.red, c.green, c.blue);
}

print_color(&mut blue);

println!("{}", blue.blue);
```

Referencing other data types

* Lists => `fn sum_list(list: &[i32]){}` => `sum_list(&my_list)`
* Sting => `fn change_string(name: &String){}` => `change_string(&mut "Kevin".to_string())`
* 



## Code Blocks

it is a part of code located between two curly brackets, variables and functions outside the brackets are available to the code block, but the once inside are not available outside

```rust
fn main(){
    let mut x = 5;
    {
        let mut y = 6;
        
        println!("x:{} , y:{}", x, y) //This will run
    }
    
    println!("x:{} , y:{}", x, y) //This will not run
}
```



## Referencing

Due to rust ownership where, the goal is to save memory, we use referencing when we want a copy of a variable. To reference a variable we use the symbol `&`.

```rust
fn main(){
    let mut x = 10;
    //To create a refrence of x called xr
    let xr = &x;
    println!("{xr}");
}
```

*Note* that in the above, the **xr** is immutable, to make a mutable reference we will use `&mut`

```rust
let dom = &mut x;
*dom += 1;
println!("{}", dom);
```



## Arrays

We use the **[]**, to define an array

```rust 
let numbers = [1, 2, 3, 4, 5]
```

We can also define an array by stating its data type followed by the number of items it contains, for instance we can define the above as shown below;

```rust
let numbers: [i32; 5] = [1, 2, 3, 4, 5]
```

To access a value in the array

```rust
numbers[2] // to get the value 3
```

To loop through an array => per item

```rust
//To iterate a list
for n in numbers.iter(){
    println!("{n}")
}
```

Note that we use the keyword `.iter()`, this will allow as to use a copy of the `numbers ` array.

To loop through an array through the index

```rust
for i in 0..numbers.len(){
    println!("{}", numbers[i]);
}
```



To populate an array  whose value are similar, 

```rust 
let numbers = [2; 400];
```



## Vectors

They are similar to arrays that can frow if mutable. Note that they only store values of the same type.

```rust
//Create an empty vector of type i32
let mut vec1:Vec<i32> = Vec::new();

//Create and populate a vector
let mut vec2 = vec![1, -2, 3, 4];

//To access a value, we use index
println!("{}", vec2[2]);

//To add to a vector
vec1.push(40);
println!("{}", vec1[0]);

//To remove an element, with help of index
vec2.remove(2);
println!("{}", vec2[2]);

//To remove and return the last value i.e pop
println!("Pop {:?}", vec2.pop());

//To find length of the vector
println!("Vec length: {}", vec2.len());

//Iterating the vector
for number in vec2.iter(){
    println!("{}",number)
}

//Cycle and change values
for i in &mut vec2 {
    *i *= 2;
}

//cycle through the values/ iterate
for i in &vec2{
    println!("{}", i);
}
```



## Reading a File

We will first have to import the libraries `File` and `prelude`, which enable us access the file and manipulate the file respectively.

```rust
use std::fs::File;
use std::io::prelude::*;


fn main(){
    //To access the file
    let mut file = File::open("info.txt")
    .expect("Can't open the file!");

    //Creating an empty string to place the contents of the file
    let mut contents = String::new();
    file.read_to_string(&mut contents)
    .expect("Cannot read file");

    println!("File Contents:\n{}", contents);
}
```



## Command Line arguments

