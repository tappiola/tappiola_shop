import {getCartItems, setCartItems} from '../lib/localStorageHelpers';

const initialState = {
    cartDataLocal: getCartItems()
};

const reducer = (state = initialState, action) => {
    if (action.type === 'UPDATE_CART') {
        setCartItems(action.cartDataLocal);
        return {
            ...state,
            cartDataLocal: action.cartDataLocal
        };
    }
    return state
};

export default reducer;
