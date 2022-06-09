import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row, Button } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { Context } from "..";
import { createOrder } from "../http/orderAPI";

const Cart = observer(() => {
	const { cart, user } = useContext(Context);
	const [cartList, setCartList] = useState([]);

	useEffect(() => {
		let cartLS = localStorage.getItem("cart") || "[]";
		setCartList(JSON.parse(cartLS));
	}, [cart.items, cart.summary, cart]);

	const makeOrder = () => {
		const cartData = cartList.map((item) => ({ productId: item.productId, count: item.count }));
		const formData = new FormData();
		formData.append("userId", user.id);
		formData.append("cartData", JSON.stringify(cartData));
		createOrder(formData).then((data) => console.log(data));
	};

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
			<Button variant={"outline-dark"} onClick={makeOrder}>
				Order
			</Button>
		</Row>
	);
});

export default Cart;
