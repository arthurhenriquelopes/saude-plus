import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    try {
      // Substitua pela sua lógica de API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        throw new Error('Credenciais inválidas')
      }

      const data = await response.json()
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      
      router.push({ name: 'dashboard' })
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  }
})
