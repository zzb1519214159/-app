<template>
	<view class="login">
		<div class="login-logo">
			<img src="/static/login/logo.png" alt="">
		</div>
		<view class="login-from">
			<view class="name">
				<van-icon name="/static/login/name.png" size="38rpx"/>
				<input type="text" v-model="form.mobile" placeholder="请输入登录账号"/>
				<van-icon name="/static/login/w.png" size="34rpx" @click="deleteClick"/>
			</view>
			<view class="password">
				<van-icon name="/static/login/pwd.png" size="38rpx"/>
				<input type="password" v-model="form.password"  placeholder="请输入登录密码"/>
				<!-- <van-icon name="/static/login/z.png" size="34rpx"/> -->
			</view>
			<button @click="login" :disabled="!form.mobil&&!form.password" :class="{'grayBotton':!form.mobile||!form.password}">登录</button>
			<!-- <div><navigator url="../editpswd/index" hover-class="navigator-hover">修改密码</navigator></div> -->
		</view>
		
	</view>
</template>

<script>
	import {doctorLogin} from "../../api";
		export default {
			data() {
				return {
					title: '医患管理系统',
					form:{
						mobile:"18570745669",
						password:"123456"
					}
				}
			},
			methods: {
				deleteClick(){
					this.form.mobile = "";
				},
				login(){
					uni.removeStorageSync('token');
					doctorLogin(this.form).then(res=>{
						// 打印调用成功回调
						if(res.code===0){
							uni.switchTab({
								//里面是一个对象形式的参数
								url: "/pages/patients/index"
							});
						}
					})
				},
			}
		}
</script>
  
<style lang="scss" >
	.login{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		.login-logo{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 100rpx;
			img{
				width: 480rpx;
				height:  163rpx;
			}
			
		}
		.login-from{
			width:calc(100% - 160rpx);
			margin: 0 80rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-content: center;
			margin-top:100rpx;
			.name,.password{
				display: flex;
				justify-content: space-between;
				align-items:center;
				border-bottom: 1px solid #C7C7C7;
				margin-bottom: 60rpx;
				padding-bottom: 25rpx;
				input{
					flex: 1;
					font-size: 32rpx;
					padding-left: 30rpx;
					color: $uni-text-color;
				}
				
			}
			button{
				width: 100%;
				height: 90rpx;
				background:#15A7E8;
				color: #fff;
				font-size: 32rpx;
				outline: none;
				box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
				opacity: 1;
				border-radius: 50rpx;
			}
			.grayBotton{
				color: $uni-text-color;
				background: $uni-border-color-199;
				box-shadow:none
			}
		}
	}
</style>
