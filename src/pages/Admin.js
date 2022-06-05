import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateProduct from '../components/modals/CreateProduct';
import CreateType from '../components/modals/CreateType';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    return (
        <Container>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setBrandVisible(true)}>Add brand</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setTypeVisible(true)}>Add type</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setProductVisible(true)}>Add product</Button>
            
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
        </Container>
    );
};

export default Admin;