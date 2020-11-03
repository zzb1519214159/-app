<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.overall{
		background-color:#F6F6F6 ;
	}
	view,text{
		font-size: 24rpx;
	}
	  button::after{
    border:none;
		}
	/*每个页面公共css */
	@import "/wxcomponents/vant/common/index.wxss";
	@import '../appPatient/static/font/iconfont.css';
</style>
