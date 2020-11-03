<template>
<view class="payment overall">
    	<view class="headerBody" >
		<van-icon name="http://app.yunshangyijia.com/static/coursetable/nvue.png" size="120rpx"/>
		<view class="headerText">
			<view class="headerText-title">
				<h3>王杰</h3>
				<h5>
					<span>主治医生</span>
                    <i></i>
					<span>呼吸内科</span>
				</h5>
			</view>
			<view class="headerText-map">
				<text>湖南省人民医院</text>
				<text>三甲医院</text>
				<image src="http://app.yunshangyijia.com/static/coursetable/sje.png" ></image>
			</view>
		</view>
	</view>
    <view class="payment-con">
        <h2>一点心意感谢TA的付出</h2>
        <ul>
            <li>
                <view class="list-waps">
                    <van-icon name="http://app.yunshangyijia.com/static/payment/1.png" size="94rpx"/>
                    <h3>
                        <span>关怀备至</span>
                        <strong> <i>¥</i> 5</strong>
                    </h3>
                </view>
            </li>
            <li>
                 <view class="list-waps">
                    <van-icon name="http://app.yunshangyijia.com/static/payment/2.png" size="94rpx"/>
                    <h3>
                        <span>仁心仁术</span>
                        <strong> <i>¥</i>10</strong>
                    </h3>
                </view>
            </li>
            <li>
                 <view class="list-waps">
                    <van-icon name="http://app.yunshangyijia.com/static/payment/3.png" size="94rpx"/>
                    <h3>
                        <span>妙手回春</span>
                        <strong> <i>¥</i>20</strong>
                    </h3>
                </view>
            </li>
            <li>
                 <view class="list-waps">
                    <van-icon name="http://app.yunshangyijia.com/static/payment/4.png" size="94rpx"/>
                    <h3>
                        <span>大医精诚</span>
                        <strong> <i>¥</i>100</strong>
                    </h3>
                </view>
            </li>
            <li class="list-time">
                 <view class="list-waps">
                    <van-icon name="http://app.yunshangyijia.com/static/payment/5.png" size="94rpx"/>
                    <h3>
                        <span>自定义心意</span>
                        <strong> <i>¥</i>
                            <input type="text">
                        </strong>
                    </h3>
                </view>
            </li>
        </ul>
    </view>
     <view class="btnmu">
      <button>送出心意表示感谢</button>
    </view>
</view>
</template>
<script>
export default {
  data: () => ({}),
  created () {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.payment{
    padding-top: 24rpx;
    .headerBody{
		display: flex;
		align-items: center;
		margin: 0 24rpx 0 24rpx;
		background: #fff;
		padding:23rpx 14rpx;
		box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.06);
		border-radius: 12rpx;
		image{
			width: 120rpx;
			height: 120rpx;
		}
		.headerText{
			margin-left: 20rpx;
			.headerText-title{
				display: flex;
				align-items: center;
				h3{
					font-size: 30rpx;
					color: #333;
					font-weight:bold;
					margin-left: 10rpx;
				}
				h5{
					display: flex;
					align-items: center;
                    i{
                        width: 2px;
                        height: 18rpx;
                        background: #c7c7c7;
                    }
					span{
						color: #333;
						font-size: 24rpx;
						margin: 0 12rpx;
					}
				}
			}
		}
		.headerText-map{
			display: flex;
			align-items: center;
			padding-left: 10rpx;
			margin-top: 16rpx;
			image{
				width: 48rpx;
				height: 28rpx;
				margin-left: 20rpx;
			}
		}
}
.payment-con{
    margin-top: 24rpx;
    background: #fff;
    padding: 30rpx;
    h2{
        font-size: 30rpx;
        color: #333333;
        margin-bottom: 18rpx;
    }
    ul{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
            width: calc(50% - 10px);
            background: #F7FCFF;
             margin-top: 20rpx;
            .list-waps{
            display: flex;
            padding: 18rpx 24rpx;
            h3{
                display: flex;
                flex-direction: column;
                margin-left: 32rpx;
                

                span{
                    font-size: 28rpx;
                    color: #333333;
                    line-height: 40rpx;
                }
                strong{
                    display: flex;
                    align-items: center;
                    font-size: 36rpx;
                    color: #EE0A24;
                    i{
                        font-size: 28rpx;
                    }
                }
             }
            }
        }
         .list-time{
                width: 100% !important;
                strong{
                    margin-top: 10rpx;
                     input{
                    width: 341px;
                    height: 56px;
                    background: rgba(199, 199, 199, 0.12);
                    margin-left: 10rpx;
                    padding-left: 10rpx;
                }
                }
               
                
        }
    }
    
}
.btnmu{
      padding-top: 130rpx;
      background: #fff;
     button{
         width: 406rpx;
        height: 90rpx;
        padding: 23rpx 75rpx;
        background: #15A7E8;
        box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
        opacity: 1;
        border-radius: 50rpx;
        font-size: 32rpx;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }
    }
}

</style>