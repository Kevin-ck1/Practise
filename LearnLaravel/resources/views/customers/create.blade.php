@extends('layouts.app')

@section('title', 'Add New Customer')

@section('content')

    <h1>Add New Customer</h1>
   

        <form action="/customers" method="POST" class="pb-1" enctype="multipart/form-data">
           @include('customers.form')
            <button type ='submit' class='btn-primary'>Add Customer</button>
        </form>
 

@endsection
