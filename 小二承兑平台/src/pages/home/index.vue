<template>
  <div class="home">
    <!--1-->
    <div class="banner">
      <el-row :gutter="0" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap">
        <el-col :xs="24" :sm="0">
          <img src="../../../static/banner_title.png" alt="" class="banner_title_small">
          <div class="banner_box_small">
            <p>1 BitCNY= 1 CNY</p>
            <p>1 BitUSD= 1 USD</p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="0" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap">
        <el-col :xs="0" :sm="24">
          <img src="../../../static/banner_title.png" alt="" class="banner_title">
          <div class="banner_box">
            <p>1 BitCNY= 1 CNY</p>
            <p>1 BitUSD= 1 USD</p>
          </div>
        </el-col>
      </el-row>
      <div class="banner_text">BitCNY、BitUSD是比特股系统内与法币等价锚定的数字货币，</div>
      <div class="banner_text">用户可以随时使用BitCNY/BitUSD和法币进行1:1兑换。</div>
      <div class="banner_text2"><span></span>目前已支持交易平台<span></span> </div>
      <el-row :gutter="0" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap;">
        <el-col :xs="24" :sm="0">
          <div class="banner_list">
            <p>xbrick.io</p>
            <p>aex.com</p>
            <p>big.one</p>
            <p>zb.com</p>
            <p>cointiger.com</p>
          </div>
          <div class="banner_list">
            <p>coinbene</p>
            <p>u.cx</p>
            <p>kkcoin.com</p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="0" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap">
        <el-col :xs="0" :sm="24">
          <div class="banner_list">
            <p>xbrick.io</p>
            <p>aex.com</p>
            <p>big.one</p>
            <p>zb.com</p>
            <p>cointiger.com</p>
            <p>coinbene</p>
            <p>u.cx</p>
            <p>kkcoin.com</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--2-->
    <el-row :gutter="0" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap;background-color: #FECE68">
      <el-col :xs="22" :sm="18" :lg="18">
        <div class="title">
          <p style="font-size:18px;width: 100%;text-align: center">
            <span><img src="../../../static/icon1.png" alt="" style="width: 14px;height:14px;margin-right: 0px;"></span>
            小二承兑服务，为用户提供可靠的币币交易兑换服务，专业提供:BitCNY/BitUSD和法币的互相兑换</p>
        </div>
      </el-col>
    </el-row>
    <!--<div style="height:.18rem;background-color: #F2F3F8"></div>-->
    <!--3-->
    <div class="change">
      <el-row :gutter="0" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap;">
        <el-col :xs="22" :sm="18" :lg="18">
          <div class="title">
            <img src="../../../static/icon2.png" alt="">
            <p>兑换计算器</p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="0" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap;">
        <el-col :xs="22" :sm="18" :lg="7">
          <div class="item1">
            <p class="name">BitCNY数量</p>
            <div class="box1">
              <input type="text"
                     class="input1"
                     maxlength="7"
                     v-model="value1"
                     placeholder="请输入BitCNY数量"
                     onkeyup="this.value = this.value.replace(/[^0-9.]/g, '')">
              <p class="unit">个</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="22" :sm="18" :lg="7">
          <div class="item1">
            <p class="name">手续费汇率</p>
            <div class="box1">
              <input type="text"
                     class="input1"
                     maxlength="4"
                     v-model="value2"
                     placeholder="请输入手续费汇率"
                     onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')">
              <p class="unit">%</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="22" :sm="18" :lg="4">
          <div class="item1" style="justify-content: flex-end">
            <p class="name">共需支付:</p>
            <div class="box2" style="justify-content: flex-start">
              <p style="color: #E11616">{{value3}}</p>
              <p class="unit">元</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--4-->
    <div class="seller">
      <el-row :gutter="0" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap">
        <el-col :xs="22" :sm="18" :lg="18">
          <div class="title">
            <img src="../../../static/icon3.png" alt="">
            <p>承兑商家</p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="0" style="display: flex;flex-direction: row;justify-content: center;flex-wrap:wrap">
        <el-col :xs="24" :sm="10" :lg="8">
          <div class="item2">
            <p class="dian">QQ</p>
            <P class="name">小二极速快兑</P>
            <p class="recharge">充值:<span>0.5%</span>  提现:<span>0.5%</span></p>
            <p class="way">诚信快捷／支持支付宝／银行转账</p>
            <a target="_blank" class="qq" href="http://wpa.qq.com/msgrd?v=3&uin=1724429306&site=qq&menu=yes">
              <img border="0" src="../../../static/qq.png" alt="在线咨" title="在线咨询"/>
              <span>1724429306交谈</span>
            </a>
          </div>
        </el-col>
        <el-col :xs="24" :sm="10" :lg="8">
          <div class="item2">
            <p class="dian">微信</p>
            <img src="../../../static/code.jpg" alt="" class="code">
            <p class="way">微信扫一扫，沟通更简单</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value1: '',
        value2: ''
      }
    },
    mounted () {
    },
    methods: {
      digitForIgnore(digit, count) {
        digit = digit.toString();
        var str = "";
        if (digit.indexOf(".") != -1) {
          var n = digit.split(".");
          var b = n[1];
          if (b.length > count) {
            str = b.substring(0, count);
            if (b.substring(b.length - count, b.length - count + 1) != 0) {
              str++
            }
            str = n[0] + "." + str;
          } else {
            for (var i = 0; i < count - b.length; i++) {
              str += "0";
            }
            str = digit + str;
          }
        } else {
          for (var i = 1; i <= count; i++) {
            str += "0";
          }
          str = digit + "." + str;
        }
        return str;
      }
    },
    computed: {
      value3: {
        get: function () {
          if (this.value1 && this.value2) {
            return  this.digitForIgnore((this.value1 * (1 + this.value2 / 100)), 2)
          } else {
            return 0
          }
        }
      }
    }
  }
</script>

<style scoped>
  .home{
    height: 100%;
    padding: 60px 0 50px 0;
    background-color: #fff;
    width: 100%;
  }
  .banner{
    width: 100%;
    background:url("../../../static/banner2.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
  }
  .banner_title{
    width: 3.45rem;
    height: 0.52rem;
    margin-top: 0.2rem;
  }
  .banner_title_small{
    width: 172px;
    height: 26px;
    margin-top: 0.2rem;
  }
  .banner_box{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 0.2rem;
  }
  .banner_box p{
    border-radius: 1rem;
    background-color: #0676F3;
    text-align: center;
    margin: 0 .2rem;
    color: #fff;
    font-size:0.2rem;
    padding:0.04rem .4rem;
  }
  .banner_box_small{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 0.2rem;
  }
  .banner_box_small p{
    border-radius: 1rem;
    background-color: #0676F3;
    text-align: center;
    line-height: 0.44rem;
    margin: 0 .2rem;
    color: #fff;
    font-size:12px;
    padding:4px 16px;
  }
  .banner_text{
    font-size:12px;
    color: #fff;
    margin-top: .16rem;
  }
  .banner_text2{
    font-size:18px;
    color: #FBAB00;
    margin-top: .15rem;
    display: flex;
    align-items: center;
  }
  .banner_text2 span{
    display: inline-block;
    height:1px;
    width: 60px;
    border-top:1px solid #FBAB00;
    margin-left: 10px;
    margin-right: 10px;
  }
  .banner_list{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: .05rem 0;
  }
  .banner_list p{
    margin:0 .1rem;
    font-size: 14px;
    color: #fff;
  }
  .change{
    margin: 0px auto;
    background-color: #fff;
    padding: 10px 0px;
    /*border: 1px solid red;*/
  }
  .title{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: .1rem;
    margin-bottom: .1rem;
    /*text-align: left;*/
  }
  .title img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
    /*border: 1px solid red;*/
  }
  .title p{
    font-size:18px;
    color: #333;
    /*border: 1px solid red;*/
  }
  .item1{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    /*border: 1px solid red;*/
    padding-right: 60px;

  }
  .item1 .name{
    font-size:16px;
    color: #333;
    /*margin-right: 8px;*/
    flex: 1.6;
    text-align: left;
    min-width: 100px;
    /*border: 1px solid red;*/
  }
  .item1 .box1{
    display: flex;
    flex: 4;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #F2F3F8;
    border-radius: 6px;
    height: 30px;
    margin-right: 20px;
    margin-left: 20px;
    /*border: 1px solid red;*/
  }
  .item1 .box2{
    display: flex;
    flex: 2;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30px;
    /*margin-right: 40px;*/
  }
  .input1{
    height: 22px;
    padding-left: 20px;
    /*margin-left: 40px;*/
    border-right: 1px solid #ccc;
    background-color: #F2F3F8;;
    font-size:16px;
    color: #333;
    /*border: 1px solid red;*/
  }

  .item1 .unit{
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size:16px;
    color: #333;
    /*text-align: right;*/
  }
  .seller{
    margin: 10px auto;
  }
  .item2{
    background-color: #EBECF2;
    margin: 10px 20px;
    border-radius: 10px;
    padding: 20px 20px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .item2 .dian{
    background-size: 100% 100%;
    background-repeat: no-repeat;
    line-height: 0.1rem;
    font-size:24px;
    color: #000;
    font-weight: bold;
  }
  .item2 .name{
    color: #033E8D;
    font-size: 24px;
  }
  .item2 .recharge{
    font-size: 18px;
    color: #333;
  }
  .item2 .recharge span{
    font-size:20px;
    color: #E11616;
  }
  .item2 .way{
    font-size: 16px;
    color: #666;
  }
  .item2 .qq{
    padding: .1rem .4rem;
    font-size:16px;
    color: #fff;
    background: #033E8D;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .item2 .qq img{
    width: 18px;
    height: 18px;
  }
  .item2 .code{
    width: 140px;
    height: 140px;
  }
</style>
