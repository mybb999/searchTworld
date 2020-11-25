import Vue from 'vue'
var vueProto = {
    install(Vue) {
        Vue.prototype.vueProto = {
            val: function(val) {
                return val;
            }
        };
        // 这里编写vue的实例方法和属性
        Vue.prototype.testname = '周欢'
    }
}
Vue.use(vueProto)