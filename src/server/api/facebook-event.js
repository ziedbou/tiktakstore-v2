import { defineEventHandler, readBody, getCookie } from 'h3';
import axios from 'axios';
import { createHash } from 'crypto';

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    return { message: 'Only POST requests are allowed', status: 405 };
  }

  const _data = await readBody(event);

  const {
    access_token,
    event_id,
    event_type,
    url,
    content_ids,
    price,
    currency,
    quantity,
    cart,
    data,
    pixels = [],
    pixel: base_pixel,
  } = _data;

  const client_user_agent = event.node.req.headers['user-agent'] || _data.client_user_agent;

  if (!access_token || !event_id || !event_type) {
    return { message: 'access_token, event_id, and event_type are required', status: 400 };
  }

  const client_ip_address = event.node.req.socket.remoteAddress || 'unknown';

  let fbp = getCookie(event, '_fbp');
  let fbc = getCookie(event, '_fbc');

  if (fbp && fbp.split('fb.1.').length > 2) {
    fbp = 'fb.1.' + fbp.split('fb.1.')[1];
  }

  fbc = fbc && fbc.startsWith('fb.1.') ? fbc : null;

  const all_pixels = [base_pixel, ...pixels.map((p) => p.facebookPixel)];

  const hashData = (data) => {
    if (!data) return null;
    return createHash('sha256').update(data).digest('hex');
  };

  class FacebookEventSender {
    constructor({ access_token, event_id, client_ip_address, pixel, client_user_agent, fbp, fbc }) {
      this.access_token = access_token;
      this.event_id = event_id;
      this.client_ip_address = client_ip_address;
      this.pixel = pixel;
      this.client_user_agent = client_user_agent;
      this.fbp = fbp;
      this.fbc = fbc;
    }

    async send_event(event_name, payload, em = null, ph = null) {
      const url = `https://graph.facebook.com/v18.0/${this.pixel}/events`;
      const headers = { 'Content-Type': 'application/json' };
      const params = { access_token: this.access_token };

      const user_data = {
        client_ip_address: this.client_ip_address,
        client_user_agent: this.client_user_agent,
        fbp: this.fbp,
      };

      if (em) user_data.em = em;
      if (ph) user_data.ph = ph;

      const event_data = {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: this.event_id,
        action_source: 'website',
        user_data,
        custom_data: payload,
      };

      try {
        const response = await axios.post(url, { data: [event_data] }, { headers, params });
        return response.data;
      } catch (error) {
        console.error(`Error sending ${event_name} to pixel ${this.pixel}:`, error.message);
        return { error: error.message };
      }
    }

    async send_page_view(page_url) {
      const payload = { event_source_url: page_url };
      return this.send_event('PageView', payload);
    }

    async view_content(page_url, content_id, price, currency) {
      const payload = {
        event_source_url: page_url,
        content_ids: [content_id],
        value: price,
        content_type: 'product',
        currency,
      };
      return this.send_event('ViewContent', payload);
    }

    async add_to_cart(page_url, price, currency, cart) {
      const payload = {
        event_source_url: page_url,
        content_ids: cart.map((obj) => obj.id),
        content_type: 'product',
        value: price,
        currency,
        contents: cart,
      };
      return this.send_event('AddToCart', payload);
    }

    async initiate_checkout(page_url, price, currency, cart, data) {
      const email = data?.email || '';
      const phone = data?.phone || '';
      const em = email ? hashData(email) : null;
      const ph = phone ? hashData(phone) : null;

      const payload = {
        event_source_url: page_url,
        content_type: 'product',
        value: price,
        currency,
        contents: cart,
      };
      return this.send_event('InitiateCheckout', payload, em, ph);
    }

    async purchase(page_url, price, currency, cart, data) {
      const email = data?.email || '';
      const phone = data?.phone || '';
      const em = email ? hashData(email) : null;
      const ph = phone ? hashData(phone) : null;

      // Aggregate quantities for identical product IDs
      const product_quantities = {};
      for (const item of cart) {
        product_quantities[item.id] = (product_quantities[item.id] || 0) + (item.quantity || 1);
      }

      const merged_contents = Object.entries(product_quantities).map(([id, quantity]) => ({
        id,
        quantity,
      }));
      const content_ids = Object.keys(product_quantities);

      const payload = {
        event_source_url: page_url,
        content_type: 'product',
        value: price,
        currency,
        contents: merged_contents,
        content_ids,
      };

      return this.send_event('Purchase', payload, em, ph);
    }
  }

  // Process events for all pixels
  const results = [];
  for (const pixel of all_pixels) {
    const sender = new FacebookEventSender({
      access_token,
      event_id,
      pixel,
      client_ip_address,
      client_user_agent,
      fbp,
      fbc,
    });

    let result;
    switch (event_type) {
      case 'page_view':
        result = await sender.send_page_view(url);
        break;
      case 'ViewContent':
        result = await sender.view_content(url, content_ids, price, currency);
        break;
      case 'AddToCart':
        result = await sender.add_to_cart(url, price, currency, cart);
        break;
      case 'InitiateCheckout':
        result = await sender.initiate_checkout(url, price, currency, cart, data);
        break;
      case 'Purchase':
        result = await sender.purchase(url, price, currency, cart, data);
        break;
      default:
        return { message: `Unsupported event_type: ${event_type}`, status: 400 };
    }
    results.push({ pixel, result });
  }

  return { message: 'Events sent successfully to all pixels', results };
});


// <script setup>
// const sendFacebookEvent = async () => {
//   const payload = {
//     access_token: 'your-access-token',
//     event_id: 'event-123',
//     event_type: 'page_view',
//     url: window.location.href,
//     pixel: 'your-pixel-id',
//     pixels: [{ facebookPixel: 'additional-pixel-id' }],
//   };

//   const { data, error } = await useFetch('/api/facebook-event', {
//     method: 'POST',
//     body: payload,
//   });

//   if (error.value) {
//     console.error('Error sending event:', error.value);
//   } else {
//     console.log('Event sent:', data.value);
//   }
// };
// </script>

// <template>
//   <button @click="sendFacebookEvent">Send Facebook Event</button>
// </template>