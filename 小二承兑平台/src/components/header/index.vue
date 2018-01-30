<template>
  <div class="header">
    <el-row :gutter="10" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap">
      <el-col :xs="24" :sm="20" :lg="20">
        <div class="container">
          <div class="left" @click="$router.push('/')">
            <img src="../../../static/logo1.png" alt="">
            <!--<p>小二承兑商平台</p>-->
          </div>
          <div class="right">
            <div class="item"  @click="$router.push('/home')">
              <p>承兑大厅</p>
            </div>
            <!--<div class="item"  @click="$router.push('/disclose')">-->
              <!--<p>申请成为商家</p>-->
            <!--</div>-->
            <div class="item"  @click="$router.push('/help')">
              <p>帮助中心</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .header{
    width: 100%;
    margin: 0 auto;
    height: 60px;
    background-color: #fff;
  }
  .container{
    /*width: 80%;*/
    /*margin:0 auto;*/
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*border: 1px solid red;*/
    min-width: 380px;
  }
  .left{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    cursor:pointer;
  }
  .left img{
    width: 140px;
    height: 30px;
    margin-left: 20px;
    margin-right: 22px;
  }
  .left p{
    font-size: 20px;
    color: #fff;
    letter-spacing: 0;
  }
  .right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .item{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    height: 60px;
    cursor: pointer;
  }
  .item p{
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    font-weight: bold;
  }
</style>
