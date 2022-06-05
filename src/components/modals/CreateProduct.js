import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { Context } from '../..';
import { createProduct, fetchBrand, fetchType } from '../../http/productAPI';

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context)

    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    // const [brand, setBrand] = useState(null)
    // const [type, setType] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchType().then(data => product.setTypes(data))
        fetchBrand().then(data => product.setBrands(data))
      }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i)) // ????
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', product.selectedBrand.id)
        formData.append('typeId', product.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createProduct(formData).then(data => onHide())
    }   

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add a new product.
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Dropdown className="mt-3">
                    <Dropdown.Toggle>{product.selectedType.name || "Select type"}</Dropdown.Toggle>
                    <Dropdown.Menu>{product.types.map(type => 
                        <Dropdown.Item onClick={() => product.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                    )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-3">
                    <Dropdown.Toggle>{product.selectedBrand.name || "Select brand"}</Dropdown.Toggle>

                    <Dropdown.Menu>{product.brands.map(brand => 
                        <Dropdown.Item onClick={() => product.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
                    )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control className="mt-3" value={name} onChange={e => setName(e.target.value)} placeholder="Enter the name of the product"/>
                <Form.Control className="mt-3" value={price} onChange={e => setPrice(+(e.target.value))} placeholder="Enter the price of the product" type="number"/>
                <Form.Control className="mt-3" type="file" onChange={selectFile}/>
                <hr/>
                <Button variant={"outline-dark"} onClick={addInfo}>Add a new property</Button>
                {
                    info.map(i =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Property"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Description"
                                />
                            </Col>
                            <Col md={4}>
                                <Button onClick={() => removeInfo(i.number)} variant={"outline-dark"}>Delete</Button>
                            </Col>
                        </Row>    
                    )
                }
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" onClick={onHide}>Close</Button>
            <Button variant="outline-dark" onClick={addProduct}>Add</Button>
        </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;