<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Company;
use App\Customer;
use Faker\Generator as Faker;

$factory->define(Customer::class, function (Faker $faker) {
    return [
        "company_id" => factory(Company::class,)->create(),
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'active' => 1,

    ];
});
