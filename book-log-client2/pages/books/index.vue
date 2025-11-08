<template>
  <div class="max-w-2xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">あなたの読書記録</h1>
      <div class="flex items-center gap-2">
        <nuxt-link
          to="/books/add"
          class="px-3 py-1 text-sm bg-blue-600 text-white rounded"
          >本を追加</nuxt-link
        >
        <button
          @click="onSignOut"
          class="px-3 py-1 text-sm bg-gray-200 rounded"
        >
          ログアウト
        </button>
      </div>
    </div>

    <div v-if="loading">Loading...</div>
    <ul>
      <li
        v-for="b in books"
        :key="b.id"
        class="border-b py-2 flex items-center justify-between"
      >
        <nuxt-link :to="`/books/${b.id}`">
          <div>
            <div class="font-medium">{{ b.title }}</div>
            <div class="text-sm text-gray-600">
              読了日：{{
                b.completedDate ? b.completedDate.replace(/-/g, '/') : ''
              }}
            </div>
          </div>
        </nuxt-link>
        <div class="flex items-center gap-2">
          <button
            @click="remove(b.id)"
            class="px-2 py-1 text-xs bg-red-600 text-white rounded"
          >
            削除
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    books() {
      return this.$store.state.books.items
    },
    loading() {
      return this.$store.state.books.loading
    },
  },
  async mounted() {
    if (!this.$store.state.auth.token && process.client) {
      const token = localStorage.getItem('reading-log-token')
      if (token) this.$store.commit('auth/setToken', token)
    }
    await this.$store.dispatch('books/list')
  },
  methods: {
    async remove(id) {
      await this.$store.dispatch('books/remove', id)
    },
    async onSignOut() {
      await this.$store.dispatch('auth/signout')
      this.$router.push('/login')
    },
  },
}
</script>
