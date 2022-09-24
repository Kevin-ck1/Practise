### Routing - Vue Router

### Background

Single Page Applications (SPA) e.g Email Clients, enables a user not to update/refresh the browser when a page is requested.  

### Steps for Setup

1. Install vue-router

To install the vue-router into the project folder, cd into the project folder and run,

```powershell
npm install vue-router
```

2. Import vue-router

   Import vue-router in the main.js file

   ```js
   import VueRouter from 'vue-router' //vue-router is a plugin
   ```

3. Import the rest of the vue pages/components



4. To use the vue-router

   Vue-router is a plugin, hence we need to tell vue to use it

   ```js
   Vue.use(VueRouter);
   ```

5. Define routes.

   There are to ways to introduce the routes

   a) First Method- is similar to when we did simple routes `const routes = {}` 

   b) The Second Method- We initiate a `new vueRouter`  instance and then declare our routes inside.

   ```js
   const router = new VueRouter({
     routes: [
       {path: '/', component: HelloWOrld},
       {path: '/tasks', component: Tasks },
       {path: '/user/:id', component: User },
       {path: '/about', component: About },
       {path: '*', component: NotFound }, 
     ],
   ```

   In the above, each route has two parameters, `path` and `component` 

   The last path, catches everything that is not in the path list and returns NotFound

6. Tell Vue instance about our router.

   In the vue instance, pass in `router` 

   ```vue
   new Vue({
   
     router, 
   
     render: h => h(App),
   }).$mount('#app')
   ```

NOTE:

 Vue router is not supported by old browsers, hence they will reload the whole page.

And in the address bar (url ), a pound sign `#` appears

```http
localhost:8080/#/
```

Hence to remove support for older browsers and hence to remove, the pound sign,

after the routes, we are to introduce  `mode:` which is set to `'history'`  inside the `vueRouter` instance

```js
mode: 'history'
```



7. Placement of component.

Since the `app` is the displaced by the browser, we bring in the components through the router 

hence in the `.src/App.vue` write

```vue
<router-view></router-view>
```

This tells the router where to place the component. 

8. Adding Links

   In the `App.vue` 

   ```vue
   <ul>
       <li><router-link to="/" >Home</router-link></li>
       <li><router-link to="/tasks" >Tasks</router-link></li>
       <li><router-link to="/user/:id" >User</router-link> </li> <!-- To pass in Second PArameter to the url -->
       <li><router-link to="/about" >About</router-link></li>
   </ul>
   ```

9. To get access to a variable inputted into the url eg `/user/:id` we use

   ```vue
   {{$route.params.id}}
   ```

   





.src/main.js

```js
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' //vue-router is a plugin
import HelloWOrld from './components/HelloWorld.vue';
import Tasks from './components/Tasks.vue';
import User from './components/User.vue';
import About from './components/About.vue';
import NotFound from './components/NotFound.vue';


Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {path: '/', component: HelloWOrld},
    {path: '/tasks', component: Tasks },
    {path: '/user/:id', component: User },
    {path: '/about', component: About },
    {path: '*', component: NotFound }, // This catches everything that is not in routes list
  ],

  
mode: 'history'

});

new Vue({

  router, 

  render: h => h(App),
}).$mount('#app')
```



.src/App.vue

```vue
<template>
  <div id="app">
   

    <!-- To create a single page application, and add the routes link, we use route link -->
  <ul>
    <li><router-link to="/" >Home</router-link></li>
    <li><router-link to="/tasks" >Tasks</router-link></li>
    <li><router-link to="/user/:id" >User</router-link> </li> <!-- To pass in Second PArameter to the url -->
    <li><router-link to="/about" >About</router-link></li>
  </ul>

    <router-view></router-view>  
<!-- router-view allow us to attach our component at this part, -->
<!-- While using router-view check if the componets are used in any instance, un import imported component -->
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```



./src/components/User.vue

```vue
<template>
    <h1>
        {{$route.params.id}}
    </h1>
</template>
```

