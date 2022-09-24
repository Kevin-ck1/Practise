### Auto-Format Input Field 

In this project we are to create auto-formatted input field for telephone number



1. Setting up the html part

```html
<div class="mt-6 flex justify-center" >
     <input type="text" placeholder="(xxx) xxx-xxxx" class="w-56 text-2xl bg-gray-300 p-3 			rounded-lg focus:outline-none">
</div>
```

2. Adding the data property which is linked by v-model to our input field

   ```js
   data: function(){
         return {
               number: '',
         }
   },
   ```

3. Third we do validation i.e we limit what is fed into the input field

   We do so by adding a `watch ` property for number, hence when `number` is updated the `watch` property is triggered.

   ```js
   watch: {
      number(){
          this.number = this.number.replace(/[^0-9]/g, '');
      }
   },
   ```

   Note: In `.replace(/[^0-9]/g, '')` this replaces anything that is not part of `0-9` and replaces it with an empty string, the function listens for all places where the number is used hence the `g` 

   The symbol `^` is used to indicate `not part` , hence we use it to show  that we do not wanted anything that is not among `0-9`

   

4. To constrain it to the format we are looking for.

   We add another replace function

   ```js
   .replace(/^(\d{3})(\d{3})(\d{4})/g,'($1) $2-$3');
   ```

   We have three capture groups in our format, with the first and second having three digits and the third having four digits, 

   Note: Don't place any spaces between the capture groups.

   

   To set a capture group `(\d{3})` and to place the capture group in the replace part we use a dollar sign and the position of the capture group `$1`  

   In this case the formatting is done after all capture groups are filled i.e after the tenth digit

   To make the format after every group, we can make the group optional, we do so by adding `?`  

   ```js
   .replace(/^(\d{3})(\d{3})?(\d{4})?/g,'($1) $2-$3');
   ```

5. To limit the number of digits,

   ```js
   .substr(0, 14)
   ```

   Note: we place 14 because the brackets, space and dash are also counted.

   In our case it gives character from position zero to the give number 14

   

### Refactoring the Code

To make the app more reactive, i.e instead of hardcoding the capture and replace sections we hardcore the placeholder-template only.

In our case the placeholder is in the form of `(xxx) xxx-xxxx` 

1. To customize our template, we need to pass it as a prop 

```js
props: [
        'template'
    ],
```



2. In the html, we are to place our prop `template` and pass the placeholder their

```html
<div id="app" >
   <telephone template="(xxx) xxx-xxxx"></telephone>
 </div>
```



3. In the vue file we are to bind the placeholder to the template `:placeholder="template" ` 

```js
<template>
    <div class="mt-6 flex justify-center" >
        <input type="text" 
        :placeholder="template" 
        class="w-56 text-2xl bg-gray-300 p-3 rounded-lg focus:outline-none"
        v-model="number">
    </div>
</template>
```

Note: the `prop` can be taken as a mini `data property` in that it accepts data hardcoded into the html for use into our component. Hence in this part `(xxx) xxx-xxxx` is taken from the html and placed into a mini/fake data property called `template` which is then used by our component as a real data property.

4. Using the template to limit the number of digits required

   We are to limit according the templates length `.template.length`

   ```js
   .substr(0, this.template.length);
   ```

5. To make the format field dynamic,  === Research 

   We will use `mounted` in this case

   We will also introduced a `format` data property

   In `mounted` we are to create a function that will generate a format of `($1) $2-$3` for the replacement function.

   ```js
       mounted() {
           let x = 1;
   
           this.format = this.template.replace(/x+/g, ()=>'$'+x++ )
       },
   ```

   In the code above, we are to find any `x`  one or more (to indicate one or more we use a + shown `x+` ) and replace them with `$1` for the first one and `$2` for the second one, and so on.

   In this case we are passing a call back function.

   with that we can refactor the replace function in the `watch` 

   ```js
   .replace(/^(\d{3})(\d{3})?(\d{4})?/g, this.format)
   ```



6. To refactor the capture field to make it dynamic

   Add a new data property `regex` 

   And in the mounted part we add the epression 

   ```js
   this.template.match(/x+/g).forEach((char, key) => {});
   ```

   in that, in the template we are looking for (match), `/x+/` , and was found  we receive the `char` and `key` 

   to get the number of characters per group, we use `char.length` to check this we can console log the expression as shown below

   ```js
   this.template.match(/x+/g).forEach((char, key)=>{
        console.log(char.length);
   });
   ```

   To check the key `console.log(key)`  it gives a zero based index

   With the `char.length` and `key` we refactor the capture part

   ```js
   this.regex += '(\d{' + char.length + '})';
   console.log(this.regex);
   ```

   In this the above code, we try to mimic the capture part and then we console log it, so as we can see the out of the if it similar to that the original part, if not keep twicking it until the console.log output is similar to the original.

   Finally we use the below equation,

   ```js
   this.regex += '(\\d{' + char.length + '})?';
   ```

   And for the `regex` data property we input `'^'` 

   and `watch` property

   ```js
   .replace(new RegExp(this.regex, 'g'), this.format)
   ```

   Note:  `this.regex` cannot to inputted as a string, hence to input functions, such as `this.regex` we rap it around a js expression `new RegExp()`

   

   Hence try changing the template, in our html and observe the behavior

   try 

   ```html
   template="C-xxx"
   template="xxx.xxx.xxxx"
   
   ```

   

   

   hence

   html

   ```html
   <div id="app" >
        <telephone template="(xxx) xxx-xxxx"></telephone>
   </div>
   ```

   vue

   ```vue
   <template>
       <div class="mt-6 flex justify-center" >
           <input type="text" 
           :placeholder="template" 
           class="w-56 text-2xl bg-gray-300 p-3 rounded-lg focus:outline-none"
           v-model="number">
       </div>
   </template>
   
   <script>
   export default {
       name: 'telephone',
   
       props: [
           'template'
       ],
   
       data: function(){
           return {
               number: '',
               format: '',
               regex: '^',
           }
       },
   
       
       mounted() {
           let x = 1;
   
           this.format = this.template.replace(/x+/g, ()=>'$'+x++ );
   
           this.template.match(/x+/g).forEach((char, key)=>{
              // console.log(char.length);
              //console.log(key);
              this.regex += '(\\d{' + char.length + '})?';
              console.log(this.regex);
           });
       },
           
       watch: {
           number(){
               this.number = this.number.replace(/[^0-9]/g, '')
               //.replace(/^(\d{3})(\d{3})?(\d{4})?/g,'($1) $2-$3')
               .replace(new RegExp(this.regex, 'g'), this.format)
               .substr(0, this.template.length);
               
           },
       },
   
   }
   </script>
   ```

   

   

   

   









