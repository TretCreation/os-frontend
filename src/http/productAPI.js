import { $authHost, $host } from "./index";

export const createType = async (type) => {
	const { data } = await $authHost.post("api/type", type);
	return data;
};

export const fetchTypes = async () => {
	const { data } = await $host.get("api/type");
	return data;
};

export const createBrand = async (brand) => {
	const { data } = await $authHost.post("api/brand", brand);
	return data;
};

export const fetchBrands = async () => {
	const { data } = await $host.get("api/brand");
	return data;
};

export const createProduct = async (product) => {
	const { data } = await $authHost.post("api/product", product);
	return data;
};

export const updateProduct = async (id, product) => {
	const { data } = await $authHost.patch("api/product/" + id, product);
	return data;
};

export const deleteProduct = async (id) => {
	const { data } = await $authHost.delete("api/product/" + id);
	return data;
};

export const fetchProducts = async (typeId, brandId, page, limit = 5, filter = "") => {
	const { data } = await $host.get("api/product", { params: { typeId, brandId, page, limit, filter } });
	return data;
};

export const fetchOneProduct = async (id) => {
	const { data } = await $host.get("api/product/" + id);
	return data;
};

export const deleteProductInfo = async (id) => {
	const { data } = await $authHost.delete("api/product/productInfo/" + id);
	return data;
};
