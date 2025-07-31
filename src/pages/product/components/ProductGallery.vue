<template>
  <div class="w-full">
    <div v-if="loading" class="animate-pulse">
      <div class="relative overflow-hidden rounded-lg mb-4 bg-gray-200 aspect-square">
        <div class="w-full h-full bg-gray-300"></div>
        <div class="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 shadow-md w-10 h-10"></div>
        <div class="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 shadow-md w-10 h-10"></div>
        <div class="absolute right-3 top-3 bg-gray-300 rounded-full p-2 shadow-md w-10 h-10"></div>
      </div>
      <div class="flex space-x-2 overflow-x-auto pb-4">
        <div
          v-for="i in 4"
          :key="i"
          class="w-16 h-16 rounded border-2 border-gray-200 bg-gray-300 flex-shrink-0"
        ></div>
      </div>
    </div>
    <div v-else>
      <div class="relative overflow-hidden md:rounded-lg mb-4 bg-gray-50 aspect-square">
        <div
          v-for="(item, index) in images"
          :key="item.id"
          :class="[
            'absolute inset-0 w-full h-full transition-opacity duration-300',
            index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          ]"
        >
          <img
            v-if="item.type === 'image' || !item.type"
            :src="imghttps(item.src)"
            :alt="item.alt"
            class="w-full h-full object-cover object-center"
          />
          <video
            v-else-if="item.type === 'video'"
            :src="imghttps(item.src)"
            :alt="item.alt"
            controls
            muted
            loop
            class="w-full h-full object-cover object-center"
            aria-label="Product video"
          ></video>
        </div>

        <button
          @click="prevImage"
          class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
          aria-label="Previous item"
        >
          <ChevronLeft class="h-5 w-5 text-gray-700" />
        </button>
        <button
          @click="nextImage"
          class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
          aria-label="Next item"
        >
          <ChevronRight class="h-5 w-5 text-gray-700" />
        </button>

        <button
          @click="openModal"
          class="absolute right-3 top-3 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
          aria-label="Zoom item"
        >
          <ZoomIn class="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <ClientOnly>
        <div class="mb-4 mx-2">
          <Swiper
            ref="swiperRef"
            :slides-per-view="'auto'"
            :space-between="5"
            :free-mode="true"
            :watch-slides-progress="true"
            :modules="[FreeMode, Navigation]"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            class="thumbnail-swiper"
          >
            <SwiperSlide 
              v-for="(item, index) in images" 
              :key="item.id"
              class="!w-16"
            >
              <button
                @click="selectImage(index)"
                :class="[
                  'w-16 h-16 rounded border-2 transition-all duration-200 relative',
                  index === currentImageIndex
                    ? 'border-indigo-600 scale-95'
                    : 'border-transparent hover:border-gray-200 hover:scale-100'
                ]"
              >
                <img
                  v-if="item.type !== 'video'"
                  :src="imghttps(item.thumb || item.src)"
                  :alt="`Thumbnail ${index + 1}`"
                  class="w-full h-full object-cover object-center rounded"
                />
                <div
                  v-if="item.type === 'video'"
                  class="absolute inset-0 flex items-center justify-center bg-black/30 rounded"
                >
                  <Play class="h-6 w-6 text-white drop-shadow-md" aria-hidden="true" />
                </div>
              </button>
            </SwiperSlide>
          </Swiper>
        </div>
      </ClientOnly>

      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          @click="closeModal"
        >
          <div
            class="relative max-w-4xl w-full h-auto max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden"
            @click.stop
          >
            <button
              @click="closeModal"
              class="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
              aria-label="Close modal"
            >
              <X class="h-5 w-5 text-gray-700" />
            </button>
            
            <button
              @click="prevImage"
              class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
              aria-label="Previous item"
            >
              <ChevronLeft class="h-5 w-5 text-gray-700" />
            </button>
            
            <button
              @click="nextImage"
              class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
              aria-label="Next item"
            >
              <ChevronRight class="h-5 w-5 text-gray-700" />
            </button>

            <Transition
              enter-active-class="duration-300 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="duration-200 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div class="w-full h-full">
                <img
                  v-if="images[currentImageIndex]?.type === 'image' || !images[currentImageIndex]?.type"
                  :src="imghttps(images[currentImageIndex]?.src)"
                  :alt="images[currentImageIndex]?.alt"
                  class="w-full h-full object-contain"
                />
                <video
                  v-else-if="images[currentImageIndex]?.type === 'video'"
                  :src="imghttps(images[currentImageIndex]?.src)"
                  :alt="images[currentImageIndex]?.alt"
                  controls
                  muted
                  loop
                  class="w-full h-full object-contain"
                  aria-label="Product video"
                ></video>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { ChevronLeft, ChevronRight, ZoomIn, X, Play } from 'lucide-vue-next';
import { ClientOnly } from '#components';
import { imghttps } from '~/composables/services/helpers';
import { useSelectedVariant } from '@/composables/useSelectedVariants.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { selectedVariant } = useSelectedVariant();

const currentImageIndex = ref(0);
const showModal = ref(false);
const swiperRef = ref(null);

const nextImage = () => {
  currentImageIndex.value =
    currentImageIndex.value === props.images.length - 1 ? 0 : currentImageIndex.value + 1;
};

const prevImage = () => {
  currentImageIndex.value =
    currentImageIndex.value === 0 ? props.images.length - 1 : currentImageIndex.value - 1;
};

const selectImage = async (index) => {
  try {
    currentImageIndex.value = index;
    await nextTick();
    if (swiperRef.value?.swiper) {
      swiperRef.value.swiper.slideTo(index);
    } else {
      let attempts = 5;
      const trySlideTo = () => {
        if (swiperRef.value?.swiper) {
          swiperRef.value.swiper.slideTo(index);
        } else if (attempts > 0) {
          attempts--;
          setTimeout(trySlideTo, 100);
        }
      };
      trySlideTo();
    }
  } catch (error) {
    console.error('Error in selectImage:', error);
  }
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

watch(selectedVariant, async (newVariant) => {
  try {
    if (newVariant && (newVariant.photo || newVariant.video)) {
      const src = newVariant.video || newVariant.photo;
      const itemIndex = props.images.findIndex((item) => item.src === src);
      if (itemIndex !== -1) {
        currentImageIndex.value = itemIndex;
        await nextTick();
        if (swiperRef.value?.swiper) {
          swiperRef.value.swiper.slideTo(itemIndex);
        } else {
          let attempts = 5;
          const trySlideTo = () => {
            if (swiperRef.value?.swiper) {
              swiperRef.value.swiper.slideTo(itemIndex);
            } else if (attempts > 0) {
              attempts--;
              setTimeout(trySlideTo, 100);
            }
          };
          trySlideTo();
        }
      }
    }
  } catch (error) {
    console.error('Error in selectedVariant watch:', error);
  }
}, { immediate: true });

watch(swiperRef, (newSwiper) => {
  // console.log('Swiper instance:', newSwiper?.swiper);
});
</script>

<style scoped>
:deep(.thumbnail-swiper) {
  position: relative;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #374151;
  margin-top: 0;
}

:deep(.swiper-button-prev:after),
:deep(.swiper-button-next:after) {
  font-size: 14px;
  font-weight: bold;
}

:deep(.swiper-button-disabled) {
  opacity: 0.3;
}

:deep(.swiper-slide) {
  width: 64px !important;
}
</style>