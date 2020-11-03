<template>
  <view class="personal" style="background-image: url(http://app.yunshangyijia.com/static/personal/bannerse.png);">
    <getto title="个人中心" :flage="false"></getto>
    <view class="personal-heder">
      <view class="title-moen">
        <img
          src="http://app.yunshangyijia.com/static/payment/nv.png"
          alt=""
        >
        <div>
          <h3>王小二</h3>
        </div>
      </view>
    </view>
    <view class="personal-con">
      <ul>
        <li>
          <navigator
            url="../doctor/doctor"
            hover-class="navigator-hover"
            class="personal-con-list"
          >
            <van-icon
              name="http://app.yunshangyijia.com/static/personal/1.png"
              size="35rpx"
            />
            <h2>
              我的医生
              <van-icon
                name="http://app.yunshangyijia.com/static/u612.png"
                size="24rpx"
              />
            </h2>
          </navigator>
        </li>
        <li>
          <navigator
            url="../index/disease/disease"
            hover-class="navigator-hover"
            class="personal-con-list"
          >
            <van-icon
              name="http://app.yunshangyijia.com/static/personal/2.png"
              size="35rpx"
              
            />
            <h2>
              我的病程
              <van-icon
                name="http://app.yunshangyijia.com/static/u612.png"
                size="24rpx"
           
              />
            </h2>
          </navigator>
        </li>
        <li>
          <navigator
           url="../information/information"
            hover-class="navigator-hover"
            class="personal-con-list"
          >
            <van-icon
               name="http://app.yunshangyijia.com/static/personal/3.png"
              size="35rpx"
             
            />
            <h2>
              就诊人信息
              <van-icon
                name="http://app.yunshangyijia.com/static/u612.png"
                size="24rpx"
              
              />
            </h2>
          </navigator>
        </li>
        <li>
          <navigator
            url="../zfrecords/zfrecords"
            hover-class="navigator-hover"
            class="personal-con-list"
          >
            <van-icon
               name="http://app.yunshangyijia.com/static/personal/4.png"
              size="35rpx"
        
            />
            <h2>
              支付记录
              <van-icon
                name="http://app.yunshangyijia.com/static/u612.png"
                 size="24rpx"
            
              />
            </h2>
          </navigator>
        </li>
      </ul>

        <ul>
          <li>
            <navigator
              url="/pages/editpswd/index"
              hover-class="navigator-hover"
              class="personal-con-list"
            >
            <van-icon
               name="http://app.yunshangyijia.com/static/personal/5.png"
              size="35rpx"
        
            />
              <h2>
                客户服务
                <van-icon
                  name="http://app.yunshangyijia.com/static/u612.png"
                   size="24rpx"
                
                />
              </h2>
            </navigator>
          </li>
          <li>
            <navigator
              url="../course/homepage/index"
              hover-class="navigator-hover"
              class="personal-con-list"
            >
            <van-icon
               name="http://app.yunshangyijia.com/static/personal/5.png"
              size="35rpx"
        
            />
              <h2>
                测试医生主页
                <van-icon
                  name="http://app.yunshangyijia.com/static/u612.png"
                   size="24rpx"
                
                />
              </h2>
            </navigator>
          </li>
          
        </ul>
      </view>

   
  
  </view>
</template>
<script>
import getto from "../../components/index/getto"
export default {
  data: () => ({
    data:Object
  }),
  created() {},
  methods: {},
  onLoad(options) {
            console.log(options.index)
  },
  components: {
    getto
  },
};
</script>
<style lang="less">
.personal {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-size: 100% 28%;
  background-position: top;
  background-repeat: no-repeat;
  padding-top: 100rpx;
  background-color: #fafafa;
  .personal-heder {
    display: flex;
    margin: 30rpx 60rpx 30rpx 60rpx;
    justify-content: space-between;
    box-sizing: border-box;
    .title-moen {
      color: #fff;
      display: flex;
      align-items: center;
      img {
        width: 120rpx;
        height: 120rpx;
        display: block;
      }
      div {
        margin-left:25rpx;
        h3 {
          font-size: 30rpx;
        }
        p {
          font-size: 24rpx;
          margin-top: 10rpx;
        }
      }
      
    }
    .wx-come-img{
        navigator{
          height: 100%;
          display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
          .zx{
             width: 77rpx;
          height: 32rpx;
          margin-bottom: 10rpx;
          /deep/.van-icon{
            width: 77rpx;
          height: 32rpx;
          }
          /deep/.van-icon__image{
             width: 77rpx;
          height: 32rpx;
          }
        }
        }
        
      }
   
  }
  .personal-con {
    width: calc(100% - 48rpx);
    margin: 0 24rpx;
    display: flex;
    flex-direction: column;
    ul {
      width: 100%;
      border-radius: 20rpx;
      background: #fff;
      box-shadow: 1px 3px 8px rgba(21, 167, 232, 0.1);
      margin-bottom: 30rpx;
      li {
        width: 100%;
        display: inline-block;
        .personal-con-list {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 30rpx 0rpx  0rpx 20rpx;
          h2 {
            flex: 1;
            display: flex;
            margin-left: 30rpx;
            justify-content: space-between;
            font-size: 28rpx;
            padding-right: 38rpx;
            padding-bottom: 30rpx;
            border-bottom: 1px solid rgba(199, 199, 199, 0.6);
          }
        }
      }
      li:last-child {
        h2{
          border-style: none;
        }
      }
    }
    
  }
}
</style>