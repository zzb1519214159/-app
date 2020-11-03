/* 
	*uni-app封装一个request请求
	* 定义域名：baseUrl；
	*定义方法：api；
	*通过promise异步请求，最后导出方法。
*/ 
const baseUrl = 'http://www.yunshangyijia.com:88/';
const request = (url = '', data = {}, type = '', header = {
}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: baseUrl + url,
            data: data,
            header: {
							'content-type': 'application/x-www-form-urlencoded',
							"token":uni.getStorageSync('token')
						},
        }).then((response) => {
					// 获取token判断接口是否为登录，setStorageSync同步 存储token
					let [error, res] = response;
					if(res.header.token){
						uni.setStorageSync('token', res.header.token);
					}
					// 接口错误的信息
					if(res.data.code===1){
						return uni.showLoading({
							 title:'数据获取失败',
							 duration: 2000
						})
					};
					resolve(res.data);
        }).catch(error => {
					let [err, res] = error;
					// 请求错误的信息
					uni.showLoading({
							title:'请求接口失败',
							duration: 2000
					});
					reject(err)
        })
    });
}
export default request