import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandsBar from "../components/BrandsBar";
import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import TypesBar from "../components/TypesBar";
import { fetchProducts } from "../http/productAPI";
import { toJS } from "mobx";

const ShopPage = observer(() => {
    const { shop } = useContext(Context);

    useEffect(() => {
        const brandIds = toJS(shop.filterBrands).map((item) => item.id);
        fetchProducts(
            brandIds,
            shop.filterType.id,
            shop.page,
            6,
            shop.filterText
        ).then((data) => {
            shop.setProducts(data.rows);
            shop.setTotalCount(data.count);
        });
    }, [shop.page, shop.filterBrands, shop.filterType, shop.filterText, shop]);

    return (
        <Container className="main-container">
            <Row>
                <Col md={3}>
                    <BrandsBar />
                </Col>
                <Col md={9}>
                    <TypesBar />
                    <ProductList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default ShopPage;
