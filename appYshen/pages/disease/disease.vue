<template>
  <view class="disease">
    <ul>

      <li>
        <navigator
          url="../coursetable/coursetable"
          hover-class="none"
        >
          <h2>
            <h4>王小俊 <span>20200901呼吸内科病程</span> </h4>
            <p>
              <van-icon
                name="/static/index/list.png"
                size="40rpx"
              /><span>病程中</span>
            </p>
          </h2>
          <h3>主诉：<p>头痛，胸闷，呼吸不畅</p>
          </h3>
        </navigator>
      </li>
      <li>
        <h2>
          <h4>王小俊 <span>20200901呼吸内科病程</span> </h4>
          <p>
            <van-icon
              name="/static/index/list.png"
              size="40rpx"
            /><span>病程中</span>
          </p>
        </h2>
        <h3>主诉：<p>头痛，胸闷，呼吸不畅</p>
        </h3>
      </li>
      <li>
        <h2>
          <h4>王小俊 <span>20200901呼吸内科病程</span> </h4>
        </h2>
        <h3>主诉：<p>头痛，胸闷，呼吸不畅</p>
        </h3>
        <strong>病程期：2020/10/02 - 2020/10/09</strong>
      </li>
      <li>
        <h2>
          <h4>王小俊 <span>20200901呼吸内科病程</span> </h4>
        </h2>
        <h3>主诉：<p>头痛，胸闷，呼吸不畅</p>
        </h3>
        <strong>病程期：2020/10/02 - 2020/10/09</strong>
      </li>
      <li>
        <h2>
          <h4>王小俊 <span>20200901呼吸内科病程</span> </h4>
        </h2>
        <h3>主诉：<p>头痛，胸闷，呼吸不畅</p>
        </h3>
        <strong>病程期：2020/10/02 - 2020/10/09</strong>
      </li>
    </ul>
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
.disease {
  padding: 20rpx 0;
  li {
    padding: 30rpx;

    border-bottom:  1px solid rgba(199, 199, 199, 0.6);
    h2 {
      display: flex;
      font-size: 30rpx;
      line-height: 42rpx;
      color: #000;
      justify-content: space-between;
      align-items: center;
      h4 {
        font-weight: bold;
        span {
          font-size:30rpx;
          font-weight: 600;
          margin-left: 20rpx;
        }
      }
      p {
        display: flex;
        align-items: center;
        margin-top: 0;
        span {
          margin-left: 10rpx;
          color: #15a7e8;
        }
      }
    }
    h3 {
      display: flex;
      font-size: 28rpx;
      color: #333;
      margin-top: 12rpx;
      line-height: 40rpx;
      p {
        margin: 0;
        color: #333;
      }
    }
    strong {
      font-size: 24rpx;
      color: #999;
      margin-top: 12rpx;
    }
  }
}
</style>