<template>
  <view class="propose">
    <ul>
      <li
        v-for="item in 5"
        :key="item.index"
      >
        <van-swipe-cell :right-width="rightwidth">
          <van-cell-group>
            <view class="group-text">
              <view class="group-left">
                <h3>回复：张璐璐</h3>
                <p>明天到院里来复查</p>
                <span>2020-10-13 12:49</span>
              </view>

              <van-icon
                name="/static/index/list.png"
                size="40rpx"
              />
            </view>
          </van-cell-group>
          <view slot="right" class="right-btn">
            <van-button
              color="#F5B627"
              @click="towritepropose"
            >编辑</van-button>
            <van-button color="#EE0A24">删除</van-button>
          </view>
        </van-swipe-cell>
      </li>
    </ul>
  </view>
</template>
<script>
export default {
  data: () => ({
    rightwidth: 110,
  }),
  created() {},
  methods: {
    towritepropose() {
      uni.navigateTo({
        url: "/pages/writepropose/writepropose",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.propose {
  ul {
    li {
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(199, 199, 199, 0.6);
      .group-text {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 30rpx;
        .group-left {
          display: flex;
          flex-direction: column;
          h3 {
            font-size: 30rpx;
            color: #000;
            font-weight: bold;
          }
          p {
            font-size: 28rpx;
            color: #000;
            margin: 12rpx 0;
          }
          span {
            font-size: 24rpx;
            color: #afacac;
          }
        }
      }
      .right-btn{
        height: 100%;
        /deep/.van-button {
        width: 110rpx;
        padding: 0;
        border-radius: 0;
        height: 100%;
       }
      }
      
    }
  }
}
</style>