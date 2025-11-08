export default async function ({ store, redirect, route }) {
  // Ensure token exists (store or localStorage) for protected routes
  if (!store.state.auth.token) {
    if (process.client) {
      const token = localStorage.getItem('reading-log-token')
      if (token) {
        store.commit('auth/setToken', token)
        if (!store.state.auth.user) {
          try {
            await store.dispatch('auth/fetchUser')
          } catch (e) {
            // invalid token
            store.commit('auth/clearAuth')
            return redirect('/login')
          }
        }
      }
    }
  }
  if (!store.state.auth.token) {
    return redirect('/login')
  }
}
