import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import OrderItem from "../components/OrderItem";
import { Context } from "..";
import { useParams } from "react-router-dom";
// import { updateOrder } from "../http/orderAPI";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { fetchOneOrder } from "../http/orderAPI";

const CartPage = observer(() => {
	const { user } = useContext(Context);
	const { id } = useParams();
	const [orderProducts, setOrderProducts] = useState([]);

	useEffect(() => {
		fetchOneOrder(id, user?.id).then((order) => {
			console.log(order);
			setOrderProducts(order.order_products);
		});
	}, [id, user.id, user]);

	return (
		<Row className="d-flex">
			<div>
				<h1>Ваш заказ:</h1>
			</div>
			{orderProducts.map((op) => (
				<OrderItem
					key={op.product.id}
					productId={op.product.id}
					name={op.product.name}
					price={op.product.price}
					img={op.product.img}
					count={op.count}
				/>
			))}
			<PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
				<PayPalButtons style={{ layout: "horizontal" }} />
			</PayPalScriptProvider>
		</Row>
	);
});

export default CartPage;
