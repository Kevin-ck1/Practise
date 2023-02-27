@extends('layouts.app')

@section('title', 'Customers List')

@section('content')

    <h1>Customers Lists</h1>

    @can('create', App\Customer::class)
        <p><a href="customers/create">Add New Customer</a></p> 
    @endcan
    
    
    @foreach ($customers as $customer)
    <div class="row">
        <div class="col-2">{{$customer->id}}</div>
    <div class="col-4"><a href="/customers/{{$customer->id}}">{{$customer->name}}</a></div>
        <div class="col-4">{{$customer->company->name ?? "" }}</div>
        <div class="col-2">{{$customer->active}}</div>
    </div>
        
    @endforeach
    
    <div class="row">
        <div class="col-12 d-flex justify-content-center pt-3">
            {{$customers->links()}}
        </div>
    </div>
    
    
@endsection


   