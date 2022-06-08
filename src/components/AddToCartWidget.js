import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

const AddToCartWidget = observer(({ productId, name, price, img }) => {
	const { cart } = useContext(Context);

	const addToCart = () => {
		let cartLS = localStorage.getItem("cart") || "[]";
		cartLS = JSON.parse(cartLS);
		const alreadyInCart = cartLS.findIndex((item) => item.productId === productId);
		if (alreadyInCart !== -1) {
			cartLS[alreadyInCart].count += 1;
		} else {
			cartLS = [...cartLS, { productId, name, price, img, count: 1 }];
		}
		cart.setItems(cartLS.reduce((prev, curr) => prev + curr.count, 0));
		cart.setSummary(cartLS.reduce((prev, curr) => prev + curr.count * curr.price, 0));
		localStorage.setItem("cart", JSON.stringify(cartLS));
	};

	return <button onClick={() => addToCart()}>Add to Cart</button>;
});

export default AddToCartWidget;
