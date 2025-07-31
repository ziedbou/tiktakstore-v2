<template>
  <div class="rounded-lg p-3 border-dashed border w-full bg-white border-indigo-200 shadow-sm my-6">
    <div class="flex items-center gap-2">
      <Clock class="text-indigo-600 h-4 w-4" />
      <span class="font-medium text-indigo-800">
        {{ extra?.text || 'Offre spéciale' }}
      </span>
      <div class="flex ml-2">
        <div class="px-2 rounded text-xs font-bold bg-indigo-100 text-indigo-800">
          {{ String(timeLeft.days).padStart(2, '0') }}j
        </div>
        <div class="px-2 rounded text-xs font-bold ml-1 bg-indigo-100 text-indigo-800">
          {{ String(timeLeft.hours).padStart(2, '0') }}h
        </div>
        <div class="px-2 rounded text-xs font-bold ml-1 bg-indigo-100 text-indigo-800">
          {{ String(timeLeft.minutes).padStart(2, '0') }}m
        </div>
        <div
          :class="[
            'px-2 rounded text-xs font-bold ml-1',
            isAlmostEnding
              ? 'bg-indigo-200 text-indigo-800 animate-pulse'
              : 'bg-indigo-100 text-indigo-800'
          ]"
        >
          {{ String(timeLeft.seconds).padStart(2, '0') }}s
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Clock } from 'lucide-vue-next';

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  extra: {
    type: Object,
    default: null,
  },
  onComplete: Function,
});

const timeLeft = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const isAlmostEnding = ref(false);
let timer = null;

// Compute endTime based on extra.timer
const endTime = computed(() => {
  const end = new Date();
  end.setHours(end.getHours() + (props.extra?.timer || 0));
  return end;
});

const calculateTimeLeft = () => {
  if (!endTime.value) {
    timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    clearInterval(timer);
    return;
  }

  const difference = endTime.value.getTime() - new Date().getTime();

  if (difference <= 0) {
    timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (props.onComplete) props.onComplete();
    clearInterval(timer);
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  isAlmostEnding.value = days === 0 && hours < 1;

  timeLeft.value = { days, hours, minutes, seconds };
};

onMounted(() => {
  calculateTimeLeft();
  timer = setInterval(calculateTimeLeft, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>