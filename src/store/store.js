import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: null,
      name: '',
      email: '',
      stepsGeneric: [],

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
    setStepsGeneric(state, steps) {
      state.stepsGeneric = steps
    }
  },
  actions: {
    setAuth(state, auth) {
      state.commit('setToken', auth.sessionToken)
      state.commit('setUserName', auth.userName)
      state.commit('setEmail', auth.email)
    },
    getStepsGeneric(state) {
      const steps = [
        { name: 'Paso 0' },
        { name: 'Paso 1' },
        { name: 'Paso 2' },
        { name: 'Paso 3' }]
      state.commit('setStepsGeneric', steps)
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