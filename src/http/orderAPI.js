import { $host } from "./index";

export const createOrder = async (productsIds) => {
	const { data } = await $host.post("api/order", productsIds);
	return data;
};
