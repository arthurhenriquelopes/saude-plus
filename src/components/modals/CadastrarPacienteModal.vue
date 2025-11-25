<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="close">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="close"></div>
        
        <!-- Modal -->
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full p-8 transform transition-all">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              <i class="fas fa-user-plus text-indigo-600 mr-3"></i>
              Cadastrar Paciente
            </h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Nome Completo -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Nome Completo
                </label>
                <input
                  v-model="form.nome"
                  type="text"
                  placeholder="Nome completo do paciente"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <!-- CPF -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  CPF
                </label>
                <input
                  v-model="form.cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <!-- Data de Nascimento -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Data de Nascimento
                </label>
                <input
                  v-model="form.dataNascimento"
                  type="date"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  E-mail
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="email@exemplo.com"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <!-- Telefone -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Telefone
                </label>
                <input
                  v-model="form.telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <!-- Endereço -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Endereço
                </label>
                <input
                  v-model="form.endereco"
                  type="text"
                  placeholder="Rua, número, bairro"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              
              <!-- Plano de Saúde -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Plano de Saúde
                </label>
                <select
                  v-model="form.planoSaude"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="">Particular</option>
                  <option value="Unimed">Unimed</option>
                  <option value="Bradesco Saúde">Bradesco Saúde</option>
                  <option value="SulAmérica">SulAmérica</option>
                  <option value="Amil">Amil</option>
                </select>
              </div>
              
              <!-- Tipo Sanguíneo -->
              <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Tipo Sanguíneo
                </label>
                <select
                  v-model="form.tipoSanguineo"
                  class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="">Não informado</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
            
            <!-- Observações Médicas -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Observações Médicas
              </label>
              <textarea
                v-model="form.observacoes"
                rows="3"
                placeholder="Alergias, condições pré-existentes, medicamentos..."
                class="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              ></textarea>
            </div>
            
            <!-- Buttons -->
            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
              >
                <i class="fas fa-save mr-2"></i>
                Cadastrar Paciente
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
  nome: '',
  cpf: '',
  dataNascimento: '',
  email: '',
  telefone: '',
  endereco: '',
  planoSaude: '',
  tipoSanguineo: '',
  observacoes: ''
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form.value })
  // Limpar form
  form.value = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    endereco: '',
    planoSaude: '',
    tipoSanguineo: '',
    observacoes: ''
  }
  close()
}

// Resetar form quando fechar
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    form.value = {
      nome: '',
      cpf: '',
      dataNascimento: '',
      email: '',
      telefone: '',
      endereco: '',
      planoSaude: '',
      tipoSanguineo: '',
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
