<!-- 个人资料编辑 -->
<template>
	<view class="updatedataBodu">
		<view class="updatedataBody">
			<view class="updatedatas">
				<h3 class="updatedata-title">
					<span>王杰</span>
					<p>主治医生<span class="borderRight"></span>呼吸内科</p>
				</h3>
				<view class="bodyMax">
					<view class="updatedata-con">
						<h5 class="title"><span class="borderRight heightSpan"></span>个人简介</h5>
					</view>
					<textarea v-model="form.goodAdDisease" placeholder="写下您的个人简介" />
					</view>
					<view class="updatedata-con">
						<h5 class="title"><span class="borderRight heightSpan"></span>擅长疾病</h5>
						<textarea v-model="form.profile" placeholder="写下您的擅长疾病"/>
					</view>
					<button @click="preserve">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import getto from "../../components/index/getto"
	import {editDoctor} from "../../api"
	export default {
		components: {
			getto
		},
		data() {
			return {
				form:{
					profile:"",
					goodAdDisease:"",
				}
			};
		},
		methods:{
			preserve(){
				this.editDoctorDo(this.form);
			},
			// 编辑接口
			editDoctorDo(data){
				editDoctor(data).then(res=>{
					if(res.code===0){
						uni.showToast({
							title: res.message,
							duration: 2000
						});
						setTimeout(()=>{
							uni.navigateBack({});
						},1000)
					}
				})
			}
		},
		onLoad(options) {
			//options可以接到index 传过来的值
			let data = JSON.parse(options.item);
			this.form.profile = data.profile;
			this.form.goodAdDisease = data.goodAtDisease;
		},
	};
</script>

<style lang="scss">
	
	.updatedataBodu{
		background-color: $uni-text-color-fafafa;
	.updatedataBody{
		padding-top: 12rpx;
		.updatedatas {
			padding: 48rpx 40rpx 60rpx 40rpx;
			background-color: $uni-bg-color;
			display: flex;
			flex-direction: column;
			.bodyMax{
				margin-top: -10rpx;
			}
			.updatedata-title {
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;
				span {
					font-size: 32rpx;
					font-weight: bold;
					color: #000;
				}
				p {
					font-size: 24rpx;
					color: $uni-text-color-6E6E6E;
					margin-left: 20rpx;
				}
				
			}
			.updatedata-con {
				width: 100%;
				margin-top: 20rpx;
				display: flex;
				flex-direction: column;
				h5 {
					font-size: 30rpx;
					color: #333;
					font-weight: bold;
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;
				}
			}
			textarea {
				width: calc(100% - 40rpx);
				padding: 20rpx;
				background: #fafafa;
				font-size: 28rpx;
				line-height: 50rpx;
			}
			button {
				width: 500rpx;
				padding: 22rpx 218rpx;
				border-radius: 50rpx;
				background: #15a7e8;
				box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
				color: #ffffff;
				font-size: 32rpx;
				line-height:45rpx;
				display: flex;
				align-items: center;
				justify-content: center;
					align-self: center;
					margin-top: 60rpx;
			}
			}
		}
		
	}
	
</style>
