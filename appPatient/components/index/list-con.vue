<template>
  <!--搜索页面 患者列表 -->
  <view class="list">
    <ul>
      <li
        v-for="(item,index) in list"
        :key="index"
         @click="todetails(index)"
      >
        <view class="list-con">
          <view class="list-con-left">
            <van-icon
              :name="item.img"
              size="76rpx"
            />
            <view class="left-text">
            <span v-if="item.name">{{item.name}}</span>
            <span v-if="item.sex">{{item.sex}}</span>
            <span>{{item.iphone}}</span>
            </view>
          </view>
          <van-icon
            :name="item.imagese"
            size="40rpx"
          />
        </view>
      </li>
    </ul>
  </view>
</template>
<script>

export default {
  data: () => ({
    list:[
      {
      img:"http://app.yunshangyijia.com/static/index/n.png",
      name:"张路",
      sex:"23岁",
      iphone:"1383838438",
      imagese:"/static/index/list.png"
    },
    {
      img:"http://app.yunshangyijia.com/static/index/n.png",
      name:"刘羽琦",
      sex:"23岁",
      iphone:"1383838438",
      imagese:"/static/index/list.png"
    },
    {
      img:"http://app.yunshangyijia.com/static/index/n.png",
      name:"李三思",
      sex:"23岁",
      iphone:"1383838438",
      imagese:""
    },
    {
      img:"http://app.yunshangyijia.com/static/index/n.png",
      name:"张路",
      sex:"23岁",
      iphone:"1383838438",
      imagese:""
    },
    {
      img:"http://app.yunshangyijia.com/static/index/wz.png",
      name:"",
      sex:"",
      iphone:"13490842837",
      imagese:""
    },
    {
      img:"http://app.yunshangyijia.com/static/index/wz.png",
      name:"",
      sex:"",
      iphone:"13490842837",
      imagese:""
    }
    ]
  }),
  created() {},
  methods: {
    todetails(index){
      console.log(111)
      console.log(index)
       uni.navigateTo({
        url: "/pages/details/index",
      });
    }
    
  },
  
};
</script>
<style lang="less">
.list {
  background: #fff;
  .list-con {
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
        border-bottom: 1rpx solid rgba(199, 199, 199, 0.2);
    .list-con-left {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 24rpx;
      justify-content: flex-start;
      .left-text {
        margin-left: 30rpx;
        display: flex;
        justify-content: start;
        span {
          font-size: 30rpx;
          margin-right: 30rpx;
        }
      }
    }
  }
}
</style>