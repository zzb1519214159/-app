<template>
  <view class="sevideo">
    <view
      class="sevideo-list"
      v-for="item in 3"
      :key="item.index"
    >
      <view class="sevideo-title">
        <h2>
          <van-icon
            name="/static/video/tx.png"
            size="96rpx"
          />
          <span>呼吸常见病自查(一)</span>
        </h2>
      </view>
      <view class="sevideo-con">
        <video
          src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v"
          id="demoVideo"
          :controls="true"
          :enable-progress-gesture="true"
          :show-center-play-btn="true"
        >
        </video>
      </view>
      <view class="sevideo-moex">
        <view class="moex-top">
          <span>更新于：2020-10-17</span>
          <h2>
            <span>
              <van-icon
                name="/static/video/t1.png"
                size="30rpx"
              /> 830
            </span>
            <span>
              <van-icon
                name="/static/video/t2.png"
                size="30rpx"
              /> 80
            </span>
          </h2>
        </view>
        <view :class="['moex-text',{'moex-textou':flag}]">
          呼吸常见病自查内容简介呼吸常见病自查内容简介呼吸常见病自查内容简介呼吸常见病自查内容简介呼吸常见病呼吸常见病自查内容简介呼吸常见病自查内容简介呼吸常见病自查内容简介呼吸常见病自查内容简介呼吸常见病
        </view>
        <view class="texthide">
          <p
            v-if="flag"
            @click="moex()"
          >展开全部
            <van-icon
              name="/static/video/y1.png"
              size="15rpx"
            />
          </p>
          <p
            v-if="!flag"
            @click="moex()"
          >关闭详情
            <van-icon
              name="/static/video/y2.png"
              size="15rpx"
            />
          </p>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data: () => ({
    flag: true,
  }),
  created() {},
  methods: {
    moex() {
      this.flag = !this.flag;
    },
  },
};
</script>
<style lang="scss" scoped>
.sevideo {
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  .sevideo-list {
    padding: 23rpx 20rpx;
    border-bottom: 1px solid $uni-border-color-199;
    .sevideo-title {
      padding: 20rpx 0;
      h2 {
        display: flex;
        font-size: 30rpx;
        color: #333;
        align-items: center;
        /deep/.van-icon {
          margin-right: 10rpx;
        }
        span{
          font-size: 30rpx;
        color: #333;
        }
      }
    }
    .sevideo-con {
			// background-color: red;
      /deep/video {
        margin: 0 auto;
        width: 100%;
        height: 400rpx;
        border-radius: 12rpx;
      }
    }
    .sevideo-moex {
      .moex-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 20rpx 0;
        span {
          font-size: 24rpx;
          color: #6e6e6e;
        }
        h2 {
          display: flex;
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 26rpx;
            color: #6e6e6e;
            margin-left: 40rpx;
            /deep/.van-icon {
              margin-right: 10rpx;
            }
          }
        }
      }
      .texthide {
        margin-top: 12rpx;
        p {
          font-size: 24rpx;
          color: #15a7e8;
          display: flex;
          justify-content: center;
          align-items: center;
          /deep/.van-icon {
            margin-left: 5rpx;
          }
        }
      }
      .moex-text {
        font-size: 28rpx;
        color: #333;
      }
      .moex-textou {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>