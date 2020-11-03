<!-- 我的患者列表页面 -->
<template>
  <view class="content">
    <div class="cont-map">
			<ul class="headerImg">
				<li v-for="(item,index) in indexArry" :key="index" @click="skip(item)">
					<image :src="item.img"></image>
					<view class="textView">
						<view>{{item.name}}</view>
						<view>{{item.num}}</view>
					</view>
				</li>
			</ul>
		</div>
    <h2 class="title-moen"><span class="borderRight heightSpan"></span>新的异常记录</h2>
    <view
      class="moe-tap"
      v-for="(item,index) in listArry"
      :key="index"
    >
      <div class="moen">
        <div class="left">
          <van-icon
            name="/static/index/n.png"
            size="76rpx"
          />
          <h3>{{item.name}}<p>{{item.age?item.age+'岁':'暂无'}}</p>
          </h3>
        </div>
        <div class="right">
          <button>写建议</button>
        </div>
      </div>

      <div class="text-moen">
        <h4>主诉：{{item.symptom}}</h4>
        <p>异常记录：{{item.abnormal}}</p>
        <images></images>
        <h3>{{item.day}}</h3>
      </div>
    </view>
<van-toast id="van-toast" />
  </view>
</template>

<script>
import images from "../../components/index/images";
import {diseaseRecord,doctorAccount} from "../../api"
// import Toast from '../../wxcomponents/vant/toast/toast';
export default {
	components: {
	  images,
	},
  data() {
    return {
      title: "医患管理系统",
			indexArry:[
				{
					name:"患者",
					num:"",
					img:"../../static/index/bodyPatient.png",
					url:"../search/index"
				},
				{
					name:"病程",
					num:"",
					img:"../../static/index/bodyPatient1.png",
					url:"../disease/disease"
				},
				{
					name:"健康建议",
					num:"",
					img:"../../static/index/bodyPatient2.png",
					url:"../propose/propose"
				},
				{
					name:"收到感谢",
					num:"",
					img:"../../static/index/bodyPatient3.png",
					url:"../thank/thank"
				},
			],
			listArry:[],
			patientsObj:{}
		};
  },
  methods: {
		skip(item){
			uni.navigateTo({
				//里面是一个对象形式的参数
				url: item.url
			})
		},
		// 列表接口
		diseaseRecordDo(){
			diseaseRecord().then(res=>{
				if(res.code===0){
					this.listArry = res.page.list;
				}
			})
		},
		// 详情接口
		doctorAccountDo(){
			doctorAccount().then(res=>{
				if(res.code===0){
					this.indexArry[0].num = res.data.sufferer;
					this.indexArry[1].num = res.data.disease;
					this.indexArry[2].num = res.data.advice;
					this.indexArry[3].num = res.data.thanks;
				}
			})
		}
	},
	onShow(){
		this.diseaseRecordDo();
		this.doctorAccountDo();
	}
};
</script>

<style lang="scss">
	
.content {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  overflow-y: auto;
  padding-bottom:80rpx;
}
.cont-map {
  width: 100%;
  box-sizing: border-box;
	margin: 24rpx 0;
	.headerImg{
		display: flex;
		justify-content: center;
		.liImg{
			background-image: url("../../static/index/bodyPatient.png");
			background-size: 100% 100%;
		}
		li{
			position: relative;
			display: flex;
			justify-content: center;
			.textView{
				position: absolute;
				top: 80rpx;
				color: #fff;
				view{
					&:nth-child(1){
						font-size: 26rpx;
						text-align: center;
					}
					&:nth-child(2){
						font-size: 36rpx;
						font-weight: 600;
						margin-top: 5rpx;
					}
				}
			}
			image{
				width: 178rpx;
				height: 200rpx;
			}
		}
	}
}
.title-moen {
  margin: 10rpx  40rpx 20rpx  40rpx;
	margin-top: 0;
  display: flex;
  font-weight:bold;
  align-items: center;
	font-size: 30rpx;
	color: #333;
}
.moe-tap {
  padding: 30rpx 30rpx 0 30rpx;
	background: #fff;
  .moen {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 28rpx;
        margin-left: 30rpx;
      }
      h3 {
        height: 100%;
        margin-left: 20rpx;
        font-size: 30rpx;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 20rpx;
          color: #6e6e6e;
          font-weight: normal;
        }
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
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

  .text-moen {
    width: calc(100%-93rpx);
    display: flex;
    flex-direction: column;
    margin-left: 93rpx;
    border-bottom: 1px solid rgba(199, 199, 199, 0.2);
    padding-bottom: 30rpx;
    h4 {
      font-size: 28rpx;
      color: #333;
      font-weight: bold;
      line-height: 33px;
      margin-bottom: 10rpx;
    }
    p {
      font-size: 28rpx;
      color: #333;
    }

    h3 {
      font-size: 22rpx;
      color: #afacac;
      margin-top: 10rpx;
    }
  }
}
// /deep/ .van-toast--icon{
// 		width: 1200rpx !important;
// 	}
</style>
