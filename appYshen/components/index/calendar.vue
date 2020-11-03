<template>
  <view class="calendarcon">
      <view class="calendarcon-rili">
        <uni-calendar
          :insert="true"
          :lunar="false"
          :start-date="'2019-3-2'"
          :end-date="'2019-5-20'"
          @change="change"
          :showMonth="false"
          :selected="selected"
        />
      </view>
       <view class="coursetable-ctom">
      <ul>
        <li>
          <van-icon
            name="/static/coursetable/f1.png"
            size="30rpx"
          />
          <span>按时服药</span>
          <p>是</p>
        </li>
          <li>
          <van-icon
            name="/static/coursetable/f2.png"
            size="30rpx"
          />
          <span>精神状态</span>
          <p>一般</p>
        </li>
          <li class="mx-li">
          <van-icon
            name="/static/coursetable/f3.png"
            size="30rpx"
          />
          <span>异常记录</span>
          <p>今天不烧了，但是浑身无力，吃不下东西，想呕吐，医生，这个有没有问题？
            <images></images>
          </p>
        </li>
          <li>
          <van-icon
            name="/static/coursetable/f4.png"
            size="30rpx"
          />
          <span>我的建议</span>
          <p>明天来院里复查，挂我上午的号</p>
        </li>

      </ul>
      
    </view>
     <view class="coursetable-btn">
        <button @click="towritepropose">写建议</button>
    </view>
  </view>
</template>
<script>
import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";
import vanIcon from "@/wxcomponents/vant/icon/index"
import images from "@/components/index/images"

export default {
  components: {
    uniCalendar,vanIcon,images
  },
  data() {
    return {
      selected: [{ date: "2020-10-13", info: "签到" }],
    };
  },
  methods: {
    change(e) {
      console.log(e);
    },
    towritepropose(){
      uni.navigateTo({
          url: '/pages/writepropose/writepropose',
      })
    }
  },
 
};
</script>
<style lang="less">
.calendarcon {
 
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 145rpx;
    .calendarcon-rili{
      padding: 20rpx 28rpx;
    }
    .coursetable-ctom{
  padding: 30rpx;
  li{
    display: flex;
    align-items:center;
    margin:20rpx 0;
    span{
      margin:0 30rpx;
      font-size: 30rpx;

      color: #6E6E6E;
    }
    p{
      flex: 1;
      font-size: 28rpx;
      color: #333;

    }
  }
  .mx-li{
    align-items: flex-start;
  }
}
    .coursetable-btn{
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:30rpx 0;
border-top:  1px solid rgba(199, 199, 199, 0.1);
position: fixed;
bottom: 0;
  button{
         width: 50%;
					height: 80rpx;
					background: #15A7E8;
					color: #fff;
					font-size: 32rpx;
					border-radius: 50rpx;
            border-style: none;
          outline: none;  
          
box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
       
  }

}
}
</style>