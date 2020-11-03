<!-- 我的消息列表页 -->
<template>
	<view class="news">
		<ul>
			<li v-for="item in 3" :key="item.index" @click="topayment">
				<van-icon name="http://app.yunshangyijia.com/static/coursetable/nvue.png" size="96rpx"/>
				<view class="newBody">
					<view class="newTop">
						<view class="newTopText">
							<h3>王杰</h3>
							<span>2020/9/10  12：30</span>
						</view>
						<view class="newTopRigth">
							 <van-icon class="iconfont" class-prefix='iconzu769' name='iconzu769' size="30rpx"  :color="colotext"/>
							  <van-icon class="iconfont" class-prefix='iconzu769' name='iconzu769' size="30rpx"  :color="colotext"/>
							<text>感谢</text>
						</view>
					</view>
					<p>健康建议：9月15日可来医院挂我下午的号</p>
				</view>
			</li>
		</ul>
	
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				colotext:"#AFACAC"
			};
		},
		methods: {
    	topayment(e){
          uni.navigateTo({
             url:"/pages/payment/payment"
        })
    }
  },
	}
</script>

<style lang="scss">
.news{
	ul{
		li{
			display: flex;
			align-items: center;
			padding: 23rpx 30rpx 30rpx 20rpx;
			border-bottom: 1rpx solid #f2f2f2;
			
			.newBody{
				width: 85%;
				margin-left: 20rpx;
				.newTop{ 
					display: flex;
					justify-content: space-between;
					align-items: center;
					.newTopText{
						display: flex;
						align-items: center;
						h3{
							font-size: 30rpx;
							color: #333;
							font-weight: bold;
						}
						span{
							font-size: 24rpx;
							color: #AFACAC;
							margin-left: 16rpx;
						}
					}
					.newTopRigth{
						display: flex;
						align-items: center;
						/deep/.iconfont{
							margin-left: 12rpx;
						}
						text{
							font-size: 28rpx;
							color:#AFACAC;
						
							margin-left: 8rpx;
						}
					}
				}
				p{
					font-size: 28rpx;
					color: #333;
					margin-top: 16rpx;
				}
			}
		}
	}
}
</style>
