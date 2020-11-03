<template>
  <view class="income">
    <van-notice-bar
      wrapable
      color="#F5B627"
      text="医生，您辛苦了！每月1号系统会自动将您上月的收入打款至您的微信钱包账户，请注意查收。"
      id="title"
    />
    <view class="income-con">
      <view class="newse">
        <h2>总计：<span>280</span>元</h2>
        <h2>已提现：<span>200</span>元</h2>
        <h2>本月：<span>80</span>元</h2>
      </view>

        <view class="list-tom" v-for="item in 6" :key="item.index-ruleForm">
          <view class="list-tom-text">
            <p>王小俊给您发来感谢【关怀备至】</p><span>￥5</span>
          </view>
          <strong>2020-9-10 12：30</strong>
        </view>


    </view>
  </view>
</template>
<script>
export default {
  data: () => ({}),
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.income {
  width: 100%;
  min-height: 100vh;
  #title {
    /deep/ .van-notice-bar {
      background: rgba(245, 182, 39, 0.1) !important;
      font-size: 24rpx;
      padding: 20rpx 30rpx;
      line-height: 33rpx;
    }
  }
  .income-con {
    .newse {
      display: flex;
      justify-content: space-between;
      h2 {
        font-size: 30rpx;
        line-height: 40rpx;
				span{
					font-weight: bold;
				}
      }
      padding: 30rpx;
      border-bottom:  1px solid rgba(199, 199, 199, 0.3);
    }
  
      .list-tom {
        width: 100%;
        padding: 36rpx 30rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(199, 199, 199, 0.3);
        .list-tom-text {
          display: flex;
          justify-content: space-between;
          font-size: 28rpx;
          color: #333;
          font-weight: normal;
          margin-bottom: 12rpx;
          p{
            color: #333333;
            font-size: 28rpx;
            // font-weight: bold;
          }
          span {
            color: #ee0a24;
            font-size: 28rpx;
          }
        }
        strong {
          font-size: 24rpx;
          color: #7f7f7f;
        }
      
    }
  }
}
</style>     