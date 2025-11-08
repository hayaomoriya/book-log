export const namespaced = true

export const state = () => ({
  items: [],
  loading: false,
})

export const mutations = {
  setLoading(state, v) {
    state.loading = v
  },
  setItems(state, items) {
    state.items = items
  },
  updateItem(state, updated) {
    state.items = state.items.map((b) =>
      b.id === updated.id ? { ...b, ...updated } : b,
    )
  },
  removeItem(state, id) {
    state.items = state.items.filter((b) => b.id !== id)
  },
}

export const actions = {
  async list({ commit }) {
    commit('setLoading', true)
    try {
      const data = await this.$axios.$get('/api/books')
      const normalized = data.map((d) => ({
        ...d,
        completedDate: d.completed_date,
      }))
      commit('setItems', normalized)
    } finally {
      commit('setLoading', false)
    }
  },
  async add({ dispatch }, book) {
    const payload = { ...book, completed_date: book.completedDate }
    const created = await this.$axios.$post('/api/books', payload)
    await dispatch('list')
  },
  async update({ commit }, { id, updates }) {
    const payload = { ...updates, completed_date: updates.completedDate, id }
    const updated = await this.$axios.$put(`/api/books/${id}`, payload)
    commit('updateItem', updated)
  },
  async remove({ commit }, id) {
    await this.$axios.$delete(`/api/books/${id}`)
    commit('removeItem', id)
  },
}
