<template>
  <div class="flex-1 mx-4 overflow-hidden min-w-0">
    <div class="marquee" :class="{ 'marquee-standalone': isStandalone }">
      <div class="marquee-content">
        <template v-for="(text, index) in texts" :key="`${index}-1`">
          <span class="font-bold">{{ text }}</span>
          <Zap class="flash-separator" />
        </template>
        <template v-for="(text, index) in texts" :key="`${index}-2`">
          <span class="font-bold">{{ text }}</span>
          <Zap class="flash-separator" />
        </template>
        <template v-for="(text, index) in texts" :key="`${index}-3`">
          <span class="font-bold">{{ text }}</span>
          <Zap class="flash-separator" />
        </template>
        <template v-for="(text, index) in texts" :key="`${index}-4`">
          <span class="font-bold">{{ text }}</span>
          <Zap class="flash-separator" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Zap } from 'lucide-vue-next';

const props = defineProps({
  texts: {
    type: Array,
    default: () => []
  },
  isStandalone: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
/* Marquee Styles */
.marquee {
  overflow: hidden;
  white-space: nowrap;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marquee-content {
  display: flex;
  white-space: nowrap;
  animation: marquee 8s linear infinite;
  align-items: center;
  height: 100%;
}

  .marquee-content span {
    color: var(--header-top-color, #444444);
    font-size: 0.75rem;
    font-weight: 500;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .flash-separator {
    width: 14px;
    height: 14px;
    color: var(--header-top-color, #7b7b7b);
    margin: 0 1rem;
    flex-shrink: 0;
    opacity: 0.9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

/* Standalone marquee styling - larger text when it's the only element */
.marquee-standalone {
  height: 28px;
}

.marquee-standalone .marquee-content span {
  font-size: 0.875rem;
  font-weight: 500;
}

.marquee-standalone .flash-separator {
  width: 16px;
  height: 16px;
  margin: 0 1.25rem;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-25%); }
}

.marquee:hover .marquee-content {
  animation-play-state: paused;
}
</style>
