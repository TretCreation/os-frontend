import { observer } from "mobx-react-lite";
import React, { useContext, useMemo, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "..";
import { fetchBrands } from "../http/productAPI";

const BrandsBar = observer(() => {
	const { shop } = useContext(Context);
	const [brands, setBrands] = useState([]);

	useMemo(() => {
		fetchBrands().then((data) => setBrands(data));
	}, []);

	return (
		<Row className="d-flex">
			{brands.map((brand) => (
				<Card
					key={brand.id}
					className="p-3"
					onClick={() => shop.setFilterBrand(shop.filterBrand.id === brand.id ? {} : brand)}
					border={shop.filterBrand.id === brand.id ? "danger" : "light"}
					style={{ cursor: "pointer", width: "10rem" }}
				>
					{brand.name}
				</Card>
			))}
		</Row>
	);
});

export default BrandsBar;
