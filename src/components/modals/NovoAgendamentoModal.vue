<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="close">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="close"></div>
        
        <!-- Modal -->
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 transform transition-all">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-calendar-plus text-indigo-600 mr-3"></i>
              Novo Agendamento
            </h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Paciente -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Paciente
                </label>
                <input
                  v-model="form.paciente"
                  type="text"
                  placeholder="Nome do paciente"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <!-- Médico -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Médico
                </label>
                <select
                  v-model="form.medico"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                >
                  <option value="">Selecione o médico</option>
                  <option value="Dr. Lima">Dr. Lima</option>
                  <option value="Dra. Carla">Dra. Carla</option>
                  <option value="Dr. Roberto">Dr. Roberto</option>
                  <option value="Dra. Ana">Dra. Ana</option>
                </select>
              </div>
              
              <!-- Data -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Data
                </label>
                <input
                  v-model="form.data"
                  type="date"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <!-- Horário -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Horário
                </label>
                <input
                  v-model="form.horario"
                  type="time"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>
            
            <!-- Observações -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Observações
              </label>
              <textarea
                v-model="form.observacoes"
                rows="3"
                placeholder="Informações adicionais sobre a consulta..."
                class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              ></textarea>
            </div>
            
            <!-- Buttons -->
            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
              >
                <i class="fas fa-check mr-2"></i>
                Agendar Consulta
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
  isOpen: Boolean
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  paciente: '',
  medico: '',
  data: '',
  horario: '',
  observacoes: ''
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form.value })
  // Limpar form
  form.value = {
    paciente: '',
    medico: '',
    data: '',
    horario: '',
    observacoes: ''
  }
  close()
}

// Resetar form quando fechar
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    form.value = {
      paciente: '',
      medico: '',
      data: '',
      horario: '',
      observacoes: ''
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
