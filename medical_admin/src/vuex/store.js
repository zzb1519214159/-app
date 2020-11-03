import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: state => ({
        token: state.token, // 这个就是存入localStorage的值
    })
})

const store = new Vuex.Store({
    state: {
        token: ""
    },
    // mutations同步
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    },
    plugins: [vuexLocal.plugin]
    // Action 可以包含任意异步操作
    // actions: {
    //     incrementFun(context) {
    //         context.commit('increment')
    //     }
    // }
});
export default store