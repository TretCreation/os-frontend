import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { Context } from "..";

const Cart = observer(() => {
	const { cart } = useContext(Context);
	const [cartList, setCartList] = useState([]);

	useEffect(() => {
		let cartLS = localStorage.getItem("cart") || "[]";
		setCartList(JSON.parse(cartLS));
	}, [cart.items, cart.summary, cart]);

	return (
		<Row className="d-flex">
			<div>
				<h1>Cart Page</h1>
			</div>
			{cartList.map((product) => (
				<CartItem
					key={product.productId}
					productId={product.productId}
					name={product.name}
					price={product.price}
					img={product.img}
					count={product.count}
				/>
			))}
		</Row>
	);
});

export default Cart;
