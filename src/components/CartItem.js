import React, { useState, useEffect, useContext } from "react";
import { Card, Col, Image, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";
import { Context } from "..";

const CartItem = ({ productId, name, price, img, count }) => {
	const navigate = useNavigate();
	const [newCount, setNewCount] = useState(count);
	const { cart } = useContext(Context);

	useEffect(() => {
		let cartLS = localStorage.getItem("cart") || "[]";
		cartLS = JSON.parse(cartLS);
		const findInCart = cartLS.findIndex((item) => item.productId === productId);
		cartLS[findInCart].count = +newCount;
		localStorage.setItem("cart", JSON.stringify(cartLS));
		cart.recalculate();
	}, [cart, newCount, productId]);

	const removeFromCart = () => {
		let cartLS = localStorage.getItem("cart") || "[]";
		cartLS = JSON.parse(cartLS);
		cartLS = cartLS.filter((item) => item.productId !== productId);
		localStorage.setItem("cart", JSON.stringify(cartLS));
		cart.recalculate();
	};

	return (
		<Col md={3} className={"mt-3"}>
			<Card
				style={{ wight: 150, cursor: "pointer" }}
				border={"light"}
				onClick={() => navigate(PRODUCT_ROUTE + "/" + productId)}
			>
				<Image width={150} height={150} src={process.env.REACT_APP_DO_BUCKET_URL + img} />
				<div>{name}</div>
				<div>price: {price}</div>
			</Card>
			<Form>
				<Form.Label>Count:</Form.Label>
				<Form.Control
					className="mt-3"
					value={newCount}
					onChange={(e) => {
						setNewCount(e.target.value);
					}}
					type="number"
					min="1"
				/>
				<Button
					onClick={() => {
						removeFromCart();
					}}
					type="button"
					min="1"
				>
					X
				</Button>
			</Form>
		</Col>
	);
};

export default CartItem;
