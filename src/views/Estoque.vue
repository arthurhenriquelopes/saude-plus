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
        <a class="flex items-center gap-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-gray-900 dark:text-white text-sm font-normal">
          <i class="fas fa-clipboard-list text-base"></i> Estoque
        </a>
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
        <span>Estoque</span>
      </nav>

      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Gestão de Estoque</h2>

      <button 
        @click="showModal = true"
        class="mb-6 bg-indigo-600 text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-indigo-700 transition-colors"
      >
        <i class="fas fa-plus mr-2"></i>
        Adicionar Produto
      </button>

      <!-- Gráfico de Estoque -->
      <section class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Estoque por Categoria</h3>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div class="flex items-end justify-center gap-4 h-64">
            <div 
              v-for="item in produtosOrdenados" 
              :key="item.codItem"
              class="flex flex-col items-center gap-2 group"
            >
              <div class="relative">
                <div 
                  class="w-12 bg-indigo-600 dark:bg-indigo-500 rounded-t-lg transition-all duration-300 hover:bg-indigo-700 dark:hover:bg-indigo-600 cursor-pointer"
                  :style="{ height: calcularAlturaBarra(item.quantidade) + 'px' }"
                  :title="`${item.nome}: ${item.quantidade} unidades`"
                >
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {{ item.quantidade }}
                  </div>
                </div>
              </div>
              <span class="text-xs text-gray-700 dark:text-gray-300 text-center max-w-[60px] truncate">
                {{ item.nome }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Listagem de Produtos -->
      <section>
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Produtos em Estoque</h3>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div 
            v-for="(produto, index) in produtos" 
            :key="produto.codItem"
            class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
          >
            <div class="flex flex-col min-w-0 flex-1">
              <span class="font-medium text-gray-900 dark:text-white">{{ produto.nome }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">CódItem: {{ produto.codItem }}</span>
            </div>
            <span class="text-sm text-gray-700 dark:text-gray-300 min-w-[100px] text-center">
              <span class="font-semibold">{{ estoques[index] }}</span> unidades
            </span>
            <span :class="[
              'text-sm px-3 py-1 rounded-full font-medium',
              getStatusClass(estoques[index])
            ]">
              {{ getStatusText(estoques[index]) }}
            </span>
          </div>
        </div>
      </section>
    </main>
  </div>

  <!-- Modal Adicionar Produto -->
  <AdicionarProdutoModal 
    :isOpen="showModal"
    :produtos="produtos"
    @close="showModal = false"
    @submit="adicionarProduto"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'
import AdicionarProdutoModal from '@/components/modals/AdicionarProdutoModal.vue'

const showModal = ref(false)

const produtos = ref([
  { nome: "Luvas", codItem: 501 },
  { nome: "Álcool", codItem: 502 },
  { nome: "Máscaras", codItem: 503 },
  { nome: "Seringa", codItem: 504 },
  { nome: "Gaze", codItem: 505 },
  { nome: "Algodão", codItem: 506 },
  { nome: "Soro", codItem: 507 },
  { nome: "Fita", codItem: 523 },
  { nome: "Esparadrapo", codItem: 509 },
  { nome: "Termômetro", codItem: 510 }
])

const estoques = ref([350, 120, 80, 110, 90, 60, 70, 40, 30, 50])

const produtosOrdenados = computed(() => {
  return produtos.value
    .map((produto, index) => ({
      ...produto,
      quantidade: estoques.value[index]
    }))
    .sort((a, b) => b.quantidade - a.quantidade)
})

const calcularAlturaBarra = (quantidade) => {
  const maxEstoque = Math.max(...estoques.value, 1)
  return (quantidade / maxEstoque) * 200
}

const getStatusClass = (quantidade) => {
  if (quantidade >= 100) {
    return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  } else if (quantidade >= 50) {
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
  } else {
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }
}

const getStatusText = (quantidade) => {
  if (quantidade >= 100) return 'Normal'
  else if (quantidade >= 50) return 'Baixo'
  else return 'Crítico'
}

const adicionarProduto = (data) => {
  const { produtoIndex, quantidade } = data
  estoques.value[produtoIndex] += quantidade
  
  localStorage.setItem('estoques', JSON.stringify(estoques.value))
  
  alert(`Produto adicionado com sucesso!\n${produtos.value[produtoIndex].nome}: +${quantidade} unidades`)
}

onMounted(() => {
  // Carregar estoques salvos
  const savedEstoques = localStorage.getItem('estoques')
  if (savedEstoques) {
    estoques.value = JSON.parse(savedEstoques)
  }
})
</script>