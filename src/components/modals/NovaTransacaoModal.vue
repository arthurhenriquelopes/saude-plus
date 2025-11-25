<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="close">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="close"></div>
        
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-dollar-sign text-indigo-600 mr-3"></i>
              Nova Transação
            </h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Tipo</label>
              <select
                v-model="form.tipo"
                class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white"
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Descrição</label>
              <input
                v-model="form.descricao"
                type="text"
                placeholder="Ex: Consulta, Aluguel, etc"
                class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Categoria</label>
              <input
                v-model="form.categoria"
                type="text"
                placeholder="Ex: Consultas, Estoque, Fixas"
                class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Valor (R$)</label>
              <input
                v-model.number="form.valor"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3"
              >
                <i class="fas fa-save mr-2"></i>
                Salvar
              </button>
              <button
                type="button"
                @click="close"
                class="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl"
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
  isOpen: Boolean
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  tipo: '',
  descricao: '',
  categoria: '',
  valor: 0
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form.value })
  form.value = { tipo: '', descricao: '', categoria: '', valor: 0 }
  close()
}

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    form.value = { tipo: '', descricao: '', categoria: '', valor: 0 }
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
</style>
