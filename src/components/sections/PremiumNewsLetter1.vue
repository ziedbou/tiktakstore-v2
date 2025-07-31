<template>
  <section class="newsletter-section" :style="{ backgroundImage: `url(${data.values.bg_image.image})` }">
    <div class="newsletter-container">
      <div class="newsletter-content">
        <div class="newsletter-text">
          <h2>{{ data.values.text }}</h2>
        </div>
        <form class="newsletter-form" @submit.prevent="handleSubmit">
          <input 
            type="email" 
            class="email-input" 
            placeholder="Your e-mail address" 
            required
            v-model="email"
          >
          <button type="submit" class="subscribe-button">{{ data.values.btn_text }}</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue';

// Define props with defaults to avoid reactivity issues
withDefaults(defineProps<{
  data: any;
}>(), {
  data: () => ({
    values: {
      bg_image: { image: '' },
      text: '',
      btn_text: 'Subscribe'
    }
  })
});

const email = ref('');

const handleSubmit = () => {
  // Implement newsletter subscription logic here
  // console.log('Subscribing email:', email.value);
  // Reset form
  email.value = '';
};
</script>

<style scoped>
.newsletter-section {
  position: relative;
  padding: 40px 10px;
  background-size: cover;
  background-position: center;
  isolation: isolate;
  overflow: hidden;
}

.newsletter-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(75, 75, 75, 0.7);
  z-index: -1;
}

.newsletter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.newsletter-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.newsletter-text {
  flex: 1;
}

h2 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #000;
  line-height: 1.3;
}

.newsletter-form {
  flex: 1.5;
  display: flex;
}

.newsletter-form:hover .email-input {
  border-color: #0068c8;
}

.newsletter-form:hover .subscribe-button {
  background-color: #0068c8;
  color: #fff;
}

.email-input {
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  outline: none;
  border: 1px solid;
  border-color: #ddd;
  transition: border-color 0.2s;
}

.subscribe-button {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  transition: all 0.2s;
}

@media (max-width: 768px) {
  .newsletter-content {
    flex-direction: column;
    text-align: center;
  }

  .newsletter-form {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .newsletter-form {
    gap: 10px;
    flex-direction: column;
  }
  
  .email-input {
    border-radius: 4px;
  }
  
  .subscribe-button {
    border-radius: 4px;
  }
}
</style>