<template>
  <div class="max-w-xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">新しい本を追加</h1>
      <nuxt-link to="/books" class="px-3 py-1 text-sm bg-gray-200 rounded"
        >戻る</nuxt-link
      >
    </div>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">タイトル</label>
        <input
          v-model="title"
          placeholder="タイトル"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">読了日</label>
        <input
          type="date"
          v-model="completedDate"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">感想</label>
        <input
          v-model="notes"
          placeholder="感想"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <div class="flex gap-2">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
          保存
        </button>
        <nuxt-link to="/books" class="px-4 py-2 bg-gray-200 rounded"
          >キャンセル　</nuxt-link
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return { title: '', notes: '', completedDate: '' }
  },
  methods: {
    async submit() {
      await this.$store.dispatch('books/add', {
        title: this.title,
        notes: this.notes,
        completedDate: this.completedDate,
      })
      this.$router.push('/books')
    },
  },
}
</script>
