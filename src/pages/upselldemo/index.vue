<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <!-- Main Card -->
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div class="relative">
          <!-- Header with gradient -->
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-white text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <h1 class="text-4xl font-bold mb-4">Upgrade to Pro</h1>
            <p class="text-xl text-blue-100">Unlock premium features and boost your business growth</p>
          </div>

          <!-- Special Offer Badge -->
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div class="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
              🔥 Limited Time: 50% OFF
            </div>
          </div>
        </div>

        <div class="px-8 py-12">
          <!-- Pricing Section -->
          <div class="text-center mb-12">
            <div class="flex items-center justify-center gap-4 mb-6">
              <span class="text-3xl text-gray-400 line-through">$99</span>
              <span class="text-5xl font-bold text-gray-900">$49</span>
              <span class="text-lg text-gray-600">/month</span>
            </div>
            <p class="text-gray-600">First 3 months, then $99/month. Cancel anytime.</p>
          </div>

          <!-- Features Grid -->
          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
              
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Advanced Analytics</h4>
                  <p class="text-sm text-gray-600">Deep insights into your store performance</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Priority Support</h4>
                  <p class="text-sm text-gray-600">24/7 dedicated customer support</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Unlimited Products</h4>
                  <p class="text-sm text-gray-600">No limits on your inventory</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Custom Branding</h4>
                  <p class="text-sm text-gray-600">Remove our branding, add yours</p>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Pro Features:</h3>
              
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Advanced Integrations</h4>
                  <p class="text-sm text-gray-600">Connect with 50+ third-party tools</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Marketing Automation</h4>
                  <p class="text-sm text-gray-600">Email campaigns and social media tools</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">API Access</h4>
                  <p class="text-sm text-gray-600">Full API for custom integrations</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">White-Label Solution</h4>
                  <p class="text-sm text-gray-600">Completely customize the platform</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Proof -->
          <div class="bg-gray-50 rounded-2xl p-6 mb-12">
            <div class="text-center mb-6">
              <div class="flex justify-center items-center gap-1 mb-2">
                <span class="text-2xl font-bold text-gray-900">4.9</span>
                <div class="flex gap-1">
                  <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p class="text-gray-600">Trusted by over 10,000+ businesses worldwide</p>
            </div>
            
            <div class="flex justify-center gap-8">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">156%</div>
                <div class="text-sm text-gray-600">Average Revenue Growth</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">2.5x</div>
                <div class="text-sm text-gray-600">Faster Store Setup</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">99.9%</div>
                <div class="text-sm text-gray-600">Uptime Guarantee</div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button 
              @click="acceptOffer"
              class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
                </svg>
                Upgrade Now - Save 50%
              </span>
            </button>
            
            <button 
              @click="declineOffer"
              class="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              Maybe Later
            </button>
          </div>

          <!-- Guarantee -->
          <div class="mt-8 text-center">
            <div class="inline-flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              30-day money-back guarantee • Cancel anytime • No hidden fees
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Handle accept offer
const acceptOffer = () => {
  // Add your logic here - redirect to payment or upgrade process
  // console.log('User accepted the offer');
  // Example: navigateTo('/checkout') or emit event
}

// Handle decline offer
const declineOffer = () => {
  // Add your logic here - redirect back or show alternative
  // console.log('User declined the offer');
  // Example: navigateTo('/dashboard') or show different offer
}

// SEO Meta
useHead({
  title: 'Upgrade to Pro - Unlock Premium Features',
  meta: [
    { name: 'description', content: 'Upgrade to Pro and unlock advanced features, priority support, and unlimited possibilities for your business.' }
  ]
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
