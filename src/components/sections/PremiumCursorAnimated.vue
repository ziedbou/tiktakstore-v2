<template>
  <div
    :style="{
      '--title-align': titleAlign,
      '--text-align': textAlign,
      '--text-margin-left': textMarginLeft,
      '--text-margin-right': textMarginRight,
      '--color-left': data.values.color_left,
      '--color-right': data.values.color_right,
      '--text-max-width': data.values.text_max_width + 'px'
    }"
  >
    <h1 class="animated-title">
      {{ data.values.text_befor }} <span ref="animatedTextRef" class="animated-text"></span> {{ data.values.text_after }}
    </h1>
    <p v-if="data.values.text" class="text">{{ data.values.text }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Typography alignment computed properties
const titleAlign = computed(() => {
  if (props.data.values.title_horizontal_align === 'flex-start') return 'left';
  if (props.data.values.title_horizontal_align === 'center') return 'center';
  return 'right';
});

const textAlign = computed(() => {
  if (props.data.values.text_horizontal_align === 'flex-start') return 'left';
  if (props.data.values.text_horizontal_align === 'center') return 'center';
  return 'right';
});

const textMarginLeft = computed(() => {
  return props.data.values.text_horizontal_align === 'flex-start' ? '0' : 'auto';
});

const textMarginRight = computed(() => {
  return props.data.values.text_horizontal_align === 'flex-end' ? '0' : 'auto';
});

// Animation logic
const animatedTextRef = ref(null);
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1000;

function typeText() {
  if (!animatedTextRef.value) return;
  
  const words = props.data.values.children.map(child => child.animated_text);
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    animatedTextRef.value.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    animatedTextRef.value.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeText, pauseTime);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
  }
}

onMounted(() => {
  typeText();
});
</script>

<style scoped>
.animated-title {
  font-size: 50px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 20px;
  text-align: var(--title-align);
}

.animated-text {
  color: var(--color-left);
  border-right: 2px solid #9b9b9b;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-color: transparent;
  background-image: linear-gradient(-45deg, var(--color-left), var(--color-right) 80%);
  padding-right: 5px;
  animation: blink 0.7s infinite;
  margin: 0 8px;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.text {
  font-size: 1.2em;
  line-height: 1.6;
  margin: 0 auto;
  max-width: var(--text-max-width);
  text-align: var(--text-align);
  margin-left: var(--text-margin-left);
  margin-right: var(--text-margin-right);
}
</style>


