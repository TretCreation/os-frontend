import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const RecommendedItem = ({ productId, name, price, img }) => {
	const navigate = useNavigate();

	return (
		<Col md={3} className={"mt-3"}>
			<Card
				style={{ wight: 150, cursor: "pointer" }}
				border={"light"}
				onClick={() => {
					navigate(PRODUCT_ROUTE + "/" + productId);
					navigate(0);
				}}
			>
				<Image width={150} height={150} src={process.env.REACT_APP_DO_BUCKET_URL + img} />
				<div>{name}</div>
				<div>price: {price}</div>
			</Card>
		</Col>
	);
};

export default RecommendedItem;
