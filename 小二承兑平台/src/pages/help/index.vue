<template>
  <div class="help">
    <div style="height:.2rem;background-color: #F2F3F8"></div>
    <el-row :gutter="10" style="display: flex;flex-direction: row;justify-content: center;align-items: center;flex-wrap:wrap">
      <el-col :xs="24" :sm="18" :lg="14">
        <div class="item">
          <p class="title" @click="change(1)">1.什么是BitCNY？什么是BitUSD？<span :class="[toggle1 ? 'up':'down']"></span></p>
          <div class="con" v-if="toggle1">
            <p>答：BitCNY/BitUSD是比特股系统内的一种加密数字货币，也叫市场锚定资产或SmartCoin，中文名为比特人民币/比特美元。和比特币、莱特币等虚拟货币相比，BitCNY/BitUSD几秒钟就可以确认，并且价格稳定，1BitCNY = 1CNY，1BitUSD = 1USD。由于BitCNY/BitUSD背后有2倍价值的比特股作为抵押，使得持有者不需要担心第三方会不守承诺兑现其价值，因为他可以随时把BitCNY/BitUSD在市场上卖掉获得等值人民币/美元的比特股。由此看来，BitCNY/BitUSD可以看成是不需要第三方背书的资产，它的价值由背后的2倍价值的比BTS来保证。</p>
            <p>BitCNY/BitUSD支付传输快（3秒出块），并且价值稳定，有效解决了比特币由于价格波动过大使得商家难以使用的问题。具有很强的便利性和实用性，对管制免疫。通过小二承兑平台购买BitCNY/BitUSD后，就可以在支持BitCNY/BitUSD交易的平台进行币币交易了。
            </p>
          </div>
        </div>
        <div class="item">
          <p class="title" @click="change(2)">2.怎么充值BitCNY或BitUSD？<span :class="[toggle2 ? 'up':'down']"></span></p>
          <div class="con" v-if="toggle2">
            <p>答：您需要联系我们的承兑商QQ或微信购买BitCNY或BitUSD。您只需汇款给我们并告知您在交易平台里的ID，我们收到汇款后，会将您要购买的BitCNY或BitUSD冲入指定的ID，然后您就可以在交易区进行交易了。充值时间很快，通常几分钟就能到账。
            </p>
            <p>总结一句话就是：你给我钱，我给你币</p>
            <p>下面以Aex平台为例，介绍如何充值BitCNY：</p>
            <p>详细流程如下：</p>
            <p>①联系承兑商QQ或微信，并付款到指定帐号。</p>
            <p>②将您在aex.com个人中心里的ID告诉承兑商。（点击右上角“+充值”，然后网页左边显示的就是您的ID，如下图所示。注：千万不能给给错ID，否则会充给别人。）</p>
            <img src="../../../static/img1.png" alt="" style="width: 189px;height: 124px;">
            <p>③我们收到汇款后会将BitCNY发到您的账户中。正常来说，5分钟左右即可充入您的账户。</p>
          </div>
        </div>
        <div class="item">
          <p class="title" @click="change(3)">3.BitCNY或BitUSD如何提现？<span :class="[toggle3 ? 'up':'down']"></span></p>
          <div class="con" v-if="toggle3">
            <p>答：您需要找我们的承兑商索取收币地址，然后在交易平台里完成提币操作。我们收到之后会给您的指定帐号汇款。如果是自动提币，只要几分钟就可以提到我们账户，如果是人工审核提币，要等客服审核通过后才能完成提币。
            </p>
            <p>总之，您在交易区卖出虚拟币之后，虚拟币变成了BitCNY或BitUSD。您把BitCNY或BitUSD发给我们，我们把钱转给您，这就是提现。总结一句话就是：你给我币，我给你钱。
            </p>
            <p>下面以Aex平台为例，介绍如何进行BitCNY的提现：
            </p>
            <p>①如果您是第一次申请提现，请联系承兑商登记您的提币信息（包括平台账户ID、银行卡号、户名、开户行、联系电话等），登记一次即可。以后每次申请提现的时候，我们都会按照您填写的银行收款帐号给您转账。
            </p>
            <p>②联系承兑商获取BitCNY的提币地址（比如buding888）。
            </p>
            <p>③点击BitCNY右侧的“提币”按钮（如下图）。
            </p>
            <img src="../../../static/img2.png" alt="" style="width: 100%;height: auto;">
            <p>④将承兑商给您的提币地址添加进去（第一次提币需要添加，以后就可以直接选择，无需再次添加）。添加方法如下图所示：
            </p>
            <img src="../../../static/img3.png" alt="" >
            <p>⑤再次点击BitCNY右侧的“提币”，按要求填写。注意在Memo处填写您的ID、联系电话、银行卡末四位数。我们会对照您登记的收款帐号。如果联系电话、银行卡末四位数和您登记的一致，我们就会按照您提供的帐号给您转账。
            </p>
            <img src="../../../static/img4.png" alt="" >
            <p>⑥至此，提现操作完毕。您可以点击财务记录查看转币的状态，如果显示“等待处理”就是尚未转达，如果显示“已到帐”就是已经将币转给承兑商了。我们在收到您发送的BitCNY之后。会在几个小时内将款项转到您的指定账户。
            </p>
          </div>
        </div>
        <div class="item">
          <p class="title" @click="change(4)">4.充值和提现的手续费多少？<span :class="[toggle4 ? 'up':'down']"></span></p>
          <div class="con" v-if="toggle4">
            <p>答：BitCNY和BitUSD是由双倍以上价值的比特股BTS抵押借贷出来的。承兑商要承担BTS下跌甚至被强制平仓的风险。如果BTS持续下跌，承兑商还要承担亏本风险。另外，每次给大家充值的时候，承兑商还需要承担转币手续费。所以充值和提现都会适当收取一定的手续费，这个手续费是波动的，由市场供求关系来决定。
            </p>
          </div>
        </div>
        <div class="item">
          <p class="title" @click="change(5)">5.BitCNY或BitUSD是无限的吗？总额有多少？<span :class="[toggle5 ? 'up':'down']"></span></p>
          <div class="con" v-if="toggle5">
            <p>答：前面提到，BitCNY和BitUSD是由双倍以上价值的比特股BTS抵押借贷出来的。如果BTS的价格下跌，市值缩小，能借贷的BitCNY或BitUSD就少。反之，能借贷的BitCNY或BitUSD就多。但是也不是无限量的。目前行情来说，BitCNY的总供应量不到一亿。</p>
          </div>
        </div>
        <div class="item">
          <p class="title" @click="change(6)">6.BitCNY或BitUSD会不会贬值？<span :class="[toggle6 ? 'up':'down']"></span></p>
          <div class="con" v-if="toggle6">
            <p>答：BitCNY或BitUSD的价值是恒定不变的，是不会贬值的。和USDT不同的是，它不由某一家机构为其做信用背书，它是去中心化的虚拟币。</p>
          </div>
        </div>
        <div class="item">
          <p class="title" @click="change(7)">7.小二承兑平台可以给哪些平台充值？<span :class="[toggle7 ? 'up':'down']"></span></p>
          <div class="con" v-if="toggle7">
            <p>答：所有支持BitCNY和BitUSD交易对的平台都可以充值。
            </p>
          </div>
        </div>
        <div class="item">
          <p class="title" @click="change(8)">8.小二承兑平台可靠吗？信誉有何保障？<span :class="[toggle8 ? 'up':'down']"></span></p>
          <div class="con" v-if="toggle8">
            <p>答：我们严格控制承兑商准入门槛，对承兑商进行严格考核并登记备案，完全值得您的信赖。
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        toggle1: false,
        toggle2: false,
        toggle3: false,
        toggle4: false,
        toggle5: false,
        toggle6: false,
        toggle7: false,
        toggle8: false
      }
    },
    mounted () {
    },
    methods: {
      change: function (e) {
          if (e === 1) {
            this.toggle1 = !this.toggle1
          } else if (e === 2) {
            this.toggle2 = !this.toggle2
          } else if (e === 3) {
            this.toggle3 = !this.toggle3
          } else if (e === 4) {
            this.toggle4 = !this.toggle4
          } else if (e === 5) {
            this.toggle5 = !this.toggle5
          } else if (e === 6) {
            this.toggle6 = !this.toggle6
          } else if (e === 7) {
            this.toggle7 = !this.toggle7
          } else if (e === 8) {
            this.toggle8 = !this.toggle8
          } else {
          }
      }
    }
  }
</script>
<style scoped>
.help{
  padding: 60px 0 50px 0;
  background-color: #fff;
}
  .item{
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 10px;
  }
  .item .title{
    font-size:16px;
    color: #333;
    border-bottom: 1px solid  #FAFBFD;
    padding: 10px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .up{
    background-image: url("../../../static/up.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: inline-block;
    width:20px;
    height: 10px;
    margin-right: 10px;
  }
  .down{
    background-image: url("../../../static/down.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: inline-block;
    width:20px;
    height: 10px;
    float: right;
    margin-right: 10px;
  }
  .item .con{
    background-color: #FAFBFD;
    padding:5px 40px 10px 20px;
  }
  .item .con p{
    font-size: 12px;
    color: #666;
    margin-top: 6px;
    text-indent: 2em;
    line-height: 2em;
  }
.item .con img{
  margin-top: 6px;
  width: 70%;
  height: auto;
}
</style>
