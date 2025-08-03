<template>
  <div 
    :class="{ 'no-padding': data.design?.container === 'container-fluid' }" 
    :style="{
      background: `linear-gradient(90deg, ${data.values.background_start}, ${data.values.background_end} 70%)`,
      overflow: 'hidden',
      '--color':data.values.color
    }"
  >
    <section class="marquee-with-text">

        <div class="scrolling_content flex">
          <div 
            v-for="_ in 6" 
            :key="i" 
            class="scroll marquee-text-function marquee-text-function--right-left"
          >
            <template v-for="(item, index) in data.values.children" :key="index">
              <div class="marquee_wrap">
                {{ item.text }}
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
              >
                <path 
                  fill="white"
                  fill-rule="evenodd" 
                  d="M5.711,0.441 L4.123,4.839 L8.869,4.310 L2.082,15.557 L4.212,7.168 L0.132,7.627 L1.906,0.441 L5.711,0.441 Z" 
                />
              </svg>
            </template>
          </div>
        </div>
      
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.marquee-with-text {
  position: relative;
  z-index: 1;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 0;
  margin-bottom: 0;
  color: white;
}

.marquee-text-function {
  font-size: 14px;
  transition: all 0.5s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 1.2;
  animation: 20s infinite linear;
  animation-name: right-left;
}

.marquee-with-text:hover .marquee-text-function {
  animation-play-state: paused !important;
}

.marquee_wrap {
  font-size: 16px;
  padding: 0 30px;
  margin: 0;
  position: relative;
  color:var(--color);
}

.marquee-text-function svg {
  fill: var(--color);
}

@keyframes right-left {
  0% {
    transform: translate(0);
  }
  to {
    transform: translate(-100%);
  }
}

@media screen and (max-width: 991px) {
  .scrolling_content .marquee_wrap {
    padding: 0 30px !important;
  }
}

@media screen and (max-width: 575px) {
  .scrolling_content .marquee_wrap {
    padding: 0 20px !important;
  }
}
</style>
