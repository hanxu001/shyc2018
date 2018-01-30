<template>
  <div style="background-color: #f0f0f0;position: relative;">
    <header-Top style="position: fixed;width: 100%;z-index: 999"></header-Top>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--<footer-Bottom style="position: fixed;width: 100%;left: 0;bottom: 0"></footer-Bottom>-->
  </div>
</template>
<style scoped>
</style>
