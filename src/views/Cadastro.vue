<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen">
    <div class="grid lg:grid-cols-2 min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Painel Esquerdo - Branding -->
      <div class="hidden lg:flex bg-gradient-to-br from-indigo-600 to-purple-600 justify-center pt-32 p-12">
        <div class="text-white max-w-lg animate-fade">
          <div class="mb-8">
            <i class="fas fa-user-plus text-7xl mb-6 inline-block" style="animation: pulse-glow 2s ease-in-out infinite;"></i>
          </div>
          <h1 class="text-5xl font-bold mb-6 leading-tight">
            Junte-se ao<br/>Saúde++
          </h1>
          <p class="text-xl text-indigo-100 mb-8 leading-relaxed">
            Crie sua conta e tenha acesso completo ao sistema de gestão médica mais moderno.
          </p>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 rounded-full p-2">
                <i class="fas fa-rocket text-xl"></i>
              </div>
              <span class="text-lg">Cadastro rápido e seguro</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 rounded-full p-2">
                <i class="fas fa-hospital text-xl"></i>
              </div>
              <span class="text-lg">Acesso a múltiplas clínicas</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 rounded-full p-2">
                <i class="fas fa-chart-line text-xl"></i>
              </div>
              <span class="text-lg">Dashboard personalizado</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Painel Direito - Formulário -->
      <div class="flex items-center justify-center p-6 lg:p-12 relative overflow-y-auto">
        <!-- Botão modo noturno -->
        <button
          @click="toggleTheme"
          class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 text-indigo-600 dark:text-indigo-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
        >
          <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-xl"></i>
        </button>
        
        <div class="w-full max-w-md">
          <!-- Card de Cadastro -->
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
                Criar Conta
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                Preencha os dados para se registrar
              </p>
            </div>
            
            <!-- Alerta de erro geral -->
            <Transition name="fade">
              <div v-if="errorMessage" class="mb-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start space-x-3">
                <i class="fas fa-exclamation-triangle text-red-500 mt-0.5"></i>
                <div class="flex-1">
                  <p class="text-sm text-red-700 dark:text-red-400 font-medium">
                    {{ errorMessage }}
                  </p>
                </div>
                <button @click="errorMessage = ''" class="text-red-400 hover:text-red-600 transition-colors">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </Transition>
            
            <!-- Formulário -->
            <form @submit.prevent="registrar" class="space-y-6" :class="{ 'animate-shake': isShaking }">
              <!-- Nome completo -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" for="nome">
                  Nome completo
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i class="fas fa-user text-gray-400"></i>
                  </div>
                  <input
                    v-model="form.nome"
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    class="w-full rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 py-3.5 pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <!-- E-mail -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" for="email">
                  E-mail
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i class="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    v-model="form.email"
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    class="w-full rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 py-3.5 pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <!-- Hospital ou Clínica -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" for="hospital">
                  Hospital ou Clínica
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i class="fas fa-hospital text-gray-400"></i>
                  </div>
                  <select
                    v-model="form.hospital"
                    id="hospital"
                    class="w-full rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 py-3.5 pl-11 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-300 appearance-none"
                    required
                  >
                    <option value="" disabled>Selecione uma unidade</option>
                    <option value="hospital-central">Hospital Central</option>
                    <option value="hospital-sao-lucas">Hospital São Lucas</option>
                    <option value="hospital-vida-nova">Hospital Vida Nova</option>
                    <option value="clinica-viver-bem">Clínica Viver Bem</option>
                    <option value="clinica-saudavel">Clínica Saudável</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
                  </div>
                </div>
              </div>

              <!-- Cargo -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" for="cargo">
                  Cargo
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i class="fas fa-briefcase text-gray-400"></i>
                  </div>
                  <select
                    v-model="form.cargo"
                    id="cargo"
                    :class="[
                      'w-full rounded-xl bg-gray-50 dark:bg-gray-700/50 py-3.5 pl-11 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 text-sm transition-all duration-300 appearance-none',
                      cargoError ? 'border-2 border-red-500 focus:ring-red-500' : 'border border-gray-200 dark:border-gray-600 focus:ring-indigo-500 focus:border-transparent'
                    ]"
                    required
                  >
                    <option value="" disabled>Selecione seu cargo</option>
                    <option value="medico">Médico</option>
                    <option value="recepcionista">Recepcionista</option>
                    <option value="administrativo">Administrativo</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
                  </div>
                </div>
                <Transition name="fade">
                  <p v-if="cargoError" class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    {{ cargoError }}
                  </p>
                </Transition>
              </div>

              <!-- Senha -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" for="senha">
                  Senha
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i class="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    v-model="form.senha"
                    :type="showPassword ? 'text' : 'password'"
                    id="senha"
                    placeholder="Crie uma senha forte"
                    class="w-full rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 py-3.5 pl-11 pr-11 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>

              <!-- Confirmar senha -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" for="confirmar-senha">
                  Confirmar senha
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i class="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    v-model="form.confirmarSenha"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    id="confirmar-senha"
                    placeholder="Repita sua senha"
                    class="w-full rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 py-3.5 pl-11 pr-11 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>

              <!-- Botão de Cadastro -->
              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 hover:from-indigo-700 hover:via-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl px-6 py-4 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i :class="isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-user-plus'" class="mr-2"></i>
                  {{ isSubmitting ? 'Criando conta...' : 'Criar Conta' }}
                </button>
              </div>

              <!-- Divisor -->
              <div class="relative py-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t-2 border-gray-200 dark:border-gray-700"></div>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-white dark:bg-gray-800 px-4 text-gray-500 dark:text-gray-400 font-semibold">
                    Já tem conta?
                  </span>
                </div>
              </div>

              <!-- Link para Login -->
              <RouterLink
                to="/"
                class="block text-center bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl px-6 py-4 border-2 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <i class="fas fa-sign-in-alt mr-2"></i>
                Fazer Login
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
                Fale conosco
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

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const toggleTheme = () => themeStore.toggleTheme()

const { register, isSubmitting, errorMessage } = useAuth()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isShaking = ref(false)
const cargoError = ref('')

const form = ref({
  nome: '',
  email: '',
  hospital: '',
  cargo: '',
  senha: '',
  confirmarSenha: ''
})

const triggerShake = () => {
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 500)
}

const registrar = async () => {
  cargoError.value = ''
  errorMessage.value = ''
  
  const result = await register(form.value)
  
  if (!result.success) {
    if (result.field === 'cargo') {
      cargoError.value = result.message
      errorMessage.value = 'Você pode criar sua conta, mas o acesso ao sistema será liberado em breve para sua função.'
    }
    triggerShake()
    
    if (result.field) {
      document.getElementById(result.field)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

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