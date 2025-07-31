<template>
  <div>
    <a
      href="#"
      class="size-guide gap-1 my-2 rounded-xs py-2 flex items-center space-x-2 text-gray-700 hover:text-gray-900 pl-4 transition-colors duration-300"
      @click.prevent="showModal = true"
    >
      <ReceiptText size="15" />
      <span>{{ extra.text }}</span>
    </a>

    <Modal
      :isOpen="showModal"
      :title="extra.text"
      size="4xl"
      @close="showModal = false"
    >
      <div v-html="extra.content"></div>
    </Modal>
  </div>
</template>

<script setup>
import { ReceiptText } from 'lucide-vue-next';
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';

defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
  extra: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);
</script>