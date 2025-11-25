<template>
    <div class="min-h-screen flex bg-white dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar>
      <template #navigation>
        <a class="flex items-center gap-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-gray-900 dark:text-white text-sm font-normal">
          <i class="fas fa-th-large text-base"></i> Dashboard
        </a>
        <RouterLink to="/financeiro" class="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-gray-300 text-sm font-normal hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition">
          <i class="fas fa-money-bill-wave text-base"></i> Financeiro
        </RouterLink>
        <RouterLink to="/estoque" class="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-gray-300 text-sm font-normal hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition">
          <i class="fas fa-clipboard-list text-base"></i> Estoque
        </RouterLink>
        <RouterLink to="/administracao" class="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-gray-300 text-sm font-normal hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition">
          <i class="fas fa-cogs text-base"></i> Administração
        </RouterLink>
      </template>
    </Sidebar>

    <!-- Main content -->
    <main class="flex-1 p-8 max-w-5xl mx-auto">
      <p class="text-xs mb-6 text-gray-600 dark:text-gray-400">Dashboard</p>
      <h2 class="font-bold text-2xl mb-6 text-gray-900 dark:text-white">Visão Geral</h2>
      
      <!-- Cards de estatísticas -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div class="bg-purple-50 dark:bg-gray-800 rounded-xl p-6">
          <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-3">
            <i class="fas fa-users text-indigo-600 dark:text-indigo-400"></i>
          </div>
          <p class="text-sm mb-1 font-semibold text-gray-900 dark:text-white">Pacientes</p>
          <p class="font-bold text-2xl mb-1 text-gray-900 dark:text-white">1.250</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Total cadastrados</p>
        </div>
        
        <div class="bg-purple-50 dark:bg-gray-800 rounded-xl p-6">
          <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-3">
            <i class="fas fa-calendar-alt text-indigo-600 dark:text-indigo-400"></i>
          </div>
          <p class="text-sm mb-1 font-semibold text-gray-900 dark:text-white">Consultas Hoje</p>
          <p class="font-bold text-2xl mb-1 text-gray-900 dark:text-white">32</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Agendadas para hoje</p>
        </div>
        
        <div class="bg-purple-50 dark:bg-gray-800 rounded-xl p-6">
          <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-3">
            <i class="fas fa-dollar-sign text-indigo-600 dark:text-indigo-400"></i>
          </div>
          <p class="text-sm mb-1 font-semibold text-gray-900 dark:text-white">Receita do Mês</p>
          <p class="font-bold text-2xl mb-1 text-gray-900 dark:text-white">R$ 45.000</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Receita acumulada</p>
        </div>
      </section>
      
      <!-- Ações Rápidas -->
      <section class="mb-8">
        <p class="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Ações Rápidas</p>
        <div class="flex flex-wrap gap-3">
          <button 
            @click="showAgendamentoModal = true"
            class="bg-indigo-600 text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-indigo-700 transition"
          >
            Novo Agendamento
          </button>
          <button 
            @click="showPacienteModal = true"
            class="bg-purple-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg px-5 py-2.5 hover:bg-purple-100 dark:hover:bg-gray-700 transition"
          >
            Cadastrar Paciente
          </button>
        </div>
      </section>

      
      <!-- Consultas Recentes -->
      <section>
        <p class="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Consultas Recentes</p>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div 
            v-for="(consulta, index) in consultas" 
            :key="consulta.id"
            class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition relative"
            :class="{ 'overflow-visible': menuAberto === consulta.id }"
          >
            <!-- Avatar e Nome -->
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <i class="fas fa-user text-lg text-gray-400 hidden sm:block"></i>
              <img 
                :src="consulta.foto" 
                :alt="`Foto de ${consulta.nome}`" 
                class="w-10 h-10 rounded-full object-cover flex-shrink-0" 
              />
              <span class="font-medium text-gray-900 dark:text-white truncate">
                {{ consulta.nome }}
              </span>
            </div>
            
            <!-- Informações (responsivo) -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
              <!-- Horário -->
              <div class="flex items-center gap-2">
                <i class="fas fa-clock text-gray-400 text-xs sm:hidden"></i>
                <span class="text-gray-600 dark:text-gray-400">{{ consulta.horario }}</span>
              </div>
              
              <!-- Médico -->
              <div class="flex items-center gap-2">
                <i class="fas fa-user-md text-gray-400 text-xs sm:hidden"></i>
                <span class="text-gray-600 dark:text-gray-400">{{ consulta.medico }}</span>
              </div>
              
              <!-- Status -->
              <span :class="[
                'text-sm px-3 py-1 rounded-full font-medium whitespace-nowrap',
                consulta.status === 'Confirmada' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                consulta.status === 'Aguardando' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              ]">
                {{ consulta.status }}
              </span>
            </div>
            
            <!-- Menu de ações -->
            <div class="relative">
              <button 
                @click.stop="toggleMenu(consulta.id)"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                :aria-label="`Menu de ações para ${consulta.nome}`"
              >
                <i class="pi pi-ellipsis-h text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"></i>
              </button>
              
              <!-- Dropdown Menu (com portal behavior) -->
              <Transition name="dropdown">
                <div 
                  v-if="menuAberto === consulta.id"
                  class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  :class="index >= consultas.length - 2 ? 'bottom-full mb-2' : 'top-full'"
                  style="z-index: 50;"
                  @click.stop
                >
                  <button
                    @click="alterarStatus(consulta.id, 'Confirmada')"
                    class="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <i class="fas fa-check-circle text-green-500"></i>
                    <span class="text-gray-900 dark:text-white">Confirmar</span>
                  </button>
                  <button
                    @click="alterarStatus(consulta.id, 'Aguardando')"
                    class="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <i class="fas fa-clock text-yellow-500"></i>
                    <span class="text-gray-900 dark:text-white">Marcar Aguardando</span>
                  </button>
                  <button
                    @click="alterarStatus(consulta.id, 'Cancelada')"
                    class="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <i class="fas fa-times-circle text-red-500"></i>
                    <span class="text-gray-900 dark:text-white">Cancelar</span>
                  </button>
                  <hr class="border-gray-200 dark:border-gray-700">
                  <button
                    @click="excluirConsulta(consulta.id)"
                    class="w-full px-4 py-3 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3"
                  >
                    <i class="fas fa-trash text-red-500"></i>
                    <span class="text-red-600 dark:text-red-400">Excluir</span>
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>


      <!-- Modais -->
      <NovoAgendamentoModal 
        :isOpen="showAgendamentoModal" 
        @close="showAgendamentoModal = false"
        @submit="handleNovoAgendamento"
      />

      <CadastrarPacienteModal 
        :isOpen="showPacienteModal" 
        @close="showPacienteModal = false"
        @submit="handleCadastrarPaciente"
      />
    </main>
  </div>
</template>

<script setup>import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'
import NovoAgendamentoModal from '@/components/modals/NovoAgendamentoModal.vue'
import CadastrarPacienteModal from '@/components/modals/CadastrarPacienteModal.vue'

const showAgendamentoModal = ref(false)
const showPacienteModal = ref(false)
const menuAberto = ref(null)

const consultas = ref([
  { id: 1, nome: 'Maria Souza', horario: '09:00', medico: 'Dr. Lima', status: 'Confirmada', foto: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, nome: 'João Pedro', horario: '09:30', medico: 'Dra. Carla', status: 'Aguardando', foto: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, nome: 'Fernanda Dias', horario: '10:00', medico: 'Dr. Lima', status: 'Cancelada', foto: 'https://i.pravatar.cc/150?img=3' },
])

const toggleMenu = (id) => {
  menuAberto.value = menuAberto.value === id ? null : id
}

const alterarStatus = (id, novoStatus) => {
  const consulta = consultas.value.find(c => c.id === id)
  if (consulta) {
    consulta.status = novoStatus
  }
  menuAberto.value = null
}

const excluirConsulta = (id) => {
  if (confirm('Deseja realmente excluir esta consulta?')) {
    consultas.value = consultas.value.filter(c => c.id !== id)
    menuAberto.value = null
  }
}

// Fechar menu ao clicar fora
const handleClickOutside = (e) => {
  if (!e.target.closest('button[aria-label^="Menu de ações"]') && 
      !e.target.closest('.absolute.right-0')) {
    menuAberto.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleNovoAgendamento = (data) => {
  const novaConsulta = {
    id: Date.now(),
    nome: data.paciente,
    horario: data.horario,
    medico: data.medico,
    status: 'Aguardando',
    foto: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70)
  }
  consultas.value.unshift(novaConsulta)
}

const handleCadastrarPaciente = (data) => {
  const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]')
  const novoPaciente = {
    id: Date.now(),
    ...data,
    criadoEm: new Date().toISOString()
  }
  pacientes.push(novoPaciente)
  localStorage.setItem('pacientes', JSON.stringify(pacientes))
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
