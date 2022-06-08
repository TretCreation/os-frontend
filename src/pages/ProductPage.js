import { observer } from "mobx-react-lite";
import React, { useEffect, useState, useContext } from "react";
import {
    Card,
    Col,
    Container,
    Image,
    Row,
    Form,
    Button,
    Dropdown,
} from "react-bootstrap";
import { Context } from "..";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../http/productAPI";
import { ADMIN_ROLE } from "../utils/consts";
import { updateProduct, fetchType, fetchBrand } from "../http/productAPI";

const ProductPage = observer(() => {
    const { user } = useContext(Context);
    const { id } = useParams();

    const [types, setTypes] = useState([]);
    const [typeId, setTypeId] = useState("");
    const [typeName, setTypeName] = useState("");
    const [brands, setBrands] = useState([]);
    const [brandId, setBrandId] = useState("");
    const [brandName, setBrandName] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [info, setInfo] = useState("");
    const [img, setImg] = useState("");

    useEffect(() => {
        fetchOneProduct(id).then((data) => {
            setTypeId(data.type.id);
            setTypeName(data.type.name);
            setBrandId(data.brand.id);
            setBrandName(data.brand.name);
            setName(data.name);
            setPrice(data.price);
            setInfo(data.info);
            setImg(data.img);
        });
        fetchType().then((data) => setTypes(data));
        fetchBrand().then((data) => setBrands(data));
    }, [id]);

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", id: Date.now() }]);
    };
    const removeInfo = (id) => {
        setInfo(info.filter((i) => i.id !== id));
    };
    const changeInfo = (key, value, id) => {
        setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
    };

    const update = () => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("img", img);
        formData.append("brandId", brandId);
        formData.append("typeId", typeId);
        formData.append("info", JSON.stringify(info));
        updateProduct(formData);
    };

    return (
        <Container>
            <div>
                <Col md={4}>
                    <Image
                        width={300}
                        height={300}
                        src={img && process.env.REACT_APP_API_URL + "/" + img}
                    />
                </Col>
                <Col md={4}>
                    <Row>
                        <h2>{name}</h2>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card>
                        <h3>{price} ₴</h3>

                        <button onClick={() => console.log(name)}>
                            Click to cart
                        </button>
                    </Card>
                </Col>
                <Row className="d-flex m-3">
                    <h2>Characteristics</h2>
                    {info &&
                        info.map((info) => (
                            <Row key={info.id}>
                                {info.title}: {info.description}
                            </Row>
                        ))}
                </Row>
            </div>
            {user.role === ADMIN_ROLE && (
                <div>
                    <Form>
                        <Dropdown className="mt-3">
                            <Dropdown.Toggle>{typeName}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {types.map((type) => (
                                    <Dropdown.Item
                                        onClick={() => {
                                            setTypeId(type.id);
                                            setTypeName(type.name);
                                        }}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="mt-3">
                            <Dropdown.Toggle>{brandName}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {brands.map((brand) => (
                                    <Dropdown.Item
                                        onClick={() => {
                                            setBrandId(brand.id);
                                            setBrandName(brand.name);
                                        }}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            className="mt-3"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            placeholder="Enter the name of the product"
                        />
                        <Form.Control
                            className="mt-3"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            placeholder="Enter the price of the product"
                            type="number"
                        />
                        <Form.Control
                            className="mt-3"
                            type="file"
                            onChange={(e) => {
                                setImg(e.target.files[0]);
                            }}
                        />
                        <hr />
                        <Button variant={"outline-dark"} onClick={addInfo}>
                            Add a new property
                        </Button>
                        {info &&
                            info.map((i) => (
                                <Row className="mt-3" key={i.id}>
                                    <Col md={4}>
                                        <Form.Control
                                            defaultValue={i.title}
                                            onChange={(e) =>
                                                changeInfo(
                                                    "title",
                                                    e.target.value,
                                                    i.id
                                                )
                                            }
                                            placeholder="Property"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            defaultValue={i.description}
                                            onChange={(e) =>
                                                changeInfo(
                                                    "description",
                                                    e.target.value,
                                                    i.id
                                                )
                                            }
                                            placeholder="Description"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Button
                                            onClick={() => removeInfo(i.id)}
                                            variant={"outline-dark"}
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                    </Form>
                    <Button variant="outline-dark" onClick={update}>
                        Update
                    </Button>
                </div>
            )}
        </Container>
    );
});

export default ProductPage;
