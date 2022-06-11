import Admin from "./pages/AdminPage";
import Cart from "./pages/CartPage";
import Shop from "./pages/ShopPage";
import Auth from "./pages/AuthPage";
import Product from "./pages/ProductPage";
import Order from "./pages/OrderPage";

import {
	ADMIN_ROUTE,
	CART_ROUTE,
	LOGIN_ROUTE,
	PRODUCT_ROUTE,
	REGISTRATION_ROUTE,
	SHOP_ROUTE,
	ORDER_ROUTE,
} from "./utils/consts";

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
];

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: Shop,
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
	{
		path: PRODUCT_ROUTE + "/:id",
		Component: Product,
	},
	{
		path: ORDER_ROUTE + "/:id",
		Component: Order,
	},
	{
		path: CART_ROUTE,
		Component: Cart,
	},
];
