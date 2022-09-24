## Routing - Simple Routing

Routing is done the main.js

### Steps

1. Import all the vue component to the file

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   import Tasks from './components/Tasks.vue'
   ```

2. Create a list for the path name (url path name),

   Create a list array outside our vue instance, note `const`  is used to declare it as a variable.

   The list links the pathname to the corresponding vue component.

   ```js
   const routes = {
     '/': App,
     '/test': Tasks,
     '/hello': HelloWorld,
   }
   ```

3. Get/fetch (Listen for) the pathname from the browser

   To obtain the pathname inputted in the browser, we use `window.location.pathname` 

   The pathname is incorporated into our vue instance,  through the data object,

   ```vue
   data:{
     currentRoute: window.location.pathname,
   },
   ```

4. To link the `window.location.pathname` , to the pathname list.

   Once the pathname is obtained from the browser, it used to select the right page from 

   list created in `Step 2`

   ```vue
   computed: {
     currentComponent: function() {
       return routes [this.currentRoute];
     }
   },
   ```

   The above function selects and then returns, the page selected.

5.  Render and Display

   The initial render function is in its short form, but  for routing we use the long form as shown below.

   

   With the correct page selected, we pass the `currentComponent` function to the render function

   ```vue
   render: function (h){
        return h(this.currentComponent);
   },
   ```

   After rendering the page is displayed to the browser.

6. Page Not Found

   In case the url pathname from the browser is not included into our list, we can return a page not found. Assuming we have created a page for the not found,

   The page not found is passed directly do the `currentRoute` object, we use || to indicate or, so as if  the pathname is missing the `NotFound ` is selected.

   ```vue
   computed: {
     currentComponent: function() {
       return routes [this.currentRoute] || NotFound;
     }
   },
   ```

   



./src/main.js

```js
import Vue from 'vue'
import App from './App.vue'
import Tasks from './components/Tasks.vue'
import HelloWorld from './components/HelloWorld.vue'
import NotFound from './components/NotFound.vue'

Vue.config.productionTip = false

const routes = {
  '/': App,
  '/test': Tasks,
  '/hello': HelloWorld,

}

new Vue({
data:{
  currentRoute: window.location.pathname,
},

computed: {
  currentComponent: function() {
    return routes [this.currentRoute] || NotFound;
  }
},

  render: function (h){
     return h(this.currentComponent);
  },
}).$mount('#app')
```

 