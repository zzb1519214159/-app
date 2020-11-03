<!-- 医佳病程管理/日历 -->
<template>
<view class="calendar overall">
	<getto title="病程表"></getto>
	<view class="calendarHeader">
		<van-icon name="http://app.yunshangyijia.com/static/coursetable/top1.png" size="46rpx"/>
		<text>20201014呼吸内科病程</text>
		<van-icon name="http://app.yunshangyijia.com/static/coursetable/bjtb.png" size="44rpx"/>
	</view>
	<!-- 医生个人信息根据状态去判断是否显示 -->
	<view class="headerBody" v-if="harderState>0">
		<van-icon name="http://app.yunshangyijia.com/static/coursetable/nvue.png" size="120rpx"/>
		<view class="headerText">
			<view class="headerText-title">
				<h3>王杰</h3>
				<h5>
					<span>主治医生</span>
					<span class="shug"></span>
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
	<view class="colorfff"></view>
	<view class="headerBody2">
		<van-notice-bar
		 color="#6E6E6E"
		 text="暂无健康建议"
		>
		<van-icon slot="left-icon" name="chat" size="40rpx" color="#15A7E8" style="margin-right:20rpx;"/>
		</van-notice-bar>
	
	</view>
	<calendar :selected="selected" :bootomState="2"></calendar>
	
</view>
</template>
<script>
import calendar from "@/components/index/calendar"
import getto from "@/components/index/getto"
export default {
  components:{
    calendar,getto
	
  },
	data(){
		return{
		 selected: [{ date: "2020-10-13", info: "签到" }],
		 harderState:1//头部状态
		}
	},
	methods: {
		change(e) {
				console.log(e);
			},
			clickDDD(){
				console.log()
			}
	},
};
</script>
<style lang="scss">
.overall{
	background: #fff;
}
.calendar{
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-size: 100% 16%;
  background-position: top;
  background-repeat: no-repeat;
  padding-top: 120rpx;
  background-image: url("http://app.yunshangyijia.com/static/coursetable/banner2.png");
	.calendarHeader{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:20rpx 30rpx 23rpx 40rpx;
		image{
			width: 46rpx;
			height: 46rpx;
		}
		text{
			color: #fff;
			font-size: 30rpx;
		}
	}
	.headerBody{
		display: flex;
		align-items: center;
		margin: 0 20rpx;
		background: #fff;
		padding:23rpx 14rpx;
		box-shadow: 0px 10px 10px rgba(21, 167, 232, 0.1);
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
					span{
						color: #333;
						font-size: 24rpx;
						margin: 0 12rpx;
					}
					.shug{
							width:2rpx;
					height: 20rpx;
					display: block;
					background: #f6f6f6;
					margin: 0;
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
	.colorfff{
		border: 4rpx solid #fff;
	}
	.headerBody2{
		margin-top: 30rpx;
		 van-notice-bar{
			 /deep/.van-notice-bar{
				 background-color: rgba(21, 167, 232, 0.06) !important;
				 padding: 0 30rpx;
			 }
		 }
	}
}
</style>
