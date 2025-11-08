export default function ({ store, $axios }) {
  $axios.onRequest((config) => {
    const token = store.state.auth && store.state.auth.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  })
}
