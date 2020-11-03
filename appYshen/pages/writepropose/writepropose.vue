<template>
  <view class="writepropose">
    <h2>请在下面输入您要发给患者的话</h2>
    <textarea placeholder="写下您的建议" :value="textareali"/>
    <view class="writepropose-btn">
      <h3 >
        <van-icon
          name="/static/bc.png"
          size="30rpx"
        />
        保存为常用语
      </h3>
      <view class="btnmoen">
        <button class="btnle" @click="onClickShow()">选择常用语</button>
        <button class="btnrg">确认发送</button>
      </view>
    </view>
    <van-overlay
      :show="show"
      @click="onClickHide"
    >
      <view class="wrapper">
        <view
          class="block"
          
        >
          <ul>
            <li
              v-for="item in list"
              :key="item.index"
            >
              <van-cell  :title="item" @click="onclisen" clickable  :data-name="item"/>
            </li>
          </ul>
        </view>
      </view>
    </van-overlay>
  </view>
</template>
<script>
export default {
  data: () => ({
    show: false,
    list: [
      "不用担心，正常现象，继续观察。",
      "少吃酸性强的食物",
      "你要来医院复查了",
      "如果胸闷严重，可以多做深呼吸尝试缓解",
      "按时吃药，药后半小时进食",
      "不用担心，正常现象，继续观察。",
      "少吃酸性强的食物",
      "你要来医院复查了",
      "如果胸闷严重，可以多做深呼吸尝试缓解",
    ],
    textareali:''
  }),
  created() {},
  methods: {
    onClickShow() {
      this.show = true;
    },

    onClickHide() {
      this.show = false;
    },
    onclisen(event){
      let val = event.mp.currentTarget.dataset.name
      this.textareali += val
    },
   
  },
};
</script>
<style lang="less" scoped>
.writepropose {
  padding: 30rpx;
  h2 {
    font-size: 28rpx;
    color: #333333;
    margin-bottom: 30rpx;
  }
  textarea {
    width: calc(100% - 40rpx);
    padding: 20rpx;
    background: #fafafa;
    font-size: 28rpx;
    z-index:1;
    line-height: 50rpx;
    border-radius: 12rpx;
  }
  .writepropose-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25rpx;
    h3 {
      font-size: 24rpx;
      color: #15a7e8;
      display: flex;
      align-items: center;
      van-icon {
        margin-right: 12rpx;
      }
    }
    .btnmoen {
      display: flex;
      button {
        font-size: 28rpx;
        line-height: 40rpx;
        padding: 15rpx 34rpx;
        margin-left: 20rpx;
        border-radius: 33rpx;
        border-style: none;
        outline: none;
      }
      .btnle {
        border: 1px solid #333333;
        background: #fff;
  
        color: #333;
      }
      .btnrg {
        border: 1px solid #15a7e8;
        background: #15a7e8;
  
        color: #fff;
      }
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: calc(100% - 110rpx);
    margin: 0 55rpx;
    padding: 80rpx 30rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
    background-color: #fff;
    z-index: 999;
    li {
      /deep/.van-cell:after {
        border-style: none;
      }
      /deep/.van-cell:hover{
        background: rgba(21, 167, 232, 0.1);
      }
     
    }
    
       
   
  }
}
</style>