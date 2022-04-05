import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {getOssInfos} from '../src/network/login'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$getOssInfos = getOssInfos

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
