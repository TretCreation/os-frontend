import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const CartItem = ({ productId, name, price, img, count }) => {
	const navigate = useNavigate();

	return (
		<Col md={3} className={"mt-3"} onClick={() => navigate(PRODUCT_ROUTE + "/" + productId)}>
			<Card style={{ wight: 150, cursor: "pointer" }} border={"light"}>
				<Image width={150} height={150} src={process.env.REACT_APP_API_URL + "/" + img} />
				<div>{name}</div>
				<div>price: {price}</div>
				<div>count: {count}</div>
			</Card>
		</Col>
	);
};

export default CartItem;
