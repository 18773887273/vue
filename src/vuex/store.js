import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ""
  },
  getters: {
    getusername(state) {
      return state.username;
    }
  },
  mutations: {
    setusername(state,val) {
      state.username = val;
    }
  },
  actions: {}
})
