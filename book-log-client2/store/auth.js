export const namespaced = true

export const state = () => ({
  token: null,
  user: null,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  },
  clearAuth(state) {
    state.token = null
    state.user = null
  },
}

export const actions = {
  async signup({ commit, dispatch }, { email, password, name }) {
    const { token } = await this.$axios.$post('/api/signup', {
      email,
      password,
      name,
    })
    commit('setToken', token)
    if (process.client) localStorage.setItem('reading-log-token', token)
    await dispatch('fetchUser')
  },
  async signin({ commit, dispatch }, { email, password }) {
    const { token } = await this.$axios.$post('/api/signin', {
      email,
      password,
    })
    commit('setToken', token)
    if (process.client) localStorage.setItem('reading-log-token', token)
    await dispatch('fetchUser')
  },
  async signout({ commit, state }) {
    if (state.token) {
      try {
        await this.$axios.$get('/api/signout')
      } catch (e) {
        // ignore
      }
    }
    commit('clearAuth')
    if (process.client) localStorage.removeItem('reading-log-token')
  },
  async fetchUser({ commit }) {
    const user = await this.$axios.$get('/api/user')
    commit('setUser', user)
  },
  initFromLocal({ commit }) {
    if (process.client) {
      const token = localStorage.getItem('reading-log-token')
      if (token) commit('setToken', token)
    }
  },
}
