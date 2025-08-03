import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
  const { websiteInfo, isLoading, error } = useWebsiteInfo();
  // console.log('%cplugins/facebook-pixel-manual.client.js: init plugin', 'color: #007acc;');

  while (isLoading.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (error.value || !websiteInfo.value?.tags_settings) {
    console.error('Failed to initialize Pixel: No settings or API error');
    return;
  }

  const { facebookPixel, other_pixels } = websiteInfo.value.tags_settings;

  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');

  if (facebookPixel) {
    // console.log('%cplugins/facebook-pixel-manual.client.js: Primary Pixel ID', 'color: #007acc;', facebookPixel);
    window.fbq('init', facebookPixel);
  }

  if (other_pixels && Array.isArray(other_pixels)) {
    other_pixels.forEach((pixel, index) => {
      if (pixel.facebookPixel) {
        // console.log(`%cplugins/facebook-pixel-manual.client.js: Other Pixel ID[${index}]`, 'color: #007acc;', pixel.facebookPixel);
        window.fbq('init', pixel.facebookPixel);
        
      }
    });
  }

  if (!facebookPixel && (!other_pixels || other_pixels.length === 0)) {
    console.error('Failed to initialize Pixel: No Pixel IDs found');
    return;
  }

  return {
    provide: {
      fbq: window.fbq
    }
  };
});