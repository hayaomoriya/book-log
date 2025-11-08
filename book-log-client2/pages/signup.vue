<template>
  <div class="max-w-sm mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">登録</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm mb-1">名前</label>
        <input
          v-model="name"
          type="text"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
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
        アカウントの登録
      </button>
    </form>
    <p class="mt-4 text-sm">
      既にアカウントを持っていますか？
      <nuxt-link to="/login" class="text-blue-600">ログイン</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return { name: '', email: '', password: '' }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        this.$router.push('/books')
      } catch (e) {
        alert('Signup failed')
      }
    },
  },
}
</script>
