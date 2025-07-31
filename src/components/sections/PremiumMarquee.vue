<template>
  <div 
    class="premium-marquee-top-container no-padding" 
    :style="{
      '--background-2-start': data.values.background_2_start,
      '--background-2-end': data.values.background_2_end,
      '--background-1-start': data.values.background_1_start,
      '--background-1-end': data.values.background_1_end,
      '--text-color': data.values.text_color,
      '--text-size': `${data.values.text_size}px`,
      '--scroll-speed': `${data.values.scroll_speed}s`
    }"
  >
    <div class="premium-marquee-container">
      <div class="premium-marquee-track">
        <div v-for="i in 3" :key="i" class="premium-marquee">
          <div v-for="(child, index) in data.values.children" :key="index" class="premium-marquee-item-wrapper">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"></path>
            </svg>
            <div class="premium-marquee-item">
              <span>{{ child.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.premium-marquee-top-container {
  position: relative;
  background: var(--background-2-start);
  background: linear-gradient(90deg, var(--background-2-start) 0%, var(--background-2-end) 100%);
}

.premium-marquee-container {
  overflow: hidden;
  width: 100%;
  padding: 15px 0;
  background: var(--background-1-start);
  background: linear-gradient(90deg, var(--background-1-start) 0%, var(--background-1-end) 100%);
  transform: rotateZ(1.5deg);
}

.premium-marquee-track {
  display: flex;
  width: fit-content;
}

.premium-marquee {
  display: flex;
  gap: 30px;
  animation: premium-marquee-scroll var(--scroll-speed) linear infinite;
  white-space: nowrap;
  font-weight: 600;
  padding-left: 14px;
  align-items: center;
  color: var(--text-color);
}

.premium-marquee-item-wrapper {
  display: flex;
  align-items: center;
}

.premium-marquee-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  font-size: var(--text-size);
  font-weight: 900;
}

.premium-marquee-item svg {
  width: 16px;
  height: 16px;
}

@keyframes premium-marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>