#![allow(unused)]

use std::f32::consts::PI;
// To install/import libraries
use std::{io, vec}; //This is the starndard input output library
// use std::io::* This will import all libraries under io
use rand::Rng; // To generate random values

use std::io::{Write, BufRead, BufReader, ErrorKind};
use std::fs::File;
use std::io::prelude::*;
use std::cmp::Ordering;

fn main(){
    //To access the file
    let mut file = File::open("info.txt").expect("Can't open the file!");

    //Creating an empty string to place the contents of the file
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Cannot read file");

    println!("File Contents:\n{}", contents);
}



//Vectors
fn main_vectors(){
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

}

//Trait - something that an object/class can do
fn main_trait(){
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

    let rec = Rectangle{width: 10.0, length:10.0};

    println!("Rec Area:{}", rec.area());

    // println!("Rec Area:{}", rec.area());
    // println!("Circ Area:{}", circ.area());
}
fn main_inhouse(){
    struct  Person{
        name: String,
        age: u8
    }

    //Note in this case ToString is an inhouse trait
    impl ToString for Person{
        fn to_string(&self) -> String {
            return  format!("My name is {} and I am {}.", self.name, self.age);
        }
    }


    let dom = Person{
        name: String::from("Dominic"),
        age: 21
    };

    println!("{}", dom.to_string());
}

fn main_impl2(){
    struct Rectangle {
        width: u32,
        height: u32
    }

    //Adding functions to the Rectangle Struct
    impl Rectangle {
        //Writing the function
        //Note we pass *&self* so that we can access the members of the rectangle
        //I.e the properties width and height

        fn print_desc(&self){
            println!("Rectangle: {} x {}", self.width, self.height);
        }

        //Funtion that returns a bool
        fn is_square(&self) -> bool {
            self.width == self.height
        }

    };
    //Creating a rectangle object
    let rec = Rectangle{ width: 10, height: 10};

    //Using the function
    rec.print_desc();

    //2nd Function
    println!("Rectangle is a square: {}", rec.is_square());
}

//Arrays
fn main_array(){
    let numbers = [1, 2, 3, 4, 5];
    // let numbers = [2 ; 6];

    //To access a value --> numbers[2]
    // println!("The value in the index 2 is {}",numbers[2]);

    //To iterate a list
    for n in numbers.iter(){
        println!("{n}");
    }
    println!("Break");
    //To loop through the index, using range 0 to list length
    for i in 0..numbers.len(){
        println!("{}", numbers[i]);
    }
}

//refrencing in function
fn main_ref_function(){
    //Creating a struct instance
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
}

//More on structs i.e struct tuple
fn main_tuple_struct(){
    //Create tuple struct
    struct Color(u8, u8, u8);

    //To create an instance of the struct named red
    let mut red = Color(255, 0, 0);

    //To change the value of a member
    red.1 = 50;

    //To access value of the struct we use the dot syntax + index value
    println!("red is {}, {}, {}", red.0, red.1, red.2);
}

//Referencing
fn main_referencing(){
    let mut x = 10;
    //To create a refrence of x called xr
    let xr = &x;
    // println!("{}", xr);

    let dom = &mut x;
    *dom += 1;
    println!("{}", dom);
}
//Functions example
fn main_function(){
    fn print_num(num:u32){
        for n in 1..num {
            println!("{}", n)
        }
    }

    fn is_even(num:u32) -> bool {
        return num % 2 == 0;
    }

    //print_num(14);

    //is_even(10);

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

    //print_even(20)

    //To return multiple values
    fn get_1(x: i32) -> (i32, i32){
        return (x+1, x+2);
    }

    let (v1, v2) = get_1(1);
    println!("{} & {}", v1, v2)
}

fn main_tuple(){
    let  tup1 = (20, "Rust", 3.5, false);

    //To access the value of tupple we use its index
    //println!("{}",tup1.1);

    //Creating a tuple inise a tuple
    let tup2 = (20, "Rust", 3.5, false, (1,4,7));

    //To access a value inside the tuple inisde the tuple
    println!("{}", (tup2.4).1);

    let (a, b, c, d) = tup1;

    println!("{}: {}: {}: {}",a , b, c, d);

}

fn main_impl(){
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
fn main_enum(){
    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }

    //To access the value of an enum
    let mut player_direction = Direction::Up;

    //To manipulate the enum
    match player_direction {
        Direction::Up => println!("We are Heading Up!"),
        Direction::Down => println!("We are going Down!"),
        Direction::Left => println!("Left is right!"),
        Direction::Right => println!("Going Right!"),
    }
}

fn main_stuct(){
    struct Customer{
        name: String,
        address: String,
        balance:f32,
    }

    //To creat a struct instance
    let mut bob = Customer{
        name: String::from("Bob Smith"),
        address: "555 Main St".to_string(),
        balance: 234.50,
    };

    //To comfirm if the the bob object is created
    println!("{}", bob.name);

    //To change a value
    bob.address = String::from("502 Main Street");

    println!("{}", bob.address);

    //Use Abstract data type - To create a struct
    struct Rectangle<T,U>{
        length: T,
        width: U,
    }

    let mut rec = Rectangle{
        length: 10,
        width: 2.4,
    };

    println!("The area is {} x {}", rec.length, rec.width);

}

//Constant variables
fn main_cont(){
    const MIL:u32 = 1_000_000;
    const PI:f32 = 3.142;
    let age = "47";
    let mut age: u32 = age.trim().parse().expect("Age Wasn't assigned a number");
    age = age+2;

    println!("I am {}, and I want {}", age, MIL);
}

//Practise with strings
fn main_readline(){
    //Writing a function that asks for a user's name and receives keybord input
    println!("What is your name?");
    //Defining an empty string variable called name + a greeting variable
    let mut name: String = String::new();
    let greeting = "Nice to meet you";

    //To receive input
    io::stdin().read_line(&mut name).expect("Didn't Receive Input");

    //To Print the received name
    println!("Hello {}! {}", name.trim_end(), greeting);
    //.trim_end() --- Prevents the program from generating a new line

}

fn main_for(){
    //Defining a range
    let numbers = 30..51;

    for i in numbers{
        println!("The number is {}", i)
    }

    //Iterating through vectors
    let animals = vec!["Rabbit", "Dog", "cat"];

    for a in animals.iter(){
        println!("This is a {}", a);
    }

    //To find the index of the items
    for (index, a) in animals.iter().enumerate(){
        println!("The index of {} is {}", a, index);
    }

}

fn main_while(){
    let mut n = 1;

    while n <= 50{
        //if n is a multiple of 5
        if n%5 == 0 {
            println!("n is {}", n);
        }
        
        n+=1;
    }
}

fn main_loop(){
    let mut n = 0;

    //To run a function continuously we use loop
    loop{
        n+= 1;

        if n > 7 && n < 9{
            continue;
        }

        if n > 10{
            break;
        }

        println!("The value of n is {}", n);
    }
}

fn main_if_else(){
    let n = 35;

    if n < 30 {
        println!("This number is less than 30");
    }else if  n < 40{
        println!("This number is between 30 and 40")
    } else{
        println!("This number is greater than 40")
    }
}

//Data Types - Start
fn main_data_types() {
    println!("What is your name?");
    //Declaring a string variable named *name*
    let mut name: String = String::new();

    // name.push_str("Kevin");
    name = "Kevin".to_string();

    println!("{}",name);

    let greeting: &str = "Nice To meet you";
    println!("Hello! {}",greeting);
    
    // let mut x = 45;  // not mut makes the variable mutable, i.e we can change it later
    // println!("The value of x is {}", x);

    // x = 60;

    // println!("The value of x is {}", x);

    //i32 data type
    let x:i32 = 45;
    println!("The value x:{} is an i32 data type", x);

    //i64 data type
    let x:i64 = 4564;
    println!("The value x:{} is a i64 data type", x);

    //u64 data type - unsigned data type (positive integer)
    let x:u64 = 9876;
    println!("The value x:{} is an unsigned data type - positive integer", x);

    //Float type f32 and f64
    let x:f32 = 34.34;
    println!("The value x:{} is a f32 data type - i.e a float integer", x);
    //Note => f32 has 6 digits of precision while f64 has 14 digits of precision

    //Boolean
    let b: bool = false;
    println!("{}", b);

    println!("Max u32: {}", u32::MAX);
    println!("Max f32: {}", f32::MAX);
    println!("Max u64: {}", u64::MAX);
    println!("Max usize: {}", usize::MAX);
    println!("Max i32: {}", i32::MAX);
    println!("Max i64: {}", i64::MAX);
    println!("Min i32: {}", i32::MIN);
    println!("Min i64: {}", i64::MIN);
    println!("Max isize: {}", isize::MAX);
    println!("Min isize: {}", isize::MIN);


    //Math
    let num_1 :f32 = 1.111111111111111;
    println!("f32: {}", num_1 +0.111111111111111);

    let num_2 :f64 = 1.111111111111111;
    println!("f64: {}", num_2 +0.111111111111111);
    
    //Note from the above we can see that f32 has 6 digits of precision while f64 has 14 
    //digits of precision



}
