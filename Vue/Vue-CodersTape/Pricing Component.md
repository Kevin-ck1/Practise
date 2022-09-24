## Pricing Component

### Setting up Css

Note tailwindcss is used for the project

Preconfigure the template as shown, basically it contains css

```vue
<template>
    <div class="flex justify-center">
        <div class="w-1/2 bg-blue-900 rounded-lg shadow px-6 py-12 flex flex-col items-center">
            <div class="bg-gray-400 rounded-full justify-around p-1 ">
                <button class="rounded-full text-xs font-bold px-6 py-1 uppercase bg-blue-600 text-gray-200 ">Monthly</button>
                <button class="rounded-full text-xs font-bold px-6 py-1 uppercase "> Yearly</button>
            </div>

            <div class="flex w-full pt-8">
                <div class="text-white w-1/2">
                     <h1 class="flex justify-center text-2xl font-bold ">Starter</h1>
                     <div class="flex justify-center">
                        <ul class="pt-4">
                            <li>Benefit 1</li>
                            <li>Benefit 2</li>
                            <li>Benefit 3</li>
                            <li>Benefit 4</li>
                        </ul>
                     </div>

                        <div class="flex justify-center">
                            <div class="text-3xl font-bold">KSh 99</div>
                            <div class="pl-1 pt-2 text-gray-300">/mo </div>
                        </div>
                </div>

                <div class="text-white w-1/2">
                    <h1 class="flex justify-center text-2xl font-bold">Pro Package</h1>
                    <div class="flex justify-center">
                        <ul class="pt-4">
                            <li>Benefit 1</li>
                            <li>Benefit 2</li>
                            <li>Benefit 3</li>
                            <li>Benefit 4</li>
                        </ul>
                    </div>
                        <div class="flex justify-center">
                            <div class="text-3xl font-bold">KSh 199</div>
                            <div class="pl-1 pt-2 text-gray-300">/mo </div>
                        </div>
                </div>
            </div>

        </div>
    </div>
</template>
```



### Functionality

1. First we are to keep track of which button is selected; yearly or monthly.

   To do so we add a data property called `currentFrequency` 

   Note: that we `monthly` is placed as the default `currentFrequency` , otherwise if it is left black instead, the app fails while iterating and placing the price and label.

   ```js
   data:function(){
        return {
           currentFrequency: 'monthly'
        }
   },
   ```

2. Add a click event to the buttons, so as to set the `currentFrequency` 

   ```js
   <button @click="currentFrequency='monthly'" class="rounded-full text-xs font-bold px-6 			py-1 uppercase bg-blue-600 text-gray-200 ">Monthly</button>
   <button @click="currentFrequency='yearly'"class="rounded-full text-xs font-bold px-6 		py-1 uppercase ">Yearly</button>
               
   ```

3. To show feedback i.e the button selected, upon the  `currentFrequency` selected, we add a class bind and bind the special css class `bg-blue-600 text-gray-200 ` 

   ```html
   <button @click="currentFrequency='monthly'" 
         class="rounded-full text-xs font-bold px-6 py-1 uppercase"
         :class="currentFrequency == 'monthly' ? 'bg-blue-600 text-gray-200' : '' ">
         Monthly
   </button>
                  
   <button @click="currentFrequency='yearly'" 
         class="rounded-full text-xs font-bold px-6 py-1 uppercase"
         :class="currentFrequency == 'yearly' ? 'bg-blue-600 text-gray-200' : '' ">
         Yearly 
   </button>  
   ```

   Note: The`:class=""` is the bounded class

4. Next is to change the price, to display the difference between monthly and yearly.

   To do so we add a new data property `plans`, this will hold all the plans available, yearly, monthly, Starter, Pro

   the `plans` is an array with `pricing` as an object, which has objects inside `price & label` 

   ```vue
   plans: [
       {
           pricing: {
              monthly: {price: 99, label: '/mo'},
              yearly: {price:499, label: '/yr'},
           },
   	 },
   
   	{
           pricing: {
               monthly: {price: 199, label: '/mo'},
               yearly: {price: 999, label: '/yr'},
            },
        },
],
   ```

   Note: Check on the bracket.

5. Now we refactor the the html part so that we can iterate the benefits to the number of pricing objects

   ```html
   <div v-for="plan in plans" class="text-white w-1/2">
        <h1 class="flex justify-center text-2xl font-bold ">Starter</h1>
            <div class="flex justify-center">
                <ul class="pt-4">
                     <li>Benefit 1</li>
                     <li>Benefit 2</li>
                     <li>Benefit 3</li>
                     <li>Benefit 4</li> 
                </ul>
              </div>
   
              <div class="flex justify-center">
                   <div class="text-3xl font-bold">KSh 		   											{{plan.pricing[currentFrequency].price}} </div>
                   <div class="pl-1 pt-2 text-gray-300"> 
                       {{plan.pricing[currentFrequency]. label}}</div>
              </div>
   </div>
   ```

   Note: the price and  label are also added using the syntax `{{ plan.pricing[currentFrequency].price}}` 

   Note: If the data property `currentFrequency` is black, the app fails this is because there is no data to render the part of `[currentFrequency]` 

6. Refactor the benefits

   to do so we add are array of benefits to the plans array

   ```js
   benefits: {
       monthly: ['Benefit 1','Benefit 2', 'Benefit 3'],
       yearly:['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
   },
   ```

   To iterate in the list in html

   ```html
   <ul class="pt-4">
       <li>{{benefit in plan.benefits[currentFrequency]}} </li>
   </ul>
   ```

   Add a name array in the `plans` and name the plans starter and pro

   in the html

   ```html
   <h1 class="flex justify-center text-2xl font-bold ">{{plan.name}}</h1>
   ```

7. To refactor the buttons, such that instead of having to buttons we have one which will be iterated, according to ; monthly, yearly or another plan e.g lifetime

   ```html
   <button @click="currentFrequency=frequency" 
           v-for="(price, frequency) in plans[0].pricing"
           class="rounded-full text-xs font-bold px-6 py-1 uppercase"
           :class="currentFrequency == frequency ? 'bg-blue-600 text-gray-200' : '' ">
                       {{frequency}}
   </button>
   ```

   

   Note: Look into the v-for iteration used above

8. Adding, a Different Currency e.g USD

   Placing the html elements for it

   ```html
   <div class="pt-4 text-center text-gray-400 text-sm font-bold">
         <a href="#" @click.prevent="currency = 'ksh' ">KSH</a> |
         <a href="#" @click.prevent="currency = 'usd' ">USD</a>
   </div>
   ```

   Add a data property of `currency`

   ```js
   currency: 'KSH',
   ```

   Next we attach logic to the price display element, basically we introduce a method that we pass the initial price(in KSH) to it.

   ```html
   <div class="text-3xl font-bold"> {{ getPrice(plan.pricing[currentFrequency].price)}}</div>
   ```

   Adding the method

   ```js
   methods:{
           getPrice(price) {
               return 'Ksh' + price;
           }
   },
   ```

   Adding Methods for differentiating the currencies

   ```js
   methods:{
           getPrice(price) {
               return this['currency' + this.currency.toUpperCase()](price);
           },
           currencyKSH(price){
               return 'KSH '+ (price);
           },
   
           currencyUSD(price){
               return 'USD '+ Math.ceil(price*100);
           },
   },
   ```

   



