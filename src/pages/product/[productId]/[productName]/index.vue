<script setup>
import { navigateTo } from '#app';
import { onMounted } from 'vue';

onMounted(() => {
  const route = useRoute();
  const productId = route.params.productId;
  navigateTo(`/product/${productId}`);
});
</script>