<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  async mounted() {
    const token = process.client
      ? localStorage.getItem('reading-log-token')
      : null
    if (token) {
      if (!this.$store.state.auth.token)
        this.$store.commit('auth/setToken', token)
      this.$router.replace('/books')
    } else {
      this.$router.replace('/login')
    }
  },
})
</script>
