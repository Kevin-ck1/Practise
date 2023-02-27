@extends('layouts.app')

@section('title', "Edit Details for $customer->name")

@section('content')

<h1>Edit Details for {{$customer->name}}</h1>
   

<form action="/customers/{{$customer->id}}" method="POST" class="pb-1" enctype="multipart/form-data">

            @method('PATCH')

            @include('customers.form') 


            <button type ='submit' class='btn-primary'>Save Customer</button>

            @csrf
        </form>
 

@endsection
