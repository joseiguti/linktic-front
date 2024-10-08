export function validateStock(product) {
    return product.quantity <= product.stock;
}

export function validateOrder(cart) {
    return cart.length > 0;
}