import { observer } from "mobx-react-lite";
import React, { useEffect, useState, useContext, useMemo } from "react";
import {
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
import RecommendedItem from "../components/RecommendedItem";
import { ADMIN_ROLE, SHOP_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import {
    updateProduct,
    deleteProduct,
    fetchTypes,
    fetchBrands,
    deleteProductInfo,
    getRecommended,
} from "../http/productAPI";
import AddToCartWidget from "../components/AddToCartButton";

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
    const [newImg, setNewImg] = useState("");
    const [recommended, setRecommended] = useState([]);

    useMemo(() => {
        fetchOneProduct(id).then((data) => {
            setTypeId(data.type.id);
            setTypeName(data.type.name);
            setBrandId(data.brand.id);
            setBrandName(data.brand.name);
            setName(data.name);
            setPrice(data.price);
            setInfo(data.product_infos);
            setImg(data.img);
        });
    }, [img]);

    useMemo(() => {
        fetchTypes().then((data) => setTypes(data));
        fetchBrands().then((data) => setBrands(data));
        getRecommended(id).then((data) => setRecommended(data));
    }, []);

    const addInfo = () => {
        setInfo([
            ...info,
            { title: "", description: "", id: "id_" + Date.now() },
        ]);
    };
    const removeInfo = (id) => {
        deleteProductInfo(id).then(
            (data) => data && setInfo(info.filter((i) => i.id !== id))
        );
    };
    const changeInfo = (key, value, id) => {
        setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
    };

    const update = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("img", newImg);
        formData.append("brandId", brandId);
        formData.append("typeId", typeId);
        formData.append("info", JSON.stringify(info));
        updateProduct(id, formData).then(setImg(""));
    };

    const navigate = useNavigate();
    const remove = () => {
        deleteProduct(id).then((data) => {
            data && navigate(SHOP_ROUTE);
        });
    };

    return (
        <Container className="main-container">
            <div className="card-container-product">
                <div className="card-container-top">
                    <Col md={12} className="cart-1">
                        <Image
                            width={300}
                            height={300}
                            src={
                                img && process.env.REACT_APP_DO_BUCKET_URL + img
                            }
                        />
                    </Col>
                    <Col md={12}>
                        <Row>
                            <h2 className="card-product-name">{name}</h2>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h3 className="card-product-price">${price}</h3>
                    </Col>
                    <Col md={12} className="card-product-cart">
                        <AddToCartWidget
                            productId={+id}
                            name={name}
                            price={+price}
                            img={img}
                        />
                    </Col>
                </div>
                {info.length > 0 && (
                    <Row className="d-flex m-3 card-container-bottom">
                        <h2 className="cart-product-discr">Характеристики</h2>
                        {info.map((info) => (
                            <Row key={info.id}>
                                {info.title}: {info.description}
                            </Row>
                        ))}
                    </Row>
                )}
            </div>
            <span className="decorative-line"></span>
            {recommended.length > 0 && (
                <h3 className="cart-product-discr">
                    З цим товаром часто купують:
                </h3>
            )}
            {recommended.map((product) => (
                <RecommendedItem
                    key={product.id}
                    productId={product.id}
                    name={product.name}
                    price={product.price}
                    img={product.img}
                    count={1}
                />
            ))}
            {user.role === ADMIN_ROLE && (
                <div className="cart-product-form">
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
                            step="0.01"
                            min={0.01}
                        />
                        <Form.Control
                            className="mt-3"
                            type="file"
                            onChange={(e) => {
                                setNewImg(e.target.files[0]);
                            }}
                        />
                        <hr />
                        <Button variant={"outline-dark"} onClick={addInfo}>
                            Додати характеристику
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
                                            Видалити
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                    </Form>
                    <Button
                        variant="outline-dark"
                        onClick={update}
                        className="button-update"
                    >
                        Оновити товар
                    </Button>
                    <Button
                        variant="outline-dark"
                        onClick={remove}
                        className="button-remove"
                    >
                        Видалити товар
                    </Button>
                </div>
            )}
        </Container>
    );
});

export default ProductPage;
