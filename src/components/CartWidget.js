import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { CART_ROUTE } from "../utils/consts";
import { Context } from "..";
import { Link } from "react-router-dom";

const CartWidget = observer(() => {
	const { cart } = useContext(Context);

	return (
		<Link className="navbar-brand fw-bold fs-5" to={CART_ROUTE}>
			Cart ({cart.items} items, {cart.summary}₴ summary)
		</Link>
	);
});

export default CartWidget;
