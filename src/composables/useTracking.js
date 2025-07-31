import { useNuxtApp } from '#app';
import { useFetch } from '#app';

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
    console.log('eventName', 'color: #007acc;', eventName);
    if (!websiteInfo.value?.tags_settings?.facebookPixel || !companyData.value?.currency) {
      console.error(`Cannot send ${eventName} to API: Missing Pixel ID or currency`);
      return;
    }
    const eventData = {
      company_id: companyId.value, 
      pixel: websiteInfo.value.tags_settings.facebookPixel,
      event_id: data.eventID || generateEventId(),
      url: window.location.href,
      currency: companyData.value.currency,
      event_type: eventName,
      cart: data.contents || [], // For InitiateCheckout and Purchase
      data: data.userData || {}, // For Purchase
      price: data.value || 0, // For ViewContent, AddToCart, InitiateCheckout, Purchase
    };

    try {
      const response = await useFetch(`${baseURL}send-event`, {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`%c${eventName} sent to API`, 'color: #007acc;', response);
    } catch (err) {
      console.error(`Error sending ${eventName} to API:`, err);
    }
  };

  const trackPageView = () => {
    if (!$fbq) {
      console.error('Facebook Pixel ($fbq) not available trackPageView');
      return;
    }
    const eventId = generateEventId();
    try {
      $fbq('track', 'pageView', {});
      // NewEvent('PageView', { eventID: eventId });
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
    };
    try {
      $fbq('track', 'ViewContent', eventData, { eventID: eventId });
      console.log('%cViewContent tracked', 'color: #007acc;', eventData);
      // NewEvent('ViewContent', eventData);
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
      content_ids: [product.id.toString()],
      content_type: 'product_group',
      value: product.price,
      currency: companyData.value?.currency || 'TND',
      eventID: eventId,
    };
    try {
      $fbq('track', 'AddToCart', eventData, { eventID: eventId });
      console.log('%cAddToCart tracked', 'color: #007acc;', eventData);
      // NewEvent('AddToCart', eventData);
    } catch (err) {
      console.error('Error tracking AddToCart:', err);
    }
  };

  const trackInitiateCheckout = (cart) => {
    if (!$fbq) {
      console.error('Facebook Pixel ($fbq) not available');
      return;
    }
    const eventId = generateEventId();
    const productIds = cart.items.map(item => item.product_parent_id.toString());
    const contents = cart.items.map(item => ({
      id: item.product_parent_id.toString(),
      quantity: item.quantity,
    }));
    const eventData = {
      content_ids: productIds,
      content_type: 'product_group',
      value: cart.total || 0,
      currency: companyData.value?.currency || 'TND',
      contents,
      eventID: eventId,
    };
    try {
      $fbq('track', 'InitiateCheckout', eventData, { eventID: eventId });
      console.log('%cInitiateCheckout tracked', 'color: #007acc;', eventData);
      // NewEvent('InitiateCheckout', eventData);
    } catch (err) {
      console.error('Error tracking InitiateCheckout:', err);
    }
  };

  const trackPurchase = (order) => {
    if (!$fbq) {
      console.error('Facebook Pixel ($fbq) not available');
      return;
    }
    const eventId = generateEventId();
    const contents = order.details.map(detail => ({
      id: detail.product_parent_id.toString(),
      quantity: detail.quantity,
    }));
    const eventData = {
      content_ids: contents.map(item => item.id),
      content_type: 'product',
      value: order.total_after_discount || 0,
      currency: companyData.value?.currency || 'TND',
      contents,
      order_id: order.id?.toString(),
      eventID: eventId,
      userData: {
        phone: order.phone,
        email: order.email,
      },
    };
    try {
      $fbq('track', 'Purchase', eventData, { eventID: eventId });
      console.log('%cPurchase tracked', 'color: #007acc;', eventData);
      // NewEvent('Purchase', eventData);
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

// import { useNuxtApp } from '#app';
// import { useFetch } from '#app';
// import type { Ref } from 'vue';
// import type { Cart, Order, Product } from '~/types';

// interface EventData {
//   eventID?: string;
//   content_ids?: string | string[];
//   content_type?: string;
//   value?: number;
//   currency?: string;
//   contents?: Array<{ id: string; quantity: number }>;
//   order_id?: string;
//   userData?: { phone?: string; email?: string };
// }

// interface CompanyData {
//   currency?: string;
// }

// interface WebsiteInfo {
//   tags_settings?: { facebookPixel?: string };
// }

// export function useTracking() {
//   const { $fbq } = useNuxtApp();
//   const { companyData, companyId } = useCompanyData();
//   const { websiteInfo } = useWebsiteInfo();
//   const config = useRuntimeConfig();
//   const baseURL = config.public.baseURL;

//   const generateEventId = (): string => {
//     return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//   };

//   const sendEventToAPI = async (eventName: string, data: EventData): Promise<void> => {
//     if (!websiteInfo.value?.tags_settings?.facebookPixel || !companyData.value?.currency) {
//       console.error(`Cannot send ${eventName} to API: Missing Pixel ID or currency`);
//       return;
//     }

//     const eventData = {
//       company_id: companyId.value,
//       pixel: websiteInfo.value.tags_settings.facebookPixel,
//       event_id: data.eventID || generateEventId(),
//       url: process.client ? window.location.href : '',
//       currency: companyData.value.currency,
//       event_type: eventName,
//       cart: data.contents || [],
//       data: data.userData || {},
//       price: data.value || 0,
//     };

//     try {
//       const { error } = await useFetch(`${baseURL}send-event`, {
//         method: 'POST',
//         body: eventData,
//       });
//       if (error.value) {
//         throw new Error(`API error: ${error.value.message}`);
//       }
//       console.log(`%c${eventName} sent to API`, 'color: #007acc;', eventData);
//     } catch (err) {
//       console.error(`Error sending ${eventName} to API:`, err);
//     }
//   };

//   const trackPageView = (): void => {
//     if (!$fbq) {
//       console.error('Facebook Pixel ($fbq) not available for trackPageView');
//       return;
//     }
//     const eventId = generateEventId();
//     try {
//       $fbq('track', 'PageView', {}, { eventID: eventId });
//       console.log('%cPageView tracked', 'color: #007acc;', { eventID: eventId });
//     } catch (err) {
//       console.error('Error tracking PageView:', err);
//     }
//   };

//   const trackViewContent = (product: Product): void => {
//     if (!$fbq) {
//       console.error('Facebook Pixel ($fbq) not available');
//       return;
//     }
//     const eventId = generateEventId();
//     const eventData: EventData = {
//       content_ids: product.id.toString(),
//       content_type: 'product',
//       value: product.price,
//       currency: companyData.value?.currency || 'TND',
//       eventID: eventId,
//     };
//     try {
//       $fbq('track', 'ViewContent', eventData, { eventID: eventId });
//       console.log('%cViewContent tracked', 'color: #007acc;', eventData);
//     } catch (err) {
//       console.error('Error tracking ViewContent:', err);
//     }
//   };

//   const trackAddToCart = (product: Product): void => {
//     if (!$fbq) {
//       console.error('Facebook Pixel ($fbq) not available');
//       return;
//     }
//     const eventId = generateEventId();
//     const eventData: EventData = {
//       content_ids: [product.id.toString()],
//       content_type: 'product_group',
//       value: product.price,
//       currency: companyData.value?.currency || 'TND',
//       eventID: eventId,
//     };
//     try {
//       $fbq('track', 'AddToCart', eventData, { eventID: eventId });
//       console.log('%cAddToCart tracked', 'color: #007acc;', eventData);
//     } catch (err) {
//       console.error('Error tracking AddToCart:', err);
//     }
//   };

//   const trackInitiateCheckout = (cart: Cart): void => {
//     if (!$fbq) {
//       console.error('Facebook Pixel ($fbq) not available');
//       return;
//     }
//     const eventId = generateEventId();
//     const productIds = cart.items.map(item => item.product_parent_id.toString());
//     const contents = cart.items.map(item => ({
//       id: item.product_parent_id.toString(),
//       quantity: item.quantity,
//     }));
//     const eventData: EventData = {
//       content_ids: productIds,
//       content_type: 'product_group',
//       value: cart.total || 0,
//       currency: companyData.value?.currency || 'TND',
//       contents,
//       eventID: eventId,
//     };
//     try {
//       $fbq('track', 'InitiateCheckout', eventData, { eventID: eventId });
//       console.log('%cInitiateCheckout tracked', 'color: #007acc;', eventData);
//     } catch (err) {
//       console.error('Error tracking InitiateCheckout:', err);
//     }
//   };

//   const trackPurchase = (order: Order): void => {
//     if (!$fbq) {
//       console.error('Facebook Pixel ($fbq) not available');
//       return;
//     }
//     const eventId = generateEventId();
//     const contents = order.details.map(detail => ({
//       id: detail.product_parent_id.toString(),
//       quantity: detail.quantity,
//     }));
//     const eventData: EventData = {
//       content_ids: contents.map(item => item.id),
//       content_type: 'product',
//       value: order.total_after_discount || 0,
//       currency: companyData.value?.currency || 'TND',
//       contents,
//       order_id: order.id?.toString(),
//       eventID: eventId,
//       userData: {
//         phone: order.phone,
//         email: order.email,
//       },
//     };
//     try {
//       $fbq('track', 'Purchase', eventData, { eventID: eventId });
//       console.log('%cPurchase tracked', 'color: #007acc;', eventData);
//     } catch (err) {
//       console.error('Error tracking Purchase:', err);
//     }
//   };

//   return {
//     trackPageView,
//     trackViewContent,
//     trackAddToCart,
//     trackInitiateCheckout,
//     trackPurchase,
//   };
// }