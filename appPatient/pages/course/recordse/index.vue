<template>
<view class="recordse">
  <van-notice-bar color="#F5B627" background="rgba(245, 182, 39, 0.1)"
  text="特别提示：如有紧急状况，请马上就医，不要延误病情。"/>
  <view class="recordse-con">
     <textarea placeholder="请将今天的异常情况记录下来，方便医生准确评估，例如：今天高烧到38度，食欲不佳等。" />
     <view class="tpsc">
        <van-uploader :file-list=" fileList " />
     </view>
  </view>
    <view class="btnmu">
      <button>保存</button>
</view>

</view>
</template>
<script>
export default {
  data: () => ({
      fileList: [
      // {
      //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      //   name: '图片1',
      //   deletable: true,
      // }
      // // Uploader 根据文件后缀来判断是否为图片文件
      // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      // {
      //   url: '//hbimg.huabanimg.com/81a5e018549ace5aa844a6327bbc1919f1180f97ae556-LhpyU9_fw658/format/webp',
      //   name: '图片2',
      //   isImage: true,
      //   deletable: true,
      // },
      //  {
      //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      //   name: '图片3',
      //   deletable: true,
      // },
    ],
  }),
  created () {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.recordse{
  .recordse-con{
    background: #fafafa;
    margin: 30rpx;
    textarea {
    width: calc(100% - 40rpx);
    height: 160rpx;
    padding: 20rpx;
    background: #FAFAFA;
    font-size: 28rpx;
    z-index:1;
    line-height: 50rpx;
    border-radius: 12rpx;
    color: #333;
  }
  textarea::-webkit-input-placeholder{
    color:#AFACAC;
     line-height: 50rpx;
    }
    .tpsc{
      margin: 20rpx;
    }
    /deep/.van-uploader__upload{
      background: #EAEAEA;
      border-radius: 12rpx;
      border: 1px solid #FAFAFA;
    }
  }
   .btnmu{
      padding-top: 130rpx;
      background: #fff;
     button{
        width: 406rpx;
        height: 90rpx;
        background: #15A7E8;
        box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
        opacity: 1;
        border-radius: 50rpx;
        font-size: 32rpx;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }
    }
}

  
</style>