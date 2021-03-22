import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    user: {
      id: null,
      username: null,
      role: null
    },
    token: {
      accessToken: null,
      isAuthorized: false
    }
    // refreshToken: null
  },
  mutations: {
    setAccessToken: function (state, payload) {
      state.token.accessToken = payload.accessToken
    },
    setAuth: function(state, payload) {
      state.token.isAuthorized = payload.isAuthorized
    },
    // setRefreshToken: function (state, payload) {
    //   state.refreshToken = payload.refreshToken
    // },
    setUser: function (state, payload) {
      state.user.username = payload.username
      state.user.role = payload.role
    }
  },
  getters: {
    tokenAuthorized: state => {
      return state.token.isAuthorized
    },
    AccessToken: state => {
      return state.token.accessToken
    }
  },
  
});