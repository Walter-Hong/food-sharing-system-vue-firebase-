// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import {firebase} from './firebase/index'
import VueFire from 'vuefire'
import router from './router'
import {store} from './store'
import Input from 'buefy/src/components/input'
import Field from 'buefy/src/components/field'
import Tooltip from 'buefy/src/components/tooltip'
import 'buefy/lib/buefy.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueScrollTo from 'vue-scrollto'
import VuePaginate from 'vue-paginate'
const App = () => import('./App')
const AlertCmp = () => import('./components/Shared/Alert.vue')
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDvG8QBgXV6msnzH-AtgN-ssWYJBHY5kH4'
  }
})

Vue.use(VueFire)
Vue.use(Vuetify)
Vue.use(VueResource)
Vue.component(Input.name, Input)
Vue.component(Field.name, Field)
Vue.component(Tooltip.name, Tooltip)
Vue.use(VueScrollTo)
Vue.use(VuePaginate)
Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
