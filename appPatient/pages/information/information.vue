<template>
  <view class="information overall">
    <view class="information-con">
      <ul>
        <li
          v-for="(item,index) in liArry"
          :key="index"
        >
          <van-swipe-cell :right-width="55">
            <van-cell-group>
              <view class="information-list">
                <van-icon
                  :name="'http://app.yunshangyijia.com/static/information/'+item.relation+'.png'"
                  size="104rpx"
                />
                <h3>
                  <span>{{item.patient}}</span>
                  <text>{{item.sex}}</text>
                  <text>{{item.age}}岁</text>
                </h3>
                <van-icon
                  name="http://app.yunshangyijia.com/static/information/bj.png"
                  size="42rpx"
                  @click="tomodify(item.id)"
                />
              </view>
            </van-cell-group>
            <view
              slot="right"
              class="right-btn"
            >
              <van-button
                color="#EE0A24"
                size="normal"
              >删除</van-button>
            </view>
          </van-swipe-cell>
        </li>
      </ul>
    </view>
  </view>
</template>
<script>
import { myPatients } from "../../api";
export default {
  data: () => ({
    liArry: [
      
    ],
  }),
  	onShow(){
			this.myPatients()	
		},
  methods: {
    	myPatients(){
				myPatients().then(res=>{
				if(res.code===0){
					this.liArry = res.data;
					this.$set(this.liArry,res.data)
          console.log(this.liArry)
				
				}
			})
			},
    tomodify(e){
       
        uni.navigateTo({
             url:'/pages/information/modify/modify?index='+e
        })
    }
  },
};
</script>
<style lang="scss">
.information {
  padding-top: 12rpx;
  .information-con {
    min-height: 100vh;
    background: #fff;
    .information-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 30rpx;
      h3 {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #333333;
        font-weight: 400;
        span {
          margin-left: 37rpx;
          margin-right: 81rpx;
        }
        text {
          margin-right: 60rpx;
          font-size: 28rpx;
        }
      }
    }
    .right-btn {
      width: 110rpx;
      height: 100%;
      display: flex;
      /deep/.van-button {
        width: 110rpx;
        display: flex;
        height: 100%;
        padding: 0;
        border-radius: 0%;
      }
    }
  }
}
</style>