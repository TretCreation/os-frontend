import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createTypes } from '../../http/productAPI';

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addType = () => {
        createTypes({name: value}).then(data => { 
            setValue('') 
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add a new type.
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder={"Enter type name"}/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" onClick={onHide}>Close</Button>
            <Button variant="outline-dark" onClick={addType}>Add</Button>
        </Modal.Footer>
        </Modal>
    );
};

export default CreateType;