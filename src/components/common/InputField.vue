<template>
  <div class="space-y-2">
    <label 
      v-if="label" 
      :for="id" 
      class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <div class="relative">
      <div 
        v-if="icon" 
        class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
      >
        <i :class="[icon, 'text-gray-400']"></i>
      </div>
      <input
        :id="id"
        :type="computedType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="[
          'w-full rounded-xl bg-gray-50 dark:bg-gray-700/50 py-3.5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none text-sm border-2 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300',
          icon ? 'pl-12' : 'pl-4',
          type === 'password' ? 'pr-12' : 'pr-4'
        ]"
      />
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePassword"
        class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  icon: String,
  modelValue: [String, Number]
})

defineEmits(['update:modelValue'])

const showPassword = ref(false)

const computedType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>
