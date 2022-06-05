import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Context } from '..';

const BrandBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <Row className="d-flex">
            {product.brands.map(brand =>
                <Card
                    key={brand.id} 
                    className="p-3" 
                    onClick={() => product.setSelectedBrand(brand)}
                    border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
                    style={{cursor: 'pointer', width: '10rem'}}   // brand cart (change width)
                >
                    {brand.name}
                </Card>    
            )}
        </Row>
    );
});

export default BrandBar;