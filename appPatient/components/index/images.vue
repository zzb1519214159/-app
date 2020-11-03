<template>
<view class="images">
    <div class="moen-img">
      <view class="moen-images">
         
          <image :src="shopLogoUrl" @tap="_previewImage(shopLogoUrl)" mode="aspectFill widthFix">
            
      </view>
          
    </div>
</view>
</template>
<script>
export default {
  data: () => ({
      shopLogoUrl:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1068305176,4211248832&fm=26&gp=0.jpg",
  }),
  created () {},
  methods: {
       _previewImage(image) {
      var imgArr = [];
      imgArr.push(image);
      //预览图片
      uni.previewImage({
        urls: imgArr,
        current: imgArr[0],
      });
    },
  },
};
</script>
<style lang="less" scoped>
 .moen-img {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          .moen-images{
            width: 180rpx;
           height: 90rpx;
            overflow: hidden;
            border: 1px solid #e6e6e6;
            border-radius: 10px;
            margin-top: 10rpx;
           image{
             width:180rpx;
             object-fit: cover;
           }
          }
          
        }
</style>