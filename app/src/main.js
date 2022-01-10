import Vue from 'vue'
import myPlugin from './plugins/myPlugins' 
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
 
Vue.config.productionTip = false
Vue.use(myPlugin) 
  
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')