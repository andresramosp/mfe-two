import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: null,
      name: '',
      email: '',
    }
  },
  mutations: {
    setUserName(state, name) {
      state.userName = name
    },
    setToken(state, token) {
      state.token = token
    },
    setEmail(state, email) {
        state.email = email
      },
  },
  actions: {
    setAuth(state, auth) {
      state.commit('setToken', auth.sessionToken)
      state.commit('setUserName', auth.userName)
      state.commit('setEmail', auth.email)
    }
  },
  getters: {
    getLoggedIn(state) {
      return !!state.token
    },
    getUserLabel(state) {
      return `${state.userName} (${state.email})`
    }
  }
})

export default store;