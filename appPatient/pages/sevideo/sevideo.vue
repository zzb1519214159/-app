<template>
  <view class="sevideo overall">
    <view
      class="sevideo-list"
      v-for="item in 3"
      :key="item.index"
    >
      <view class="sevideo-title">
        <h2>
          <van-icon
            name="http://app.yunshangyijia.com/static/video/tx.png"
            size="96rpx"
          />
          <h5> <span>王杰宇</span> 呼吸常见病自查(一)</h5>
        </h2>
      </view>
      <view class="sevideo-con">
        <video
          src="https://www3.res.meizu.com/video/安全家庭视频_1.mp4"
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
                name="http://app.yunshangyijia.com/static/video/t1.png"
                size="30rpx"
              /> 830
            </span>
            <span>
              <van-icon
                name="http://app.yunshangyijia.com/static/video/t2.png"
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
              name="http://app.yunshangyijia.com/static/video/y1.png"
              size="15rpx"
            />
          </p>
          <p
            v-if="!flag"
            @click="moex()"
          >关闭详情
            <van-icon
              name="http://app.yunshangyijia.com/static/video/y2.png"
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
<style lang="less" scoped>
.sevideo {
  padding-top: 12rpx;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  .sevideo-list:nth-child(1){
    border-style: none;
  }
  .sevideo-list {
    padding: 23rpx 20rpx;
    background: #fff;
    border: 1px solid rgba(199, 199, 199, 0.2);
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
        h5{
          margin-left: 10rpx;
          font-size: 30rpx;
           color: #333;
          span{
            font-weight: bold;
            margin-right: 20rpx;
          }
        }
      }
    }
    .sevideo-con {
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