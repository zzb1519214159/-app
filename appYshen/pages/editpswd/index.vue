<template>
  <view class="editpswd">
    <view class="editp">
      <view class="password password1">
        <van-icon
          name="/static/login/names.png"
          size="35rpx"
        />
        <input
          type="text"
          :value="password"
          placeholder="请输入旧密码"
        />
      </view>
      <view class="password password2">
        <van-icon
          name="/static/login/names.png"
          size="35rpx"
        />
        <input
          type="password"
					v-model="form.password"
          placeholder="请输入新密码6-12位"
        />
      </view>
      <view class="password password3">
        <van-icon
          name="/static/login/names.png"
          size="35rpx"
        />
        <input
          type="password"
					v-model="form.newPassword"
          placeholder="请再次输入新密码6-12位"
        />
      </view>
      <button @click="complete">完成</button>
    </view>
  </view>
</template>
<script>
	import {updatePassword} from "../../api"
	export default {
		data(){
			return{
				password:"",
				form:{
					password:"",
					newPassword:""
				}
			}
		},
		methods:{
			complete(){
				if(this.form.password==this.form.newPassword){
					if(this.form.password.length>=6||this.form.password<=12){
						this.updatePasswordDo(this.form);
					}
				}
			},
			// 编辑接口
			updatePasswordDo(data){
				updatePassword(data).then(res=>{
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
		}
	};
</script>
<style lang="less">
.editpswd {
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  .editp {
    width: calc(100% - 60rpx);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-top: 0 30rpx;
    box-sizing: border-box;
    .password {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 27rpx;
      background: #fafafa;
      opacity: 1;
      border-radius: 12px;
      margin-bottom: 30rpx;
      input {
        flex: 1;
        font-size: 30rpx;
        padding-left: 24rpx;
        border-left: 1px solid rgba(199, 199, 199, 0.6);
        margin-left: 27rpx;
      }
    }
    button {
      font-size: 32px;
      font-weight: 500;
      line-height: 45px;
      color: #ffffff;
      padding: 23rpx 218rpx;
      background: #15a7e8;
      box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
      opacity: 1;
	  border-radius: 50rpx;
	  margin-top: 60rpx;
    }
  }
}
</style>