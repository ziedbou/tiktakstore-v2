// wishlistService.js

/**
 * Récupère la liste des favoris de l'utilisateur depuis localStorage
 */
export function getWishlist() {
  const wishlist = localStorage.getItem('wishlist')
  return wishlist ? JSON.parse(wishlist) : []
}

/**
 * Ajoute un produit à la liste de souhaits
 */
export function addToWishlist(productId) {
  let wishlist = getWishlist()
  if (!wishlist.includes(productId)) {
    wishlist.push(productId)
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }
}

/**
 * Supprime un produit de la liste de souhaits
 */
export function removeFromWishlist(productId) {
  let wishlist = getWishlist()
  wishlist = wishlist.filter(id => id !== productId)
  localStorage.setItem('wishlist', JSON.stringify(wishlist))
}

/**
 * Vérifie si un produit est dans la wishlist
 */
export function isInWishlist(productId) {
  const wishlist = getWishlist()
  return wishlist.includes(productId)
}

