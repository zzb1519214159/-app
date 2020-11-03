<template>
  <view class="calendarcon">
    <!-- 病程中/病程已经结束 状态 1 -->
    <view class="calendarcon-con">
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
      <view
        class="coursetable-ctom"
        v-if="bootomState === 2"
      >
        <ul>
          <li>
            <van-icon
              name="http://app.yunshangyijia.com/static/coursetable/f1.png"
              size="30rpx"
            />
            <span>按时服药</span>
            <view class="list-btn">
              <view class="btn-con">
                <button :class="['btn1',{active:add_class==1}]" @click="addClass(1)">是</button>
                <button :class="['btn2',{active:add_class==2},{activeonem:add_class==1}]" @click="addClass(2)">否</button>
              </view>
            </view>
          </li>
          <li>
            <van-icon
              name="http://app.yunshangyijia.com/static/coursetable/f2.png"
              size="30rpx"
            />
            <span>精神状态</span>
            <view class="list-icon">
              <view class="icon-con">
               <van-icon  :class="['iconfont',{checked:n==1}]"  class-prefix='iconnanguo' name='iconnanguo' size="48rpx"   @click="onicon(1)" />
               <van-icon  :class="['iconfont',{checked:n==2}]"  class-prefix='iconyiban'  name='iconyiban' size="48rpx"    @click="onicon(2)" />
               <van-icon  :class="['iconfont',{checked:n==3}]"  class-prefix='icongaoxing' name='icongaoxing' size="48rpx" @click="onicon(3)" />
              </view>
            </view>
          </li>
          <li class="mx-li">
            <van-icon
              name="http://app.yunshangyijia.com/static/coursetable/f3.png"
              size="30rpx" style="margin-top: 6rpx;"
            />
            <span>异常记录</span>
            <p>今天不烧了，但是浑身无力，吃不下东西，想呕吐，医生，这个有没有问题？
              <view class="mx-li-btn">
                  <images></images>
                  
              <button @click="torecordse">写异常</button>
              </view>
              
            </p>
          </li>
          <li>
            <van-icon
              name="http://app.yunshangyijia.com/static/coursetable/f4.png"
              size="30rpx"
            />
            <span>健康建议</span>
            <p>明天来院里复查，挂我上午的号。</p>
          </li>
        </ul>
      </view>
      <!-- 状态为0 显示按钮 -->
      <view
        class="coursetable-btn"
        v-if="bootomState===0"
      >
        <button @click="clickDDD">建立病程</button>
      </view>
      <view
        class="coursetable-footer"
        v-if="bootomState===1"
      >
        <h4>未来的日子不可记录哦！</h4>
      </view>
    </view>
  </view>
</template>
<script>
import uniCalendar from "@/components/uni-calendar/uni-calendar.vue";
import images from "@/components/index/images";
export default {
  components: {
    uniCalendar,
    images,
  },
  props: {
    selected: Array, //日期数据
    bootomState: Number, //底部状态
  },
  data() {
    return {
      n:0,
      add_class:0,
     
    };
  },
  methods: {
    addClass(e){
      this.add_class = e
      
    },
    onicon(e){
      this.n = e;
      console.log(e)
    },
    change(e) {
      console.log(e);
    },
    towritepropose() {
      uni.navigateTo({
        url: "/pages/writepropose/writepropose",
      });
    },
    torecordse(){
      uni.navigateTo({
        url: "/pages/course/recordse/index",
      });
    }
  },
};
</script>
<style lang="scss">
.calendarcon {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;
  overflow-x: hidden;
  .calendarcon-rili {
    padding: 20rpx 28rpx;
  }
  .coursetable-ctom {
    padding: 30rpx;
    li {
      display: flex;
      align-items: center;
      margin: 20rpx 0;
      .list-btn {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        .btn-con {
          display: flex;
          button {
            width: 90px;
            height: 56px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24rpx;
            color: #6E6E6E;
            background: #fff;
            border: 1px solid #6E6E6E;
          }
          .btn1 {
            border-radius: 6px 0px 0px 6px;
            border-right: 0;
          }
          .btn2 {
            border-radius: 0px 6px 6px 0px;
          }
         
          .activeonem{
            border-left: 0;
          }
          .active{
            background: #F5B627;
            color:#fff;
            border: 1px solid #F5B627;
          }
        }
      }
      .list-icon{
        display: flex;
        flex: 1;
        justify-content: flex-end;
        .icon-con{
          display: flex;
          .iconfont{
            margin-left: 40rpx;
            color:#6E6E6E;
          }
          .checked{
            color:#F5B627;
          }
        }
      }
      span {
        margin: 0 30rpx;
        font-size: 30rpx;
        color: $uni-text-color-6E6E6E;
      }
      p {
        flex: 1;
        font-size: 28rpx;
        color: #333;
      }
    }
    .mx-li {
      align-items: flex-start;
      p{
        .mx-li-btn{
          display: flex;
          justify-content: space-between;
          align-items: center;
        button{
          width: 126rpx;
          height: 62rpx;
          display: flex;
          margin: 0;
          align-items: center;
          justify-content: center;
          font-size: 28rpx;
          padding: 0;
          color: #15A7E8;
          background: #fff;
          border: 2px solid #15A7E8;
          border-radius: 40rpx;
        }
        }
       
      }
    }
  }
  .coursetable-btn {
    margin-top: 100rpx;
    button {
      font-size: 32rpx;
      width: 406rpx;
      height: 90rpx;
      background: #15a7e8;
      box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
      opacity: 1;
      border-radius: 50rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }
  .coursetable-footer {
    margin-top: 90rpx;
    h4 {
      font-size: 28rpx;
      color: #6e6e6e;
      font-weight: bold;
      line-height: 40rpx;
      text-align: center;
    }
  }
}
</style>