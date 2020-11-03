<template>
  <view class="compile">
    <text class="header">请在下面输入常用语内容（100字以内）</text>
    <view class="updatedata-con">
      <textarea v-model="healthAdvice" placeholder="请输入"/>
      <view class="saveView">
        <button @click="preserve">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
	import {
		editUsuallyAdvice
	} from "../../api"
export default {
  data() {
    return {
			healthAdvice:""
		};
  },
	methods:{
		preserve(){
			this.editUsuallyAdviceDo();
		},
		// 新增接口
		editUsuallyAdviceDo(){
			editUsuallyAdvice({healthAdvice:this.healthAdvice}).then(res=>{
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
.compile {
  margin: 40rpx;
  .header {
    padding: 20rpx 0;
    display: block;
    font-size: 28rpx;
  }
  .updatedata-con {
    width: 100%;
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
    textarea {
      width: calc(100% - 40rpx);
      padding: 20rpx;
      background: #fafafa;
      font-size: 28rpx;
      z-index: 1;
      line-height: 50rpx;
    }
    .saveView {
      align-self: flex-end;
      button {
        line-height: 45rpx;
        padding: 15rpx 62rpx;
        margin-top: 25rpx;
        display: inline-block;
        box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
        opacity: 1;
        border-radius: 33rpx;
        background: #15a7e8;
        color: #ffffff;
        font-size: 28rpx;
        text-align: center;
      }
    }
  }
}
</style>
