<template>
	<view class="nav-header">
		<van-icon name="/static/coursetable/jt.png" size="35rpx" @click="geto()" />
		<h2>{{title}}</h2>
	</view>
</template>
<script>
	export default {
		data: () => ({

		}),
		props: {
			title: String
		},
		created() {},
		methods: {
			geto() {
				uni.navigateBack({
					animationType: "none"
				})
			}
		},
	};
</script>
<style lang="less" scoped>
	.nav-header {
		width: 100%;
		display: flex;
		align-items: center;
		position: absolute;
		top: 60px;

		van-icon {
			margin-left: 25rpx;
		}

		h2 {
			font-size: 28rpx;
			color: #000;
			padding-left: 35%;
		}
	}
</style>
