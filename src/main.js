import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/css/tailwind.css';
import VueLazyload from 'vue-lazyload'
import utils from './utils';
Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
