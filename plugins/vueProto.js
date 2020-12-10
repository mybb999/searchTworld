import Vue from 'vue'
// axios提交表单序列化
import qs from 'qs'


var vueProto = {
    install(Vue) {
        Vue.prototype.vueProto = {
            val: function (val) {
                return val;
            }
        };
        // 这里编写vue的实例方法和属性
        Vue.prototype.testname = '周欢';
        Vue.prototype.qs = qs;
    }
}
Vue.use(vueProto)