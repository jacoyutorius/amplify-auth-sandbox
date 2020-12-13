import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-vue';
Amplify.configure(awsconfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
