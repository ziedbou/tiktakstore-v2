<template>
  <div class="section-{{ key }}">
    <p class="title_huqlamth">{{ data.values.section_title }}</p>
    <div class="tabs_huqlamth" role="tablist">
      <button 
        v-for="(child, index) in data.values.children" 
        :key="index"
        class="tab_huqlamth"
        :class="{ active: activeTab === index }"
        @click="setActiveTab(index)"
        :data-tab="`tab_${index}${key}`"
        :data-button-index="key"
        role="tab">
        {{ child.tab_name }}
      </button>
    </div>

    <div class="tab-panels_huqlamth">
      <div 
        v-for="(child, index) in data.values.section_title" 
        :key="index"
        class="tab-panel_huqlamth"
        :class="{ active: activeTab === index }"
        :data-panel-index="key"
        :data-panel="`tab_${index}${key}`">
        {{ index }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { register } from 'swiper/element/bundle';
import { fetchSectionProducts } from '~/composables/services/productService'
import { getProductLink, getPrice, imghttps } from '~/composables/services/helpers'
import 'swiper/css';
import 'swiper/css/scrollbar';

const props = defineProps({
  key: [String, Number],
  data: Object,
  company: Object,
})

// tabs
const activeTab = ref(0)

const setActiveTab = (index) => {
  activeTab.value = index

}



</script>

<style scoped>
.title_huqlamth {
  text-align: center;
  font-size: 3.5rem;
  line-height: normal;
}


@media (max-width: 549px) {
  .title_huqlamth {
    font-size: 2.5rem;
  }
}

.tabs_huqlamth {
  width: fit-content;
  margin: 15px auto 35px;
  border-bottom: 1px solid #ccc;
  display: flex;
  gap: 15px;
  justify-content: center;
}

.tab_huqlamth {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 19px;
  transition: all 0.2s;
}

.tab_huqlamth:hover {
  background-color: #f5f5f5;
}

.tab_huqlamth.active {
  color: #000;
  background-color: transparent;
  font-weight: 500;
  border-bottom: 1px solid #000;
}

.tab-panels_huqlamth {
  position: relative;
  min-height: 300px;
}

.tab-panel_huqlamth {
  display: none;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transform: translateX(20px);
  transition: all 0.3s ease;
}

.tab-panel_huqlamth.active {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(40px);
  }
}

/* Small screen adjustments */
@media (max-width: 549px) {
  .tabs_huqlamth {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
