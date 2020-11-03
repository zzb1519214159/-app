<template>
<view class="zfrecords overall">
    <view class="zfrecords-con">
        <ul>
            <li v-for="(item,index) in 2" :key="index">
                <view class="list-title">
                    <h4>
                        <p>感谢医生【关怀备至】</p>
                        <strong>2020/9/10 12：30</strong>
                    </h4>
                    <h6>
                        <text>￥5</text>
                        <span class="active">支付失败</span>
                    </h6>
                </view>
            </li>
            <li v-for="(item,index) in 5" :key="index">
                <view class="list-title">
                    <h4>
                        <p>感谢医生【关怀备至】</p>
                        <strong>2020/9/10 12：30</strong>
                    </h4>
                    <h6>
                        <text>￥5</text>
                        <span>支付成功</span>
                    </h6>
                </view>
            </li>
        </ul>
    </view>
</view>
</template>
<script>
export default {
  data: () => ({
     
  }),
  created () {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.zfrecords{
    padding-top: 12rpx;
    .zfrecords-con{
        background: #ffffff;
    ul{
        li{
            border-bottom: 1px solid rgba(199, 199, 199, 0.2);
            .list-title{
                padding: 30rpx;
                h4{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p{
                        font-size: 28rpx;
                        color: #333333;
                       
                    }
                    strong{
                        font-size: 24rpx;
                        color: #AFACAC;
                    }
                }
                h6{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 12rpx;
                    text{
                        font-size: 28rpx;
                        color: #EE0A24;
                       
                    }
                    span{
                        font-size: 24rpx;
                        color: #333333;
                    }
                    .active{
                        color: #EE0A24;
                    }
                }
            }
        }
    }
  }
}
</style>