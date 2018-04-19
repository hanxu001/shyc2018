<template>
  <div>
    <p style="color: red;margin-top: 100px;" @click="gotoAfter('BTC_CNY')">点击跳转到after页面</p>
    <router-link :to="{ name: 'after', params: { pair: 'BTC_CNY' }}">点击跳转到after页面</router-link>
  </div>
</template>

<script>

  export default {
    name: 'home',
    data () {
      return {
      }
    },
    methods: {
      gotoAfter(pair){
        this.$router.push({ name: 'after', params: { pair: pair }})
      },
    }
  }
</script>

<style scoped>

</style>
