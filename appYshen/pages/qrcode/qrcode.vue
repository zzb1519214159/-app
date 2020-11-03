<template>
  <view class="qrcode">
    <view class="qrcode-con">
         <van-icon
      name="/static/qrcode/tx.png"
      size="180rpx"
      class="toux"
    />
    <h2>王杰</h2>
    <p>主治医生<span class="borderRight"></span>呼吸内科</p>
    <van-icon
      name="/static/qrcode/wx.png"
      size="390rpx"
    />
    </view>
    <view class="qrcode-foter">
      <ul>
        <li>
          <van-icon
            name="/static/qrcode/left.png"
            size="80rpx"
          />
          <text>发给好友</text>
        </li>
        <li class="qrcodeBoder">
          <van-icon
            name="/static/qrcode/right.png"
            size="80rpx"
          />
          <text>生成海报</text>
          
        </li>
		
      </ul>
    </view>
	
  </view>
</template>

<script>

export default {
  data() {
    return {
	
	};
  },
  created() {
	
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.qrcode {
width: 100%;
height: calc(100vh - 136rpx);
margin-bottom: 136rpx;
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(124deg, #60CEFF 0%, #019DE2 100%);
  .qrcode-con{
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  width: calc(100% - 60rpx);
  height: calc(100% - 60rpx);
  border-radius: 12rpx;
box-shadow: 0px 3px 6px rgba(2, 135, 195, 0.1);
  .toux{
    margin-top: 96rpx;
  }
      h2 {
    font-size: 36rpx;
    color: #000;
    font-weight: 700;
    margin: 20rpx 0;
  }
  p {
    font-size: 30rpx;
    color: #6E6E6E;
    margin-bottom: 50rpx;
    word-spacing: 10rpx;
  }
 
  }
  
  .qrcode-foter {
    width: 100%;
    position: absolute;
    bottom: 5rpx;
    
box-shadow: 4px 3px 6px rgba(0, 0, 0, 0.16);
    ul {
      display: flex;
      justify-content: space-between;
      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 26rpx 0;
        font-size: 28rpx;
        color: #6E6E6E;
        /deep/.van-icon{
          margin-right: 15rpx;
        }
      }
    }
		.qrcodeBoder{
			    border-left: 1rpx solid $uni-border-color-199;
		}
  }
}
</style>
