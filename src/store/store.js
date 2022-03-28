import { createStore } from 'vuex'
import { Configuration, PetApiFactory } from "Shell/clientApi";

const store = createStore({
  state() {
    return {
      token: null,
      name: '',
      email: '',
      stepsGeneric: [],
      pets: []

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
    },
    setPets(state, pets) {
      state.pets = pets
    },
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
    },
    async getPets(state) {
      const config = new Configuration({
        basePath: window.location.origin, // 1
      });
      const apiFactory = PetApiFactory(config);
      let result = await apiFactory.findPetsByStatus(['available', 'pending', 'sold'])
      state.commit('setPets', result)
      console.log(result)
    }
  },
  getters: {
    getLoggedIn(state) {
      return !!state.token
    },
    getUserLabel(state) {
      return `${state.userName} (${state.email})`
    },
    pets(state) {
      return state.pets
        .filter(p => p.name !== 'doggie')
        .slice(0, 50)
        .map(p => {
          return {
            ...p, id: parseInt(Math.random() * 1000)
          }
        })
    }
  }
})

export default store;