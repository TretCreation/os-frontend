import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    return (
        <>
            <Col
                md={3}
                className={"mt-3 card-body item-card"}
                onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
            >
                <Card
                    style={{ wight: 150, cursor: "pointer" }}
                    border={"light"}
                >
                    <div className="product-img">
                        <Image
                            width={"80%"}
                            height={"80%"}
                            src={
                                process.env.REACT_APP_DO_BUCKET_URL +
                                product.img
                            }
                        />
                    </div>
                    <div className="product-block">
                        <div className="proguct-name">{product.name}</div>
                        <div className="proguct-price">${product.price}</div>
                    </div>
                </Card>
            </Col>
        </>
    );
};

export default ProductItem;
