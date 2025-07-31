import { getPriceOfProduct, getDeliveryPrice } from '@/composables/services/helpers.js';
import eventBus from '@/composables/eventBus.js';
import axios from 'axios';


 /* Initialise un panier vide
 */
export function initializeCart() {
  return {
    _details: [],
    transport: null,
    transport_id: null,
    transport_price: 0,
    transport_list: [],
    discount: 0,
    subtotal: 0,
    total: 0,
    total_amount: 0,
    promoCode: '',
    promoCodeDiscount: 0,
  };
}

/**
 * Ajoute un produit au panier ou met à jour la quantité si le produit existe
 */
export function addToCart(product, quantity = 1, options = null, companySlug = null,openCart = true) {
  const cart = getCartFromStorage();
  const existingItem = cart._details.find(item => item.product_id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
    const unit_price = getPriceOfProduct(product, existingItem.quantity);
    existingItem.price_ttc = product.price;
    existingItem.price_ttc_after_discount = unit_price;
    existingItem.final_price = unit_price * existingItem.quantity;
    existingItem.discount = product.price - unit_price;
    existingItem.product_attrs = product._attributs?.map(x => x.name).join(' ') || '';
    existingItem.product_thumb = product.photo_thumb;
    existingItem.options = options;
  } else {
    const unit_price = getPriceOfProduct(product, quantity);
    const detail = {
      _product: product,
      quantity,
      product_name: product.name,
      product_id: product.id,
      product_parent_id: product.parent || product.id,
      category_id: product.category,
      product_ref: product.reference,
      active_stock: product.active_stock,
      price_ttc: product.price,
      price_ttc_after_discount: unit_price,
      final_price: unit_price * quantity,
      discount: product.price - unit_price,
      product_attrs: product._attributs?.map(x => x.name).join(' ') || '',
      product_thumb: product.photo_thumb,
      options,
    };
    cart._details.push(detail);
  }

  updateCart(cart,openCart);
  if (companySlug) {
    applyAutoDiscount(companySlug);
  }
}

export function updateCartItemQuantity(productId, quantity, companySlug = null) {
  const cart = getCartFromStorage();
  const item = cart._details.find(item => item.product_id === productId);
  if (item) {
    item.quantity = quantity;
    updateCart(cart,false);
  }
  if (companySlug) {
    applyAutoDiscount(companySlug);
  }
}
/**
 * Supprime un produit du panier
 */
export function removeFromCart(productId, companySlug = null) {
  // Ensure _details is an array
  const cart = getCartFromStorage();
  if (!Array.isArray(cart._details)) {
    cart._details = [];
  }
  cart._details = cart._details.filter(item => item.product_id !== productId);
  updateCart(cart, false);
  if (companySlug) {
    applyAutoDiscount(companySlug);
  }
}

/**
 * Met à jour le panier (recalcul totals)
 */
export function updateCart(cart,openCart = true) {
  if (!cart._details.length) {
    clearCart(cart,false);
    return;
  }
  // console.log('UPDATE CART');
  let subtotal = 0;
  cart._details.forEach(detail => {
    const price = getPriceOfProduct(detail._product, detail.quantity);
    detail.final_price = parseFloat((detail.quantity * price).toFixed(2));
    detail.price_ttc_after_discount = parseFloat(price.toFixed(2));
    detail.discount = parseFloat((detail.price_ttc - price).toFixed(2));

    subtotal += detail.final_price;
  });

  cart.subtotal = cart.total_amount = subtotal;
  cart.discount = cart.promoCodeDiscount || 0;

  const deliveryPrice = getDeliveryPrice(cart);
  if (deliveryPrice != null) {
    cart.total = subtotal - cart.discount + deliveryPrice;
    cart.transport_price = deliveryPrice;
  } else if (cart.transport) {
    cart.total = subtotal - cart.discount + cart.transport.price;
    cart.transport_price = cart.transport.price;
  } else {
    cart.total = subtotal - cart.discount;
  }
  saveCart(cart,openCart);
}

/**
 * Vide complètement le panier
 */
export function clearCart(cart,openCart = true) {
  cart._details = [];
  cart.discount = 0;
  cart.subtotal = 0;
  cart.total = 0;
  cart.total_amount = 0;
  cart.promoCode = '';
  cart.promoCodeDiscount = 0;
  saveCart(cart,openCart);
}

export function handleClearCart() {
  const cart = getCartFromStorage();
  clearCart(cart,false)
}

/**
 * Sauvegarde le panier dans localStorage
 */
export function saveCart(cart,openCart = true) {
  localStorage.setItem('cart', JSON.stringify(cart));
  eventBus.emit('cart-updated');
  if (openCart) {
    eventBus.emit('open-cart');
  }
}

/**
 * Récupère un panier depuis localStorage
 */
export function getCartFromStorage() {
  if (process.client) { // Only access localStorage on the client
    try {
      const cart = localStorage.getItem('cart');
      if (!cart) {
        return initializeCart();
      }
      const parsedCart = JSON.parse(cart);
      // Validate cart structure
      if (!parsedCart || typeof parsedCart !== 'object' || !Array.isArray(parsedCart._details)) {
        console.warn('Invalid cart in localStorage, initializing new cart');
        return initializeCart();
      }
  
      return parsedCart;
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return initializeCart();
    }
  }
}

/**
 * Définit un code promo automatique
 */
export async function applyAutoDiscount(companySlug) {
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  try {
    const cart = getCartFromStorage();
    // API request
    const {data} = await axios.post(`${baseURL}website/get-auto-discount`, {
      details: cart._details,
      code: cart.promoCode='autopromo'?'':cart.promoCode,
      slug: companySlug,
      delivery_price: cart.transport_price,
    });

    const discount = parseFloat(data.toFixed(2));
    cart.promoCodeDiscount = discount;
    cart.discount = discount;
    if (discount > 0) {
      cart.promoCode = "autopromo";
    }
    
    setTimeout(() => {
      updateCart(cart, false);
    }, 100);

  } catch (error) {
    console.error('Error applying auto discount:', error);
    cart.promoCodeDiscount = 0;
  }
}

 
// Update cart with transporter
export function updateCartTransporter(transporter) {
  try {
    const cart = getCartFromStorage();
    
    // Add transporter info
    cart.transport = JSON.parse(JSON.stringify(transporter));
    cart.transport_id = transporter.id;
    cart.transport_price = transporter.price;
    
    // Update cart totals with the new transport price
    updateCart(cart, false);
  } catch (error) {
    console.error('Error updating cart transporter:', error);
  }
};

// Select a transporter by ID
export function selectTransporter(transporterId) {
  const cart = getCartFromStorage();
  const transporter = cart.transport_list?.find(t => t.id === transporterId);
  if (transporter) {
    updateCartTransporter(transporter);
  }
}

/**
 * Process transporters data from API response and update cart
 * @param {Object} data - Transport data from API response
 * @param {Object} companyData - Company data to check transport settings
 */
export function processTransporters(data, companyData) {
  if (!data?.results || !companyData?.works_with_transport) return;
  
  // Get the cart from storage
  const cart = getCartFromStorage();
  
  // Always store all transporters in the cart
  cart.transport_list = JSON.parse(JSON.stringify(data.results));

  // Save the cart with transport_list regardless of default transport
  saveCart(cart, false);

  // Find default transporter if needed
  if (data.results.length > 0) {
    let defaultTransporter = null;

    // If multiple transporters, find the default one
    defaultTransporter = data.results.find(x => x.default === true);
    
    // Update the cart with the default transporter
    if (defaultTransporter) {
      updateCartTransporter(defaultTransporter);
    } else {
      // If no default transporter, clear the transport but keep the list
      /*cart.transport = null;
      cart.transport_id = null;
      cart.transport_price = 0;*/
      saveCart(cart, false);
    }
  }
}
