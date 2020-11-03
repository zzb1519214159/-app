<!-- 常用语列表页面 -->
<template>
	<view class="medical">

		<view class="medical-list" v-for="(item,index) in listArry" :key="index">
			<van-swipe-cell id="swipe-cell" :right-width="110" class="swipe-cell" ref="swipe-cell">
				<van-cell-group>
					<van-cell :title="item.advice" class="medical-cell" />
				</van-cell-group>
				<view slot="right" class="van-swipe-cell__right">
					<van-button color="#F5B627" size="normal" @click="compile(item.id)">编辑</van-button>
					<van-button color="#EE0A24" size="normal" @click="remove(item.id)">删除</van-button>
				</view>
			</van-swipe-cell>
		</view>
		<view class="medical-btn">
			<button @click="tocompile">
				<van-icon name="/static/tpub.png" size="26rpx"/>新增常用语
			</button>
		</view>

	</view>
</template>

<script>
	import {
		loadUsuallyAdvice
	} from "../../api"
	export default {
		data() {
			return {
				listArry: []
			};
		},
		methods: {
			tocompile() {
				uni.navigateTo({
					url: "/pages/compile/compile"
				});
			},
			compile(){
				
			},
			remove(){},
			// 列表接口
			loadUsuallyAdviceDo() {
				loadUsuallyAdvice().then(res => {
					if (res.code === 0) {
						this.listArry = res.data;
					}
				})
			}
		},
		onShow(){
			this.loadUsuallyAdviceDo();
		},
	};
</script>

<style lang="scss">
	.medical {
		.medical-list {
			/deep/.medical-cell {
				.van-cell {
					padding: 36rpx 30rpx;
					border-style: none;
				}
			}

			.van-swipe-cell__right {
				display: flex;
				align-items: center;

				/deep/.van-button {
					height: 114rpx;
					border-radius: 0%;
				}
			}

			// 修改滑动单元格border:after样式
			/deep/.van-hairline--bottom:after,
			.van-hairline--left:after,
			.van-hairline--right:after,
			.van-hairline--surround:after,
			.van-hairline--top-bottom:after,
			.van-hairline--top:after,
			.van-hairline:after {
				border: none;
				border-bottom: 1rpx solid $uni-border-color-199;
			}
		}

		.medical-btn {
			width: 100%;
			display: flex;
			padding: 30rpx 0;
			justify-content: center;
			align-content: center;
			position: fixed;
			bottom: 0;

			button {
				font-size: 32rpx;
				line-height: 45px;
				padding: 23rpx 132rpx 23rpx 132rpx;
				background: #15a7e8;
				box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
				border-radius: 50rpx;
				color: #fff;
				font-weight: 600;

				/deep/.van-icon {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
