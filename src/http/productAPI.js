import { $authHost, $host } from './index';

export const createTypes = async (type) => {
	const { data } = await $authHost.post('api/type', type);
	return data;
};

export const fetchType = async () => {
	const { data } = await $host.get('api/type');
	return data;
};

export const createBrand = async (brand) => {
	const { data } = await $authHost.post('api/brand', brand);
	return data;
};

export const fetchBrand = async () => {
	const { data } = await $host.get('api/brand');
	return data;
};

export const createProduct = async (product) => {
	const { data } = await $authHost.post('api/product', product);
	return data;
};

export const fetchProduct = async (typeId, brandId, page, limit = 5, filter = '') => {
	const { data } = await $host.get('api/product', { params: { typeId, brandId, page, limit, filter } });
	return data;
};

export const fetchOneProduct = async (id) => {
	const { data } = await $host.get('api/product/' + id);
	return data;
};
