<template>
  <view class="thank">
    <view class="thank_list">
      <ul>
        <li v-for="item in 6" :key="item.index">
          <view class="list-con">
            <h4>
              <p>患者王小俊给您发来感谢【关怀备至】</p>
              <van-icon
                name="/static/thank/1.png"
                size="58rpx"
              />
              <van-icon
                name="/static/thank/1.png"
                size="58rpx"
              />
            </h4>
            <van-icon
              name="/static/thank/2.png"
              size="40rpx"
            />
          </view>
          <strong>2020-9-10 12：30</strong>
        </li>
      </ul>
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
.thank {
  .thank_list {
    li {
      padding: 36rpx 30rpx;
      border-bottom: 1px solid rgba(199, 199, 199, 0.6);
      .list-con {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h4 {
          flex: 1;
          font-size: 28rpx;
          color: #333333;
          display: flex;
          line-height: 40px;
          align-items: center;
        }
      }
      strong {
        font-size: 24rpx;
        color: #afacac;
        line-height: 33px;
        margin-top: 12rpx;
      }
    }
  }
}
</style>