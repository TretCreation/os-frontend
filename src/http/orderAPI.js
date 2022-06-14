import { $host } from "./index";

export const createOrder = async (cart) => {
	const { data } = await $host.post("api/order", cart);
	return data;
};

export const fetchOneOrder = async (id) => {
	const { data } = await $host.get("api/order/" + id);
	return data;
};

export const completeOrder = async (id, order) => {
	const { data } = await $host.post("api/order/" + id, order);
	return data;
};
