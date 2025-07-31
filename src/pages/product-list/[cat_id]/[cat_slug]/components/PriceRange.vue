<template>
  <div class=" mb-4">
    <div class="flex flex-col">
      <div class="w-full mx-auto">
        <label class="block text-sm font-medium text-gray-700 mb-7">
          Interval prix : <span class="font-semibold">{{ priceMin }} DT</span> - <span class="font-semibold">{{ priceMax }} DT</span>
        </label>

        <div class="relative w-10/12 mx-auto h-2 bg-gray-200 rounded-full mb-8 px-7" ref="container">
          <!-- Track Fill -->
          <div
            class="absolute top-0 h-full bg-blue-500 rounded-full"
            :style="{
              left: `${((priceMin - minPrice) / (maxPrice - minPrice)) * 100}%`,
              width: `${((priceMax - priceMin) / (maxPrice - minPrice)) * 100}%`
            }"
          ></div>

          <!-- Min Handle with Simple Tooltip -->
          <div
            class="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer shadow handle-container"
            :style="{ left: `calc(${((priceMin - minPrice) / (maxPrice - minPrice)) * 100}% - 0.625rem)` }"
            @mousedown.prevent="startDrag('min', $event)"
            @touchstart.prevent="startDrag('min', $event)"
          >
            <!-- Simple Min Value Below -->
            <div class="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs">
              {{ priceMin }}
            </div>
          </div>

          <!-- Max Handle with Simple Tooltip -->
          <div
            class="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer shadow handle-container"
            :style="{ left: `calc(${((priceMax - minPrice) / (maxPrice - minPrice)) * 100}% - 0.625rem)` }"
            @mousedown.prevent="startDrag('max', $event)"
            @touchstart.prevent="startDrag('max', $event)"
          >
            <!-- Simple Max Value Below -->
            <div class="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs">
              {{ priceMax }}
            </div>
          </div>
        </div>
      </div>
      
      <button
        @click="applyFilter"
        type="button"
        class="w-full py-2 mt-3 rounded transition-all duration-200"
        :class="buttonEnabled ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' : 'bg-gray-300 text-gray-500 !cursor-not-allowed opacity-60'"
        :disabled="!buttonEnabled"
      >
        Appliquer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';

const props = defineProps({
  priceRange: {
    type: Array,
    required: true
  },
  minPrice: {
    type: Number,
    default: 0
  },
  maxPrice: {
    type: Number,
    default: 1000
  }
});

const emit = defineEmits(['update:priceRange', 'apply']);

const priceMin = ref(props.priceRange[0]);
const priceMax = ref(props.priceRange[1]);
const originalMin = ref(props.priceRange[0]);
const originalMax = ref(props.priceRange[1]);
const dragging = ref(false);
const container = ref(null);

// This flag prevents the sync loop
let internalUpdate = false;

// Only update original values if the parent resets the range
watch(() => props.priceRange, (newValue) => {
  if (!internalUpdate) {
    priceMin.value = newValue[0];
    priceMax.value = newValue[1];
    originalMin.value = newValue[0];
    originalMax.value = newValue[1];
  }
  internalUpdate = false;
}, { deep: true });

const buttonEnabled = computed(() => {
  return priceMin.value !== originalMin.value || priceMax.value !== originalMax.value;
});

const emitUpdate = () => {
  internalUpdate = true;
  emit('update:priceRange', [priceMin.value, priceMax.value]);
};

const applyFilter = () => {
  if (buttonEnabled.value) {
    emitUpdate();
    emit('apply');
    originalMin.value = priceMin.value;
    originalMax.value = priceMax.value;
  }
};

const startDrag = (type, event) => {
  dragging.value = true;
  const moveHandler = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const rect = container.value.getBoundingClientRect();
    const offsetX = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = offsetX / rect.width;
    const newValue = Math.round(percent * (props.maxPrice - props.minPrice) + props.minPrice);
    if (type === 'min') {
      priceMin.value = Math.min(Math.max(newValue, props.minPrice), priceMax.value - 1);
    } else if (type === 'max') {
      priceMax.value = Math.max(Math.min(newValue, props.maxPrice), priceMin.value + 1);
    }
    emitUpdate();
  };
  const endHandler = () => {
    window.removeEventListener('mousemove', moveHandler);
    window.removeEventListener('mouseup', endHandler);
    window.removeEventListener('touchmove', moveHandler);
    window.removeEventListener('touchend', endHandler);
    dragging.value = false;
  };
  window.addEventListener('mousemove', moveHandler);
  window.addEventListener('mouseup', endHandler);
  window.addEventListener('touchmove', moveHandler);
  window.addEventListener('touchend', endHandler);
};

onBeforeUnmount(() => {
  if (dragging.value) {
    window.removeEventListener('mousemove', null);
    window.removeEventListener('mouseup', null);
    window.removeEventListener('touchmove', null);
    window.removeEventListener('touchend', null);
  }
});
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

/* Make sure the handles are above the track */
.handle-container {
  z-index: 10;
}
</style>
