<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Customer; 
use App\Company;
use App\Mail\WelcomeNewUserMail;
use Illuminate\Support\Facades\Mail;
use App\Providers\EventServiceProvider;
Use App\Events\NewCustomerHasRegisteredEvent;
use Intervention\Image\Facades\Image;


class CustomerController extends Controller
{



    public function list1(){
        $customers = Customer::all();
    
        return view('internals.customers',[
            'customers'=> $customers,
        ]);
    } 

    //To seperate data into active an inactive
    public function list2(){
      $activeCustomers = Customer::where('active','1')->get();
      $inactiveCustomers = Customer::where('active', '0')->get();

      return view('internals.customers',[
          'activeCustomers'=> $activeCustomers,
          'inactiveCustomers'=> $inactiveCustomers,
      ]);
    } 

    //Using compact to shorten the retun view code
    public function list3(){
        $activeCustomers = Customer::where('active','1')->get();
        $inactiveCustomers = Customer::where('active', '0')->get();
  
        return view('internals.customers',compact('activeCustomers', 'inactiveCustomers'));
      } 

    //Using Eloquent scope to make the snytax more readable
    public function list(){
        $activeCustomers = Customer::active()->get();
        $inactiveCustomers = Customer::inactive()->get();
        $companies = Company::all();
  
        return view('internals.customers',compact('activeCustomers', 'inactiveCustomers', 'companies'));
      } 

    //Using Route method modelling
    public function index(){
        $customers = Customer::with('company')->paginate(15);

        $companies = Company::all();
       
  
        return view('customers.index',compact('customers','companies'));
      } 
     
    //to intial data for the initial data entry(the form)
    public function create(){

        $companies = Company::all();
        $customer = new Customer();  //Introducing an empty model to remove error when trying to display name in the text box in the edit view

        return view('customers.create', compact('companies', 'customer'));
    }

    public function store1() {

        $data = request()->validate([
            'name'=> 'required|min:3',
            'email'=> 'required|email',
            'active'=> 'required',
            'company_id'=>'required',

        ]);

        $customer = new Customer();
        $customer->name =request('name');
        $customer->email =request('email');
        $customer->active = request('active');
        $customer->save();

        return back();
    }

    //To mass assign data to database, to reduce repetition in the code

    public function store2() {

        $data = request()->validate([
            'name'=> 'required|min:3',
            'email'=> 'required|email',
            'active'=> 'required',
            'company_id' => 'required',           
        ]);

        Customer::create($data);
        
        return redirect('customers');
    }  

    //Since validation is done in both store and update, a validation fuction can 
    //created to avoid repetion
    public function store() {

        $this->authorize('create', Customer::class);

       $customer = Customer::create($this->validateRequest());

       $this->storeImage($customer);

       event(new NewCustomerHasRegisteredEvent($customer));
       
       
        
        return redirect('customers');
    }  


    public function show(Customer $customer){

        return view ('customers.show', compact('customer'));

    }
    public function edit(Customer $customer){

        $companies = Company::all();

        return view ('customers.edit', compact('customer','companies'));

    }


    public function update(Customer $customer){

       $customer->update($this->validateRequest());

       $this->storeImage($customer);
       
        return redirect("customers/$customer->id");

    }

    
    public function destroy(Customer $customer){

        $customer->delete();
         
         return redirect("customers");
 
     }

    private function validateRequest() {

        return request()->validate([
            'name'=> 'required|min:3',
            'email'=> 'required|email',
            'active'=> 'required',
            'company_id' => 'required',  
            'image' => 'sometimes|required|file|image|max:5000',         
        ]);

       
    }  

    //Since the image is to be displayed back to the view, we store it seperately
    
    private function storeImage($customer)
    {
        if (request()->has('image')){
            $customer->update([
                'image' => request()->image->store('uploads', 'public'),
            ]);

            //$image = Image::make('public/storage/'.$customer->image)->fit(300, 300);

            //$image->save(); 
        }
    }

}