<template>
  <div class="max-w-2xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">本の記録を編集</h1>
      <button @click="goBack" class="px-3 py-1 text-sm bg-gray-200 rounded">
        戻る
      </button>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <form @submit.prevent="save" class="grid grid-cols-1 gap-4">
        <label class="block">
          <span class="text-sm text-gray-700">タイトル</span>
          <input
            v-model="form.title"
            class="border rounded px-2 py-1 w-full"
            required
          />
        </label>

        <label class="block">
          <span class="text-sm text-gray-700">読了日</span>
          <input
            type="date"
            v-model="form.completedDate"
            class="border rounded px-2 py-1 w-full"
            required
          />
        </label>

        <label class="block">
          <span class="text-sm text-gray-700">感想</span>
          <textarea
            v-model="form.notes"
            class="border rounded px-2 py-1 w-full"
            rows="3"
          />
        </label>

        <div class="flex gap-2">
          <button
            type="submit"
            class="px-3 py-1 bg-blue-600 text-white rounded"
          >
            保存
          </button>
          <button
            type="button"
            @click="goBack"
            class="px-3 py-1 bg-gray-200 rounded"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      loading: true,
      form: {
        title: '',
        notes: '',
        completedDate: '',
      },
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    items() {
      return this.$store.state.books.items
    },
    current() {
      return this.items.find((b) => String(b.id) === String(this.id))
    },
  },
  async mounted() {
    if (!this.$store.state.auth.token && process.client) {
      const token = localStorage.getItem('reading-log-token')
      if (token) this.$store.commit('auth/setToken', token)
    }

    if (!this.current) {
      await this.$store.dispatch('books/list')
    }

    if (this.current) {
      this.form.title = this.current.title || ''
      this.form.notes = this.current.notes || ''
      this.form.completedDate = this.current.completedDate || ''
    }

    this.loading = false
  },
  methods: {
    async save() {
      await this.$store.dispatch('books/update', {
        id: this.id,
        updates: {
          title: this.form.title,
          notes: this.form.notes,
          completedDate: this.form.completedDate,
        },
      })
      this.$router.push('/books')
    },
    goBack() {
      this.$router.back()
    },
  },
}
</script>
