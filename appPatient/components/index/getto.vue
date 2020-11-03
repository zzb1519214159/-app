<template>
<view class="nav-header">
       <van-icon name="http://app.yunshangyijia.com/static/coursetable/jt.png"
            size="35rpx" @click="geto()" v-if="flage"/>
           
        <h2>{{title}}</h2>
</view>
</template>
<script>
export default {
  data: () => ({
      
  }),
    props:{
      title:String,
      flage:Boolean
    },
  created () {
    
  },
  methods: {
    geto(){
      uni.navigateBack({
          animationType:"none"
      })
    }
  },
};
</script>
<style lang="less" scoped>
.nav-header{
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    top:67rpx;
    van-icon{

        margin-left: 25rpx;
    }
    h2{
      flex: 1;
      text-align: center;
       font-size: 28rpx;
       color: #000;

    }
}
</style>