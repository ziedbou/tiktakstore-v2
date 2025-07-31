<template>
  <div :id="`accordion-collapse-${uniqueId}`" data-accordion="collapse" class="my-4">
    <div v-for="(item, index) in extra.content" :key="index">
      <h2 :id="`accordion-collapse-heading-${index}-${uniqueId}`">
        <button
          type="button"
          class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
          :class="{
            'rounded-t-xl border-b-0': index === 0,
            'border-b-0': index !== extra.content.length - 1,
          }"
          :data-accordion-target="`#accordion-collapse-body-${index}-${uniqueId}`"
          :aria-expanded="isOpen[index] ? 'true' : 'false'"
          :aria-controls="`accordion-collapse-body-${index}-${uniqueId}`"
          @click="toggleAccordion(index)"
        >
          <span class="flex items-center alig gap-2">
            <!-- <i :class="`fa ${item.icon} mr-2`"></i> -->
            <Snowflake size="15"/>

            {{ item.title }}
          </span>
          <svg
            data-accordion-icon
            class="w-3 h-3 shrink-0 transition-transform"
            :class="{ 'rotate-180': isOpen[index] }"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        :id="`accordion-collapse-body-${index}-${uniqueId}`"
        class="border border-gray-200 overflow-hidden transition-max-height duration-700 ease-in-out"
        :class="{ 'border-t-0': index === extra.content.length - 1 }"
        :style="{ maxHeight: isOpen[index] ? '1000px' : '0' }"
        role="region"
        :aria-labelledby="`accordion-collapse-heading-${index}-${uniqueId}`"
      >
        <div class="p-5">
          <div :ref="el => setDescriptionRef(el, index)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Snowflake } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';

const props = defineProps({
  extra: {
    type: Object,
    required: true,
  },
});

const uniqueId = Math.random().toString(36).substr(2, 9);
const isOpen = ref({});
const descriptionRefs = ref({});

const toggleAccordion = (index) => {
  isOpen.value[index] = !isOpen.value[index];
};

// Set ref for each description container and attach Shadow DOM
const setDescriptionRef = (el, index) => {
  if (el) {
    descriptionRefs.value[index] = el;
  }
};

onMounted(() => {
  Object.keys(descriptionRefs.value).forEach((index) => {
    const el = descriptionRefs.value[index];
    const item = props.extra.content[index];
    if (el && item?.description) {
      const shadowContainer = document.createElement('div');
      el.innerHTML = '';
      el.appendChild(shadowContainer);

      const shadow = shadowContainer.attachShadow({ mode: 'open' });

      shadow.innerHTML = `
        <style>
          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
            .MsoNormal {
            margin-left: 10px !important;
            }
            .MsoNormal:first-child {
                br {
                display: none}
            }
        
        </style>
        <div class="description-container">
          ${item.description}
        </div>
      `;
    }
  });
});
</script>