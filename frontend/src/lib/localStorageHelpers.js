const CART_ITEM_KEY = 'tappiola_cart'
export const ADDED_SUCCESSFULLY_MSG =  "Product added to cart";
export const NO_MORE_ITEMS_MSG =  "All items in stock are already in your cart";

export const getCartItems = () => {
    if (localStorage.getItem(CART_ITEM_KEY)) {
        return JSON.parse(localStorage[CART_ITEM_KEY]);
    } else {
        return [];
    }
}
export const setCartItems = (newValues) => {
    localStorage[CART_ITEM_KEY] = JSON.stringify(newValues);
}

export const getUpdatedCartItems = (cartItems, newItemData, maxQuantity) => {

    const newItemId = newItemData.id;
    const sameItemsInCart = cartItems.filter(item => item.id === newItemId && item.size === newItemData.size);
    if (sameItemsInCart.length > 0) {
        const sameItemInCart = sameItemsInCart[0];
        if (sameItemInCart.quantity + newItemData.quantity > maxQuantity) {
            cartItems = cartItems.map(
                item => item.id === newItemId && item.size === newItemData.size
                    ? {...item, quantity: maxQuantity}
                    : item
            );
            return [cartItems, NO_MORE_ITEMS_MSG];
        } else {
            cartItems = cartItems.map(
                item => item.id === newItemId && item.size === newItemData.size
                    ? {...item, quantity: sameItemInCart.quantity + newItemData.quantity}
                    : item
            );
            return [cartItems, ADDED_SUCCESSFULLY_MSG];
        }
    } else {
        const newCartItems = JSON.parse(JSON.stringify(cartItems));
        newCartItems.push(newItemData);
        return [newCartItems, ADDED_SUCCESSFULLY_MSG];
    }
}
