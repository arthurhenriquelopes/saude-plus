<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen">
    <div class="grid lg:grid-cols-2 min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Painel Esquerdo - Branding -->
      <div class="hidden lg:flex bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center p-12">
        <div class="text-white max-w-lg animate-fade">
          <div class="mb-8">
            <i class="fas fa-heartbeat text-7xl mb-6 inline-block" style="animation: pulse-glow 2s ease-in-out infinite;"></i>
          </div>
          <h1 class="text-5xl font-bold mb-6 leading-tight">
            Bem-vindo ao<br/>Portal Saúde++
          </h1>
          <p class="text-xl text-indigo-100 mb-8 leading-relaxed">
            Sistema integrado de gestão médica para associados.
            Acesse seus dados de saúde com segurança e praticidade.
          </p>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 rounded-full p-2">
                <i class="fas fa-shield-alt text-xl"></i>
              </div>
              <span class="text-lg">Dados protegidos e criptografados</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 rounded-full p-2">
                <i class="fas fa-clock text-xl"></i>
              </div>
              <span class="text-lg">Acesso 24/7 aos seus registros</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 rounded-full p-2">
                <i class="fas fa-user-md text-xl"></i>
              </div>
              <span class="text-lg">Conexão direta com profissionais</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Painel Direito - Formulário -->
      <div class="flex items-center justify-center p-6 lg:p-12 relative">
        <!-- Botão modo noturno (ÚNICO) -->
        <button
          @click="toggleTheme"
          class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 text-indigo-600 dark:text-indigo-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
        >
          <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-xl"></i>
        </button>
        
        <div class="w-full max-w-md">
          <!-- Card de Login -->
          <div class="bg-white/98 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200 dark:border-gray-700 animate-slide-up">
            <!-- Logo e Título -->
            <div class="text-center mb-10">
              <img
                src="@/assets/images/logo-saude++.png"
                alt="Logo Saúde++"
                class="w-20 h-20 mx-auto mb-6"
                style="filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3)); animation: pulse-glow 3s ease-in-out infinite;"
              />
              <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Portal de Associados
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                Faça login para acessar sua conta
              </p>
            </div>
            
            <!-- Mensagem de erro -->
            <Transition name="fade">
              <div v-if="errorMessage" class="mb-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start space-x-3">
                <i class="fas fa-exclamation-circle text-red-500 mt-0.5"></i>
                <p class="text-sm text-red-700 dark:text-red-400 font-medium">
                  {{ errorMessage }}
                </p>
              </div>
            </Transition>
            
            <!-- Formulário -->
            <form @submit.prevent="handleLogin" class="space-y-6">
              <InputField
                id="email"
                v-model="form.email"
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                icon="fas fa-envelope"
              />
              
              <InputField
                id="password"
                v-model="form.password"
                label="Senha"
                type="password"
                placeholder="••••••••"
                icon="fas fa-lock"
              />
              
              <!-- Botão de Login -->
              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl px-6 py-4 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i :class="isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'" class="mr-2"></i>
                  {{ isSubmitting ? 'Entrando...' : 'Entrar na Plataforma' }}
                </button>
              </div>
              
              <!-- Divisor -->
              <div class="relative py-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t-2 border-gray-200 dark:border-gray-700"></div>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-white dark:bg-gray-800 px-4 text-gray-500 dark:text-gray-400 font-semibold">
                    Novo por aqui?
                  </span>
                </div>
              </div>
              
              <!-- Botão de Cadastro -->
              <RouterLink
                to="/cadastro"
                class="block text-center bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl px-6 py-4 border-2 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <i class="fas fa-user-plus mr-2"></i>
                Criar Conta de Associado
              </RouterLink>
            </form>
            
            <!-- Footer -->
            <div class="mt-8 pt-6 border-t-2 border-gray-200 dark:border-gray-700 text-center">
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                <i class="fas fa-shield-alt mr-2"></i>
                Seus dados estão protegidos e criptografados
              </p>
            </div>
          </div>
          
          <!-- Informação adicional -->
          <div class="mt-8 text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Precisa de ajuda? 
              <a href="#" class="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-colors">
                Entre em contato
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useAuth } from '@/composables/useAuth'
import InputField from '@/components/common/InputField.vue'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const toggleTheme = () => themeStore.toggleTheme()

const { login, isSubmitting, errorMessage } = useAuth()

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  await login(form.value)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
