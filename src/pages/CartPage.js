import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row, Button } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { Context } from "..";
import { createOrder } from "../http/orderAPI";
import { useNavigate } from "react-router-dom";
import { ORDER_ROUTE } from "../utils/consts";

const CartPage = observer(() => {
    const { cart, user } = useContext(Context);
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        let cartLS = localStorage.getItem("cart") || "[]";
        setCartList(JSON.parse(cartLS));
    }, [cart.items, cart.summary, cart]);

    const navigate = useNavigate();

    const makeOrder = () => {
        const cartData = cartList.map((item) => ({
            productId: item.productId,
            count: item.count,
        }));
        const formData = new FormData();
        formData.append("userId", user.id);
        formData.append("cartData", JSON.stringify(cartData));
        createOrder(formData).then(
            (order) => order && navigate(ORDER_ROUTE + "/" + order.id)
        );
    };

    return (
        <div className="container">
            <Row className="d-flex cart-order">
                <div>
                    <h1 className="cart-product-discr">Кошик</h1>
                </div>
                {cartList.map((product) => (
                    <CartItem
                        key={product.productId}
                        productId={product.productId}
                        name={product.name}
                        price={product.price}
                        img={product.img}
                        count={product.count}
                    />
                ))}
                <Button
                    variant={"outline-dark"}
                    onClick={makeOrder}
                    className="card-order--count"
                >
                    Замовити
                </Button>
            </Row>
        </div>
    );
});

export default CartPage;
