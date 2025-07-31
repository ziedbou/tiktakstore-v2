<template>
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="w-full max-w-7xl mx-auto px-0 sm:px-4 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Order Confirmed! 🎉</h1>
          <div v-if="customerInfo && !isOrderLoading">
            <p class="text-gray-600 mb-2">Thank you <span class="font-semibold text-gray-900">{{ customerInfo.name }}</span> for your purchase!</p>
            <p class="text-gray-600 mb-8">Complete your setup with this perfect addition:</p>
          </div>
          <p v-else class="text-gray-600 mb-8">Thank you for your purchase. Complete your setup with this perfect addition:</p>
        </div>
  
        <!-- Main Content: Recommended Product on Top + Recent Purchases on Bottom -->
        <div class="space-y-8 mb-8">
          <!-- Recommended Product (Top) -->
          <div class="w-full">
            <!-- Error State for Product -->
            <div v-if="hasProductError || hasUpsellError" class="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div class="text-red-500 text-lg mb-2">⚠️ Unable to load product details</div>
              <p class="text-gray-500 text-sm">Please try again later.</p>
            </div>

            <!-- Product Loading Skeleton -->
            <div v-else-if="isProductLoading || isUpsellLoading" class="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div class="animate-pulse">
                <!-- Mobile header skeleton -->
                <div class="lg:hidden bg-gray-200 h-32"></div>
                
                <div class="flex flex-col lg:flex-row">
                  <!-- Image skeleton -->
                  <div class="relative w-full lg:w-1/2 h-64 lg:h-96 bg-gray-200"></div>
                  
                  <!-- Content skeleton -->
                  <div class="p-6 lg:p-8 flex-1 space-y-4">
                    <div class="flex items-center gap-2">
                      <div class="flex space-x-1">
                        <div v-for="i in 5" :key="i" class="w-4 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div class="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                    
                    <div class="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div class="space-y-2">
                      <div class="h-4 bg-gray-200 rounded"></div>
                      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3">
                      <div v-for="i in 4" :key="i" class="flex items-center gap-2">
                        <div class="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <div class="h-4 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                    
                    <div class="bg-gray-100 rounded-2xl p-4 space-y-2">
                      <div class="flex justify-between">
                        <div class="h-6 bg-gray-200 rounded w-32"></div>
                        <div class="h-6 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div class="flex gap-4">
                        <div class="h-5 bg-gray-200 rounded w-28"></div>
                        <div class="h-5 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                    
                    <div class="bg-gray-100 rounded-2xl p-5 space-y-2">
                      <div class="h-5 bg-gray-200 rounded w-48"></div>
                      <div class="h-4 bg-gray-200 rounded"></div>
                      <div class="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                    
                    <div class="pt-6 space-y-3">
                      <div class="h-14 bg-gray-200 rounded-2xl"></div>
                      <div class="h-10 bg-gray-200 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loaded Product -->
            <div v-else-if="upsellProduct" ref="productCardRef" class="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-blue-100/50 backdrop-blur-sm">
              <!-- Mobile: Stunning Header with Animated Gradient -->
              <div class="lg:hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-black/10"></div>
                <div class="relative z-10">
                  <div class="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h2 class="text-xl font-bold text-white mb-1">{{ upsellConfig?.text_upsell || 'Perfect Match!' }} ✨</h2>
                  <p class="text-blue-100 text-sm">{{ upsellConfig?.text_footer || 'Recommended just for you' }}</p>
                </div>
                <!-- Animated background elements -->
                <div class="absolute top-2 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
                <div class="absolute bottom-3 left-6 w-8 h-8 bg-pink-300/20 rounded-full animate-bounce"></div>
              </div>

              <div class="flex flex-col lg:flex-row h-full lg:min-h-[500px]">
                <!-- Product Images Swiper -->
                <div class="relative w-full lg:w-1/2">
                  <swiper-container
                    ref="productSwiperRef"
                    class="product-images-swiper"
                    slides-per-view="1"
                    space-between="0"
                    loop="true"
                    autoplay-delay="4000"
                    navigation="true"
                    pagination="true"
                  >
                    <swiper-slide v-for="(image, index) in upsellProduct.images" :key="`img-${index}`">
                      <img 
                        :src="image.image" 
                        :alt="`Product image ${index + 1}`" 
                        class="w-full h-64 lg:h-full object-contain"
                        style="display: block;"
                      >
                    </swiper-slide>
                    <!-- Debug: Show if no images -->
                    <swiper-slide v-if="!upsellProduct.images || upsellProduct.images.length === 0">
                      <div class="w-full h-64 lg:h-full bg-gray-200 flex items-center justify-center">
                        <p class="text-gray-500">No images available</p>
                      </div>
                    </swiper-slide>
                  </swiper-container>
  
                  <!-- Enhanced Badges -->
                  <div v-if="upsellProduct.discount > 0" class="absolute top-4 left-4 z-10">
                    <div class="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                      🔥 {{ upsellProduct.discount }}% OFF
                    </div>
                  </div>
                  <div class="absolute top-4 right-4 z-10">
                    <div class="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      ⭐ PERFECT MATCH
                    </div>
                  </div>
  
                  <!-- Enhanced Navigation Buttons -->
                  <div class="product-images__btn-prev absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer z-20 bg-white/95 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border-2 border-white/50 hover:scale-110">
                    <ChevronLeft class="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-300" />
                  </div>
                  
                  <div class="product-images__btn-next absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer z-20 bg-white/95 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border-2 border-white/50 hover:scale-110">
                    <ChevronRight class="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-300" />
                  </div>
  
                  <!-- Pagination -->
                  <div class="product-images__pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-20"></div>
                </div>
                
                <!-- Product Info -->
                <div class="p-6 lg:p-8 flex-1 lg:w-1/2 flex flex-col bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
                  <!-- Reviews & Social Proof -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                      <div class="flex text-yellow-400">
                        <svg v-for="i in 5" :key="i" class="w-5 h-5 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span class="text-gray-600 text-sm font-medium">(124 reviews)</span>
                    </div>
                    <div class="hidden lg:block bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      ⭐ PERFECT MATCH
                    </div>
                  </div>
                  
                  <!-- Product Title with Emojis -->
                  <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    ⚡ {{ upsellProduct.name }}
                  </h3>
                  
                  <!-- Enhanced Description with Icons -->
                  <div class="space-y-3 mb-6">
                    <p class="text-gray-700 leading-relaxed font-medium" v-html="upsellProduct.description">
                    </p>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex items-center gap-2 text-gray-600">
                        <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          📦
                        </div>
                        <span>In Stock: {{ upsellProduct.stock }}</span>
                      </div>
                      <div class="flex items-center gap-2 text-gray-600">
                        <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          🔖
                        </div>
                        <span>Ref: {{ upsellProduct.reference }}</span>
                      </div>
                      <div class="flex items-center gap-2 text-gray-600">
                        <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          🎯
                        </div>
                        <span>Qty: {{ upsellProduct.quantity }}</span>
                      </div>
                      <div v-if="upsellConfig?.free_shipping" class="flex items-center gap-2 text-gray-600">
                        <div class="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                          🚚
                        </div>
                        <span>Free Shipping</span>
                      </div>
                    </div>
                  </div>
                  
                                                       <!-- Enhanced Price Section -->
                  <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6 border border-blue-100">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-3">
                        <span class="text-3xl font-black text-gray-900">{{ upsellProduct.discountedPrice.toFixed(2) }} {{ currency }}</span>
                        <span v-if="upsellProduct.discount > 0" class="text-xl text-gray-400 line-through">{{ upsellProduct.price.toFixed(2) }} {{ currency }}</span>
                      </div>
                      <div v-if="upsellProduct.discount > 0" class="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Save {{ (upsellProduct.price - upsellProduct.discountedPrice).toFixed(2) }} {{ currency }}! 🎉
                      </div>
                    </div>
                    <div class="flex items-center gap-4">
                      <span v-if="upsellConfig?.free_shipping" class="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                        🚚 Free Shipping
                      </span>
                      <span class="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                        ⏰ Limited Time
                      </span>
                    </div>
                  </div>
                  
                                    <!-- Enhanced Offer Description -->
                  <div class="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-5 mb-6 relative overflow-hidden">
                    <div class="absolute top-2 right-2 text-2xl opacity-20">✨</div>
                    <div class="relative z-10">
                      <h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">
                        🎯 {{ upsellConfig?.text_upsell || 'Exclusive VIP Offer!' }}
                      </h4>
                      <p class="text-gray-700 text-sm leading-relaxed">
                        <span v-if="upsellProduct.discount > 0">
                          We're offering this {{ upsellProduct.name.toLowerCase() }} at a 
                          <span class="font-bold text-blue-700">special reduced price of {{ upsellProduct.discountedPrice.toFixed(2) }} {{ currency }}</span> 
                          (normally {{ upsellProduct.price.toFixed(2) }} {{ currency }}). 
                        </span>
                        <span v-else>
                          Get this amazing {{ upsellProduct.name.toLowerCase() }} for just 
                          <span class="font-bold text-blue-700">{{ upsellProduct.price.toFixed(2) }} {{ currency }}</span>.
                        </span>
                        {{ upsellConfig?.text_footer || 'Complete your setup!' }} 🔥
                      </p>
                    </div>
                  </div>
                  
                  <!-- Action Buttons - Exciting Mobile Design -->
                  <div class="border-t border-blue-100 pt-6 mt-auto">
                    <div class="flex flex-col gap-4">
                      <!-- Primary CTA with Gradient & Animation -->
                      <button 
                        @click="addToCart(upsellProduct.id)" 
                        :style="{ backgroundColor: upsellConfig?.confirm_button?.color || '#3B82F6', color: upsellConfig?.confirm_button?.text_color || '#FFFFFF' }"
                        class="relative w-full hover:opacity-90 font-bold py-5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-2xl hover:shadow-3xl active:scale-95 touch-manipulation overflow-hidden group"
                      >
                        <!-- Animated background shine -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        <!-- Button content -->
                        <div class="relative z-10 flex items-center gap-3">
                          <div class="bg-white/20 rounded-full p-1 backdrop-blur-sm">
                            <Check class="w-6 h-6" />
                          </div>
                          <span class="font-black tracking-wide">✨ {{ upsellConfig?.confirm_button?.text || 'Oui je Confirme!' }} ✨</span>
                        </div>
                        
                        <!-- Pulse effect -->
                        <div class="absolute inset-0 rounded-2xl bg-white/10 animate-pulse"></div>
                      </button>
                      
                      <!-- Secondary CTA with Subtle Design -->
                      <button 
                        @click="declineOffers" 
                        :style="{ backgroundColor: upsellConfig?.cancel_button?.color || '#F3F4F6', color: upsellConfig?.cancel_button?.text_color || '#6B7280' }"
                        class="relative w-full hover:opacity-80 font-medium py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 text-base touch-manipulation backdrop-blur-sm"
                      >
                        <X class="w-5 h-5" />
                        <span>{{ upsellConfig?.cancel_button?.text || 'Maybe Later' }}</span>
                      </button>
                      
                      <!-- Trust indicators -->
                      <div class="flex items-center justify-center gap-6 text-xs text-gray-500 mt-2">
                        <div class="flex items-center gap-1">
                          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
                          </svg>
                          <span>Secure</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <span>Fast Delivery</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>Warranty</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <!-- Recent Purchases List (Bottom) -->
          <div class="w-full">
            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <!-- Loading State -->
              <div v-if="isOrderLoading" class="animate-pulse">
                <div class="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div v-for="i in 3" :key="i" class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div class="w-16 h-16 bg-gray-200 rounded-md"></div>
                    <div class="flex-1">
                      <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div class="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                      <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Error State -->
              <div v-else-if="hasOrderError" class="text-center py-8">
                <div class="text-red-500 text-lg mb-2">⚠️ Unable to load order details</div>
                <p class="text-gray-500 text-sm">Please check your order reference and try again.</p>
              </div>

              <!-- Loaded State -->
              <template v-else>
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-lg font-semibold text-gray-900">Your Recent Purchase</h3>
                  <div v-if="customerInfo" class="text-sm text-gray-500">
                    Order #{{ customerInfo.orderNumber }}
                  </div>
                </div>
                
                <!-- Items Grid for Better Layout -->
                <div v-if="recentlyPurchased.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div 
                    v-for="item in recentlyPurchased" 
                    :key="item.id"
                    class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img 
                      :src="item.image" 
                      :alt="item.name" 
                      class="w-16 h-16 rounded-md object-cover flex-shrink-0"
                      @error="$event.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center'"
                    >
                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-gray-900 text-sm truncate">{{ item.name }}</h4>
                      <p class="text-xs text-gray-500 mb-1">Qty: {{ item.quantity }}</p>
                                             <div class="flex items-center gap-2">
                         <p class="text-sm font-semibold text-gray-900">{{ item.price.toFixed(2) }} {{ currency }}</p>
                         <span v-if="item.isUpsell" class="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full">
                           Upsell
                         </span>
                       </div>
                    </div>
                  </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-8 text-gray-500">
                  <div class="text-4xl mb-2">📦</div>
                  <p>No items found in this order</p>
                </div>
                
                <!-- Order Summary - Horizontal Layout -->
                <div v-if="recentlyPurchased.length > 0" class="border-t border-gray-200 pt-4">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div class="flex items-center gap-4">
                      <span class="text-sm bg-green-100 text-green-800 px-3 py-2 rounded-full font-medium">
                        {{ recentlyPurchased.length }} item{{ recentlyPurchased.length > 1 ? 's' : '' }}
                      </span>
                      <span class="text-sm text-green-600 flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        Confirmed
                      </span>
                      <span v-if="customerInfo" class="text-sm text-gray-500">
                        {{ customerInfo.paymentType }}
                      </span>
                    </div>
                                         <div class="text-right">
                       <span class="text-sm font-medium text-gray-600">Total Order Value:</span>
                       <span class="text-xl font-bold text-gray-900 ml-2">{{ totalOrderValue }} {{ currency }}</span>
                     </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
  
        <!-- Bundle Offer 
        <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center mb-8">
          <h3 class="text-2xl font-bold mb-2">💡 Bundle Deal: Save Even More!</h3>
          <p class="text-blue-100 mb-6">Get all 3 accessories together and save $15</p>
          <div class="flex items-center justify-center gap-4 mb-6">
            <span class="text-2xl text-blue-200 line-through">$69.97</span>
            <span class="text-4xl font-bold">$54.97</span>
            <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Save $15</span>
          </div>
          <button @click="addBundle" class="bg-white text-purple-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200 inline-flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Complete Bundle
          </button>
        </div>-->
  
        <!-- Trust Badges 
        <div class="flex justify-center items-center gap-8 mt-8 text-sm text-gray-500">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
            </svg>
            30-Day Returns
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Free Shipping
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            1-Year Warranty
          </div>
        </div>-->
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { register } from "swiper/element/bundle"
import "swiper/css"
import "swiper/css/navigation"
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

// Register Swiper
register()

// Get route params
const route = useRoute()
const orderRef = route.params.order_ref
const upsellId = route.params.upsell_id

// Get company data
const { companyData } = useCompanyData()
const baseURL = useRuntimeConfig().public.baseURL

// Get currency from company data
const currency = computed(() => companyData.value?.currency)

// 1. Fetch upsell configuration (SSR)
const { data: upsellConfig, pending: upsellPending, error: upsellError, status: upsellStatus } = await useFetch(
  `${baseURL}website/upsell/${companyData.value.id}/${upsellId}`,
  {
    key: `upsell-config-${upsellId}`,
    server: true,
  }
)

// 2. Fetch order data (client-side)
const { data: orderData, pending: orderPending, error: orderError, status: orderStatus } = await useFetch(
  `${baseURL}get-order-by-idref/${orderRef}/${companyData.value.id}`,
  {
    key: `order-${orderRef}`,
    server: false,
  }
)

// 3. Fetch upsell product data (client-side, only when upsell config is loaded)
const { data: productData, pending: productPending, error: productError, status: productStatus, execute: fetchProduct } = await useFetch(
  () => upsellConfig.value ? `${baseURL}products-read/?show-children=false&company=${companyData.value.id}&active=true&size=8&ids_in=${upsellConfig.value.product_to_propose}` : null,
  {
    key: `upsell-product-${upsellId}`,
    server: false,
    immediate: false,
  }
)

// Execute product fetch when upsell config is available
watch(upsellConfig, (newConfig) => {
  if (newConfig?.product_to_propose && productStatus.value === 'idle') {
    fetchProduct()
  }
}, { immediate: true })

// Swiper refs
const swiperRef = ref(null)
const productSwiperRef = ref(null)
const productCardRef = ref(null)

// Extract upsell product data
const upsellProduct = computed(() => {
  if (!productData.value?.results?.[0]) return null
  
  const product = productData.value.results[0]
  const discountedPrice = upsellConfig.value?.discount ? 
    product.price * (1 - upsellConfig.value.discount / 100) : 
    product.price
  
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.images || [],
    price: product.price,
    discountedPrice: discountedPrice,
    discount: upsellConfig.value?.discount || 0,
    reference: product.reference,
    stock: product.stock,
    quantity: upsellConfig.value?.quantity || 1
  }
})

// Extract order details for recent purchases
const recentlyPurchased = computed(() => {
  if (!orderData.value?.details) return []
  
  return orderData.value.details.map(item => ({
    id: item.id,
    name: item.product_name,
    image: item.product_thumb || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center",
    price: item.price_ttc,
    quantity: item.quantity,
    productRef: item.product_ref,
    productId: item.product_id,
    finalPrice: item.final_price,
    isUpsell: item.is_upsell
  }))
})

// Customer info from order
const customerInfo = computed(() => {
  if (!orderData.value) return null
  
  return {
    name: orderData.value.name,
    email: orderData.value.email,
    phone: orderData.value.phone,
    address: orderData.value.address,
    country: orderData.value.country,
    paymentType: orderData.value.payement_type,
    orderNumber: orderData.value.order_number,
    orderCode: orderData.value.order_code
  }
})

// Computed property for total order value
const totalOrderValue = computed(() => {
  if (!orderData.value) return '0.00'
  return orderData.value.total_amount?.toFixed(2) || '0.00'
})

// Loading states
const isOrderLoading = computed(() => orderStatus.value === 'pending')
const isProductLoading = computed(() => productStatus.value === 'pending' || productStatus.value === 'idle')
const isUpsellLoading = computed(() => upsellStatus.value === 'pending')

// Error handling
const hasOrderError = computed(() => orderStatus.value === 'error' || orderError.value)
const hasProductError = computed(() => productStatus.value === 'error' || productError.value)
const hasUpsellError = computed(() => upsellStatus.value === 'error' || upsellError.value)

// Swiper will auto-update when data changes
  
    // Initialize Swiper after component is mounted
  onMounted(() => {
    // Fire confetti animation on page load after a short delay
    setTimeout(() => {
      fireConfetti()
    }, 500)

    if (swiperRef.value) {
      // Initialize swiper parameters
      Object.assign(swiperRef.value, {
        speed: 300,
        loop: false,
        spaceBetween: 16,
        navigation: {
          nextEl: '.purchased-items__btn-next',
          prevEl: '.purchased-items__btn-prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }
      })
      
      // Initialize the swiper
      swiperRef.value.initialize()
    }

    // Product swiper will auto-initialize with the attributes set in template
  })
  
  // Add individual product to cart
  const addToCart = (productId) => {
    // Restart confetti sequence for testing
    fireConfetti()
    
    // console.log(`Added ${productId} to cart`)
    // Add your cart logic here
  }
  
  // Decline offers
  const declineOffers = () => {
    // console.log('User declined offers')
    // Navigate to order confirmation or dashboard
  }

  // Get element position for confetti targeting
  const getElementPosition = (element) => {
    if (!element) return { x: 0.5, y: 0.5 }
    
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    return {
      x: centerX / window.innerWidth,
      y: centerY / window.innerHeight
    }
  }

  // 🎵 DISCO PARTY DJ Confetti Sequence for 8 seconds 🎵
  const fireConfetti = () => {
    const leftCannon = { x: 0, y: 0.6 }
    const rightCannon = { x: 1, y: 0.6 }
    
    const partyColors = [
      ['#FF1493', '#00FFFF', '#FFD700'],  // Hot Pink, Cyan, Gold
      ['#8A2BE2', '#00FF00', '#FF4500'],  // Blue Violet, Lime, Orange Red
      ['#FF69B4', '#7FFF00', '#FF1493'],  // Hot Pink, Chartreuse, Deep Pink
      ['#00CED1', '#FF6347', '#9370DB']   // Dark Turquoise, Tomato, Medium Purple
    ]

    // 🎶 Phase 1: WARM-UP BEATS (0.5-2s) - Gentle build-up
    const warmUpBeats = [800, 1600]  // Reduced from 4 to 2 beats
    warmUpBeats.forEach((time, index) => {
      setTimeout(() => {
        const side = index % 2 === 0 ? leftCannon : rightCannon
        const angle = index % 2 === 0 ? 45 : 135
        confetti({
          origin: side,
          angle: angle,
          spread: 40,
          particleCount: 25,  // Reduced from 40
          startVelocity: 35,   // Reduced from 40
          colors: partyColors[index % partyColors.length],
          scalar: 1.1,         // Reduced from 1.2
          zIndex: 1000
        })
      }, time)
    })

    // 🎵 Phase 2: DISCO STROBE (2-4s) - Lighter strobing
    let strobeCount = 0
    const strobeInterval = setInterval(() => {
      const isLeft = strobeCount % 2 === 0
      confetti({
        origin: isLeft ? leftCannon : rightCannon,
        angle: isLeft ? 60 : 120,
        spread: 50,          // Reduced from 70
        particleCount: 35,   // Reduced from 60
        startVelocity: 40,   // Reduced from 50
        colors: partyColors[strobeCount % partyColors.length],
        scalar: 1.2,         // Reduced from 1.3
        zIndex: 1000
      })
      
      strobeCount++
      if (strobeCount >= 6) { // Reduced from 10 to 6 strobes
        clearInterval(strobeInterval)
      }
    }, 350)  // Slower interval - from 200ms to 350ms

    // 🎤 Phase 3: BEAT DROP (4-5s) - Moderate bursts
    setTimeout(() => {
      // DUAL SYNCHRONIZED BLAST (toned down)
      confetti({
        origin: leftCannon,
        angle: 45,
        spread: 70,          // Reduced from 90
        particleCount: 80,   // Reduced from 120
        startVelocity: 50,   // Reduced from 60
        colors: ['#FF1493', '#00FFFF', '#FFD700', '#8A2BE2'],
        scalar: 1.3,         // Reduced from 1.5
        zIndex: 1000
      })
      confetti({
        origin: rightCannon,
        angle: 135,
        spread: 70,          // Reduced from 90
        particleCount: 80,   // Reduced from 120
        startVelocity: 50,   // Reduced from 60
        colors: ['#00FF00', '#FF4500', '#FF69B4', '#7FFF00'],
        scalar: 1.3,         // Reduced from 1.5
        zIndex: 1000
      })
    }, 4000)

    // Second beat drop (toned down)
    setTimeout(() => {
      confetti({
        origin: leftCannon,
        angle: 30,
        spread: 80,          // Reduced from 100
        particleCount: 70,   // Reduced from 100
        startVelocity: 55,   // Reduced from 65
        colors: ['#00CED1', '#FF6347', '#9370DB', '#FFD700'],
        scalar: 1.4,         // Reduced from 1.6
        zIndex: 1000
      })
      confetti({
        origin: rightCannon,
        angle: 150,
        spread: 80,          // Reduced from 100
        particleCount: 70,   // Reduced from 100
        startVelocity: 55,   // Reduced from 65
        colors: ['#FF1493', '#00FF00', '#8A2BE2', '#FF4500'],
        scalar: 1.4,         // Reduced from 1.6
        zIndex: 1000
      })
    }, 4500)

    // 🔥 Phase 4: PARTY CHAOS FINALE (5-8s) - Complete mayhem!
    let chaosCount = 0
    const chaosInterval = setInterval(() => {
      // Random cannons with varying angles and speeds
      const angles = [30, 45, 60, 120, 135, 150]
      const speeds = [45, 55, 65, 70]
      
      // Left cannon chaos
      confetti({
        origin: leftCannon,
        angle: angles[Math.floor(Math.random() * 3)], // First 3 angles
        spread: 60 + Math.random() * 40,
        particleCount: 50 + Math.random() * 30,
        startVelocity: speeds[Math.floor(Math.random() * speeds.length)],
        colors: partyColors[chaosCount % partyColors.length],
        scalar: 1.2 + Math.random() * 0.4,
        zIndex: 1000
      })
      
      // Right cannon chaos (offset timing)
      setTimeout(() => {
        confetti({
          origin: rightCannon,
          angle: angles[3 + Math.floor(Math.random() * 3)], // Last 3 angles
          spread: 60 + Math.random() * 40,
          particleCount: 50 + Math.random() * 30,
          startVelocity: speeds[Math.floor(Math.random() * speeds.length)],
          colors: partyColors[(chaosCount + 1) % partyColors.length],
          scalar: 1.2 + Math.random() * 0.4,
          zIndex: 1000
        })
      }, 100)

      chaosCount++
      if (chaosCount >= 15) { // 3 seconds of chaos
        clearInterval(chaosInterval)
      }
    }, 200)
  }

  // Enhanced celebration side cannons for add to cart
  const celebrationConfetti = () => {
    const duration = 5 * 1000 // 5 seconds
    const animationEnd = Date.now() + duration
    const leftCannon = { x: 0, y: 0.6 }
    const rightCannon = { x: 1, y: 0.6 }
    
    const defaults = { 
      startVelocity: 55, 
      spread: 70, 
      ticks: 180, 
      zIndex: 1000,
      scalar: 1.6
    }

    // Intense celebration from side cannons
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 80 * (timeLeft / duration)
      
      // Alternating side cannon bursts
      const sides = [
        { origin: leftCannon, angle: 45 },
        { origin: rightCannon, angle: 135 },
        { origin: leftCannon, angle: 30 },
        { origin: rightCannon, angle: 150 },
        { origin: leftCannon, angle: 60 },
        { origin: rightCannon, angle: 120 }
      ]
      
      for (let i = 0; i < sides.length; i++) {
        setTimeout(() => {
          confetti(Object.assign({}, defaults, { 
            particleCount: particleCount / sides.length,
            origin: sides[i].origin,
            angle: sides[i].angle,
            colors: ['#FFD700', '#FFA500', '#10B981', '#059669', '#3B82F6', '#8B5CF6', '#EF4444', '#F59E0B']
          }))
        }, i * 50)
      }
    }, 150)
  }
  
  // SEO Meta
  useHead({
    title: 'Complete Your Order - Recommended Accessories',
    meta: [
      { name: 'description', content: 'Perfect accessories to complement your recent purchase. High-quality products loved by our customers.' }
    ]
  })
  </script>
  
  <style scoped>
  /* Custom hover effects */
  .group:hover .group-hover\:scale-105 {
    transform: scale(1.05);
  }
  
  /* Purchase List Scrollbar - Specific to this component only */
  .purchase-list-scroll::-webkit-scrollbar {
    width: 4px;
    -webkit-appearance: none;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-track {
    background: transparent;
    -webkit-appearance: none;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
    -webkit-appearance: none;
  }
  
  /* Aggressively hide ALL scroll arrows/buttons */
  .purchase-list-scroll::-webkit-scrollbar-button {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
    -webkit-appearance: none !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-button:single-button {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-button:double-button {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-button:start {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-button:end {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-button:vertical {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-button:horizontal {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-button:increment {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-button:decrement {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-corner {
    display: none !important;
    background: transparent !important;
  }
  
  .purchase-list-scroll::-webkit-resizer {
    display: none !important;
  }
  
  /* Additional webkit specific hiding */
  .purchase-list-scroll::-webkit-scrollbar-track-piece {
    display: none !important;
  }
  
  .purchase-list-scroll::-webkit-scrollbar-thumb:window-inactive {
    background: #cbd5e1;
  }
  
  /* Firefox scrollbar styling */
  .purchase-list-scroll {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  /* Force no arrows on all browsers */
  .purchase-list-scroll {
    scrollbar-arrow-color: transparent !important;
  }
  
  /* For older webkit versions */
  .purchase-list-scroll::-webkit-scrollbar-button:start:decrement,
  .purchase-list-scroll::-webkit-scrollbar-button:end:increment {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
  }
  
  /* Swiper custom styles */
  .purchased-items-swiper {
    padding: 0 12px;
    height: auto;
  }
  
  .purchased-items__slide {
    height: auto;
  }
  
  /* Hide navigation buttons when not needed */
  .purchased-items__btn-prev.swiper-button-disabled,
  .purchased-items__btn-next.swiper-button-disabled {
    opacity: 0;
    pointer-events: none;
  }
  
  /* Product Images Swiper Styles */
  .product-images-swiper {
    height: 256px; /* h-64 for mobile - increased from 192px */
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden;
  }
  
  .product-images-swiper .swiper-wrapper {
    width: 100% !important;
  }
  
  .product-images-swiper .swiper-slide {
    width: 100% !important;
    flex-shrink: 0;
  }
  
  /* Medium screens and up */
  @media (min-width: 768px) {
    .product-images-swiper {
      height: 100%;
      min-height: 400px;
      width: 100% !important;
      max-width: 100% !important;
    }
  }
  
  /* Large screens and up */
  @media (min-width: 1024px) {
    .product-images-swiper {
      height: 100%;
      min-height: 400px;
      width: 100% !important;
      max-width: 100% !important;
    }
  }
  
  .product-images__pagination {
    display: flex !important;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }
  
  .product-images__pagination .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.8);
    opacity: 1;
  }
  
  .product-images__pagination .swiper-pagination-bullet-active {
    background: white;
    transform: scale(1.3);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    border-color: white;
  }
  
  /* Ensure pagination is always visible on mobile */
  @media (max-width: 768px) {
    .product-images__pagination {
      bottom: 16px !important;
      padding: 6px 12px;
    }
    
    .product-images__pagination .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
    }
  }
  
  /* Desktop positioning */
  @media (min-width: 1024px) {
    .product-images__pagination {
      bottom: 20px !important;
    }
  }
  
  /* Hide product navigation buttons when not needed */
  .product-images__btn-prev.swiper-button-disabled,
  .product-images__btn-next.swiper-button-disabled {
    opacity: 0;
    pointer-events: none;
  }
  
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-2px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(2px, 0, 0);
    }
  }
  
  .shake-animation {
    animation: shake 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  }
  </style>
  