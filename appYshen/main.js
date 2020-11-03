import Vue from 'vue'
import App from './App'
import "../junyueda/static/font/iconfont.css"
import './static/scss/index.scss'
Vue.config.productionTip = false
Vue.prototype.pcImg = 'http://47.115.74.163'//后台地址
Vue.prototype.unappImg = 'http://www.yunshangyijia.com:88'//小程序地址
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()