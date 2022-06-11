import { $host } from "./index";

export const createOrder = async (productsIds) => {
	const { data } = await $host.post("api/order", productsIds);
	return data;
};

export const fetchOneOrder = async (id) => {
	const { data } = await $host.get("api/order/" + id);
	return data;
};
