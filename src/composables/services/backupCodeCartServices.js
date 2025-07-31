import { getPriceOfProduct, getDeliveryPrice } from '@/composables/services/helpers.js';
import eventBus from '@/composables/eventBus.js';

/**
 * Initialise un panier vide
 */
export function initializeCart() {
  return {
    _details: [],
    transport: null,
    transport_price: 0,
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
export function addToCart(cart, product, quantity = 1, options = null) {
  // Check if the product already exists in the cart
  const existingItem = cart._details.find(item => item.product_id === product.id);

  if (existingItem) {
    // Update existing item's quantity
    existingItem.quantity += quantity;
    // Recalculate prices for the item
    const unit_price = getPriceOfProduct(product, existingItem.quantity);
    existingItem.price_ttc = product.price;
    existingItem.price_ttc_after_discount = unit_price;
    existingItem.final_price = unit_price * existingItem.quantity;
    existingItem.discount = product.price - unit_price;
    existingItem.product_attrs = product._attributs?.map(x => x.name).join(' ') || '';
    existingItem.product_thumb = product.photo_thumb;
    existingItem.options = options;
  } else {
    // Add new item to cart
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

  updateCart(cart);
}

/**
 * Supprime un produit du panier
 */
export function removeFromCart(cart, productId) {
  // Ensure _details is an array
  if (!Array.isArray(cart._details)) {
    cart._details = [];
  }
  cart._details = cart._details.filter(item => item.product_id !== productId);
  updateCart(cart);
}

/**
 * Met à jour le panier (recalcul totals)
 */
export function updateCart(cart) {
  if (!cart._details.length) {
    clearCart(cart);
    return;
  }

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
    cart.total = subtotal + deliveryPrice;
    cart.transport_price = deliveryPrice;
  } else if (cart.transport) {
    cart.total = subtotal + cart.transport.price;
    cart.transport_price = cart.transport.price;
  } else {
    cart.total = subtotal;
  }

  saveCart(cart);
}

/**
 * Vide complètement le panier
 */
export function clearCart(cart) {
  cart._details = [];
  cart.transport = null;
  cart.transport_price = 0;
  cart.discount = 0;
  cart.subtotal = 0;
  cart.total = 0;
  cart.total_amount = 0;
  cart.promoCode = '';
  cart.promoCodeDiscount = 0;
  saveCart(cart);
}

/**
 * Sauvegarde le panier dans localStorage
 */
export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  eventBus.emit('cart-updated');
  eventBus.emit('open-cart');
}

/**
 * Récupère un panier depuis localStorage
 */
export function getCartFromStorage() {
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

/**
 * Définit un code promo automatique
 */
export async function applyAutoDiscount(cart, companySlug, apiUrl) {
  try {
    const { default: axios } = await import('axios');

    const response = await axios.post(`${apiUrl}website/get-auto-discount`, {
      details: cart._details,
      code: cart.promoCode,
      slug: companySlug,
      delivery_price: cart.transport_price,
    });

    const discount = parseFloat(response.data.toFixed(2));
    cart.promoCodeDiscount = discount;
    cart.discount = discount;

    saveCart(cart);
  } catch (error) {
    console.error('Error applying auto discount:', error);
    cart.promoCodeDiscount = 0;
  }
}

 
///************ almost original ************** */
// // cartService.js

// import { getPriceOfProduct, getDeliveryPrice } from '@/composables/services/helpers.js'
// import eventBus from '@/composables/eventBus.js';

// /**
//  * Initialise un panier vide
//  */
// export function initializeCart() {
//   return {
//     _details: [],
//     transport: null,
//     transport_price: 0,
//     discount: 0,
//     subtotal: 0,
//     total: 0,
//     total_amount: 0,
//     promoCode: '',
//     promoCodeDiscount: 0,
//   }
// }

// /**
//  * Ajoute un produit au panier
//  */
// export function addToCart(cart, product, quantity = 1, options = null) {
//   const unit_price = getPriceOfProduct(product, quantity)
//   const detail = {
//     _product: product,
//     quantity,
//     product_name: product.name,
//     product_id: product.id,
//     product_parent_id: product.parent || product.id,
//     category_id: product.category,
//     product_ref: product.reference,
//     active_stock: product.active_stock,
//     price_ttc: product.price,
//     price_ttc_after_discount: unit_price,
//     final_price: unit_price * quantity,
//     discount: product.price - unit_price,
//     product_attrs: product._attributs?.map(x => x.name).join(' ') || '',
//     product_thumb: product.photo_thumb,
//     options
//   }

//   cart._details.push(detail)
//   updateCart(cart)
// }

// /**
//  * Supprime un produit du panier
//  */
// export function removeFromCart(cart, productId) {
//   cart._details = cart._details.filter(item => item.product_id !== productId)
//   updateCart(cart)
// }

// /**
//  * Met à jour le panier (recalcul totals)
//  */
// export function updateCart(cart) {
//   if (!cart._details.length) {
//     clearCart(cart)
//     return
//   }

//   let subtotal = 0
//   cart._details.forEach(detail => {
//     const price = getPriceOfProduct(detail._product, detail.quantity)
//     detail.final_price = parseFloat((detail.quantity * price).toFixed(2))
//     detail.price_ttc_after_discount = parseFloat(price.toFixed(2))
//     detail.discount = parseFloat((detail.price_ttc - price).toFixed(2))

//     subtotal += detail.final_price
//   })

//   cart.subtotal = cart.total_amount = subtotal
//   cart.discount = cart.promoCodeDiscount || 0

//   const deliveryPrice = getDeliveryPrice(cart)
//   if (deliveryPrice != null) {
//     cart.total = subtotal + deliveryPrice
//     cart.transport_price = deliveryPrice
//   } else if (cart.transport) {
//     cart.total = subtotal + cart.transport.price
//     cart.transport_price = cart.transport.price
//   } else {
//     cart.total = subtotal
//   }

//   saveCart(cart)
// }

// /**
//  * Vide complètement le panier
//  */
// export function clearCart(cart) {
//   cart._details = []
//   cart.transport = null
//   cart.transport_price = 0
//   cart.discount = 0
//   cart.subtotal = 0
//   cart.total = 0
//   cart.total_amount = 0
//   cart.promoCode = ''
//   cart.promoCodeDiscount = 0
//   saveCart(cart)
// }

// /**
//  * Sauvegarde le panier dans localStorage
//  */
// export function saveCart(cart) {
//   localStorage.setItem('cart', JSON.stringify(cart))
//   eventBus.emit('cart-updated'); 
//   eventBus.emit('open-cart');
// }

// /**
//  * Récupère un panier depuis localStorage
//  */
// export function getCartFromStorage() {
//   const cart = localStorage.getItem('cart')
//   return cart ? JSON.parse(cart) : initializeCart()
// }

// /**
//  * Définit un code promo automatique
//  */
// export async function applyAutoDiscount(cart, companySlug, apiUrl) {
//   try {
//     const { default: axios } = await import('axios')

//     const response = await axios.post(`${apiUrl}website/get-auto-discount`, {
//       details: cart._details,
//       code: cart.promoCode,
//       slug: companySlug,
//       delivery_price: cart.transport_price
//     })

//     const discount = parseFloat(response.data.toFixed(2))
//     cart.promoCodeDiscount = discount
//     cart.discount = discount

//     saveCart(cart)
//   } catch (error) {
//     console.error('Error applying auto discount:', error)
//     cart.promoCodeDiscount = 0
//   }
// }



//*********************original code */

// cartService.js

// import { getPriceOfProduct, getDeliveryPrice } from '@/helpers/helpers'

// /**
//  * Initialise un panier vide
//  */
// export function initializeCart() {
//   return {
//     _details: [],
//     transport: null,
//     transport_price: 0,
//     discount: 0,
//     subtotal: 0,
//     total: 0,
//     total_amount: 0,
//     promoCode: '',
//     promoCodeDiscount: 0,
//   }
// }

// /**
//  * Ajoute un produit au panier
//  */
// export function addToCart(cart, product, quantity = 1, options = null) {
//   const unit_price = getPriceOfProduct(product, quantity)
//   const detail = {
//     _product: product,
//     quantity,
//     product_name: product.name,
//     product_id: product.id,
//     product_parent_id: product.parent || product.id,
//     category_id: product.category,
//     product_ref: product.reference,
//     active_stock: product.active_stock,
//     price_ttc: product.price,
//     price_ttc_after_discount: unit_price,
//     final_price: unit_price * quantity,
//     discount: product.price - unit_price,
//     product_attrs: product._attributs?.map(x => x.name).join(' ') || '',
//     product_thumb: product.photo_thumb,
//     options
//   }

//   cart._details.push(detail)
//   updateCart(cart)
// }

// /**
//  * Supprime un produit du panier
//  */
// export function removeFromCart(cart, productId) {
//   cart._details = cart._details.filter(item => item.product_id !== productId)
//   updateCart(cart)
// }

// /**
//  * Met à jour le panier (recalcul totals)
//  */
// export function updateCart(cart) {
//   if (!cart._details.length) {
//     clearCart(cart)
//     return
//   }

//   let subtotal = 0
//   cart._details.forEach(detail => {
//     const price = getPriceOfProduct(detail._product, detail.quantity)
//     detail.final_price = parseFloat((detail.quantity * price).toFixed(2))
//     detail.price_ttc_after_discount = parseFloat(price.toFixed(2))
//     detail.discount = parseFloat((detail.price_ttc - price).toFixed(2))

//     subtotal += detail.final_price
//   })

//   cart.subtotal = cart.total_amount = subtotal
//   cart.discount = cart.promoCodeDiscount || 0

//   const deliveryPrice = getDeliveryPrice(cart)
//   if (deliveryPrice != null) {
//     cart.total = subtotal + deliveryPrice
//     cart.transport_price = deliveryPrice
//   } else if (cart.transport) {
//     cart.total = subtotal + cart.transport.price
//     cart.transport_price = cart.transport.price
//   } else {
//     cart.total = subtotal
//   }

//   saveCart(cart)
// }

// /**
//  * Vide complètement le panier
//  */
// export function clearCart(cart) {
//   cart._details = []
//   cart.transport = null
//   cart.transport_price = 0
//   cart.discount = 0
//   cart.subtotal = 0
//   cart.total = 0
//   cart.total_amount = 0
//   cart.promoCode = ''
//   cart.promoCodeDiscount = 0
//   saveCart(cart)
// }

// /**
//  * Sauvegarde le panier dans localStorage
//  */
// export function saveCart(cart) {
//   localStorage.setItem('cart', JSON.stringify(cart))
// }

// /**
//  * Récupère un panier depuis localStorage
//  */
// export function getCartFromStorage() {
//   const cart = localStorage.getItem('cart')
//   return cart ? JSON.parse(cart) : initializeCart()
// }

// /**
//  * Définit un code promo automatique
//  */
// export async function applyAutoDiscount(cart, companySlug, apiUrl) {
//   try {
//     const { default: axios } = await import('axios')

//     const response = await axios.post(`${apiUrl}website/get-auto-discount`, {
//       details: cart._details,
//       code: cart.promoCode,
//       slug: companySlug,
//       delivery_price: cart.transport_price
//     })

//     const discount = parseFloat(response.data.toFixed(2))
//     cart.promoCodeDiscount = discount
//     cart.discount = discount

//     saveCart(cart)
//   } catch (error) {
//     console.error('Error applying auto discount:', error)
//     cart.promoCodeDiscount = 0
//   }
// }


