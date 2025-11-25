<template>
  <div class="min-h-screen flex bg-white dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar>
      <template #navigation>
        <RouterLink to="/dashboard" class="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-gray-300 text-sm font-normal hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition">
          <i class="fas fa-th-large text-base"></i> Dashboard
        </RouterLink>
        <RouterLink to="/financeiro" class="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-gray-300 text-sm font-normal hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition">
          <i class="fas fa-money-bill-wave text-base"></i> Financeiro
        </RouterLink>
        <RouterLink to="/estoque" class="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-gray-300 text-sm font-normal hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition">
          <i class="fas fa-clipboard-list text-base"></i> Estoque
        </RouterLink>
        <a class="flex items-center gap-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-gray-900 dark:text-white text-sm font-normal">
          <i class="fas fa-cogs text-base"></i> Administração
        </a>
      </template>
    </Sidebar>

    <!-- Main content -->
    <main class="flex-1 p-8 max-w-6xl mx-auto">
      <nav class="text-sm mb-4 text-gray-600 dark:text-gray-400 font-normal">
        <RouterLink to="/dashboard" class="hover:underline">Dashboard</RouterLink>
        <span class="mx-2 select-none">›</span>
        <span>Administração</span>
      </nav>

      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Administração do Sistema</h2>

      <!-- Tabs -->
      <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav class="flex gap-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="abaAtiva = tab.id"
            :class="[
              'pb-4 px-2 text-sm font-semibold border-b-2 transition-colors',
              abaAtiva === tab.id
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >
            <i :class="tab.icon + ' mr-2'"></i>
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Usuários -->
      <div v-if="abaAtiva === 'usuarios'">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Gestão de Usuários</h3>
          <button
            @click="showModalUsuario = true"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <i class="fas fa-user-plus"></i>
            Novo Usuário
          </button>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div
            v-for="(usuario, index) in usuarios"
            :key="usuario.id"
            class="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <img
              :src="usuario.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nome)}&background=6366f1&color=fff&size=40`"
              :alt="usuario.nome"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div class="flex-1">
              <p class="font-semibold text-gray-900 dark:text-white">{{ usuario.nome }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ usuario.email }}</p>
            </div>
            <div class="flex items-center gap-4 text-sm">
              <span class="capitalize text-gray-600 dark:text-gray-400">{{ usuario.cargo }}</span>
              <span class="text-gray-500 dark:text-gray-500 hidden sm:block">{{ usuario.hospital }}</span>
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                usuario.ativo ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
              ]">
                {{ usuario.ativo ? 'Ativo' : 'Inativo' }}
              </span>
            </div>
            <div class="relative">
              <button
                @click.stop="toggleMenuUsuario(usuario.id)"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <i class="pi pi-ellipsis-h text-gray-400"></i>
              </button>

              <Transition name="dropdown">
                <div
                  v-if="menuUsuarioAberto === usuario.id"
                  class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
                  :class="index >= usuarios.length - 2 ? 'bottom-full mb-2' : 'top-full'"
                  style="z-index: 50;"
                  @click.stop
                >
                  <button
                    @click="editarUsuario(usuario)"
                    class="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <i class="fas fa-edit text-blue-500"></i>
                    <span class="text-gray-900 dark:text-white">Editar</span>
                  </button>
                  <button
                    @click="toggleUsuarioStatus(usuario.id)"
                    class="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <i :class="usuario.ativo ? 'fas fa-ban text-yellow-500' : 'fas fa-check text-green-500'"></i>
                    <span class="text-gray-900 dark:text-white">{{ usuario.ativo ? 'Desativar' : 'Ativar' }}</span>
                  </button>
                  <hr class="border-gray-200 dark:border-gray-700">
                  <button
                    @click="excluirUsuario(usuario.id)"
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
      </div>

      <!-- Configurações -->
      <div v-if="abaAtiva === 'configuracoes'">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Configurações do Sistema</h3>
        
        <div class="space-y-6">
          <!-- Informações da Clínica -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fas fa-hospital text-indigo-600"></i>
              Informações da Clínica
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome da Clínica</label>
                <input
                  v-model="config.nomeClinica"
                  type="text"
                  class="w-full rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CNPJ</label>
                <input
                  v-model="config.cnpj"
                  type="text"
                  class="w-full rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Telefone</label>
                <input
                  v-model="config.telefone"
                  type="text"
                  class="w-full rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail</label>
                <input
                  v-model="config.email"
                  type="email"
                  class="w-full rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <!-- Preferências -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fas fa-sliders-h text-indigo-600"></i>
              Preferências
            </h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Notificações por E-mail</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Receber notificações de agendamentos</p>
                </div>
                <button
                  @click="config.notificacoesEmail = !config.notificacoesEmail"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    config.notificacoesEmail ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      config.notificacoesEmail ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Modo Manutenção</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Bloquear acesso ao sistema</p>
                </div>
                <button
                  @click="config.modoManutencao = !config.modoManutencao"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    config.modoManutencao ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-700'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      config.modoManutencao ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            @click="salvarConfiguracoes"
            class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            <i class="fas fa-save mr-2"></i>
            Salvar Configurações
          </button>
        </div>
      </div>

      <!-- Logs -->
      <div v-if="abaAtiva === 'logs'">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Histórico de Atividades</h3>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div
            v-for="log in logs"
            :key="log.id"
            class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <div class="flex items-start gap-4">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                log.tipo === 'sucesso' ? 'bg-green-100 dark:bg-green-900/30' :
                log.tipo === 'erro' ? 'bg-red-100 dark:bg-red-900/30' :
                'bg-blue-100 dark:bg-blue-900/30'
              ]">
                <i :class="[
                  'fas',
                  log.tipo === 'sucesso' ? 'fa-check text-green-600 dark:text-green-400' :
                  log.tipo === 'erro' ? 'fa-times text-red-600 dark:text-red-400' :
                  'fa-info text-blue-600 dark:text-blue-400'
                ]"></i>
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900 dark:text-white">{{ log.acao }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ log.usuario }} • {{ log.data }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Novo Usuário -->
    <AdicionarUsuarioModal
      :isOpen="showModalUsuario"
      @close="showModalUsuario = false"
      @submit="adicionarUsuario"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'
import AdicionarUsuarioModal from '@/components/modals/AdicionarUsuarioModal.vue'

const abaAtiva = ref('usuarios')
const showModalUsuario = ref(false)
const menuUsuarioAberto = ref(null)

const tabs = [
  { id: 'usuarios', label: 'Usuários', icon: 'fas fa-users' },
  { id: 'configuracoes', label: 'Configurações', icon: 'fas fa-cog' },
  { id: 'logs', label: 'Logs', icon: 'fas fa-history' }
]

const usuarios = ref([])

const config = ref({
  nomeClinica: 'Clínica Saúde++',
  cnpj: '00.000.000/0001-00',
  telefone: '(00) 0000-0000',
  email: 'contato@saudemais.com',
  notificacoesEmail: true,
  modoManutencao: false
})

const logs = ref([
  { id: 1, tipo: 'sucesso', acao: 'Novo usuário cadastrado', usuario: 'Admin', data: 'Há 2 horas' },
  { id: 2, tipo: 'info', acao: 'Configurações atualizadas', usuario: 'Admin', data: 'Há 5 horas' },
  { id: 3, tipo: 'erro', acao: 'Falha no backup automático', usuario: 'Sistema', data: 'Há 1 dia' },
])

const toggleMenuUsuario = (id) => {
  menuUsuarioAberto.value = menuUsuarioAberto.value === id ? null : id
}

const editarUsuario = (usuario) => {
  console.log('Editar:', usuario)
  menuUsuarioAberto.value = null
}

const toggleUsuarioStatus = (id) => {
  const usuario = usuarios.value.find(u => u.id === id)
  if (usuario) {
    usuario.ativo = !usuario.ativo
    localStorage.setItem('usuarios', JSON.stringify(usuarios.value))
  }
  menuUsuarioAberto.value = null
}

const excluirUsuario = (id) => {
  if (confirm('Deseja realmente excluir este usuário?')) {
    usuarios.value = usuarios.value.filter(u => u.id !== id)
    localStorage.setItem('usuarios', JSON.stringify(usuarios.value))
    menuUsuarioAberto.value = null
  }
}

const adicionarUsuario = (data) => {
  const novoUsuario = {
    id: Date.now(),
    ...data,
    ativo: true,
    criadoEm: new Date().toISOString()
  }
  usuarios.value.unshift(novoUsuario)
  
  const todosUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
  todosUsuarios.push(novoUsuario)
  localStorage.setItem('usuarios', JSON.stringify(todosUsuarios))
}

const salvarConfiguracoes = () => {
  localStorage.setItem('config', JSON.stringify(config.value))
  alert('Configurações salvas com sucesso!')
}

const handleClickOutside = (e) => {
  if (!e.target.closest('button') && !e.target.closest('.absolute')) {
    menuUsuarioAberto.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // Carregar usuários
  const savedUsers = localStorage.getItem('usuarios')
  if (savedUsers) {
    usuarios.value = JSON.parse(savedUsers).map(u => ({ ...u, ativo: u.ativo !== false }))
  }
  
  // Carregar config
  const savedConfig = localStorage.getItem('config')
  if (savedConfig) {
    config.value = { ...config.value, ...JSON.parse(savedConfig) }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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