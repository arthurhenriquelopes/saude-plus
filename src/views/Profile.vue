<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Perfil do Usuário
      </h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <!-- Foto e Info Principal -->
        <div class="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div class="relative">
            <img 
              :src="usuario?.foto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(usuario?.nome || 'User') + '&background=6366f1&color=fff&size=128'"
              :alt="usuario?.nome" 
              class="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 dark:border-indigo-900"
            />
            <button class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors shadow-lg">
              <i class="fas fa-camera text-sm"></i>
            </button>
          </div>
          
          <div class="flex-1">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ usuario?.nome || 'Usuário' }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 capitalize mb-2">
              {{ usuario?.cargo || 'Cargo não definido' }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-500">
              {{ usuario?.hospital || 'Hospital não informado' }}
            </p>
          </div>
        </div>
        
        <!-- Informações do Perfil -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              E-mail
            </label>
            <p class="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-xl">
              {{ usuario?.email || 'Não informado' }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Cargo
            </label>
            <p class="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-xl capitalize">
              {{ usuario?.cargo || 'Não informado' }}
            </p>
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Hospital/Clínica
            </label>
            <p class="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-xl">
              {{ usuario?.hospital || 'Não informado' }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Membro desde
            </label>
            <p class="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-xl">
              {{ formatDate(usuario?.criadoEm) }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              ID do Usuário
            </label>
            <p class="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-xl">
              #{{ usuario?.id || 'N/A' }}
            </p>
          </div>
        </div>
        
        <!-- Botões de Ação -->
        <div class="flex gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <button class="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
            <i class="fas fa-edit mr-2"></i>
            Editar Perfil
          </button>
          <button 
            @click="$router.push('/dashboard')"
            class="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const usuario = ref(null)

onMounted(() => {
  const savedUser = localStorage.getItem('usuario')
  if (savedUser) {
    usuario.value = JSON.parse(savedUser)
  }
})

const formatDate = (dateString) => {
  if (!dateString) return 'Data não disponível'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
}
</script>
