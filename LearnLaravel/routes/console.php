<?php

use App\Company;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');

Artisan::command('contact:company-clean', function () {
    $this->info('Clealing!');

    Company::whereDoesntHave('customers')
        ->get()
        ->each(function ($company){
            $company->delete();

            $this->warn('Deleted: '.$company->name);
        });
})->describe('Delete empty Copanies');

Artisan::command('company:add', function () {
        $name = $this->ask('What is the company\'s name?');
        $phone = $this->ask('What is the company\'s phone number?');

        if($this->confirm('Are you ready to insert '.$name. '?')){
            $company = Company::create([
                'name' => $name,
                'phone' => $phone ?? 'N/A',
            ]);

            return $this->info('Added: '.$company->name);
        }
})->describe('Add Company');