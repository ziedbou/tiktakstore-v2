// helpers.js
/* -------------------- GET SLUG OR SERVER -------------------- */

export function getSlugOrServer(url) {
    let host = url.split('://')[1]?.split(':')[0] || url;
    host = host.replace('www.', '');
    if (!host.includes('tiktak-store')) {
      return [host.split("/")[0], 'server'];
    } else {
      const slug = host.split('.')[0];
      return [slug, 'slug'];
    }
  }

/* -------------------- General Utilities -------------------- */
export function generateRange(size) {
    return Array.from({ length: size }, (_, i) => i);
}

export function imghttps(value) {
    if (!value) return '';
    if (value.includes('localhost')) return value;
    return value.replace('http:', 'https:').replace('api.tiktakpro.com', 'api.tiktak.space');
}

export function formatDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}


/**
 * Génère une URL embed à partir d'une URL YouTube
 */
export function getYoutubeEmbedUrl(url) {
  if (!url) return ''

  try {
    let video_id = url.split('v=')[1]
    const ampersandPosition = video_id.indexOf('&')
    if (ampersandPosition !== -1) {
      video_id = video_id.substring(0, ampersandPosition)
    }
    return `https://www.youtube.com/embed/${video_id}`
  } catch (error) {
    console.error('Erreur getYoutubeEmbedUrl:', error)
    return ''
  }
}


export function getLink(item, lang = 'fr') {
    let prefix = '';
    if (!item) return '';
    const slug = (item.slug || item.label || '').replace('/', '');
    if (item.type === 'category') {
        return `${prefix}/product-list/${item.id}/${slug}`;
    } else if (item.type === 'page') {
        return item.is_home ? '/' : `${prefix}/page/${item.id}/${slug}`;
    } else if (item.type === 'product') {
        return item.cat_id
            ? `${prefix}/product/${item.cat_id}/${slug}/${item.id}/${slug}`
            : `${prefix}/product/${item.id}/${slug}`;
    }
    return '';
}

export function getCategoryLink(cat) {
    const slug = cat.slug ? cat.slug : `category-${cat.label}`;
    return `/product-list/${cat.id}/${slug}`;
}

export function getProductLink(product, parent = false) {
    // try {
        const productId = parent ? (product.parent || product.id) : product.id;
        // const slug = product.seo_slug || product.name;
        // if (product._category) {
        //     const catSlug = product._category.seo_slug || product._category.name;
        //     return `/product/${product.category}/${catSlug.replace('/', '')}/${productId}/${slug.replace('/', '')}`;
        //     // return `/product/${productId}/${product.category}`;
        // }
        // return `/product/${productId}/${slug}`;
        // return `/product/${product.id}`;
        return `/product/${productId}`;
    // } catch {
    // }
}

/* -------------------- Price & Product Helpers -------------------- */
export function getCurrency(price, currencyDisplay = 'DT2') {
    if (price === 0) return '0';
    const decimals = parseInt(currencyDisplay.slice(-1)) || 2;
    return parseFloat(price).toFixed(decimals).replace(/(\.0+|0+)$/, '');
}

export function getPriceFromDiscountType(price, discount, discountType) {
    if (discountType === 'fixed_amount') return price - discount;
    if (discountType === 'percent') return price - (price * discount / 100);
    return price;
}

export function getPrice(product, currencyDisplay = 'DT2') {
    const price = getPriceFromDiscountType(product.price, product.discount, product.discount_type);
    return getCurrency(price, currencyDisplay);
}

export function getPriceOfProduct(product, quantity = 1, total = false, currencyDisplay = 'DT2') {
    if (!product) return 0;
    let price = getPriceFromDiscountType(product.price, product.discount, product.discount_type);

    if (product.formula && product.formula.length > 0 && quantity > 1) {
        const formula = findFormulaByQuantity(product.formula, quantity);
        if (formula) {
            price = getPriceFromDiscountType(product.price, formula.discount, formula.discount_type);
        }
    }
    const finalPrice = total ? price * quantity : price;
    return parseFloat(finalPrice.toFixed(3));
}

export function findFormulaByQuantity(formulas, quantity) {
    const sorted = [...formulas].sort((a, b) => b.quantity - a.quantity);
    return sorted.find(f => quantity >= f.quantity);
}

export function countAttributes(product) {
    return product.declinaisons?.[0]?.attributs?.length || 0;
}

export function regroupDeclinaisonsPerColor(product) {
    const regroupement = {};
    product.declinaisons?.forEach(declinaison => {
        const couleurAttribut = declinaison._attributs?.find(attr => attr.is_color);
        if (couleurAttribut) {
            const couleur = couleurAttribut.value;
            if (!regroupement[couleur]) {
                regroupement[couleur] = [];
            }
            regroupement[couleur].push(declinaison);
        }
    });
    return regroupement;
}

export function getAttrs(product) {
    return product._attributs?.map(attr => attr.name).join(' ') || '';
}

/* -------------------- Cart Helpers -------------------- */
export function calculateCartTotal(cart) {
    if (!cart || !cart._details) return 0;
    return cart._details.reduce((total, item) => {
        return total + (item.final_price || 0);
    }, 0);
}

export function getDeliveryPrice(cart) {
    const hasNonCustomDelivery = cart._details?.some(x => !x._product.custom_delivery_price);
    if (hasNonCustomDelivery) return null;

    const prices = cart._details
        .filter(x => x._product.custom_delivery_price)
        .map(x => x._product.delivery_price);

    return prices.length ? Math.max(...prices) : null;
}

/* -------------------- Reviews Helpers -------------------- */
export function hasReviews(extra) {
    return extra?.find(x => x.slug === 'avis') || false;
}

export function getRating(extra) {
    try {
        const reviewsSection = extra.find(x => x.slug === 'avis');
        const notes = reviewsSection.avis.map(x => x.note);
        const avg = notes.reduce((a, b) => a + b, 0) / notes.length * 100;
        return { avg, reviews_length: notes.length };
    } catch {
        return { avg: 90, reviews_length: 4 };
    }
}

/* -------------------- User Helpers -------------------- */
export function isLoggedIn() {
    return !!localStorage.getItem('_token');
}

/* -------------------- Search Helpers -------------------- */
export function calculateStock(product) {
    if (!product) return 0;
    if (product.declinaisons?.length > 0) {
        return product.declinaisons.reduce((sum, dec) => sum + (dec.stock || 0), 0);
    }
    return product.stock || 0;
}

/* -------------------- Facebook Pixel Tracking -------------------- */
export function sendEventFacebookConversion(eventType, data = {}) {
    try {
        if (typeof fbq !== 'undefined') {
            fbq('track', eventType, data);
        }
    } catch (error) {
        console.error('Error sending Facebook event', error);
    }
}

/* -------------------- Instagram Helpers -------------------- */
import axios from 'axios';

export async function fetchInstagramFeed(token) {
    const url = `https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&limit=9&access_token=${token}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching Instagram feed:', error);
        return null;
    }
}

/* -------------------- Loading Spinner Helpers -------------------- */
export function displayLoading() {
    if (!document.getElementById('loading-wrapper')) {
        const loader = document.createElement('div');
        loader.id = 'loading-wrapper';
        loader.innerHTML = `
            <div id="loading-text">LOADING</div>
            <div id="loading-content"></div>
        `;
        document.body.appendChild(loader);
    }
}

export function hideLoading() {
    const loader = document.getElementById('loading-wrapper');
    if (loader) loader.remove();
}
