<!-- 我的病程页 -->
<template>
<view class="disease overall">
    <view class="disease-con">
        <button class="disease-btn" @click="tocalendar">
             <van-icon name="http://app.yunshangyijia.com/static/btns.png" size="26rpx"/>
            建立病程
        </button>
        <view class="disease-maps">
            <ul>
                <li v-for="item in 3" :key="item.index">
                <van-swipe-cell :right-width="55" >
                    <van-cell-group>
                    <view class="title">
                        <h3>20200901呼吸内科病程</h3>
                        <p>
                            <van-icon name="http://app.yunshangyijia.com/static/diesss.png" size="26rpx"/>
                            王杰宇
                        </p>
                    </view>
                    <h4>
                        <span>王小军</span>
                        <text>病程中</text>
                        <!-- <strong>病程期:2020/9/1 - 2020/9/15</strong> -->
                    </h4>
                        </van-cell-group>
                    <view slot="right" class="right-btn">
                        <van-button
                          color="#EE0A24"
                          size="normal"
                        >删除</van-button>
                    </view>
                </van-swipe-cell>
                </li>
                <li>
                <van-swipe-cell :right-width="55" >
                    <van-cell-group>
                    <view class="title">
                        <h3>20200901呼吸内科病程</h3>
                        <p>
                            <van-icon name="http://app.yunshangyijia.com/static/diesss.png" size="26rpx"/>
                            王杰宇
                        </p>
                    </view>
                    <h4>
                        <span>王小军</span>
                        <!-- <text>病程中</text> -->
                        <strong>病程期:2020/9/1 - 2020/9/15</strong>
                    </h4>
                        </van-cell-group>
                    <view slot="right" class="right-btn">
                        <van-button
                          color="#EE0A24"
                          size="normal"
                        >删除</van-button>
                    </view>
                </van-swipe-cell>
                </li>
            </ul>
        </view>
    </view>
</view>
</template>
<script>
export default {
  data: () => ({}),
  created () {},
  methods: {
      tocalendar(){
          
          uni.navigateTo({
          url: "/pages/doctor/doctor"
         });
      }
  },
};
</script>
<style lang="scss">
.disease{
    padding-top: 12rpx;
    .disease-con{
        min-height: 100vh;
        background: #fff;
        padding-top: 20rpx;
        .disease-btn{
            width: 556rpx;
            height: 80rpx;
            background: rgba(21, 175, 232, 0.12);
            border-radius: 6rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32rpx;
            color: #15A7E8;
            /deep/.van-icon{
                margin-right: 20rpx;
            }
        }
        .disease-maps{
            margin-top: 10rpx;
            ul{
                li{
                    border-bottom: 1px solid rgba(199, 199, 199, 0.2);
                    .title{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 30rpx 30rpx 0 30rpx;
                        h3{
                            font-size: 30rpx;
                            color: #333;
                            line-height: 42rpx;
                            font-weight:bold;
                        }
                        p{
                            display: flex;
                            align-items: center;
                            font-size: 24rpx;
                            color: #F5B627;
                            font-weight: 500;
                            /deep/.van-icon{
                                margin-right: 16rpx;
                            }
                        }
                    }
                    h4{
                        display: flex;
                        align-items: center;
                        margin-top: 18rpx;
                        padding: 0 30rpx 30rpx 30rpx;
                        span{
                            font-size: 28rpx;
                            color: #333;
                            margin-right: 18rpx;
                        }
                        text{
                            font-size: 24rpx;
                            color: #15A7E8;
                        }
                        strong{
                            font-size: 24rpx;
                            color: #AFACAC;
                        }
                    }
                    .right-btn{
                         width: 110rpx;
                        height: 100%;
                         display: flex;
                        /deep/.van-button{
                            width: 110rpx;
                             display: flex;
                            height: 100%;
                            padding: 0;
                               border-radius: 0%;
                        }
                    }
                }
            }
            /deep/.van-hairline--top-bottom:after {
                border-style: none !important;
            }
        }
    }
}
</style>