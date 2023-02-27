<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('welcome', function () {
    return view('welcome');
});

Route::get('contact', 'ContactFormController@create')->name('contact.create');
Route::post('contact', 'ContactFormController@store')->name('contact.store');

/*
Route::get('about', function(){
    return view('about');
});
*/

//To simplify the above syntax

Route::view('about', 'about')->middleware('test');

Route::view('/','home');

//Introducing a view inside a directory(internals)
/*
//To pass data to the view through the route file
//Point to not the view part can accept more than one variable, we fast pass the html page, then souce of data

Route::get('customers', function(){

    $customers = [
        'John Doe',
        'Jane Doe',
        'Bob '
    ];

    return view('internals.customers',[
        'customers'=> $customers,
    ]);
});

*/

//To pass data from the controller

//Route::get('customers','CustomerController@index');
//Route::get('customers/create','CustomerController@create');
//Route::post('customers','CustomerController@store');
//Route::get('customers/{customer}', 'CustomerController@show');
//Route::get('customers/{customer}/edit', 'CustomerController@edit');
//Route::patch('customers/{customer}', 'CustomerController@update');
//Route::delete('customers/{customer}', 'CustomerController@destroy');

//To replace the above lines, we can use routes resource
Route::resource('customers', 'CustomerController');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
