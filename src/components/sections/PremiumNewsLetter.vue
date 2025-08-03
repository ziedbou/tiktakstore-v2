<template>
  <div
    :class="[{'no-padding': data.design.container === 'container-fluid'},'w-full premium-newsletter']"
    :style="{
      '--btn-color': data.values.btn_color,
      '--btn-background': data.values.btn_background,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-background-hover': data.values.btn_background_hover,
      '--link-color': data.values.link_color,
      '--link-color-hover': data.values.link_color_hover,
      '--input-border-color': data.values.email_input_border_color,
      '--input-border-color-focus': data.values.btn_background,
    }">
    <!-- Main Newsletter Section -->
    <div 
     :class="[{'border-x-0': data.design.container === 'container-fluid'}]"
    class="min-h-[360px] border border-gray-200 w-full bg-gray-300 bg-cover bg-center bg-no-repeat flex items-center justify-between px-4 py-10 mb-4"
      :style="{backgroundImage: `url(${imghttps(data.values.image_1.image)})`}">
      <div class="mx-auto">
        <div class="max-w-3xl mx-auto text-center">
          <h4 class="text-xl font-semibold mb-2" :style="{color: data.values.sub_title_color}">
            {{ data.values.sub_title_1 }}
          </h4>
          <h2 class="text-5xl font-bold mb-4" :style="{color: data.values.title_color}">
            {{ data.values.title_1 }}
          </h2>
          <p class="text-base mb-6 max-w-xl mx-auto" :style="{color: data.values.text_1_color}">
            {{ data.values.text_1 }}
          </p>
          <form @submit.prevent="submitNewsletter" class="flex justify-center">
            <div class="newsletter-input-group flex flex-col sm:flex-row w-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md rounded-[5px]">
              <input 
                v-model="email" 
                type="email" 
                name="email" 
                autocomplete="email" 
                :placeholder="data.values.email_placeholder"
                class="newsletter-input w-full py-2.5 px-4 border focus:outline-none bg-white transition-all duration-300"
                :style="{
                  color: data.values.email_input_color
                }"
              >
              <button 
                type="submit" 
                class="newsletter-btn w-full sm:w-auto cursor-pointer font-medium uppercase py-2.5 px-8 transition duration-300"
              >
                {{ data.values.btn_text_1 }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Bottom Banner Section -->
    <div class="mx-auto mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Left Banner -->
        <div
        :class="[{'border-l-0': data.design.container === 'container-fluid'}]"
        class="bg-gray-300 bg-cover bg-center bg-no-repeat border border-gray-200 min-h-[230px] flex items-center justify-end"
          :style="{backgroundImage: `url(${imghttps(data.values.image_2.image)})`}">
          <div class="w-full md:w-1/2 p-4 mx-3 md:py-0 md:mx-0 md:px-8 bg-white/70 md:bg-transparent">
            <p class="text-sm font-normal mb-1" :style="{color: data.values.sub_title_color_1_2}">
              {{ data.values.sub_title_2 }}
            </p>
            <h3 class="text-xl font-bold mb-2" :style="{color: data.values.title_color_1_2}">
              {{ data.values.title_2 }}
            </h3>
            <a 
              :href="data.values.link" 
              class="newsletter-link inline-flex items-center cursor-pointer font-semibold"
            >
              {{ data.values.link_text_2 }}
              <span class="arrow-icon ml-2 w-5 h-5 flex items-center justify-center rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </span>
            </a>
          </div>
        </div>
        
        <!-- Right Banner -->
        <div 
        :class="[{'border-r-0': data.design.container === 'container-fluid'}]"

        class="bg-gray-300 bg-cover bg-center bg-no-repeat border border-gray-200 min-h-[230px] flex items-center justify-end"
          :style="{backgroundImage: `url(${imghttps(data.values.image_3.image)})`}">
          <div class="w-full md:w-1/2 p-4 mx-3 md:py-0 md:mx-0 md:px-8 bg-white/70 md:bg-transparent">
            <p class="text-sm font-normal mb-1" :style="{color: data.values.sub_title_color_1_2}">
              {{ data.values.sub_title_3 }}
            </p>
            <h3 class="text-xl font-bold mb-2" :style="{color: data.values.title_color_1_2}">
              {{ data.values.sub_title_3 }}
            </h3>
            <a 
              :href="data.values.link" 
              class="newsletter-link inline-flex items-center cursor-pointer font-semibold"
            >
              {{ data.values.link_text_3 }}
              <span class="arrow-icon ml-2 w-5 h-5 flex items-center justify-center rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { imghttps } from '~/composables/services/helpers';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const email = ref('');

const submitNewsletter = () => {
  // Newsletter submission logic would go here
  // console.log('Newsletter subscription for:', email.value);
  email.value = '';
};
</script>

<style scoped>
@keyframes animateLeftToRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(4px);
  }
}

.newsletter-input {
  border-color: var(--input-border-color);
  border-radius: 5px 5px 0 0;
}

@media (min-width: 640px) {
  .newsletter-input {
    border-radius: 5px 0 0 5px;
  }
}

.newsletter-input:hover {
  border-color: var(--btn-background);
}

.newsletter-input:focus {
  border-color: var(--input-border-color-focus);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
}

.newsletter-btn {
  color: var(--btn-color);
  background-color: var(--btn-background);
  border-radius: 0 0 5px 5px;
}

@media (min-width: 640px) {
  .newsletter-btn {
    border-radius: 0 5px 5px 0;
  }
}

.newsletter-btn:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-background-hover);
}

.newsletter-link {
  color: var(--link-color);
}

.newsletter-link:hover {
  color: var(--link-color-hover);
}

.arrow-icon {
  background-color: var(--link-color);
}

.newsletter-link:hover .arrow-icon {
  background-color: var(--link-color-hover);
  animation: .2s ease-in 0s infinite alternate animateLeftToRight;
}
</style>