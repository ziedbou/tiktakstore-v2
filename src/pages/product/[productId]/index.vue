<template>
  <div class="container-medium !px-0 mx-auto md:px-4 py-10 max-md:pt-0 space-y-16">
    <div v-if="error" class="text-center py-10 text-red-600">
      <p>Erreur: {{ error }}</p>
    </div>
    <div v-else>
      <div v-if="productData?.provider != 'basic'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ProductGallery
            :images="productImages"
            :loading="isLoading"
          />
        </div>
        <div>
          <ProductCardSkeleton v-if="isLoading" />
          
          <!-- class="bg-white border border-gray-200 rounded-xl shadow-lg p-6" -->
          <div
          class="md:bg-white md:border max-md:px-4 md:border-gray-200 md:rounded-xl md:shadow-lg md:p-6"
          v-else-if="productExtraData && productData"
          >
            <template v-for="(extra, index) in activeExtraComponents" :key="index">
              <component
                :is="componentMap[extra.slug]"
                v-if="componentMap[extra.slug] && extra.active"
                :product="productData"
                :extra="extra"
              />
              <AdvancedPack
                v-if=" extra.slug == 'price' && productData?.product_type == 'pack'"
                :product="productData"
                :extra="extra"
              />
            </template>
            <!-- <Category v-if="productData?._category?.name" :category="productData._category.name" /> -->
          </div>
        </div>
      </div>
      <div v-else>
        <BasicPack 
        :product="productData"
        />
      </div>
      <DynamicSections v-if="dynamicSectionsData.length > 0" :data="dynamicSectionsData"/>
      <RelatedProducts
        :products="relatedProducts"
        :loading="isLoading"
        :onAddToCart="() => {}"
      />
      <!-- <BuyerNotification v-if="!isLoading && buyerNotifications.length" :notifications="buyerNotifications" /> -->
      <BottomSheet :product="productData" v-if="productData.product_type != 'pack'" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAsyncData } from '#app';
import { useProductData } from '~/composables/useProductData';
import { useCompanyData } from '~/composables/useCompanyData';
import { useRelatedProducts } from '~/composables/useRelatedProducts.js';
import { useProductExtraData } from '~/composables/useProductExtraData';
import ProductGallery from '../components/ProductGallery.vue';
import ProductTitle from '../components/ProductTitle.vue';
import ProductPrice from '../components/ProductPrice.vue';
import ProductDescription from '../components/ProductDescription.vue';
import ProductVariants from '../components/ProductVariants.vue';
import PurchaseButtons from '../components/PurchaseButtons.vue';
import QuickCheckoutForm from '../components/QuickCheckoutForm.vue';
import RelatedProducts from '../components/RelatedProducts.vue';
import BuyerNotification from '../components/BuyerNotification.vue';
import Category from '../components/Category.vue';
import CountdownTimer from '../components/CountdownTimer.vue';
import TextBlock from '../components/TextBlock.vue';
import ProductOffre from '../components/ProductOffre.vue';
import CustomerReview from '../components/CustomerReview.vue';
import ProductAccordion from '../components/ProductAccordion.vue';
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue';
import ProductCarousel from '../components/ProductCarousel.vue';
import ProductDelivery from '../components/ProductDelivery.vue';
import ProductSizeGuide from '../components/ProductSizeGuide.vue';
import ProductPack from '../components/ProductPack.vue';
import ProductVisitors from '../components/ProductVisitors.vue';
import ProductCross_sell from '../components/ProductCross_sell.vue';
import BottomSheet from '../components/BottomSheet.vue';
import DynamicSections from '@/components/DynamicSections.vue';
import BasicPack from '../components/basicPack.vue';
import AdvancedPack from '../components/advancedPack.vue';

const route = useRoute();
const productId = route.params.productId;

const { productData, isLoading: productLoading, error: productError, fetchProductData } = useProductData(productId);
const { companyId, companyData, isLoading: companyLoading, error: companyError } = useCompanyData();
const { productExtraData, isLoading: extraIsLoading, error: extraError, fetchProductExtraData } = useProductExtraData(productId);
const { relatedProducts, isLoading: relatedLoading, error: relatedError, fetchRelatedProducts } = useRelatedProducts();

const isLoading = computed(() => productLoading.value || companyLoading.value || extraIsLoading.value || relatedLoading.value);
const error = computed(() => productError.value || companyError.value || extraError.value || relatedError.value);

const componentMap = {
  title: ProductTitle,
  price: ProductPrice,
  variants: ProductVariants,
  'pre-form-checkout': QuickCheckoutForm,
  counter: CountdownTimer,
  description: ProductDescription,
  text: TextBlock,
  quantity: ProductOffre,
  avis: CustomerReview,
  accordion: ProductAccordion,
  carousel: ProductCarousel,
  addToCartBtns: PurchaseButtons,
  delivery: ProductDelivery,
  sizeguide: ProductSizeGuide,
  offers: ProductPack,
  'live-visitors': ProductVisitors,
  cross_sell: ProductCross_sell,
};

const activeExtraComponents = computed(() => {
  return productExtraData.value?.data?.filter((extra) => extra.active) || [];
});

const dynamicSectionsData = computed(() => {
  return productExtraData.value?.data_full_page || [];
});


const { isSelectedByUser } = useSelectedVariant();
const { selectedMultipleVariants, clearAllMultipleVariants } = useSelectedMultipleVariants()
const { resetQuantity } = useProductQuantity()
const { trackViewContent, trackPageView } = useTracking();

onMounted(() => {
  if (productData.value) {
    trackPageView(productData.value)
    trackViewContent(productData.value);
  }
  resetQuantity()
  isSelectedByUser.value = false;
  clearAllMultipleVariants()
  // console.log("selectedMultipleVariants", selectedMultipleVariants)
});

const productImages = computed(() => {
  if (!productData.value) return [];

  const uniqueImages = new Set(); // Tracks unique image/video URLs
  const thumbs = new Set(); // Tracks unique thumbnails
  let images = [];

  // Step 1: Process images and videos from productData.images
  if (productData.value.images && productData.value.images.length > 0) {
    images = productData.value.images
      .map((img, imgIndex) => {
        const isVideo = img.video && !img.image; // Consider it a video if video exists and image does not
        const src = isVideo ? img.video : img.image;
        const thumb = img.image_thumb || img.video || img.image;
        if (!src || thumbs.has(thumb)) return null; // Skip if no src or thumbnail already exists
        thumbs.add(thumb);
        return {
          id: `product-${imgIndex}`,
          src: src,
          alt: img.name || `Product ${isVideo ? 'Video' : 'Image'} ${imgIndex + 1}`,
          thumb: thumb,
          type: isVideo ? 'video' : 'image',
        };
      })
      .filter(item => item !== null);
  }

  // Step 2: Process images and videos from declinaisons
  if (productData.value.declinaisons && productData.value.declinaisons.length > 0) {
    const declinaisonImages = productData.value.declinaisons
      .filter(declinaison => declinaison.display_on_website)
      .flatMap((declinaison, declinaisonIndex) => {
        const result = [];

        // Handle declinaison.images
        if (declinaison.images && Array.isArray(declinaison.images)) {
          declinaison.images.forEach((img, imgIndex) => {
            const isVideo = img.video && !img.image;
            const src = isVideo ? img.video : img.image;
            const thumb = img.image_thumb || img.video || img.image;
            if (src && !thumbs.has(thumb)) {
              thumbs.add(thumb);
              result.push({
                id: `${declinaison.id}-${imgIndex}`,
                src: src,
                alt: img.name || `${isVideo ? 'Video' : 'Image'} ${imgIndex + 1} for ${declinaison.name}`,
                thumb: thumb,
                type: isVideo ? 'video' : 'image',
              });
            }
          });
        }

        // Handle declinaison.photo
        if (declinaison.photo && declinaison.photo_thumb && !thumbs.has(declinaison.photo_thumb)) {
          thumbs.add(declinaison.photo_thumb);
          result.push({
            id: `${declinaison.id}-photo`,
            src: declinaison.photo,
            alt: `Photo for ${declinaison.name}`,
            thumb: declinaison.photo_thumb || declinaison.photo,
            type: 'image', // Assuming photo is always an image
          });
        }

        return result;
      });

    images = [...images, ...declinaisonImages];
  }

  // Step 3: Ensure uniqueness by src URL
  const finalImages = [];
  const seenSrcs = new Set();
  for (const item of images) {
    if (item.src && !seenSrcs.has(item.src)) {
      seenSrcs.add(item.src);
      finalImages.push(item);
    }
  }

  return finalImages;
});
const buyerNotifications = computed(() => {
  if (!productData.value?.name) return [];
  return [
    { id: 1, name: 'Sarah', location: 'NY', timeAgo: '4 min', productName: productData.value.name },
    { id: 2, name: 'James', location: 'LA', timeAgo: '12 min', productName: productData.value.name },
  ];
});

const categoryId = computed(() => productData.value?.category || null);

await useAsyncData('product', async () => {
  await Promise.all([fetchProductData(), fetchProductExtraData()]);
  
  if (categoryId.value) {
    await fetchRelatedProducts(categoryId.value, productId);
  }

  return {
    companyData: companyData.value,
    productData: productData.value,
    productExtraData: productExtraData.value,
    relatedProducts: relatedProducts.value,
  };
}, { server: true });

// --- Seo useHead ---
const seoMetadata = computed(() => {
  if (!productData.value) {
    return {
      title: 'Loading Product...',
      description: 'Please wait while we load the product details.',
      keywords: '',
      image: '',
      url: `https://yourdomain.com${route.fullPath}`,
      rating: '4.5',
      reviewCount: '0',
      price: '0.00',
      sku: '',
    };
  }

  const { name, seo_title, seo_description, seo_keywords, seo_slug, photo, price, seo_stars, seo_reviews, reference } = productData.value;

  return {
    title: seo_title || `${name} - Your Brand`,
    description: seo_description || `Discover ${name} at Your Brand. High-quality product priced at $${price}.`,
    keywords: seo_keywords || 'product, socks, pack, your brand',
    image: photo || 'https://yourdomain.com/default-image.jpg',
    url: seo_slug ? `https://yourdomain.com/${seo_slug}` : `https://yourdomain.com/product/${productId}`,
    rating: seo_stars || '4.5',
    reviewCount: seo_reviews || '0',
    price: price || '0.00',
    sku: reference || '',
  };
});

useHead({
  title: computed(() => seoMetadata.value.title),
  meta: computed(() => [
    { name: 'description', content: seoMetadata.value.description },
    { name: 'keywords', content: seoMetadata.value.keywords },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: seoMetadata.value.title },
    { property: 'og:description', content: seoMetadata.value.description },
    { property: 'og:image', content: seoMetadata.value.image },
    { property: 'og:url', content: seoMetadata.value.url },
    { property: 'og:type', content: 'product' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoMetadata.value.title },
    { name: 'twitter:description', content: seoMetadata.value.description },
    { name: 'twitter:image', content: seoMetadata.value.image },
  ]),
  link: computed(() => [
    { rel: 'canonical', href: seoMetadata.value.url },
  ]),
  script: computed(() => [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productData.value?.name || 'Product',
        image: productData.value?.photo || seoMetadata.value.image,
        description: seoMetadata.value.description,
        sku: seoMetadata.value.sku,
        brand: {
          '@type': 'Brand',
          name: companyData.value?.name || 'Your Brand',
        },
        offers: {
          '@type': 'Offer',
          url: seoMetadata.value.url,
          priceCurrency: 'USD',
          price: seoMetadata.value.price,
          availability: productData.value?.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
        aggregateRating: productData.value?.seo_stars ? {
          '@type': 'AggregateRating',
          ratingValue: seoMetadata.value.rating,
          reviewCount: seoMetadata.value.reviewCount,
        } : undefined,
      }, null, 2),
    },
  ]),
});
</script>