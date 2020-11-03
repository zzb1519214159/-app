<!-- 患者详情列表页 -->
<template>
  <view class="details">
    <view class="details-title">
      <van-icon
        name="/static/index/n.png"
        size="76rpx"
      />
      <view class="details-title-log">
        <h3>{{formData.patient}}</h3>
        <h2>
          <span>{{formData.sex}}</span>
          <span>{{formData.age}}岁</span>
          <span>{{formData.mobile}}</span>
        </h2>
      </view>
    </view>
    <view class="details-con" v-for="(item1,index1) in listArry" :key="index1">
      <view class="details-con-top bottomBorder">
        <view class="details-con-top-title">
          <h3>{{item1.courseName}}病程
            <p>
              <van-icon
                name="/static/index/list.png"
                size="40rpx"
              /><span>{{item1.state}}</span>
            </p>
          </h3>
        </view>
        <view class="details-con-top-txt">
          <p>主诉：{{item1.symptom}}</p>
        </view>
				<strong class="mtiel" v-if="item.state===1">病程期:{{item1.addTimeStr}}-{{item1.closeTimeStr}}</strong>
      </view>
      <!-- 异常记录 -->
      <view class="details-con-top-waps" v-for="(item,index) in detailsArry" :key="index">
				<view class="main">
					<h3>异常记录</h3>
					<div>
						<button class="detailsBotton">写建议</button>
					</div>
				</view>
				<p>{{item.abnormal}}</p>
				<images :imgsUrl="item.imgs"></images>
				<strong class="mtiel">{{item.addTimeStr}}</strong>
			</view>
    </view>
  </view>
</template>
<script>
	import {courseOfDisease,courseOfDiseaseDetail} from "../../api"
	import images from "../../components/index/images";
	export default {
		components: {
			images,
		},
		data(){
			return{
			detailsArry:[],
			formData:{},
			listArry:[]
		}
	},
	methods:{
		// 列表异常记录接口
		courseOfDiseaseDetailDo(id){
			courseOfDiseaseDetail({id}).then(res=>{
				if(res.code===0){
					this.detailsArry = res.data.diseaserecord
				}
			})
		},
		// 列表接口
		courseOfDiseaseDo(id){
			courseOfDisease({id}).then(res=>{
				if(res.code===0){
					res.page.list.forEach(item=>{
						item.state = item.state === 0? "病程中" :'已结束';
					})
					this.listArry = res.page.list;
					this.courseOfDiseaseDetailDo(id);
				}
			})
		}
	},
  onLoad(option) {
		this.formData = JSON.parse(option.item);
		this.courseOfDiseaseDo(this.formData.id);
  }
};
</script>
<style lang="scss" scoped>
.details {
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  padding-bottom: 20rpx;
  .details-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 40rpx;
    .img-tile {
      width: 72rpx;
      height: 72rpx;
    }
    .details-title-log {
      display: flex;
      align-items: center;
      h3 {
        font-size: 30rpx;
        font-weight: bold;
        margin-left: 20rpx;
      }
      h2 {
        display: flex;

        span {
          margin-left: 20rpx;
          font-size: 24rpx;
          font-weight: normal;
        }
      }
    }
  }
  .details-con {
		padding: 30rpx 0;
		margin-bottom: 15rpx;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    background: #fff;
    .details-con-top {
      width: 100%;
      box-sizing: border-box;
      padding: 0 30rpx;
      .details-con-top-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 32rpx;
        h3 {
          font-weight: bold;
          display: flex;
          font-size: 30rpx;
          width: 100%;
          line-height: 42px;
          justify-content: space-between;
          p {
            font-size: 24rpx;
            color: #15a7e8;
            font-weight: normal;
            display: flex;
            align-items: center;
            span {
              margin-left: 10rpx;
            }
          }
        }
        div {
          h5 {
            font-size: 24rpx;
            display: flex;
            align-items: center;
            image {
              width: 40rpx;
              height: 40rpx;
              margin-right: 20rpx;
            }
          }
        }
      }
      .details-con-top-txt {
        font-size: 28rpx;
        word-spacing: 10rpx;
        margin-top: 12rpx;
        p {
          font-size: 28rpx;
        }
      }
    }
    .bottomBorder{
    	padding-bottom: 30rpx;
    	border-bottom:1rpx solid $uni-border-color-199;
    }
		.details-con-top-waps {
			padding:30rpx;
			&:not(:last-child) { 
				border-bottom: 1rpx solid $uni-border-color-199;
			}
      p {
        font-size: 28rpx;
      }
      .main {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3 {
          font-size: 30rpx;
          color: red;
        }
				.detailsBotton{
					position: relative;
					top: -10rpx;
				}
        button {
          background: rgba(21, 167, 232, 0.1);
          height: 62rpx;
          width: 126rpx;
          font-size: 28rpx;
          padding: 0;
          text-align: center;
          line-height: 62rpx;
          color: #15a7e8;
          border-radius: 30rpx;
          border-style: none !important;
          outline: none;
        }

        button::after {
          border-style: none !important;
        }
      }
    }
  }
  .mtiel {
		margin-top: 12rpx;
		font-size: 24rpx;
		color: #afacac;
	}
}
</style>