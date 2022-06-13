import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { createProduct, fetchBrands, fetchTypes } from "../../http/productAPI";

const CreateProduct = observer(({ show, onHide }) => {
	const [types, setTypes] = useState([]);
	const [brands, setBrands] = useState([]);

	const [type, setType] = useState({});
	const [brand, setBrand] = useState({});

	const [price, setPrice] = useState(0);
	const [name, setName] = useState("");
	const [file, setFile] = useState(null);
	const [info, setInfo] = useState([]);

	useEffect(() => {
		fetchTypes().then((data) => setTypes(data));
		fetchBrands().then((data) => setBrands(data));
	}, []);

	const addInfo = () => {
		setInfo([...info, { title: "", description: "", number: Date.now() }]);
	};
	const removeInfo = (number) => {
		setInfo(info.filter((i) => i.number !== number));
	};
	const changeInfo = (key, value, number) => {
		setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i))); // ????
	};

	const selectFile = (e) => {
		setFile(e.target.files[0]);
	};

	const addProduct = () => {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", `${price}`);
		formData.append("img", file);
		formData.append("brandId", brand.id);
		formData.append("typeId", type.id);
		formData.append("info", JSON.stringify(info));
		createProduct(formData).then((data) => onHide());
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Add a new product.</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className="mt-3">
						<Dropdown.Toggle>{type.name || "Select type"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{types.map((type) => (
								<Dropdown.Item onClick={() => setType(type)} key={type.id}>
									{type.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className="mt-3">
						<Dropdown.Toggle>{brand.name || "Select brand"}</Dropdown.Toggle>

						<Dropdown.Menu>
							{brands.map((brand) => (
								<Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>
									{brand.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						className="mt-3"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter the name of the product"
					/>
					<Form.Control
						className="mt-3"
						value={price}
						onChange={(e) => setPrice(+e.target.value)}
						placeholder="Enter the price of the product"
						type="number"
						step="0.01"
						min={0.01}
					/>
					<Form.Control className="mt-3" type="file" onChange={selectFile} />
					<hr />
					<Button variant={"outline-dark"} onClick={addInfo}>
						Add a new property
					</Button>
					{info.map((i) => (
						<Row className="mt-3" key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={(e) => changeInfo("title", e.target.value, i.number)}
									placeholder="Property"
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={(e) => changeInfo("description", e.target.value, i.number)}
									placeholder="Description"
								/>
							</Col>
							<Col md={4}>
								<Button onClick={() => removeInfo(i.number)} variant={"outline-dark"}>
									Delete
								</Button>
							</Col>
						</Row>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-dark" onClick={onHide}>
					Close
				</Button>
				<Button variant="outline-dark" onClick={addProduct}>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateProduct;
