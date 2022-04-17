import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
