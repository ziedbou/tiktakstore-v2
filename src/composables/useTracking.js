import { useNuxtApp } from '#app';
import { useFetch } from '#app';
import { getCartFromStorage } from './services/cartService';

export function useTracking() {
  const { $fbq } = useNuxtApp();
  const { companyData, companyId } = useCompanyData();
  const { websiteInfo } = useWebsiteInfo();
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;

  const generateEventId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const NewEvent = async (eventName, data) => {
    // console.log('%ceventName', 'color: #007acc;', eventName);
    if (!websiteInfo.value?.tags_settings?.facebookPixel || !companyData.value?.currency) {
      console.error(`Cannot send ${eventName} to API: Missing Pixel ID or currency`);
      return;
    }

    const cart = getCartFromStorage();
    const __details = cart?._details
      ?.filter(x => x.quantity > 0)
      .map(x => ({ id: x.product_parent_id, quantity: x.quantity })) || [];
    const __content_ids = __details.map(item => item.id);
    // console.log("websiteInfo.value?.tags_settings?.facebookToken", websiteInfo.value?.tags_settings?.facebookPixel,  websiteInfo.value?.tags_settings?.pixel_token);
    const eventData = {
      company_id: companyId.value,
      access_token: websiteInfo.value?.tags_settings?.pixel_token,
      event_id: data.eventID || generateEventId(),
      pixel: websiteInfo.value?.tags_settings?.facebookPixel,
      event_type: eventName,
      url: window.location.href,
      currency: companyData.value?.currency,
      cart: __details,
      content_ids: __content_ids,
      pixels: data.pixels || [],
      ...data
    };

    // console.log(`%cSending ${eventName} to API`, 'color: #007acc;', eventData);

    try {
    const response = await fetch(`${baseURL}send-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API error: ${data.message || response.statusText}`);
    }

    // console.log(`%c${eventName} sent to API`, 'color: #007acc;', data);
  } catch (err) {
    console.error(`Error sending ${eventName} to API:`, err.message);
  }
  };

  const trackPageView = () => {
    if (!window.fbq) {
      console.error('Meta Pixel script (fbq) not loaded');
      return;
    }
    if (!$fbq) {
      console.error('Facebook Pixel ($fbq) not available for trackPageView');
      return;
    }
    const eventId = generateEventId();
    try {
      $fbq('track', 'PageView', {}, { eventID: eventId });
      // console.log('%cPageView tracked', 'color: #007acc;', { eventID: eventId });
      NewEvent('PageView', { eventID: eventId });
    } catch (err) {
      console.error('Error tracking PageView:', err);
    }
  };

  const trackViewContent = (product) => {
    if (!$fbq) {
      console.error('Facebook Pixel ($fbq) not available');
      return;
    }
    const eventId = generateEventId();
    const eventData = {
      content_ids: product.id.toString(),
      content_type: 'product',
      value: product.price,
      currency: companyData.value?.currency || 'TND',
      eventID: eventId,
    };
    try {
      $fbq('track', 'ViewContent', eventData, { eventID: eventId });
      // console.log('%cViewContent tracked', 'color: #007acc;', eventData);
      NewEvent('ViewContent', eventData);
    } catch (err) {
      console.error('Error tracking ViewContent:', err);
    }
  };

  const trackAddToCart = (product) => {
    if (!$fbq) {
      console.error('Facebook Pixel ($fbq) not available');
      return;
    }
    const eventId = generateEventId();
    const eventData = {
      content_ids: [product.parent ? product.parent.toString() : product.id.toString()],
      content_type: 'product_group',
      value: product.price,
      currency: companyData.value?.currency || 'TND',
      eventID: eventId,
    };
    try {
      $fbq('track', 'AddToCart', eventData, { eventID: eventId });
      // console.log('%cAddToCart tracked', 'color: #007acc;', eventData);
      NewEvent('AddToCart', eventData);
    } catch (err) {
      console.error('Error tracking AddToCart:', err);
    }
  };

  const trackInitiateCheckout = () => {
    if (!$fbq) {
      console.error('Facebook Pixel ($fbq) not available');
      return;
    }
    const cart = getCartFromStorage();
    // console.log('%cCart details', 'color: #007acc;', cart._details);
    const eventId = generateEventId();
    const productIds = cart?._details.filter(x => x.quantity > 0).map(x => x.product_parent_id);
    const eventData = {
      content_ids: productIds,
      content_type: 'product_group',
      value: cart.total || 0,
      currency: companyData.value?.currency || 'TND',
      eventID: eventId,
    };
    try {
      $fbq('track', 'InitiateCheckout', eventData, { eventID: eventId });
      // console.log('%cInitiateCheckout tracked', 'color: #007acc;', eventData);
      NewEvent('InitiateCheckout', eventData);
    } catch (err) {
      console.error('Error tracking InitiateCheckout:', err);
    }
  };

  const trackPurchase = (order_id) => {
    if (!$fbq) {
      console.error('Facebook Pixel ($fbq) not available');
      return;
    }
    const cart = getCartFromStorage();
    const eventId = generateEventId();
    const productIds = cart?._details.filter(x => x.quantity > 0).map(x => x.product_parent_id);
    const eventData = {
      content_ids: productIds,
      content_type: 'product',
      value: cart.total || 0,
      currency: companyData.value?.currency || 'TND',
      order_id,
      eventID: eventId,
    };
    try {
      $fbq('track', 'Purchase', eventData, { eventID: eventId });
      // console.log('%cPurchase tracked', 'color: #007acc;', eventData);
      NewEvent('Purchase', eventData);
    } catch (err) {
      console.error('Error tracking Purchase:', err);
    }
  };

  return {
    trackPageView,
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
  };
}