## Vue Cli/Ui Setup

It allows one to scaffold an entire vue project, It also allows one to deploy to an actual server, which has hot reloading during development.

NPM is a prerequisite to installation 

### Setup

1. Install vue cli globally , run

   ```powershell
   sudo npm install -g @vue/cli
   # OR
   yarn global add @vue/cli 
   ```

2. Check if it has been installed successfully , run

   ```powershell
   vue --version
   ```

3. To update 

   ```powershell
   npm update -g @vue/cli
   
   # OR
   yarn global upgrade --latest @vue/cli
   ```

After installation, you will have access to the `vue` binary in your command line

### Creating a Project Using Vue Cli

To create a project (testing-cli),  run

```js
vue create testing-cli
```

This scaffolds an entire project, but it requires guidance, on the console it gives an interactive crating process

1. On the first stage choose the default by pressing  `Enter` 

```powershell
? Please pick a preset:
>default (babel, eslint)
Manually select features
```

this brings in all the dependencies required by the project.

2. When done, cd into the project file and run npm run serve

   ```powershell
   cd testing-cli
   ```

   ```powershell
   npm run serve
   ```

   npm run serve launches the local development server.

   open the address given by the browser

3. To `Stop` the server, run `CTRL + C`

   

   

### Usage

In the project created the App.vue is the root file for all the vue components

./src/App.vue

```vue
<template>
  <div id="app">
  	<HelloWorld></helloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Tasks from './components/Tasks.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Tasks,
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



./src/components/HelloWorld.vue

```vue
<template>
  <div class="hello">
    Hello Coders
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
    
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```



### Creating a Project Using Vue UI

It an alternative to the Vue Cli

Run

```powershell
vue ui
```

This redirects to the browser were is brings up the creation interface

Just follow the procedure and note to using `npm` as the package installer

Explore the dashboard 

Navigate to `Project Tasks`

To run the server, click the `Run task` then `Open App`

