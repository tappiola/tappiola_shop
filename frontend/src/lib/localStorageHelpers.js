const CART_ITEM_KEY = 'tappiola_cart'
const getCartItems = () => {
    if (localStorage.getItem(CART_ITEM_KEY)) {
        return JSON.parse(localStorage[CART_ITEM_KEY]);
    } else {
        return [];
    }
}
const setCartItems = (newValues) => {
    console.log('CART: ' + JSON.stringify(newValues));
    localStorage[CART_ITEM_KEY] = JSON.stringify(newValues);
}

export const updateCart = (newItemData, maxQuantity) =>{

    let cartItems = getCartItems();
    const newItemId = newItemData.id;
    const sameItemsInCart = cartItems.filter(item => item.id === newItemId && item.size === newItemData.size);
    if (sameItemsInCart.length > 0){
        const sameItemInCart = sameItemsInCart[0];
        console.log(sameItemInCart);
        if (sameItemInCart.quantity + newItemData.quantity > maxQuantity){
            cartItems = cartItems.map(
                item => item.id === newItemId && item.size === newItemData.size
                    ? {...item, quantity: maxQuantity}
                    : item
            );
            setCartItems(cartItems);
            return 'Not enough items in stock';
        } else {
            cartItems = cartItems.map(
                item => item.id === newItemId && item.size === newItemData.size
                    ? {...item, quantity: sameItemInCart.quantity + 1}
                    : item
            );
            setCartItems(cartItems);
            return 'Product added to cart';
        }
    } else {
        cartItems.push(newItemData);
        setCartItems(cartItems);
        return 'Product added to cart';
    }

}
