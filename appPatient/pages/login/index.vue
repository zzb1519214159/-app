/* 登录页面 yin*/
<template>
  <view class="content">
    <view class="header">
      <image src="http://app.yunshangyijia.com/static/logo.png"></image>
      <view class="colorText">
        记录病程，健康精准管理
      </view>
    </view>
    <view class="body2">
      <!-- open-type="getPhoneNumber @getPhoneNumber="getPhoneNumber"" -->
      <button
        type="primary"
        class="body2Botton"
        open-type="getPhoneNumber"
        @getphonenumber="onGetPhoneNumber"
        v-if="!flag"
      >微信一键登录</button>
      <button
        class='body2Botton'
        type="primary"
        open-type="getUserInfo"
        withCredentials="true"
        lang="zh_CN"
        @getuserinfo="GetUserInfo"
        v-if="flag"
      >微信授权</button>
      
    </view>
  </view>
</template>

<script>
import { doctorLogin } from "../../api";
import {addUser} from "../../api";
import WXBizDataCrypt from "@/components/WXBizDataCrypt.js";
export default {
  data() {
    return {
      flag:false,
      session_key: "",
      form: {
        openId:"",
        nickname: "",
        avatarUrl: "",
        sex: "男",
        mobile: "",
      },
    };
  },
  methods: {
    GetUserInfo(e) {
      if (e.detail.userInfo) {
        console.log("用户按了允许授权按钮，并且返回用户信息");
           this.form.openId = this.openid
            this.form.nickname = e.detail.userInfo.nickname
             this.form.avatarUrl = e.detail.userInfo.avatarUrl
        
            addUser(this.form).then((res) => {
              // 打印调用成功回调
              if (res.code === 0) {
                console.log(res)
                uni.switchTab({
                  //里面是一个对象形式的参数
                  url: "/pages/index/index",
                });
              }
            });
      } else {
        console.log("用户按了拒绝按钮");
      }
    },
    onGetPhoneNumber(e) {
      if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
        //用户决绝授权
        //拒绝授权后弹出一些提示
      } else {
        //允许授权
        let pc = new WXBizDataCrypt("wx19e5e9e0703dd5cf", this.session_key); //wxXXXXXXX为你的小程序APPID
        let encryptedData = e.detail.encryptedData;
        var iv = e.detail.iv;
        let data = pc.decryptData(encryptedData, iv);
        console.log(data); //data就是最终解密的用户信息

        uni.removeStorageSync("token");
    
        doctorLogin({code:this.jsCode}).then((res) => {
          // 打印调用成功回调
          console.log(res)
          if (res.code == 0) {
            uni.switchTab({
              //里面是一个对象形式的参数
              url: "/pages/course/calendar/index",
            });
            e;
          } else if (res.code == 2) {
            this.flag = true
            this.form.mobile = data.phoneNumber
          }
        });
      }
    },
  },
  onLoad() {
    wx.login({
      success: (res) => {
        console.log(res.code);
        if (res.code) {
          //微信登录成功 已拿到code
          this.jsCode = res.code; //保存获取到的code
          uni.request({
            url:"https://api.weixin.qq.com/sns/jscode2session",
            method: "GET",
            data: {
              appid: "wx19e5e9e0703dd5cf", //你的小程序的APPID
              secret: "b6644cca3c7d93813048f6f6fbde74d2", //你的小程序的secret,
              js_code: res.code, //wx.login 登录成功后的code
            },

            success: (cts) => {
              // 换取成功后 暂存这些数据 留作后续操作
              console.log(cts.data);
              this.openid = cts.data.openid; //openid 用户唯一标识
              this.unionid = cts.data.unionid; //unionid 开放平台唯一标识
              this.session_key = cts.data.session_key; //session_key  会话密钥
            },
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  },
};
</script>

<style lang="scss">
.content {
  margin-top: 158rpx;
  padding: 100rpx;
  text-align: center;
  .header {
    margin-bottom: 111rpx;
    image {
      width: 252rpx;
      height: 195rpx;
      margin-bottom: 16rpx;
    }
    .colorText {
      color: $uni-text-color-6E6E6E;
    }
  }
  .body2 {
    margin-top: 60rpx;
    .body2Botton {
      display: inline-block;
      width: 590rpx;
      height: 90rpx;
      line-height: 90rpx;
      border-radius: 50rpx;
      font-weight: 500;
      font-size: 32rpx;
      background-color: $uni-bg-color-15A7E8;
      border-color: $uni-bg-color-15A7E8;
    }
  }
}
</style>
