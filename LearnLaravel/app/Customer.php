<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $guarded=[];

    //To set default attributes
    protected $attributes = [
        'active' => 0,
        
    ];

    //To set attributes to display the name instead of 1,0
    public function getActiveAttribute($attribute){
        return $this->activeOptions()[$attribute];
    }

    //To create a command active, for calling active customers in the controller
    public function scopeActive($query){
        return $query->where('active','1');
    }

    //To create command for calling inactive customers
    public function scopeInactive($query){
        return $query -> where('active','0');
    }

    //To show the relation between the company and customers
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function activeOptions()
    {
        return [
            1 => 'Active',
            0 => 'Inactive',
            2 => 'In-Progress',
        ];
    }
}
