import axios from 'axios';

// const API_HOST = 'http://localhost:8000';
const API_HOST = 'https://tappiola-shop-sandbox.herokuapp.com';

export const getCategories = () => {
    return axios.get(API_HOST + '/api/categories');
};

export const getCategoryProducts = (categoryId) => {
    return axios.get(API_HOST + '/api/category_products/' + categoryId);
}

export const getBrandProducts = (designerId) => {
    return axios.get(API_HOST + '/api/brand_products/' + designerId);
}

export const getBrands = () => {
    return axios.get(API_HOST + '/api/brands');
};

export const getBrand = (id) => {
    return axios.get(API_HOST + '/api/brands/' + id);
};

export const getSaleItems = () => {
    return axios.get(API_HOST + '/api/sale');
};

export const getProducts = (paramsDict) => {
    const params = paramsDict;
    return axios.get(API_HOST + '/api/products', {params});
};

export const getProduct = (id) => {
    return axios.get(API_HOST + '/api/products/' + id);
};

export const createOrder = (data) => {
    return axios.post(API_HOST + '/api/orders/create', data);
};

export const submitOrder = (orderId, data) => {
    return axios.put(API_HOST + '/api/orders/submit/' + orderId, data);
};

export const getOrder = (orderId) => {
    return axios.get(API_HOST + '/api/orders/' + orderId);
};
