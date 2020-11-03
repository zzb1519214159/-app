// 定义全局函数
import { Message } from 'element-ui'
export default {
    install: Vue => {
        Vue.prototype.changLoader = (msg) => {
            Message({
                type: 'success',
                message: msg
            });
        }
    }
}
/**用法/
 * this.changLoader("成功")
/**/