import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { CART_ROUTE } from "../utils/consts";
import { Context } from "..";
import { Link } from "react-router-dom";

const CartWidget = observer(() => {
	const { cart } = useContext(Context);

	return (
		<Link className="navbar-brand fw-bold fs-5" to={CART_ROUTE}>
			Кошик ({cart.items} шт., {cart.summary}₴)
		</Link>
	);
});

export default CartWidget;
