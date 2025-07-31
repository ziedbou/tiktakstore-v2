<template>
  <div>
    <component
      v-for="(item, index) in componentsList"
      :key="index"
      :is="item.component"
      v-bind="item.props"
      :class="{ 'zoom-in': item.isNew, 'preview-section': isIframed }"
    />
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useIframeListener } from '~/composables/useIframeListener'; 
import { useIframeStore } from '~/composables/iframeStore';
import { sectionsMapping } from '~/composables/sections';
import { componentMap } from '@/utils/componentMap'; 

export default {
  name: 'HomePage',
  
  setup() {
    const componentsList = ref([]);
    const iframeStore = useIframeStore();
    const isIframed = ref(false);

    const data = ref({});
  console.log('helloo')

    // Fonction pour charger un composant dynamiquement depuis componentMap
    const loadComponent = async (componentName, props = {}, isNew = false) => {
      try {
        const componentLoader = componentMap[componentName] || componentMap[sectionsMapping[_data.data.slug]] || componentMap["EmptySection"];
        const componentModule = await componentLoader();
        const component = componentModule.default;

        componentsList.value.push({
          component,
          props,
          isNew,
        });

        if (isNew) {
          setTimeout(() => {
            const newComponent = componentsList.value.find((item) => item.isNew);
            if (newComponent) {
              newComponent.isNew = false;
            }
          }, 500);

          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight - 1500, behavior: 'smooth' });
          }, 0);
        }

      } catch (error) {
        console.error(`Erreur lors du chargement du composant ${componentName}:`, error);
      }
    };


    // Listener Iframe
    const { listenForMessages } = useIframeListener(async (_data) => {
      console.log(_data)
      if (_data.event_type === 'add-section') {
        const componentName = _data.data.slug_nuxt || sectionsMapping[_data.data.slug]  || "EmptySection"; 
        const section_data = _data.data;
        await loadComponent(componentName, { data: section_data }, true);
      }

      if (_data.event_type === "init-iframe") {
        isIframed.value = true;
      }

      iframeStore.setReceivedData(_data);
    });

    onMounted(async () => {
      listenForMessages();
      await loadInitialComponents();
    });

    return {
      componentsList,
      isIframed,
    };
  },
};
</script>


<style scoped>
/* Animation zoomIn */
.zoom-in {
  animation: zoomIn 0.3s;
}

@keyframes zoomIn {
  from {
    transform: scale(0.1);
    transform-origin: 50% 50%;
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.preview-section {
  position: relative;
  transition: all 5.5s ease;
}

.preview-section:hover::after {
  content: "";
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  border-color: #0d6efd !important;
  border: 1px solid;
}

.preview-section.selected {
  border-color: #0d6efd !important;
  box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.2);
}
</style>