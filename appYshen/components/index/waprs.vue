<template>
<!-- 搜索页面 历史记录 -->
<view class="waprs">
    <view class="waprs-top">
        <text>历史搜索</text>
        <view>
            <van-icon class="iconfont" class-prefix='iconsousuoye-shanchutubiao' name='iconsousuoye-shanchutubiao' size="34rpx" color="#AFACAC"/>
        </view>
    </view>
     <view class="waprs-con">
          <list class="waprs-list">
            <cell>
              <navigator url="../../pages/details/index" hover-class="navigator-hover"><text>王小俊</text></navigator>
            </cell>
            <cell>
              <text>张璐璐璐璐璐</text>
            </cell>
            <cell>
              <text>刘姗璐璐</text>
            </cell>
            <cell>
              <text>王小小</text>
            </cell>
            <cell>
              <text>何璐帆</text>
            </cell>
            <cell>
              <text>王小璐璐璐俊</text>
            </cell>
         </list>
     </view>
</view>

</template>
<script>

export default {
  data: () => ({}),
  created () {},
  methods: {},
  
};
</script>
<style lang="scss" scoped>
.waprs{
  background: $uni-text-color-inverse;
    padding: 30rpx;
    .waprs-top{
        display:flex;
        align-items: center;
        justify-content: space-between;
        font-size: 30rpx;
        h6{
            display: flex;
            align-items: center;
             
            .tome{
                margin-right: 10rpx;
            }
        }
    }
    .waprs-con{
        .waprs-list{
            display: flex;
            flex-wrap: wrap;
            cell{
                display: block;
                padding:10rpx 34rpx;
                background: #F6F6F6;
                color: $uni-text-color-6E6E6E;
                font-size: 28rpx;
                text-align: center;
                line-height: 60rpx;
                border-radius: 38rpx;
                margin-right: 20rpx;
                margin-top: 30rpx;
            }
        }
        
    }
}
</style>