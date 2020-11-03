<template>
  <!--搜索页面 患者列表 -->
  <view class="list">
    <ul>
      <li
        v-for="(item,index) in listArry"
        :key="index"
      >
				<view class="list-con-left"  @click="todetails(item)">
					<image v-if="item.sex==='男'" src="/static/index/n.png" class="listImage"></image>
					<image v-else-if="item.sex==='女'" src="/static/index/v.png" class="listImage"></image>
					<image v-else src="/static/index/wz.png" class="listImage"></image>
					<view class="left-text" :class="{'spanText':icourseCount===0}">
						<span v-if="item.patient">{{item.patient}}</span>
						<span v-if="item.sex">{{item.sex}}</span>
						<span>{{item.mobile}}</span>
					</view>
				</view>
				<van-icon
					v-if="item.courseCount>0"
					name="/static/index/list.png"
					size="40rpx"
					@click="course"
				/> 
      </li>
    </ul>
  </view>
</template>
<script>

export default {
	props:{
		listArry:Array,//患者列表数据
	},
  data(){
		return{
		}
	},
  methods: {
    todetails(item){
			if(item.courseCount>0){
				uni.navigateTo({
					url: "/pages/details/index?item="+JSON.stringify(item),
				});
			}
    },
		course(){
			
		}
  },
  
};
</script>
<style lang="scss">
.list {
  background: $uni-text-color-inverse;
  li{
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
			.listImage{
				width: 76rpx;
				height: 76rpx;
			}
      .left-text {
				margin-left: 30rpx;
        display: flex;
        justify-content: start;
        span {
          font-size: 30rpx;
          margin-right: 30rpx;
        }
      }
			.spanText{
				color: $uni-text-color-6E6E6E;
			}
    }
  }
}
</style>