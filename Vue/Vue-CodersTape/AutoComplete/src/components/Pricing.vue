<template>
    <div class="flex justify-center">
        <div class="w-1/2 bg-blue-900 rounded-lg shadow px-6 py-12 flex flex-col items-center">
            <div class="bg-gray-400 rounded-full justify-around p-1 ">
                <button @click="currentFrequency=frequency" 
                    v-for="(price, frequency) in plans[0].pricing"
                    class="rounded-full text-xs font-bold px-6 py-1 uppercase"
                    :class="currentFrequency == frequency ? 'bg-blue-600 text-gray-200' : '' ">
                    {{frequency}}
                </button>
  

            </div>

            <div class="flex w-full pt-8">
                <div class="text-white w-1/2" v-for="plan in plans">
                     <h1 class="flex justify-center text-2xl font-bold ">{{plan.name}}</h1>
                     <div class="flex justify-center">
                        <ul class="pt-4">
                            <li v-for= "benefit in plan.benefits[currentFrequency]">{{benefit}} </li>
                        </ul>
                     </div>

                        <div class="flex justify-center">
                            <div class="text-3xl font-bold"> {{ getPrice(plan.pricing[currentFrequency].price)}}</div>
                            <div class="pl-1 pt-2 text-gray-300"> {{ plan.pricing[currentFrequency].label}} </div>
                        </div>
                </div>


            </div>

            <div class="pt-4 text-center text-gray-400 text-sm font-bold">
                <a href="#" @click.prevent="currency = 'ksh'">KSH</a> |
                <a href="#" @click.prevent="currency = 'usd'">USD</a>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'pricing',

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

    data:function(){
        return {
            currentFrequency: 'monthly',

            currency: 'ksh',

            plans: [
               {
                   name:'Starter',

                    benefits: {
                        monthly: ['Benefit 1','Benefit 2', 'Benefit 3'],
                        yearly:['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
                    },
                    pricing:{
                        monthly: {price: 99, label:'/mo'},
                        yearly: {price:499, label:'/yr'},
                    },
                },

                {
                    name:"Pro",

                    benefits: {
                        monthly: ['Benefit 1','Benefit 2', 'Benefit 3'],
                        yearly:['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
                    },

                    pricing: {
                        monthly:{price: 199, label:'/mo'},
                        yearly:{price: 999, label:'/yr'},
                    },
                },
                
            ],
        }
    },
}
</script>