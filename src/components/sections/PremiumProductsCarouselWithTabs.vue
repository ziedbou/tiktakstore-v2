<template>
    <div class="section-tabs">
      <h1 class="title_huqlamth">{{ data.values.section_title }}</h1>
      
      <!-- Tabs Navigation -->
      <div class="tabs_huqlamth" role="tablist">
        <button 
          v-for="(child, index) in data.values.children" 
          :key="index"
          class="tab_huqlamth"
          :class="{ active: activeTab === index }"
          @click="setActiveTab(index)"
          role="tab">
          {{ child.tab_name }}
        </button>
      </div>
  
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <p>Loading products...</p>
      </div>
      <!-- Tab Panels -->
      <div v-else class="tab-panels_huqlamth">
        <div 
          v-for="(child, index) in data.values.children" 
          :key="index"
          class="tab-panel_huqlamth"
          :class="{ active: activeTab === index }">
          
          <!-- Products Grid -->
          <div class="products-grid">
            <div 
              v-for="product in getTabProducts(index)" 
              :key="product.id"
              class="product-item">
              <component
                :is="dynamicComponent"
                :product="product"
                :image_full="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useGetProducts } from '~/composables/useGetProducts';
  import { useCompanyData } from '@/composables/useCompanyData';
  const { companyId } = useCompanyData();
  
  const props = defineProps({
    index: [String, Number],
    data: Object,
  })
  
  // tabs
  const activeTab = ref(0)
  const dynamicComponent = shallowRef(null)
  
  const setActiveTab = (index) => {
    activeTab.value = index
  }
  
  const { data: sectionProducts, pending: isLoading, error: hasError } = useGetProducts({
    type: 'multiple',
    companyId: companyId.value,
    productList: (props.data.values.children || []).map(child => child.products_list || child),
    cacheKey: `PremiumProductsCarouselWithTabs-${props.index || 'default'}`
  })
  
  // Helper function to get products for a tab
  const getTabProducts = (index) => {
    return sectionProducts.value?.[index] || []
  }
  
  // Load component dynamically
  const loadComponent = async (componentName = "ProductCard_1") => {
    try {
      const module = await import(
        `@/components/product-cards/${componentName}.vue`
      );
      dynamicComponent.value = module.default;
    } catch (error) {
      console.error(`Failed to load component: ${componentName}`, error);
    }
  };
  
  onMounted(() => {
    loadComponent(props.data.values.card_type || "ProductCard_1");
  });
  </script>
  
  <style scoped>
  .title_huqlamth {
    text-align: center;
    font-size: 3.5rem;
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
  
  /* Products Grid */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }
  
  .product-item {
    display: flex;
    flex-direction: column;
  }
  
  /* Loading and Error States */
  .loading-state,
  .error-state {
    text-align: center;
    padding: 40px 20px;
    font-size: 18px;
  }
  
  .loading-state p {
    color: #666;
  }
  
  .error-state p {
    color: #e74c3c;
  }
  
  /* Small screen adjustments */
  @media (max-width: 549px) {
    .tabs_huqlamth {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
  }
  </style>
  