# VUE MASTERY NOTES

In this,  we are going to create a shopping cart for socks

The app is created while learning vue

## Vue Instance

In this lesson, we’ll show you how to use Vue to display data onto a webpage.

The the index.html is setup as shown, with the vue cdn being pulled and also the main.js file is pulled.



```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Product App</title>
    </head>

    <body>
        <div id="app">
            <p>Hello World</p>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
        <script src="main.js"></script>
    </body>
</html>
```

 The vue instance is placed in the main.js file

where by we link the div whose id is `app` to the vue instance by using the `el: '#app'` 

The `vue instance`  is initiated as shown  

```js
new Vue({
    el: '#app',
    
    data:{
        product: 'Socks'
    } ,
    
})
```

In the above `vue instance` we have created a data property, called `product` which contains a value `Socks` as a variable

To display the content of the `product` data property, in the html

```html
<h1>{{product}}</h1>
```



## Attribute Binding

In this part, we have downloaded the style sheet and the socks image from vue mastery.

The html is refactored to pull in the css, and also to create a navbar, and also to bring in the image

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Product App</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>

    </head>

    <body>

        <div class="nav-bar"></div>
        <div id="app">
           <div class="product">
               <div class="product-image">
                   <img :src="image" alt="">
               </div>

               <div class="product-info">
                    <h1>{{product}}</h1>
               </div>
           </div>
        </div>

        <script src="main.js"></script>

    </body>
</html>
```



The image is placed as a data property in our main.js file

```js
    data: {
        product: 'Socks',   
        image: './assets/vmSocks-green-onWhite.jpg',
    },
```

Unlike the product which we use double curly brackets {{}} to display the data, for the image it is to be bond to the `src` attribute of `<img src="">`  .

Hence in shot if we want to `display`  the `data` property into the the html we use {{}} or `v-text=""` but if we are to pass the data to the an `attribute` of html  tag, we use `v-bind:` 



## Conditional Rendering

`v-if` `v-else` `v-else-if`  and `v-show` 

In this part we are to display the text of whether the item is in stock or not

In the main.js file, we create a data directive of `inStock` which is to contain a Boolean value of `true` 

```js
inStock: true,
```



in the html we introduce the `v-if` and `v-else` into the `p` tags. Where by if the `inStock` is set to be true,

 we display `In Stock` in the browser and if it is false it displays `Out of Stock` 

```html
<div class="product-info">
       <h1>{{product}}</h1>
       <p v-if="inStock">In Stoke</p>
        <p v-else>Out Of Stock</p>
</div>
```



To use `v-else-if` 

Instead of `inStock` lets use `inventory` and set it to `100` so 

```js
inventory: 100,
```

The first condition to display should be, `In Stock` if the inventory is greater than 10, then display `Almost out of Stock` if the inventory is less than 10, lastly `Out of stock` if  inventory is empty.

```html
<div class="product-info">
      <h1>{{product}}</h1>
      <p v-if="inventory > 10">In Stoke</p>
      <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
       <p v-else>Out Of Stock</p>
</div>
```

Another conditional directive that can be used is `v-show` 

While using `v-if` , it adds or removes the element from the `DOM` i,e display, where as when using

`v-show`  the element still remains, on that it becomes invisible to the display. It adds a css property of `display:none` to the html tag.

```html
<div class="product-info">
       <h1>{{product}}</h1>
       <p v-show="inStock">In Stoke</p>
</div>
```



## List Rendering

`v-for` 

Aim is to iterate a list, from an array of details in the data property 

```js
details: ["80% cotton", "20% polyester", "Gender-neutral"],
```

To iterate

```html
<ul>
    <li v-for="detail in details" >{{detail}} </li>
</ul>
```

Note:

An array has square brackets `[]` whlie an objects iinside an array has {}

```js
array: [
    {the part enclosed by curly brackets is the object}
]
```

To iterate objects inside an array, having the below data property

```js
variants: [
    {variantId:2234, variantColor:"green"},
    {variantId:2235, variantColor:"Blue"},
],
```

To iterate the above

```html
<div v-for="variant in variants" :key="variant.variantId">
      <p>{{variant.variantColor}}</p>
 </div>
```

Note: for object array, it is best to have an id property for each object, so as link each iteration to its contents properly, we use `v-bind:key=""` 



## Event Handling

The Aim is to  learn how to listen for DOM events that we can use to trigger methods.

To do so, we create a cart and also add a button to add an item to the cart.

First, we create a data property of `cart` and give it a value of `0` 

```js
cart: 0,
```

 Next, we add a button in the html and and place the event listener inside the button tags, as shown below.

```html
<button v-on:click="cart += 1">Add to Cart</button>
```

In the above ` v-on` is the event listener, which listens for an event, the event being `click` and upon the occurrence of the event click, the function in quotes is executed. 

To display the items inside the `cart` 

```html
<div class="cart">
     <p>{{cart}}</p>
</div>
```

The expression `cart +=1 ` is simple enough to be placed inside the html, but when the expression is complicated, we place it in the js, inside a method as a function.

The `method:` is placed in our vue instance and is on the same level as `data:`

In our case we can add the expression to a function called `addToCart`

```js
methods: {
        addToCart(){
            this.cart += 1;
        },
},
```

To execute the method, we are call it in the html by initiating the the click 

```html
 <button v-on:click="addToCart">Add to Cart</button>
```



NOTE: `data:` `methods:` are referred to as properties 

For the next step we are to include an image property to the `variants` array and add a link to our images, both green and blue.

```js
variants: [
      {variantId:2234, variantColor:"green", variantImage:"./assets/vmSocks-green-						onWhite.jpg"},
      {variantId:2235, variantColor:"Blue",  variantImage:"./assets/vmSocks-blue-						onWhite.jpg"},
],
```



Now to show more operations  on event handling, lets create an event that when we hover over a socks color the image gets updated.

First, at the `p tag` that iterates the color, we add an event listener, `v-on:mouseover`  to initiate a function 

`updateProduct` note: short hand syntax  of `v-on` is `@`

We pass on an argument `variant.variantImage` , note that to pass on an argument(variable) to a function we do it as shown, where by we want the function to use the argument as variable so as to execute. 

Since there are several `variantImages` , passing the argument this ways ensures, that only one `variantImage` is set to the function.

```html
<div v-for="variant in variants">
    <p @mouseover="updateProduct(variant.variantImage)">{{variant.variantColor}}</p>
</div>
```

For the `updateProduct` function, it is to change the `image` property was it is activated,

```js
updateProduct(variantImage){
     this.image = variantImage;
},
```

Other Event Listeners 

`@click=""` `@mouseover=""` `@submit=""` `@keyup.enter=""` 



## Class & Style Binding

In this part we are to bind data to an element's style attribute,

For the iteration of the `variantColor` instead of text, we are to create a color box instead.

note that in our css we have a class property of color box with the following properties,

`.color-box {  width: 40px; height: 40px; margin-top: 5px;}` this creates a small box with dimensions as shown.  Now we give our div the above class property, and also we create an inline style attribute of adding color to the created box. `style="{backgroundColor:green}"` 

To obtain the color for a particular variant, we have to bind the style to a variantColor property, to do so we do as follows `:style="{backgroundColor: variant.variantColor}"`where we add `:` before style to indicate the binding.

The refactored code indicating the style binding is given below

```html
<div v-for="variant in variants"
      :key="variant.variantId"
      class="color-box" 
      :style="{backgroundColor: variant.variantColor}" 
     @mouseover="updateProduct(variant.variantImage)">
</div>
```

EXTRA

To disable the add cart button when `inStock` is `false` ,

Hence first we are to introduce the `disable` attribute into our button. `disable="!inStock"`

With this there are no visible changes to the display, hence we introduce a  style class from out css that will only take effect when the `inStock` is false, hence to do so we have to bind it to the `inStock` property in our vue instance `:class: "{disabledButton: !instock }"` . Note `disableButton` in a Class property in our css.

```html
<button v-on:click="addToCart" 
        :disabled="!inStock" 
        :class="{disabledButton:!inStock}"
        >Add to Cart
</button>
```

Other Notes

AN object can also be bound to classes

`<div :class="classObject"></div>` where `data: {classOject:{active:true, textDanger: false}},` 

Can also bind several classes

`<div :class="activeClass, errorClass"> </div>` 

We can even perform conditional logic

`<div :class="[isActive ? activeClass: '']"></div>



## Computed Properties 

Note: `methods`  property accepts variable while `computed`  do not

To start with we add a new data property with its value `brand: 'Vue Mastery'`

The aim of this part is to display the `brand: Vue Mastery` together with `product: 'Socks'` 

There are several ways to do so, in our case we are to use `computed:` properties to do so

We can added a `computed:`  in our vue instance properties and a function of title, which is to add `brand` to `product` 

```js
computed: {
        title(){
           return this.product + " " + this.brand
        }
},
```

html

```js
<h1>{{title}}</h1>
```

Complex Operations

In this part we are refactoring the code

In our html, at the `mouseover:` event we pass only the `variantImage` to our the method, hence the code is as follows 

```html
<div v-for="variant in variants"
      :key="variant.variantId"
      class="color-box" 
      :style="{backgroundColor: variant.variantColor}" 
     @mouseover="updateProduct(variant.variantImage)">
</div>
```

To pass more than the `variantImage` i,e to pass everything of the selected object, we use the object's `index` , while iterating we introduce `index` into the for statement as the list is been iterated it is paired with its `index` we do so as shown `v-for="(variant, index) in variants"` and hence for the event we pass in the `index` instead of `variant.variantImage`  hence  the refactored code is as shown below

```html
<div v-for="(variant, index) in variants"
      :key="variant.variantId"
      class="color-box" 
      :style="{backgroundColor: variant.variantColor}" 
     @mouseover="updateProduct(index)">
</div>
```

With these, once we hover over a box, we obtain the index of the hovered element, to record the index, we create a `data:` property called `selectedVariant:` with an initial value of `0 ` 

```js
selectedVariant: 0,
```

The `updateProduct` function is to be updated, such that instead of passing data to the image property it passes the selected `index` to the `selectedVariant` 

```js
updateProduct(index){
    this.selectedVariant = index
    console.log(index)
},
```

Note: `console.log(index)` used to check if the index is correctly picked.

Next, the `image` data property is removed and a computed property of `image` is created that selects the correct image from the index that is passed into our vue instance.

```js
image(){
   return this.variants[this.selectedVariant].variantImage;
},
```

Inside, we are returning `this.variants`, which is our array of variants, and we are using our `selectedVariant`, which is either 0 or 1, to target the first or second element in that  array, then we’re using dot notation to target its image.

To do another refactor while using the index, for our `inStock`  we want to refactor it such that each variant has an independent state, i.e green might be in stock while blue is not. To do so we delete the `inStock` data property and create it as a computed property.

First we create `variantQuantity` object in the `variants` array.

```js
inStock(){
     return this.variants[this.selectedVariant].variantQuantity;
 },
```

the expression `<button v-on:click="addToCart" :disabled="!inStock"  :class="{disabledButton:!inStock}"\>Add to Cart</button>` still works since zero is `falsely`



## Components

We register a component as follows 

```js
Vue.component('product', {})
```

Where the name of the component is `product` and inside the curly brackets we place the functionality of the component.

Inside the options bracket, we add our template

```js
Vue.component('product', {
    template:`
		<div>
			// The html is placed here
		</div>
	`
})
```

Note: we must nest our html elements within one parent element i.e a div tag

In a component, the data property is function that returns a value

```js
data(){
    return {
        // data goes in here
    }
}

```

###### Props

Used to send data into a child component from a parent component, or from our root instance into our  component . Take that in our root instance we have data property of `premium` with  a Boolean value of `true` ,

```js
new Vue({
    el: '#app',
    data: {
        premium: true
    }
})
```

Aim is set free shipping cost if a user is a premium member, 

In our component, we add a `props` to specify that we are to receive data from the parent.

```js
Vue.component('product', {
    props: ''
})
```

Note we can use built in props validation to show the `data type` and also `make it required` 

```js
Vue.component('product', {
    props: {
        premium:{
            type: Boolean,
            required: true
        }
    }
})
```

In the above code, the component is told to expect some data is coming its way



In the template we can create an element to display our prop to make sure that it is working

```js
<p>User is Premium: {{premium}} </p>
```

In the above part, the element knows that it to display the data ones it receives it.



So far the component knows that it is receiving data, to transmit the data we do so in the html by creating a custom attribute with a name similar to the data property being transmitted `:premium=""` and we use `:` to show that it bounded to our vue instance, we pass the data into it our component through this attribute

`:premium="premium"` 

```html
<div id="app">
    <product :premium="premium"></product>
</div>
```

Note: We place the component into our html as a html tag as shown above, with the prop as its attributes.

Instead of displaying `<p>User is Premium: {{premium}} </p>` we can can create a function that shows shipping cost, for premium members shipping is free an for others its 2.99

```js
computed: {
      shipping(){
          if(this.premium){
                return 'Free'
           }
           else {
               return 2.99
            	}
            }
},
```

And in the template

```htm
<p>Shipping Cost is {{shipping}} </p>
```



## Communicating Events

In the above section, we are passing data from the parent component into our component, but what if we want to do the reverse. 

Hence in this section we are looking at how we are emitting a signal from the child, that is to be received by the parent.

The goal of this section is to, allow the product component to tell the parent that an event has occurred, and then send data along with the event.

In the index.html we  are to display the items in our cart, which is a data property inside the root instance,

```html
<p>
    Items in Cart {{cart}}
</p>
```



Placing a data property of `cart` into our root instance

```js
new Vue ({
   el: "#app",
   data: {
   		premium: true,
    	cart: 0,
   },
})
```

In the component part, we create a add to cart button, and a function that gets trigged once, the button is clicked.

```js
template: `
    <div>
        <p>Shipping Cost is {{shipping}} </p> 
        <button @click="addToCart">Add To Cart</button>   
    </div>
`,
  
methods:{
    addToCart(){}
},
```

 Having set the method, our goal is to transmit the event click to the parent, 

```js
methods:{
    addToCart(){
		this.$emit('add-to-cart')
    }
},
```

In this part the method, `addToCart` transmits a signal named `'add-to-cart'` ,  it does so by using the syntax `this.$emit()` 

To receive the signal emitted (transmitted)  we place the `receiver` at the `product tag` in the index.html,

since the `product` is nested within our root instance(i,e parent). Hence the `product tag` is used for by the component to receive and also send data, to the parent.

The syntax of the`receiver`  is as shown `@add-to-cart=""` , the receiver is given the same name  as that of signal. 

```js
<product :premium="premium" @add-to-cart=""></product>
```

To initiate a method once the signal is received by the `receiver` , we place the methods name inside the double quotes of the `receiver`

```js
<product :premium="premium" @add-to-cart="updateCart"></product>
```

At this step the `updateCart` function is triggered, In the root instance, create the function and make it to add an item to the cart.

```js
methods: {
    updateCart(){
       this.cart += 1
    }
 },
```



So far, we have been able to transmit a signal and receive it, and trigger a function after it has been received. A part form transmitting the signal, we can pass on data up to the parent, by piggy-backing the data onto the signal.

```js
methods:{
    addToCart(){
		this.$emit('add-to-cart', "Data to transmit")
    }
},
```

 In `this.$emit('add-to-cart', "Data to transmit")` the second term in the bracket`"Data to transmit"`   is the data that is to be transmitted to the parent.

To save the data into a data property, we can adjust the `cart:` into an array

```js
cart: [],
```

Then we will have to push the data into the `cart` array

```js
methods: {
       updateCart(dataa){
               this.cart.push(dataa)
       }
},
```



Now to display the number of items in the cart we use `cart.length` 

```js
<p>Items in Cart {{cart.length}} </p> 
```



Note if we are to have a variants data array, like in the shopping part of the project, we can use the following syntax, to pass on the id from the component to the parent.

```js
methods:{
    addToCart(){
		this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    }
},
```

`this.variants[this.selectedVariant].variantId` this syntax identifies the ID of the selected item in the variants array.

## Forms and V-model

The goal of this part is to allow users to submit reviews

For this part we create a new component to house our review form, called `product review` 

In the component, we create a form with the following fields; `name` `review` and `rating` . Note the rating  has `v-model.number="rating"` the `.number` ensures that the number is stored as an integer.

In the form tag the `.prevent` is used to prevent the page from reloading once the page is submitted

 Next we are to create data property with the same names, we are to do a two way binding with the help of `v-model` 

```js
Vue.component('product-review', {
                template:`
                <form class="review-form" @submit.prevent="onSubmit" >
         <p>
            <label for="name">Name:</label>
            <input id="name" type="text" placeholder="name" v-model="name" >
         </p>

         <p>
            <label for="review">Review:</label>
            <textarea name="review" id="review" cols="30" rows="10" v-model="review" >						</textarea>
         </p>

         <p>
            <label for="rating">Rating:</label>
            <select name="rating" id="rating" v-model.number="rating" >
                <option value="">5</option>
                <option value="">4</option>
                <option value="">3</option>
                <option value="">2</option>
                <option value="">1</option>
            </select>
         </p>

         <p>
            <input  type="submit" value="Submit" >
         </p>

    </form>
                `,

       data(){
         return{
              name: null,
              review: null,
              rating: null,
            }
       },
 })
```

For the created component its going to be a child nested within the product component , so in the `product` component, we add the html tag

```html
<product-review></product-review>
```

Next, we are to create a  function that allows us, to store the data property, this is because v-model stores data temporary and once the input field is updated the data stored will also change, hence we create a function that on submit of the form it store the data into an array called `productReview` in this case we are using `let` instead of `push` 

```js
methods:{
    onSubmit(){
         let productReview ={
              name: this.name,
              review: this.review,
              rating: this.rating,
          },
              this.name = null,
              this.review = null,
              this.rating = null
         },
}
```

In this case the function `onSubmit` creates a variable `productReview` and places our data property in it and then we reset the data properties to null as shown

Since we are display the review in the product side, we are to send the review data to the `product` component thus we use $emit

```js
methods:{
    onSubmit(){
         let productReview ={
              name: this.name,
              review: this.review,
              rating: this.rating,
          },
			  this.$emit('review-submitted', productReview)
              this.name = null
              this.review = null
              this.rating = null
         },
}
```



And we are to accept the data in our `product`

```html
<product-review @review-submitted="addReview"></product-review>
```

Upon receiving the event, we are to initiate a function `addReview` to store the received data into  a variable called `reviews`. The function receives `productReview` as its argument.				

```js
addReview(productReview){
       this.reviews.push(productReview)
}
```



To display the previews, place the reviews html inside the `product`

```html
<div>
	<h2>Reviews</h2>
	<p v-if="!reviews.length">There are no reviews</p>
	<ul>
		<li v-for="review in reviews">
			<p>{{review.name}}</p>
			<p>Rating:{{review.rating}} </p>
			<p>{{review.review}}</p>
		</li>
	</ul>
</div>
```

To validate the form,  we can use the native browser form validation by using `<input required>` or use custom form validation.

To do so we create a data property `errors` that is to store caught errors. To catch the errors, we have to modify the `onSubmit` function, such that if any other required field in left blank, the field is field with and empty array instead. 

We nest the first part of the code into an if statement that will execute  if the required field are field, and if not to push our errors into the field.

```js
onSubmit(){
  if(this.name && this.rating && this.rating){
        let productReview ={
               name: this.name,
               review: this.review,
               rating: this.rating
             }
              this.$emit('review-submitted', productReview)
              this.name = null
              this.review = null
              this.rating = null
      }
      else{
          if(!this.name)this.name.errors.push("Name Required.") 
          if(!this.rating) this.rating.push("Rating Required.")
          if(!this.review) this.review.push("Review Required.")
     }
},
```



### Event Modifiers

`.prevent`

`.number`



### Read

let