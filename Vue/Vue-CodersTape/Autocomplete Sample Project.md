## Autocomplete Sample Project

The sample project, is to create an autocomplete in an input field.

The project will use Vue Cli to scaffold the project files.

### Setting Up Vue Cli - Procedure

1. To create the project, 

   Assuming vue is install to the pc, run

   ```powershell
   vue create autocomplete
   ```

   Note: the project is to be name autocomplete

2. Choose manual,

   On the interactive installation, choose manual config,

   ```powershell
   ? Please pick a present
   default (babel, eslint)
   >Manually select features
   ```

   Select `Babel` , `linter`, `router` 

   Use `History` mode: `Yes` 

   `Lint on save`

   Place configs, choose `dedicated config file` 

   Save as a preset, `no` 

3. Install taillwindcss to the project

   ```powershell
   npm intall taillwindcss
   ```



### Setup of the project

1. Configuration of tailwindcss

   Create the main.css file into the root directory, and paste the code below for config of tailwindcss

   ```css
   @tailwind base;
   
   ```

@tailwind components;

@tailwind utilities;
   ```
   
   
   

### Making the project

1. Create the about.vue component

   In the ./components/views create a About.vue, 

   On the template, to create an input field

   ```vue
   <input type="text" class='bg-gray-300 px-4 py-2' autocomplete="off" v-model="state" @input="filterStates">
   ```

   Note, with tailwindcss, an input field without any class will be invisible

   the `class` is in the style of tailwindcss, and the input is linked to state in data.

   `@input` an event will be triggered

2. in the data field of the component add

   ```vue
     data: function(){
       return {
         state: '',
         states: [
           'Florida', 'Albama', 'Alaska', 'Texas'
         ],
         filteredStates: [],
       }
     },
   ```

   Due to `v-model` inputted data is first placed into the `state:''` array

   The `States` variable contains the sample file of the states, i.e  Florida, Alabama, Texas

   The `filteredStates` , is empty it will contain the list of states with similar letters to the input field

3. Methods

   (For the revised part, scroll down)

   Upon input, a `filterStates` function is created, 
   
   ```vue
     methods: {
       filterStates(){
         this.filteredStates = this.states.filter(state=>{
           return state.toLowerCase().startsWith(this.state.toLowerCase());
         });
       }
    }
   ```

   a) In this case we are pushing data into the filteredStates array

   `this.states.filter(state=>{})` it separates(filters)the items in the `states` array, into individual `state` , and the criteria for filtering is specified in the curly brackets.
   
   
   
   b)Then, inside the curly bracket we have
   
   `return state.toLowerCase().startsWith(this.state.toLowerCase());` , this is a function 
   
   that does the filter
   
   
   
   c) First, we set the `state` to be selected into lowercase, `return state.toLowerCase()` 
   
   d) Second comes the criteria for choosing, we are going to look for states starting with the letters in the input field, (i.e letter which have been added to the `state` array)  `.statswith()` and inside the brackets we put `(this.state.toLowercase())` in this part the case is for the state array in the data function.
   
   Note: the `state` in the filter part can be replace by any word e.g `item`, its similar with `v-for="item in items"`  , hence for the code using `item`
   
   ```vue
     methods: {
       filterStates(){
         this.filteredStates = this.states.filter(item=>{
           return item.toLowerCase().startsWith(this.state.toLowerCase());
         });
       }
     }
   ```
   
   (Revised Part)
   
   a) First set the `filteredStates` and define the parameters of filter,
   
     In this case we are filtering the items inside the `states` array, by taking their staring letters, or rather the letters that have been input into the `state` array.
   
   ```vue
     methods: {
       filterStates(){
         this.filteredStates = this.states.filter(item=>{
           return item.startsWith(this.state);
         });
       }
     }
   ```
   
   b) In high likely the user but not use the same format as the items in the `states` array, hence for uniformity we set both the `states` and `state` arrays into lowercase.
   
   ```vue
     methods: {
       filterStates(){
         this.filteredStates = this.states.filter(item=>{
           return item.toLowerCase().startsWith(this.state.toLowerCase());
         });
       }
     }
   ```
   
   
   
   ​	To check if it is working, on the browser navigate to console, vue and then about, it shows the details of the vue components.
   
   
   
4. Now that we have the filter working , we need to display it the user

   Add a div that will be displayed only if there are `fllteredStates` 

   ```vue
       <div v-if="filteredStates">
           <ul>
               <li v-for="filteredState in filteredStates">{{filteredState}}</li>
           </ul>
       </div>
   ```

5. To push the `filteredState` into the input field, on click

   To do so we add a function to the list, the listens for a click event.

   The event is to be named `setState` 

   ```vue
   <ul>
       <li v-for="filteredState in filteredStates" @click="setState(filtereState)">			 	 {{filteredState}}</li>
   </ul>
   ```

   And the method

   ```vue
   setState(state){
      this.state = state;
   },
   ```



6. To center the items

   ```html
   <div class=" about flex flex-col items-centre">
       
   </div>
   ```

7. Adding some css to the unordered list

   ```html
   <ul class="w-48 bg-gray-800 text-white">
       <li v-for="filteredState in filteredStates" class="py-2 border-b cursor-pointer" 	@click="setState(filteredState)">{{filteredState}}</li>
   </ul>
   ```

   in this we set the class width to `w-48` 

8. To un-display the list of `filteredStates` 

   a) First we create, a `modal` which is a data property, and set it to false

   ```vue
   modal: false,
   ```

   b) Next, set to the conditions for the display of the unordered list to be, to also include the `modal` property

   ```vue
   <div v-if="filteredStates && modal">
   ```

   c) Next toggle the modal on `focus`  at input field

   ```hmtl
   <input type="text" class='bg-gray-300 px-4 py-2' autocomplete="off" v-model="state" @input="filterStates" @focus="modal = true">
   ```

   d)Toggle the modal again at click of the list, 

   ```vue
   setState(state){
      this.state = state;
      this.modal = false
   },
   ```

   

9. To toggle off the list, upon clicking outside our elements

   a) First we create a div tag that will encompass the whole of the page, we use tailswind's `absolute inset-0`  command to do so

   ```html
   <div class="bg-red-300 absolute inset-0"></div> 
   ```

   b) Then we introduce layers, using the tailwindcss `z-index`

   the above div is given an index of 0 `z-0` 

   ```html
   <div class="bg-red-300 absolute inset-0 z-0"></div>
   ```

   while for the rest of the html tags are given an index of `z-10` 

   ```html
   <input type="text" class='bg-gray-300 px-4 py-2 z-10' autocomplete="off" v-			        model="state" @input="filterStates" @focus="modal = true"><div v-if="filteredStates && modal" class="z-10">
   ```

   Note: that `bg-red-300` is for demostration and can be removed,

   ```html
   <div class="absolute inset-0 z-0"></div>
   ```

   c) We are then to add a click event upon clicking the area that we have created.

   ```html
   <div class="absolute inset-0 z-10" @click="modal = false"></div> 
   ```

10. Creating an Initial State

    We create am in if statement that sets `filteredStates` to the `States`

    ```
    filterStates(){
       if(this.state.length == 0){
          this.filteredStates = this.states;
        }
        this.filteredStates = this.states.filter(item =>{
            return item.toLowerCase().startsWith(this.state.toLowerCase());
        });
    },
    ```

    Note: That `filterStates` is set to  run @input, hence we are to mount the function so as it will be executed once an action is done.

    We will use the mounted listener

    ```vue
    mounted() {
       this.filterStates();
    },
    ```

    With this the filtering is affected, in that when we click a state without any input, all the states are listed instead of the the selected state only,

    To rectify this, we  remove the `@click` and add a watcher

    ```vue
    watch: {
         state(){
             this.filterStates();
         }
    }
    ```

    the `state` property is what is to be watched and we denote it by `state(){}`  and in the curly bracket we place the function to be executed.

    Hence upon change of the `state` variable the `filterStates()` function is triggered

     

    



With initial State

```vue
<template>
  <div class="about flex flex-col items-center">
    <div class="absolute inset-0 z-10" @click="modal = false"></div>  
    <input type="text" class='bg-gray-300 px-4 py-2 z-10' autocomplete="off" v-model="state" @focus="modal = true">
    <div v-if="filteredStates && modal" class="z-10">
        <ul class="w-48 bg-gray-800 text-white">
            <li v-for="filteredState in filteredStates" class="py-2 border-b cursor-pointer" @click="setState(filteredState)" >{{filteredState}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'About',

    data: function(){
        return {
            state: '',
            modal: false,
            states: [
                'Florida', 'Alabama', "Alaska", 'Texas'
            ],
            filteredStates: [],
        }
    },
    mounted() {
        this.filterStates();
    },

    methods: {
        filterStates(){
            if(this.state.length == 0){
                this.filteredStates = this.states;
            }
            this.filteredStates = this.states.filter(item =>{
                return item.toLowerCase().startsWith(this.state.toLowerCase());
            });
        },

        setState(state){
            this.state = state;
            this.modal = false
        },
    },

    watch: {
        state(){
            this.filterStates();
        }
    }
}
</script>

<style>

</style>
```



Without initial state

```vue
<template>
  <div class="about flex flex-col items-center">
    <div class="absolute inset-0 z-10" @click="modal = false"></div>  
    <input type="text" class='bg-gray-300 px-4 py-2 z-10' autocomplete="off" v-model="state" @input="filterStates" @focus="modal = true">
    <div v-if="filteredStates && modal" class="z-10">
        <ul class="w-48 bg-gray-800 text-white">
            <li v-for="filteredState in filteredStates" class="py-2 border-b cursor-pointer" @click="setState(filteredState)" >{{filteredState}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'About',

    data: function(){
        return {
            state: '',
            modal: false,
            states: [
                'Florida', 'Alabama', "Alaska", 'Texas'
            ],
            filteredStates: [],
        }
    },
    

    methods: {
        filterStates(){
           
            this.filteredStates = this.states.filter(item =>{
                return item.toLowerCase().startsWith(this.state.toLowerCase());
            });
        },

        setState(state){
            this.state = state;
            this.modal = false
        },
    },
}
</script>

<style>

</style>
```

