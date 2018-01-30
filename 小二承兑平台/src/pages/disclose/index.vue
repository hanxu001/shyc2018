
<template>
  <div class="disclose">
    <el-row :gutter="10" style="display: flex;flex-direction: row;justify-content: center;flex-wrap:wrap">
      <el-col :xs="23" :sm="13">
        <h1>承兑商资料申请表</h1>
        <div class="item">
          <p class="key">1.姓名</p>
          <div class="value">
            <el-input style="" v-model="wx_no" placeholder="请输入您的真实姓名"></el-input>
          </div>
        </div>
        <div class="item">
          <p class="key">2.身份证号码</p>
          <div class="value">
            <el-input style="" v-model="wx_no" placeholder="请输入您的身份证号码"></el-input>
          </div>
        </div>
        <div class="item">
          <p class="key">3.QQ号</p>
          <div class="value">
            <el-input style="" v-model="wx_no" placeholder="请输入您的QQ号"></el-input>
          </div>
        </div>
        <div class="item">
          <p class="key">4.昵称(最多6个字)</p>
          <div class="value">
            <el-input style="" v-model="wx_no" placeholder="请输入您要使用的昵称"></el-input>
          </div>
        </div>
        <div class="item">
          <p class="key">5.手机号码</p>
          <div class="value">
            <el-input style="" v-model="wx_no" placeholder="请输入您的手机号码"></el-input>
          </div>
        </div>
        <div class="item">
          <p class="key">6.广告语(最多12字)</p>
          <div class="value">
            <el-input style="" v-model="wx_no" placeholder="请输入展示广告语"></el-input>
          </div>
        </div>
        <div class="item">
          <p class="key">7.紧急联系人姓名</p>
          <div class="value">
            <el-input style="" v-model="wx_no" placeholder="请输入紧急联系人"></el-input>
          </div>
        </div>
        <div class="item">
          <p class="key">8.紧急联系人手机号码</p>
          <div class="value">
            <el-input style="" v-model="wx_no" placeholder="请输入紧急联系人手机号码"></el-input>
          </div>
        </div>
        <div class="item">
          <p class="key">9.联系邮箱</p>
          <div class="value">
            <el-input style="" v-model="wx_no" placeholder="请输入您的联系邮箱"></el-input>
          </div>
          <div style="display: flex;flex-direction: row;align-items: center;margin-top: 10px;">
            <p style="flex: 2">验证码</p>
            <el-input style="flex: 6" v-model="wx_no" placeholder=""></el-input>
            <el-button style="flex: 1;margin-left: 20px;" type="primary">获取</el-button>
          </div>
        </div>
        <div class="item">
          <p class="key">10.身份证正面图片</p>
          <div class="value">
            <div class="el-box">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div>(5M以内,支持JPG,PNG,JPEG,BMP)</div>
          </div>
        </div>
        <div class="item">
          <p class="key">11.身份证反面图片</p>
          <div class="value">
            <div class="el-box">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div>(5M以内,支持JPG,PNG,JPEG,BMP)</div>
          </div>
        </div>
        <div class="item">
          <p class="key">12.手持身份证及承诺书照片(备注：承诺书内容我承诺遵守大象平台相关规定，并在承诺书上写上当天日期)</p>
          <div class="value">
            <div class="el-box">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div>(5M以内,支持JPG,PNG,JPEG,BMP)</div>
        </div>
        <div class="item">
          <p class="key">13.资产证明(银行卡余额至少50w证明图片)</p>
          <div class="value">
            <div class="el-box">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div>(5M以内,支持JPG,PNG,JPEG,BMP)</div>
        </div>
        <div class="item">
          <p class="key">14.BITCNY资产证明截图</p>
          <div class="value">
            <div class="el-box">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div>(5M以内,支持JPG,PNG,JPEG,BMP)</div>
        </div>
        <div class="item">
          <el-button style="" type="primary">提交</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { baseUrl } from '../../utils/base'
  import { httpGet, httpPost} from '../../utils/index'
  export default {
    data () {
      return {
        symbols: [],
        wx_no: '',
        qq_no: '',
        mobile: '',
        name: '',
        id_no: '',
        bank_card_no: '',
        symbol_id: '',
        wallet_address: '',
        black_content: '',
        list1: [],
        list2: [],
        list10: [],
        list20: [],
        imageUrl1: '',
        imageUrlList1: [],
        imageUrl2: '',
        imageUrlList2: [],
        baseUrl1: '',

        imageUrl: '',
      }
    },
    mounted () {
//      this.getSymbols()
//      this.baseUrl1 = baseUrl
    },
    methods: {
      handleAvatarSuccess1 (res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw);
        this.imageUrlList1.push(this.imageUrl1);
        this.list1.push(file.response.image_url.big);
        this.list10.push(file.response.image_url.small);
      },
      handleAvatarSuccess2 (res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw);
        this.imageUrlList2.push(this.imageUrl2);
        this.list2.push(file.response.image_url.big);
        this.list20.push(file.response.image_url.small);
      },
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      getSymbols () {
        const that = this
        httpGet('/symbols', {symbol_type:'fictitious_money'}, res => {
          if (res.data.error_code === 0) {
            that.symbols = res.data.symbols
          }
        })
      },
      initData () {
        this.wx_no = ''
        this.qq_no = ''
        this.mobile = ''
        this.name = ''
        this.id_no = ''
        this.bank_card_no = ''
        this.symbol_id = ''
        this.wallet_address = ''
        this.black_content = ''
        this.list1 = []
        this.list2 = []
        this.imageUrlList1 = []
        this.imageUrlList2 = []
      },
      blacksCreate () {
        if (!this.black_content) {
          this.$message.error('请输入举报内容');
          return
        }
        const that = this
        httpPost('/blacks/create', {
          wx_no: that.wx_no,
          qq_no: that.qq_no,
          mobile: that.mobile,
          name: that.name,
          id_no: that.id_no,
          bank_card_no: that.bank_card_no,
          symbol_id: that.symbol_id,
          wallet_address: that.wallet_address,
          black_content: that.black_content,
          front_image: that.list1[0],
          back_image: that.list1[1],
          hold_image: that.list1[2],
          small_front_image: that.list10[0],
          small_back_image: that.list10[1],
          small_hold_image: that.list10[2],
          image0: that.list2[0],
          image1: that.list2[1],
          image2: that.list2[2],
          image3: that.list2[3],
          image4: that.list2[4],
          image5: that.list2[5],
          image6: that.list2[6],
          image7: that.list2[7],
          image8: that.list2[8],
          image9: that.list2[9],
          small_image0: that.list20[0],
          small_image1: that.list20[1],
          small_image2: that.list20[2],
          small_image3: that.list20[3],
          small_image4: that.list20[4],
          small_image5: that.list20[5],
          small_image6: that.list20[6],
          small_image7: that.list20[7],
          small_image8: that.list20[8],
          small_image9: that.list20[9]
        }, function (res) {
          if (res.data.error_code === 0) {
            that.$message({
              message: '提交成功',
              type: 'success'
            })
            that.initData()
          } else {
            that.$message.error(res.data.error_reason);
          }
        })
      },
      handleExceed1 (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件`);
      },
      handleExceed2 (files, fileList) {
        this.$message.warning(`当前限制选择 10 个文件`);
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
  .disclose{
    height: 100%;
    padding: 60px 0 200px 0;
    background-color: #fff;
  }
  h1{
    margin-top: 20px;
    font-size:22px;
  }
  .item{
    /*border:1px solid red;*/
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-top: 20px;
  }
  .key{
    margin-bottom: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-box{
    width: 178px;height: 178px;border: 1px dashed #d9d9d9;
  }
  .el-box:hover{
    border-color: #409EFF;
  }
</style>
