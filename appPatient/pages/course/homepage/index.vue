<!-- 医生主页 -->
<template>
	<view class="homepage overall">
		<view class="homepage-baen">
		<view class="header">
			<image src="http://app.yunshangyijia.com/static/homepage1.png" class="viewImgage"></image>
			<ul>
				<li>
					<text class="font16">张璐璐</text>
				</li>
				<li>
					<text class="font30 liLeft">呼吸内科</text>
					<span></span>
					<text class="font30">主治医生</text>
				</li>
				<li>
					<text class="font24">湖南省人民医院三甲医院</text>
					<van-image width="24" height="14" src="http://app.yunshangyijia.com/static/label.png" class="labelImage"/>
				</li>
			</ul>
		</view>
		<view class="bodyIndex">
			<!-- 标题卡片模式 -->
			<view class="bodyIndextome">
				<ul>
					<li v-for="(item,index) in arryList" :key="index">
						<view class="cardHeader">
							<text></text>
							<text>{{item.name}}</text>
						</view>
						<text class="cardBody" :class="{textHeight:item.boole}">{{item.name1}}</text>
						<view class="iconClick" v-show="item.boole">
							<view @click="examine(index,false)">
								<text>查看全部</text>
								<image src="http://app.yunshangyijia.com/static/icon.png" class="iconImage"></image>
							</view>
						</view>
						<view class="iconClick" v-show="!item.boole">
							<view @click="examine(index,true)">
								<text>收起更多</text>
								<image src="http://app.yunshangyijia.com/static/icon1.png" class="iconImage"></image>
							</view>
						</view>
					</li>
				</ul>
				<view class="bottom">
					<button type="primary" @click="dataClick" class="bottomBotton">关联医生</button>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>

	export default {
		components: {},
		data() {
			return {
				arryList:[
					{
						name:"擅长疾病",
						name1:"慢性咳嗽、发热，支气管炎、肺部感染、慢性阻塞性肺疾病、支气管哮喘、肺心病、呼吸衰竭、肺部结节、胸腔积液、肺部肿瘤、支气管扩张伴咯血、睡眠呼吸疾病等疾病的诊治",
						boole:true
					},{
						name:"个人简介",
						name1:"医学硕士，从事呼吸临床工作近10年，曾于湘雅医院及北京学习研讨。对内科各系统疾病和呼吸系统急危重症疑难杂症有丰富的临床诊治经验。曾参与国家自然科学基金《低氧诱导因子对肺动脉高压形成机制》的研究。发表论文数篇。",
						boole:true
					}
				]
			};
		},
		methods:{
			examine(index,val){
				this.arryList[index].boole = val;
			},
			dataClick(){
				uni.navigateTo({
					url: '/pages/course/homepage/theDoctor',
				});
			}
		}
	}
</script>

<style lang="scss">
.homepage{
		width: 100%;
	min-height: 100vh;
	background-image: url("http://app.yunshangyijia.com/static/homepage.png");
	background-size: 100% 30%;
	background-repeat: no-repeat;
	background-position: top;

	.homepage-baen{
	
	.colrfff{
		color: $uni-text-color-inverse;
	}
	.font16{
		font-size: 36rpx;
		font-weight:bold;
	}
	.font30{
		font-size: 30rpx;
	}
	.font24{
		font-size: 24rpx;
	}
	.header{
		display: flex;
		align-items: center;
		padding: 20rpx;

		.viewImgage{
			width:248rpx;
			height: 248rpx;
		}
		ul{
			margin-left: 30rpx;
			li{
				display: flex;
				align-items:center;
				color: $uni-text-color-inverse;
				&:not(:last-child){
					margin-bottom: 30rpx;
				}
				&:last-child{
					display: flex;
					align-items: center;
				}
				.liLeft{
					margin-right: 12rpx;
				}
				span{
					width:2rpx;
					height: 20rpx;
					display: block;
					background: #f6f6f6;
					margin-right: 12rpx;
				}
				.labelImage{
					margin-top: 10rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
	.bodyIndex{

		
		.bodyIndextome{
			margin:30rpx;
			margin-top: 0;
			padding: 30rpx;
			background: #fff;
			border-radius: 20rpx;
			min-height: 880rpx;
			box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.06);
			border: none;
		}
		ul{
		
			li{
				&:not(:last-child) { 
				  margin-bottom: 30rpx;
				}
				.iconClick{
					text-align: center;
					margin-top: 10rpx;
					view{
						display: inline-flex;
						align-items: center;
						text{
							color: $uni-text-color-15A7E8;
						}
						.iconImage{
							margin-left: 10rpx;
							width: 14rpx;
							height: 15rpx;
						}
					}
					}
				.cardHeader{
					margin-bottom: 10rpx;
					text{
						&:nth-child(1){
							display: inline-block;
							width: 4rpx;
							height: 24rpx;
							margin-right: 10rpx;
							background: #15A7E8;
							border-radius: 4rpx;
						}
						&:nth-child(2){
							font-weight: bold;
							font-size: 30rpx;
						}
					}
				}
				.cardBody{
					color: $uni-text-color-6E6E6E;
					font-size: 28rpx;
				}
				.textHeight{
					text-overflow: ellipsis;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
		.bottom{
			margin-top: 64rpx;
			text-align: center;
			.bottomBotton{
				width: 406rpx;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 50rpx;
				background-color: #15A7E8;
				font-size: 32rpx;
			}
		}
	}
		}
}
</style>
