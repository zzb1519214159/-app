<!-- 个人中心 -->
<template>
	<view class="personal" style="background-image: url(/static/personal/bannerse.png);">
		<getto title="个人中心"></getto>
		<view class="personal-heder">
			<view class="title-moen">
				<img :src="particularsObj.header">
				<div>
					<h3 class="personalName">{{particularsObj.name}}</h3>
					<p>{{particularsObj.title}}<span class="borderRight"></span>{{particularsObj.departments2_name}}</p>
				</div>
			</view>
			<view class="wx-come-img">
				<navigator url="/pages/qrcode/qrcode" hover-class="navigator-hover">
					<van-icon name="/static/personal/zx.png" class="zx" />
					<van-icon name="/static/personal/wxewm.png" size="40rpx" />
				</navigator>
			</view>
		</view>
		<view class="personal-con">
			<ul>
				<li v-for="(item,index) in personalArry" :key="index">
					<navigator url="" @click="jump(item)" hover-class="navigator-hover" class="personal-con-list">
						<van-icon :name="item.name" size="35rpx" class=""/>
						<h2>{{item.name1}}<van-icon :name="item.name2" size="24rpx" />
						</h2>
					</navigator>
				</li>
			</ul>
			<ul>
				<li>
					<navigator url="/pages/editpswd/index" hover-class="navigator-hover" class="personal-con-list">
						<van-icon name="/static/personal/5.png" size="35rpx" />
						<h2>
							修改密码
							<van-icon name="/static/u612.png" size="24rpx" />
						</h2>
					</navigator>
				</li>
			<!-- 	<li>
					<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover" class="personal-con-list">
						<van-icon name="/static/personal/6.png" size="35rpx" />
						<h2>
							联系我的互联网助理
							<van-icon name="/static/u612.png" size="24rpx" />
						</h2>
					</navigator>
				</li> -->
			</ul>
		</view>
	</view>
</template>
<script>
	import getto from "../../components/index/getto"
	import {doctorAccount} from "../../api"
	export default {
		components: {
			getto
		},
		data(){
			return{
				personalArry:[
					{
						url:"/pages/medical/index",
						name:"/static/personal/1.png",
						name1:"常用语",
						name2:"/static/u612.png",
					},
					{
						url:"/pages/updatedata/index",
						name:"/static/personal/2.png",
						name1:"个人资料编辑",
						name2:"/static/u612.png",
					},
					{
						url:"/pages/sevideo/sevideo",
						name:"/static/personal/3.png",
						name1:"我的专题视频",
						name2:"/static/u612.png",
					},
					{
						url:"/pages/income/income",
						name:"/static/personal/4.png",
						name1:"我的账户",
						name2:"/static/u612.png",
					},
				],
				particularsObj:{}
			}
		},
		methods:{
			jump(item){
				// 动态路径+动态传值
				uni.navigateTo({
				    url: item.url+'?item='+JSON.stringify(this.particularsObj)
				});
			},
			// 详情接口
			doctorAccountDo(){
				doctorAccount().then(res=>{
					if(res.code===0){
						res.data.header = this.pcImg+res.data.header;
						this.particularsObj = res.data;
					}
				})
			}
		},
		onShow() {
			this.doctorAccountDo();
		}
	};
</script>
<style lang="scss">
	.personal {
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		background-size: 100% 28%;
		background-position: top;
		background-repeat: no-repeat;
		padding-top: 100rpx;
		background-color: #fafafa;

		.personal-heder {
			display: flex;
			margin: 30rpx 60rpx 30rpx 60rpx;
			justify-content: space-between;
			box-sizing: border-box;

			.title-moen {
				display: flex;
				align-items: center;
				color: #fff;
				.personalName{
					font-weight: 600;
				}
				.borderRight{
					background-color: $uni-text-color-inverse;
				}
				img {
					width: 120rpx;
					height: 120rpx;
					display: block;
				}

				div {
					margin-left: 25rpx;

					h3 {
						font-size: 30rpx;
					}

					p {
						font-size: 24rpx;
						margin-top: 10rpx;
					}
				}

			}

			.wx-come-img {
				navigator {
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.zx {
						width: 77rpx;
						height: 32rpx;
						margin-bottom: 10rpx;

						/deep/.van-icon {
							width: 77rpx;
							height: 32rpx;
						}

						/deep/.van-icon__image {
							width: 77rpx;
							height: 32rpx;
						}
					}
				}

			}

		}

		.personal-con {
			width: calc(100% - 48rpx);
			margin: 0 24rpx;
			display: flex;
			flex-direction: column;

			ul {
				width: 100%;
				border-radius: 20rpx;
				background: #fff;
				box-shadow: 2rpx 3px 8px rgba(21, 167, 232, 0.1);
				margin-bottom: 30rpx;

				li {
					width: 100%;
					display: inline-block;
					&:not(:last-child) { 
						h2{
							border-bottom: 2rpx solid $uni-border-color-199;
						}
					}
					.personal-con-list {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						padding: 30rpx 0rpx 0rpx 20rpx;
						van-icon{
							margin-top: 5rpx;
						}
						h2 {
							flex: 1;
							display: flex;
							margin-left: 30rpx;
							justify-content: space-between;
							font-size: 28rpx;
							padding-right: 38rpx;
							padding-bottom: 30rpx;
						}
					}
				}
			}

		}
	}
</style>
