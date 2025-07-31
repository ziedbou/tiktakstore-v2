import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
  const { $fbq } = nuxtApp;
  const { websiteInfo, isLoading, error } = useWebsiteInfo();
  console.log('%csrc\plugins\facebookPixel.client.ts:6 "initnuxtplugin"', 'color: #007acc;', "initnuxtplugin");

  while (isLoading.value) {
    await new Promise((resolve) => setTimeout(resolve, 100)); 
  }

  if (error.value || !websiteInfo.value?.tags_settings) {
    console.error('Failed to initialize Pixel: No settings or API error');
    return;
  }

  const { facebookPixel, other_pixels } = websiteInfo.value.tags_settings;

  if (facebookPixel) {
    console.log('%csrc\plugins\facebookPixel.client.ts:18 pixelId', 'color: #007acc;', facebookPixel);
    $fbq('init', facebookPixel);
  }

  if (other_pixels && Array.isArray(other_pixels)) {
    other_pixels.forEach((pixel, index) => {
      if (pixel.facebookPixel) {
        console.log(`%csrc\plugins\facebookPixel.client.ts:24 otherPixelId[${index}]`, 'color: #007acc;', pixel.facebookPixel);
        $fbq('init', pixel.facebookPixel);
      }
    });
  }

  if (!facebookPixel && (!other_pixels || other_pixels.length === 0)) {
    console.error('Failed to initialize Pixel: No Pixel IDs found');
  }
});