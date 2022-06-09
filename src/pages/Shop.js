import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import TypeBar from "../components/TypeBar";
import { fetchBrands, fetchTypes, fetchProducts } from "../http/productAPI";

const Shop = observer(() => {
	const { product } = useContext(Context);
	useEffect(() => {
		fetchTypes().then((data) => product.setTypes(data));
		fetchBrands().then((data) => product.setBrands(data));
	}, [product]);

	useEffect(() => {
		fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, 8, product.filter).then(
			(data) => {
				product.setProducts(data.rows);
				product.setTotalCount(data.count);
			}
		);
	}, [product.page, product.selectedType, product.selectedBrand, product.filter, product]);

	return (
		<Container>
			<Row>
				<Col md={3}>
					<BrandBar />
				</Col>
				<Col md={9}>
					<TypeBar />
					<ProductList />
					<Pages />
				</Col>
			</Row>
		</Container>
	);
});

export default Shop;
