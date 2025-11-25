<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="close">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="close"></div>
        
        <!-- Modal -->
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-box text-indigo-600 mr-3"></i>
              Adicionar Produto
            </h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- Produto -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Produto
              </label>
              <select
                v-model="form.produtoIndex"
                class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              >
                <option value="" disabled>Selecione um produto</option>
                <option v-for="(produto, index) in produtos" :key="produto.codItem" :value="index">
                  {{ produto.nome }} (CódItem: {{ produto.codItem }})
                </option>
              </select>
            </div>
            
            <!-- Quantidade -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Quantidade
              </label>
              <input
                v-model.number="form.quantidade"
                type="number"
                min="1"
                placeholder="Insira a quantidade"
                class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>
            
            <!-- Buttons -->
            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
              >
                <i class="fas fa-plus mr-2"></i>
                Adicionar
              </button>
              <button
                type="button"
                @click="close"
                class="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  produtos: Array
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  produtoIndex: '',
  quantidade: 1
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form.value })
  form.value = {
    produtoIndex: '',
    quantidade: 1
  }
  close()
}

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    form.value = {
      produtoIndex: '',
      quantidade: 1
    }
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
