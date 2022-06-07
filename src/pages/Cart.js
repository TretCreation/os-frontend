import React from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import CartItem from "../components/CartItem";

const Cart = observer(() => {
	let cartLS = localStorage.getItem("cart") || "[]";
	cartLS = JSON.parse(cartLS);
	return (
		<Row className="d-flex">
			<div>
				<h1>Cart Page</h1>
			</div>
			{cartLS.map((product) => (
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
