<!-- 完善就诊信息 -->
<template>
	<view class="message overall">
		  <van-notice-bar color="#F5B627" background="rgba(245, 182, 39, 0.1)" text="请务必完善真实信息！"/>
		<view class="diagnoseBody">
			<view class="title">
				<h4><span class="mu-title"></span> 就诊人</h4>
			</view>
			<ul>
				<li v-for="(item,index) in liArry" :key="index" @click="itemClick(index,item)" :class="{borderClick:index===liIndex}">
					<text>【{{userArry[item.relation].name}}】</text>
					<text>{{item.patient}} </text>
					<span>{{sexlist[item.sex].sex}}</span>
					<span>{{item.age}}岁</span>
					<view class="iconbon">
						<van-icon v-show="item.boole&&index===liIndex" name="http://app.yunshangyijia.com/static/dxk.png" color="#1989fa" size="16px" />
					</view>
					
				</li>
			
					<button class="disease-btn" @click="addReport">
           			  <van-icon name="http://app.yunshangyijia.com/static/btns.png" size="26rpx"/>
            			新增就诊人
        			</button>
			
			</ul>
		</view>
		<view class="messagebody">
			<view class="max">
				<view class="title">
				<h4><span class="mu-title"></span> 医生诊断结果<text>上传诊断报告单</text></h4>
				</view>
				<view class="imgUploader">
					<van-uploader :file-list="fileList" max-count="1" :after-read="afterRead" />
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="title">
				<h4><span class="mu-title"></span> 疾病/症状（多选）：</h4>
				</view>
			<view class="bottomText">
				<ul>
					<li v-for="(item,index) in symptom" :key="index" @click="symptomClick(index,item)">
						<van-tag round type="primary" size="large" color="#f2f2f2" :class="{activate:item.boole}">{{item.name}}</van-tag>
					</li>
				</ul>
			</view>
		</view>
		<view class="buttonText" :class="{preserve:form.a==''}">
			<button type="info" @click="dataClick" :disabled="form.a==''">保 存</button>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
import { myPatients } from "../../../api";
	import Toast from '../../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				liArry:[],
				liIndex: -1,
				fileList: [],
				userArry:[
					{
						name:"本人"
					},{
						name:"爱人"
					},{
						name:"儿女"
					},{
						name:"父母"
					},{
						name:"其他"
					}
				],
				sexlist:[
					{
					 sex:"女"
					},
					{
					 sex:"男"
					},
					{
					 sex:"未知"
					},
				],
				symptom: [{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					},
					{
						name: "头疼",
						boole: false
					}
				],
				form:{
					a:""
				}
			};
		},
		onShow(){
			this.myPatients()	
		},
		methods: {

			// 就诊人列表
			myPatients(){
				myPatients().then(res=>{
				if(res.code===0){
					this.liArry = res.data;
					this.$set(this.liArry,res.data)
				
				}
			})
			},
			itemClick(index,item) {
				this.liIndex = index;
				this.liArry[index].boole = true;
				this.form.a = item.name;
			},
			afterRead(event) {
				const {
					file
				} = event;
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			},
			symptomClick(index,item) {
				this.symptom[index].boole = !this.symptom[index].boole;
				this.form.c = item.name;
			},
			addReport() {
				uni.navigateTo({
					url: '/pages/course/message/addMessage',
				});
			},
			dataClick(){
				// 模拟假数据
				// this.form
				Toast.success('新增成功');
			}
		},
		
	}
</script>

<style lang="scss">
.mu-title{
			  width: 4rpx;
			  height: 24rpx;
			  display: block;
			  margin-right: 12rpx;
			  background: #15a7e8;
			  border-radius: 4px;
			}
	.message {
		.title{
			display: flex;
			h4{
			font-size: 30rpx;
			color: #333;
			 height: 30rpx;
			font-weight: bold;
			display: flex;
			align-items: center;
			}
			text{
			font-size: 24rpx;
			color: #AFACAC;
			font-weight: normal;
			margin-left: 12rpx;
			}
			  
		}

		.text {
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 20rpx;
			background-color: #f2f2f2;
		}

		.diagnoseBody {
			display: flex;
			padding: 30rpx 30rpx 10rpx 30rpx;
			background: #fff;
			ul {
				flex: 1;
				margin-left: 28rpx;
				li {
					height: 80rpx;
					margin-bottom: 24rpx;
					display: flex;
					align-items: center;
					text-align: center;
					background: #FAFAFA;
					border-radius: 6rpx;
					border: 1px solid #fafafa;
					text{
						font-size: 28rpx;
						color: #333333;
						margin-left: 20rpx;
					}
					span{
						font-size: 28rpx;
						color: #333333;
						margin-left: 60rpx;
					}
					.iconbon{
						flex: 1;
						display:flex;
						justify-content: flex-end;
						padding-right: 16rpx;
					}
					 
				}
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
				.borderClick {
					border-color: #1989fa;
				}
			}
		}

		.messagebody {
			padding:30rpx;
			margin-top: 12rpx;
			background: #fff;
			.max {
				.maxTitle {
					margin-right: 10rpx;
				}

				.imgRight {
					color: #555555;
					font-weight: bold;
				}

				.imgUploader {
					display: flex;
					margin-left: 12rpx;
					margin-top: 20rpx;
					/deep/.van-uploader__upload {
						margin: 0;
					}
				}
			}
		}

		.bottom {
			padding:30rpx;
			margin-top: 12rpx;
			background: #fff;
			.bottomText {
				margin-top: 10rpx;

				ul {
					display: flex;
					flex-wrap: wrap;
			
					li {  
						margin: 8rpx;
						/deep/ .van-tag {
							padding: 14rpx 30rpx;
							display: flex;
							justify-content: center;
							color: #333333;
							border: 2rpx solid #f2f2f2;
						}

						.activate {
							/deep/ .van-tag {
								border-color: #15A7E8;
							}
						}
					}
				
				}
				
			}
			
		}

		.buttonText {
			background: #fff;
			padding: 70rpx 0;
			button {
				width: 406rpx;
			height: 90rpx;
			background: #15A7E8;
			box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50rpx;
				font-size: 32rpx;
			}
			
		}
		.preserve{
			button {
				box-shadow: none;
				background-color: #f2f2f2;
				color: #333;
				border-color:#f2f2f2;
			}
		}
	}
</style>
