// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
const App = () => import('./App')
import VueResource from 'vue-resource'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
const AlertCmp = () => import('./components/Shared/Alert.vue')

Vue.use(Vuetify)
Vue.use(VueResource)
Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCXJy2P5ziBmSqZMrOQBOZjBZBqOClkm68',
      authDomain: 'my-project-1525706860738.firebaseapp.com',
      databaseURL: 'https://my-project-1525706860738.firebaseio.com',
      projectId: 'my-project-1525706860738',
      storageBucket: 'my-project-1525706860738.appspot.com',
      messagingSenderId: '132702724130'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
