<template>
  <div class="min-h-screen flex bg-white dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar>
      <template #navigation>
        <RouterLink to="/dashboard" class="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-gray-300 text-sm font-normal hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition">
          <i class="fas fa-th-large text-base"></i> Dashboard
        </RouterLink>
        <a class="flex items-center gap-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-gray-900 dark:text-white text-sm font-normal">
          <i class="fas fa-money-bill-wave text-base"></i> Financeiro
        </a>
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
      <nav class="text-sm mb-4 text-gray-600 dark:text-gray-400 font-normal">
        <RouterLink to="/dashboard" class="hover:underline">Dashboard</RouterLink>
        <span class="mx-2 select-none">›</span>
        <span>Financeiro</span>
      </nav>

      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Visão Geral Financeira</h2>

      <!-- Cards de Resumo -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-purple-50 dark:bg-gray-800 rounded-xl p-6">
          <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-3">
            <i class="fas fa-dollar-sign text-green-600 dark:text-green-400"></i>
          </div>
          <p class="text-sm mb-1 font-semibold text-gray-900 dark:text-white">Receitas</p>
          <p class="font-bold text-2xl mb-1 text-gray-900 dark:text-white">{{ formatarMoeda(receitas) }}</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Total de receitas</p>
        </div>

        <div class="bg-purple-50 dark:bg-gray-800 rounded-xl p-6">
          <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-3">
            <i class="fas fa-credit-card text-red-600 dark:text-red-400"></i>
          </div>
          <p class="text-sm mb-1 font-semibold text-gray-900 dark:text-white">Despesas</p>
          <p class="font-bold text-2xl mb-1 text-gray-900 dark:text-white">{{ formatarMoeda(despesas) }}</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Total de despesas</p>
        </div>

        <div class="bg-purple-50 dark:bg-gray-800 rounded-xl p-6">
          <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-3">
            <i class="fas fa-wallet text-indigo-600 dark:text-indigo-400"></i>
          </div>
          <p class="text-sm mb-1 font-semibold text-gray-900 dark:text-white">Lucro Líquido</p>
          <p class="font-bold text-2xl mb-1 text-gray-900 dark:text-white">{{ formatarMoeda(lucro) }}</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Lucro após despesas</p>
        </div>
      </section>

      <!-- Gráfico de Barras -->
      <section class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Receitas vs Despesas</h3>
          <button
            @click="showModalTransacao = true"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <i class="fas fa-plus"></i>
            Nova Transação
          </button>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div class="flex items-end justify-center gap-8 h-64">
            <!-- Barra Receitas -->
            <div class="flex flex-col items-center gap-2 group">
              <div class="relative">
                <div 
                  class="w-24 bg-green-600 dark:bg-green-500 rounded-t-lg transition-all duration-300 cursor-pointer"
                  :style="{ height: calcularAlturaBarra(receitas) + 'px' }"
                >
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {{ formatarMoeda(receitas) }}
                  </div>
                </div>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Receitas</span>
            </div>

            <!-- Barra Despesas -->
            <div class="flex flex-col items-center gap-2 group">
              <div class="relative">
                <div 
                  class="w-24 bg-red-600 dark:bg-red-500 rounded-t-lg transition-all duration-300 cursor-pointer"
                  :style="{ height: calcularAlturaBarra(despesas) + 'px' }"
                >
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {{ formatarMoeda(despesas) }}
                  </div>
                </div>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Despesas</span>
            </div>

            <!-- Barra Lucro -->
            <div class="flex flex-col items-center gap-2 group">
              <div class="relative">
                <div 
                  class="w-24 bg-indigo-600 dark:bg-indigo-500 rounded-t-lg transition-all duration-300 cursor-pointer"
                  :style="{ height: calcularAlturaBarra(lucro) + 'px' }"
                >
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {{ formatarMoeda(lucro) }}
                  </div>
                </div>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Lucro</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Transações Recentes -->
      <section>
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Transações Recentes</h3>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div
            v-for="(transacao, index) in transacoes"
            :key="transacao.id"
            class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
          >
            <div :class="[
              'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
              transacao.tipo === 'receita' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
            ]">
              <i :class="[
                'fas',
                transacao.tipo === 'receita' ? 'fa-arrow-up text-green-600 dark:text-green-400' : 'fa-arrow-down text-red-600 dark:text-red-400'
              ]"></i>
            </div>

            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 dark:text-white">{{ transacao.descricao }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ transacao.categoria }}</p>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ transacao.data }}</span>
              <span :class="[
                'font-bold text-lg',
                transacao.tipo === 'receita' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              ]">
                {{ transacao.tipo === 'receita' ? '+' : '-' }} {{ formatarMoeda(transacao.valor) }}
              </span>
            </div>

            <div class="relative">
              <button
                @click.stop="toggleMenu(transacao.id)"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <i class="pi pi-ellipsis-h text-gray-400"></i>
              </button>

              <Transition name="dropdown">
                <div
                  v-if="menuAberto === transacao.id"
                  class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
                  :class="index >= transacoes.length - 2 ? 'bottom-full mb-2' : 'top-full'"
                  style="z-index: 50;"
                  @click.stop
                >
                  <button
                    @click="editarTransacao(transacao)"
                    class="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <i class="fas fa-edit text-blue-500"></i>
                    <span class="text-gray-900 dark:text-white">Editar</span>
                  </button>
                  <hr class="border-gray-200 dark:border-gray-700">
                  <button
                    @click="excluirTransacao(transacao.id)"
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
    </main>

    <!-- Modal Nova Transação -->
    <NovaTransacaoModal
      :isOpen="showModalTransacao"
      @close="showModalTransacao = false"
      @submit="adicionarTransacao"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'
import NovaTransacaoModal from '@/components/modals/NovaTransacaoModal.vue'

const showModalTransacao = ref(false)
const menuAberto = ref(null)

const transacoes = ref([
  { id: 1, tipo: 'receita', descricao: 'Consulta - Maria Souza', categoria: 'Consultas', valor: 150, data: '25/11/2025' },
  { id: 2, tipo: 'receita', descricao: 'Consulta - João Pedro', categoria: 'Consultas', valor: 200, data: '25/11/2025' },
  { id: 3, tipo: 'despesa', descricao: 'Compra de materiais', categoria: 'Estoque', valor: 500, data: '24/11/2025' },
  { id: 4, tipo: 'despesa', descricao: 'Aluguel', categoria: 'Fixas', valor: 3000, data: '20/11/2025' },
  { id: 5, tipo: 'receita', descricao: 'Exames', categoria: 'Procedimentos', valor: 350, data: '23/11/2025' },
])

const receitas = computed(() => {
  return transacoes.value
    .filter(t => t.tipo === 'receita')
    .reduce((sum, t) => sum + t.valor, 0)
})

const despesas = computed(() => {
  return transacoes.value
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + t.valor, 0)
})

const lucro = computed(() => receitas.value - despesas.value)

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}

const calcularAlturaBarra = (valor) => {
  const maxValor = Math.max(receitas.value, despesas.value, lucro.value, 1)
  return (valor / maxValor) * 200
}

const toggleMenu = (id) => {
  menuAberto.value = menuAberto.value === id ? null : id
}

const editarTransacao = (transacao) => {
  console.log('Editar:', transacao)
  menuAberto.value = null
}

const excluirTransacao = (id) => {
  if (confirm('Deseja realmente excluir esta transação?')) {
    transacoes.value = transacoes.value.filter(t => t.id !== id)
    localStorage.setItem('transacoes', JSON.stringify(transacoes.value))
    menuAberto.value = null
  }
}

const adicionarTransacao = (data) => {
  const novaTransacao = {
    id: Date.now(),
    ...data,
    data: new Date().toLocaleDateString('pt-BR')
  }
  transacoes.value.unshift(novaTransacao)
  localStorage.setItem('transacoes', JSON.stringify(transacoes.value))
}

const handleClickOutside = (e) => {
  if (!e.target.closest('button') && !e.target.closest('.absolute')) {
    menuAberto.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  const saved = localStorage.getItem('transacoes')
  if (saved) {
    transacoes.value = JSON.parse(saved)
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
