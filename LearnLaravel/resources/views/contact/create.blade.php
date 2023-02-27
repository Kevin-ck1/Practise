@extends('layouts.app')

@section('title','Contact')
    
@section('content')

 <div class="row">
    <h1>Contact Us</h1>
 </div>
 <br>

 @if (session()->has('message'))
    <div class="alert alert-success" role="alert">
        <strong>Success</strong>{{session()->get('message')}}
    </div>
 @endif
  
<br>

@if (! session()->has('message'))
    
<div class="row">
    <form action="{{route('contact.store')}}" method = "POST" class="form-group">
            <label for="name">Name:</label>
            <input type="text" name="name" id = "name" value="{{old('name')}}">
        </ >
        {{$errors->first('name')}}
        <br>
        <div class="form-group">
            <label for="email">Email: </label>
            <input type="text" name="email" id = "email" value="{{old('email')}}">
        </div>          
        {{$errors->first('email')}}
        <div><br>

        <div class="form-group">
                <label for="message">Message: </label>
                <textarea name="message" id="message" cols="30" rows="10" class ="form-control">{{old('message')}}</textarea>
        </div>          
            {{$errors->first('message')}}
        <div><br>      

        <button type = 'submit' class = "btn btn-primary">Send Message</button>

        @csrf
    </form>
</div>
@endif

@endsection
