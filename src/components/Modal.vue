<template>
  <Teleport to="body">
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="relative z-10" 
        aria-labelledby="modal-title" 
        role="dialog" 
        aria-modal="true"
        @click.self="onClose"
      >
        <div class="fixed inset-0 bg-gray-500/75 backdrop-blur-[2px] transition-opacity" aria-hidden="true"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0" @click.self="onClose">
            <Transition
              enter-active-class="ease-out duration-300"
              enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to-class="opacity-100 translate-y-0 sm:scale-100"
              leave-active-class="ease-in duration-200"
              leave-from-class="opacity-100 translate-y-0 sm:scale-100"
              leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div 
                v-if="isOpen" 
                class="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full"
                :class="sizeClass"
              >
                <!-- Close button -->
                <button 
                  @click="onClose" 
                  class="absolute top-3 right-3 z-20 p-1 rounded-full cursor-pointer hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <XMarkIcon class="h-6 w-6 text-gray-500" />
                </button>

                <!-- Modal header if title exists -->
                <div v-if="title" class="bg-white px-4 pb-0 pt-5 sm:p-6 sm:pb-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                    {{ title }}
                  </h3>
                </div>
                <!-- Modal content -->
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <slot></slot>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { computed, watch, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full'].includes(value)
  }
});

const emit = defineEmits(['close']);

const onClose = () => {
  emit('close');
};

const sizeClass = computed(() => {
  const sizes = {
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
    '5xl': 'sm:max-w-5xl',
    '6xl': 'sm:max-w-6xl',
    full: 'sm:max-w-full sm:mx-4'
  };
  return sizes[props.size] || 'sm:max-w-lg';
});

// Handle body scrolling when modal opens/closes
watch(() => props.isOpen, (isOpen) => {
  if (typeof document !== 'undefined' && document.body) {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}, { immediate: true });

// Ensure scrolling is re-enabled when component is unmounted
onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>
  