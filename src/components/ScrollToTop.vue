<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-if="visible"
      @click="scrollToTop"
      :class="[
        'fixed z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 transform hover:scale-110',
        buttonClasses
      ]"
      :style="{ 
        backgroundColor: bgColor,
        color: textColor,
        height: size,
        width: size,
        bottom: bottom,
        right: right
      }"
      aria-label="Scroll to top"
    >
      <slot>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M5 15l7-7 7 7" 
          />
        </svg>
      </slot>
    </button>

  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  offset: {
    type: [Number, String],
    default: 300
  },
  bottom: {
    type: String,
    default: '6'
  },
  right: {
    type: String,
    default: '6'
  },
  size: {
    type: String,
    default: '50px'
  },
  bgColor: {
    type: String,
    default: 'var(--primary-color, #3b82f6)'
  },
  textColor: {
    type: String,
    default: 'var(--body-bg, #ffffff)'
  },
  buttonClasses: {
    type: String,
    default: ''
  }
});

const visible = ref(false);

const handleScroll = () => {
  const shouldBeVisible = window.scrollY > (typeof props.offset === 'string' ? parseInt(props.offset) : props.offset);
  visible.value = shouldBeVisible;
};

const scrollToTop = () => {
  // Apply smooth scroll behavior
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
