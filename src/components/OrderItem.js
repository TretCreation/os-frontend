import React, { useContext } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";
import { Context } from "..";

const OrderItem = ({ productId, name, price, img, count }) => {
	const navigate = useNavigate();
	const { user } = useContext(Context);

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
				<div>count: {count}</div>
			</Card>
		</Col>
	);
};

export default OrderItem;
