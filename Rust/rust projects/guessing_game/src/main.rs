
//importing the input output library
use std::io;

//importing rang from rand
use rand::Rng;

use std::cmp::Ordering;

fn main() {
    //Creating prompt to great the user
    println!("Guess the number!");

    //Generating the secrete number
    let secret = rand::thread_rng().gen_range(1, 101);

    println!("The secret number is: {}", secret);

    println!("Please input your guess.");

    loop {
        //creating a variable to store users input
        let mut guess = String::new();

        //using stdin function of the io library and saving the value to guess
        io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

        //converting the guess to an interger
        //let guess: i32 = guess.trim().parse().expect("Please type a number");
        //Handling the error with match
        let guess: i32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Please input a number");
                continue;
            },
        }; 

        println!("You guessed: {}", guess);

        //comparing the two numbers
        match guess.cmp(&secret) {
            Ordering::Less => println!("Too Small"),
            Ordering::Greater => println!("Too Big!"),
            Ordering::Equal => {
                println!("You win");
                break;
            },
        }
    }

}
