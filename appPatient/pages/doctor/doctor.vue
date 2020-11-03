<template>
<view class="doctor overall">
    <view class="doctor-con">
        <ul>
            <li>
                <view class="list-img">
                    <van-icon name="http://app.yunshangyijia.com/static/coursetable/nvue.png" size="120rpx"/>
                </view>
                <view class="list-title">
                    <h2>
                        <view>
                            <span>王杰宇</span>
                            <p>副主治医生</p>
                            <image src="http://app.yunshangyijia.com/static/coursetable/sje.png" ></image>
                        </view>
                        <button @click="toaddMessage">建立病程</button>
                    </h2>
                    <h4>
                    <span>呼吸内科</span>
                    <p>湖南省人民医院天心阁院区</p>
                    </h4>
                     <strong>
                    擅长疾病： 慢性咳嗽、发热，支气管炎、肺部感染慢性阻塞性肺疾病、支气管哮擅长,支气管哮擅长,支气管哮擅长
                     </strong>
                </view>
            </li>
            <li>
                <view class="list-img">
                    <van-icon name="http://app.yunshangyijia.com/static/coursetable/nvue.png" size="120rpx"/>
                </view>
                <view class="list-title">
                    <h2>
                        <view>
                            <span>王杰宇</span>
                            <p>副主治医生</p>
                            <image src="http://app.yunshangyijia.com/static/coursetable/sje.png" ></image>
                        </view>
                        <button @click="toaddMessage">建立病程</button>
                    </h2>
                    <h4>
                    <span>呼吸内科</span>
                    <p>湖南省人民医院天心阁院区</p>
                    </h4>
                     <strong>
                    擅长疾病： 慢性咳嗽、发热，支气管炎、肺部感染慢性阻塞性肺疾病、支气管哮擅长,支气管哮擅长,支气管哮擅长
                     </strong>
                </view>
            </li>
        </ul>
        <view class="doctor-nws">
           <h5>
            <span></span>
            <text>为您推荐</text>
            <p>关联TA成为我的医生</p>
          </h5>
          <ul>
            <li v-for="item in 3" :key="item.index"> 
                <view class="list-img">
                    <van-icon name="http://app.yunshangyijia.com/static/coursetable/nvue.png" size="120rpx"/>
                </view>
                <view class="list-title">
                    <h2>
                        <view>
                            <span>王杰宇</span>
                            <span class="shuga"></span>
                            <p>副主治医生</p>
                            <image src="http://app.yunshangyijia.com/static/coursetable/sje.png" ></image>
                        </view>
                        <button class="list-btne">加关联</button>
                    </h2>
                    <h4>
                    <span>呼吸内科</span>
                    <p>湖南省人民医院天心阁院区</p>
                    </h4>
                     <strong>
                    擅长疾病： 慢性咳嗽、发热，支气管炎、肺部感染慢性阻塞性肺疾病、支气管哮擅长,支气管哮擅长,支气管哮擅长
                     </strong>
                </view>
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
      toaddMessage(){
             uni.navigateTo({
          url: "/pages/course/message/index"
         });
      }
  },
};
</script>
<style lang="scss" scoped>
.doctor{
    padding-top: 12rpx;
 .doctor-con{
    
     .doctor-nws{
         margin-top: 12rpx;
         
           h5{
            display: flex;
            align-items: center;
            padding: 25rpx 35rpx 0 35rpx;
             background: #fff;
            span {
              width: 4rpx;
              height: 24rpx;
              display: block;
              background: #15a7e8;
              border-radius: 4px;
            }
           .shuga{
					width:2rpx;
					height: 20rpx;
					display: block;
					background: #f6f6f6;
					margin-right: 12rpx;
				}
            text{
                font-weight:bold;
                font-size: 30rpx;
                color: #333;
                margin: 0 12rpx;
            }
            p{
                font-size: 24rpx;
                color: #333333;
            }
         }
         .list-btne{
             border: 2px solid #15A7E8 !important;
             background: #fff !important;
         }
     }
 }
//  上下公共样式,所以写在外面
 ul{
      background: #fff;
      li:last-child{
          .list-title{
              border-style: none;
          }
      }
        li{
            display: flex;
            padding: 25rpx 30rpx 0rpx 20rpx;
           /deep/.list-img {
                align-items: flex-start;
            }
            .list-title{
                padding-bottom: 30rpx;
                border-bottom: 1px solid rgba(199, 199, 199, 0.2);
                h2{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    view{
                        display: flex;
                    align-items: center;
                        span{
                        font-size: 30rpx;
                        font-weight: bold;
                        color: #333333;
                        margin: 0 10rpx;
                        }
                        p{
                            font-size: 24rpx;
                            color: #000;
                        }
                        image{
				            width: 48rpx;
				            height: 28rpx;
				            margin-left: 20rpx;
			            }
                    }
                    button{
                        font-size: 28rpx;
                        color: #15A7E8;
                        line-height: 40rpx;
                        padding: 12rpx 22rpx;
                        border-radius: 32rpx;
                        background: rgba(21, 167, 232, 0.13);
                        margin: 0;
                    }
                }
                h4{
                    display: flex;
                    margin-top: 13rpx;
                    span{
                        font-size: 24rpx;
                        color: #333333;
                        margin: 0 14rpx;
                        line-height: 33rpx;
                    }
                    p{
                        font-size: 24rpx;
                        color: #333;
                        margin: 0 14rpx;
                        line-height: 33rpx;
                        border-left: 1px solid rgba(199, 199, 199, 0.2);
                    }
                }
                strong{
                    padding: 0 10rpx;
                    margin-top: 20rpx;    
                    line-height: 33px;
                    color: #6E6E6E;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    font-size: 24rpx;
                    
                }
            }
        }
       
    }
}
</style>