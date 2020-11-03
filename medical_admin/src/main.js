import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./vuex/store"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/modality.scss'
import base from "./assets/js/base.js"
import VuewechatTitle from 'vue-wechat-title'
Vue.config.productionTip = false
Vue.prototype.user_img = 'http://47.115.74.163'

// size 用于改变组件的默认尺寸
Vue.use(ElementUI, { size: 'small' });
Vue.use(base);
Vue.use(VuewechatTitle);
//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象
// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     if (to.meta.title) {
//         console.log(to.meta.title);
//         document.title = to.meta.title || '首页'
//     }
//     next()
// })
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')