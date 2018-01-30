<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        flag: true
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size:20px;
  width: 100%;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
  outline: none;
}
html,body{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
}

img {
  border: none;
  text-decoration: none;
}
a{
  text-decoration: none;
  color: #333;
}
input{
  outline: none;
  border: none;
  font-size: 16px;
}
input:focus{
  font-size: 16px;
}
ul,li{
  list-style-type: none
}
</style>
