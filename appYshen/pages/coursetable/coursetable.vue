<template>
  <view class="coursetable">
      <getto title="病程表" ></getto>
    <view class="calendarcon-title">
      <view class="title-mo">
        <van-icon
          name="/static/coursetable/n.png"
          size="50rpx"
        />
        <h3>王小俊</h3>
        <span>男</span>
        <span>23岁</span>
        <span>
          15818501200</span>
      </view>
      <h2>主诉:头痛，胸闷，呼吸不畅,头痛，胸闷，呼吸不畅,头痛，胸闷，呼吸不畅
          <images></images>
      </h2>
    </view>
    <h4>20200901呼吸内科病程</h4>
    <calendar></calendar>

  </view>
</template>
<script>
import calendar from "../../components/index/calendar";
import images from "../../components/index/images"
import getto from "../../components/index/getto"
export default {
  data: () => ({
    
  }),
  created() {},
  methods: {},
  components: {
    calendar,
    images,
    getto
  },
};
</script>
<style lang="less" scoped>
.coursetable {
  background-image: url("../../static/coursetable/banner.png");
  background-size: 100% 15%;
  background-position: top;
  background-repeat: no-repeat;
  padding-top: 150rpx;
  .calendarcon-title {
    width: calc(100% - 48rpx);
    background: #fff;
    margin: 0 24rpx;
    padding: 30rpx 24rpx;
    box-sizing: border-box;
    border-radius: 12rpx;
     box-shadow:0px 5px 10px  rgba(185,185,185, 0.1);
    .title-mo {
      display: flex;
      align-items: center;
      h3 {
        font-size: 28rpx;
        color: #000;
        font-weight: 600;
        margin-left: 25rpx;
      }
      span {
        font-size: 24rpx;
        color: #999;
        margin-left: 20rpx;
      }
    }
    h2 {
      width: 100%;
      display: flex;
      font-size: 28rpx;
      flex-wrap: wrap;
      color: #333333;
      padding-left:75rpx;
      box-sizing: border-box;
      margin-top: 12rpx;
    }
  }
  h4 {
    width: 100%;
    border-bottom: 1px solid #F6F6F6;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 30rpx;
    color: #333;
    text-align: center;
    padding: 20rpx 0 24rpx 0;
  }
}
</style>