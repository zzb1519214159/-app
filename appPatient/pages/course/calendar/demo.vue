<!-- 医佳病程管理/日历 -->
<template>
<view class="coursetable">
      <view class="calendarcon-title">
      <view class="title-mo">
      <!--  <img
          src="/static/u58.png"
          alt=""
        > -->
        <h3>王小俊</h3>
        <span>男</span>
        <span>23岁</span>
        <p>
          15818501200</p>
      </view>
        <h2>主诉:<p>头痛，胸闷，呼吸不畅,，</p></h2>
    </view>
   <h4>20200901呼吸内科病程</h4>
    <calendar></calendar>
</view>
</template>
<script>
import calendar from "@/components/index/calendar"
export default {
  components:{
      calendar
  }
};
</script>
<style lang="scss" scoped>
.overall{
	background: #fff;
}
.calendarcon-title{
        width: 100%;
        background: #f2f2f2;
        padding: 40rpx;
        box-sizing: border-box;
        .title-mo{
            display: flex;
            align-items: center;
            img{
                width: 60rpx;
                height: 60rpx;
                margin-right: 30rpx;
            }
            h3{
                font-size: 28rpx;
                color: #000;
                font-weight: 600;
                margin-right: 40rpx;
            }
            span{
                font-size: 24rpx;
                color: #999;
                margin-right: 60rpx;
            }
            p{
                 font-size: 24rpx;
                color: #999;
            }
        }
        h2{
            width: 100%;
            display: flex;
            font-size: 24rpx;
            flex-wrap: wrap;
            padding-left: 90rpx;
            box-sizing: border-box;
            p{
                text-align: justify;
                text-justify: newspaper;
                word-break: break-all;
            }
        }
    }
    h4{
        width: 100%;
        margin: 20rpx 0;
         background: #f2f2f2;
        box-sizing: border-box;
        font-weight: 700;
        font-size: 28rpx;
        color: #000;
        text-align: center;
        padding: 30rpx 0;
    }


</style>
