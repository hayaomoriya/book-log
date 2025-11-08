<template>
  <div class="max-w-sm mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">ログイン</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm mb-1">メールアドレス</label>
        <input
          v-model="email"
          type="email"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label class="block text-sm mb-1">パスワード</label>
        <input
          v-model="password"
          type="password"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
        ログイン
      </button>
    </form>
    <p class="mt-4 text-sm">
      アカウントを持っていませんか？
      <nuxt-link to="/signup" class="text-blue-600">登録</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return { email: '', password: '' }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('auth/signin', {
          email: this.email,
          password: this.password,
        })
        this.$router.push('/books')
      } catch (e) {
        alert('ログインできませんでした')
      }
    },
  },
}
</script>
