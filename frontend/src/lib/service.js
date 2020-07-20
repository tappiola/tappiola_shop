import axios from 'axios';

const API_HOST = 'http://localhost:8000';

export const getCategories = () => {

    return axios.get(API_HOST + '/categories');
};

export const getCategoryProducts = (categoryId) => {
    return axios.get(API_HOST + '/category_products/' + categoryId);
}

export const getBrandProducts = (designerId) => {
    return axios.get(API_HOST + '/brand_products/' + designerId);
}

export const getBrands = () => {

    return axios.get(API_HOST + '/brands');
};

export const getBrand = (id) => {

    return axios.get(API_HOST + '/brands/' + id);
};

export const getSaleItems = () => {

    return axios.get(API_HOST + '/sale');
};

export const getProducts = (paramsDict) => {
    const params = paramsDict;
    return axios.get(API_HOST + '/products', {params});
};

export const getProduct = (id) => {
    return axios.get(API_HOST + '/products/' + id);
};

export const createOrder = (data) => {
    return axios.post(API_HOST + '/orders/create', data);
};

export const submitOrder = (orderId, data) => {
    return axios.put(API_HOST + '/orders/submit/' + orderId, data);
};
