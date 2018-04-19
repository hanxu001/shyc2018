<template>
  <div class="all">
    <router-view/>
  </div>
</template>

<script>
</script>

<style>
  .all {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    min-width: 1290px;
    height: 100%;
    font-family: PingFangSC-Regular;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    /*border: 1px solid red;*/
  }
  select{
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    /*background: url("arrow.png") no-repeat scroll right center transparent;*/
    /*padding-right: 14px;*/
  }
  option::-ms-expand{ display: none; }
  option{
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari 和 Chrome */
    appearance:none;
  }
  /* --背景色字体颜色--*/
  option:hover{
    color:#fff;
    background-color:#1E90FF;
  }
</style>
