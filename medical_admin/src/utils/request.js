import axios from 'axios' //引入axios依赖
import { Message, MessageBox } from 'element-ui'
import router from '@/router/index' //引入路由对象
import store from '@/vuex/store'
import qs from 'qs'

//创建新的axios实例，
const service = axios.create({
        // 公共接口
        baseURL: 'http://47.115.74.163/medical/',
        // 超时时间 单位是ms
        timeout: 15000,
    })
    //http request 封装请求头拦截器
service.interceptors.request.use(

    config => {
        /* 中文乱码加utf-8 */
        config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        let token = store.state.token;
        /*判断请求的类型
         *如果是post请求就把默认参数拼到data里面
         *如果是get请求就拼到params里面
         */
        if (token) {
            config.headers.token = token;
        };
        if (config.method === 'post') {
            config.data = qs.stringify({
                ...config.data
            });
        } else if (config.method === 'get') {
            config.params = {
                ...config.params
            }
        }
        return config;

    },
    error => {
        return Promise.reject(error);

    }

);

//http response 封装后台返回拦截器

service.interceptors.response.use(

    response => {
        if (response.headers.token) {
            store.commit("setToken", response.headers.token);
        }
        //当返回信息为未登录或者登录失效的时候重定向为登录页面
        if (response.data.code === 1) {
            Message({
                message: response.data.message,
                type: 'error',
                duration: 5 * 1000
            });
            /* 暂定token过期判断 */
            if (response.data.message == 'token 无效！') {
                router.push({
                    path: "/",
                    querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
                })
            }

        } else {
            return response.data
        }

    },

    error => {
        Message({
            message: "500服务器错误",
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error)

    }

)
export default service