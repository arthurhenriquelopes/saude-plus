<template>
  <aside class="flex flex-col bg-purple-50 dark:bg-gray-800 w-64 select-none h-screen sticky top-0">
    <!-- Top section (scrollable if needed) -->
    <div class="flex-1 overflow-y-auto px-6 py-8">
      <img src="@/assets/images/icon.png" alt="Logo Saúde++" class="w-12 mx-auto mb-10" />
      <nav class="space-y-4">
        <slot name="navigation"></slot>
      </nav>
    </div>
    
    <!-- Bottom section (sticky) -->
    <div class="flex flex-col gap-3 px-6 py-4 border-t border-purple-200 dark:border-gray-700 bg-purple-50 dark:bg-gray-800">
      <RouterLink to="/profile" class="flex items-center gap-3 rounded-lg bg-white dark:bg-gray-700 px-4 py-2 shadow-md hover:shadow-lg transition-shadow duration-200">
        <img 
          :src="usuario?.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario?.nome || 'User')}&background=6366f1&color=fff&size=40`"
          alt="Foto de perfil" 
          class="w-8 h-8 rounded-full object-cover" 
        />
        <div class="text-xs leading-tight text-left">
          <p class="font-semibold text-gray-900 dark:text-white">{{ usuario?.nome || 'Usuário' }}</p>
          <p class="text-gray-500 dark:text-gray-400 capitalize">{{ usuario?.cargo || 'Cargo' }}</p>
        </div>
      </RouterLink>
      
      <button 
        @click="handleLogout"
        class="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition-colors duration-200" 
      >
        <i class="fas fa-sign-out-alt"></i> Sair
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref(null)

onMounted(() => {
  const savedUser = localStorage.getItem('usuario')
  if (savedUser) {
    usuario.value = JSON.parse(savedUser)
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  router.push('/')
}
</script>
