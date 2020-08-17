import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import  echarts from 'echarts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import axios from 'axios'
import Contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import store from './store/index'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(Contentmenu)
Vue.prototype.$FileSaver = FileSaver;
Vue.prototype.$XLSX = XLSX;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts=echarts;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: { App },
  template: '<App/>'
})
