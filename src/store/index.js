import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import chat from './chat'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    chat: chat,
    user: user,
    shared: shared
  }
})
