import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '..';
import BrandBar from '../components/BrandBar';
import Pages from '../components/Pages';
import ProductList from '../components/ProductList';
import TypeBar from '../components/TypeBar';
import { fetchBrand, fetchType, fetchProduct } from '../http/productAPI';

const Shop = observer(() => {
  const {product} = useContext(Context)
    useEffect(() => {
      fetchType().then(data => product.setTypes(data))
      fetchBrand().then(data => product.setBrands(data))
      
    }, [])

    useEffect(() => {
      fetchProduct(product.selectedType.id, product.selectedBrand.id, product.page, 8).then(data => {
        product.setProducts(data.rows)
        product.setTotalCount(data.count)
      })
    }, [product.page, product.selectedType, product.selectedBrand])

    return (
      <Container>
        <Row>
            <Col md = {3}>
              <BrandBar/>
                
            </Col>
            <Col md = {9}>
              <TypeBar/>
              <ProductList/>
              <Pages/>
            </Col>
        </Row>
      </Container>
    );
});

export default Shop;