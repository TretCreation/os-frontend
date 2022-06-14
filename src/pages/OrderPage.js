import React, { useState, useMemo, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import OrderItem from "../components/OrderItem";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { fetchOneOrder, completeOrder } from "../http/orderAPI";
import { Context } from "..";
import { SHOP_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const OrderPage = observer(() => {
    const { cart } = useContext(Context);
    const { id } = useParams();
    const [orderProducts, setOrderProducts] = useState([]);
    const [value, setValue] = useState([]);
    const navigate = useNavigate();

    useMemo(() => {
        fetchOneOrder(id).then((order) => {
            setOrderProducts(order.order_products);
            setValue(
                order.order_products
                    .reduce(
                        (curr, next) => curr + next.count * next.product.price,
                        0
                    )
                    .toFixed(2)
            );
        });
    }, [id]);

    const processOrder = (ppOrder) => {
        if (ppOrder.status !== "COMPLETED") {
            return alert("PayPal order failed!!!");
        }
        const formData = new FormData();
        formData.append("transactionId", ppOrder.id);
        formData.append(
            "paymentAmount",
            ppOrder.purchase_units[0].amount.value
        );

        completeOrder(id, formData).then(() => {
            cart.clear();
            alert("Thank you for your order!");
            navigate(SHOP_ROUTE);
        });
    };

    return (
        <div className="container main-container">
            <Row className="d-flex cart-order cart-order-done">
                <div>
                    <h1 className="cart-product-discr">Ваш заказ:</h1>
                </div>
                {orderProducts.map((op) => (
                    <OrderItem
                        key={op.product.id}
                        productId={op.product.id}
                        name={op.product.name}
                        price={op.product.price}
                        img={op.product.img}
                        count={op.count}
                    />
                ))}

                <span className="proguct-price">Сума замовлення: ${value}</span>
                <PayPalScriptProvider
                    options={{
                        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                    }}
                >
                    <PayPalButtons
                        style={{
                            color: "silver",
                            layout: "horizontal",
                            tagline: false,
                            shape: "pill",
                        }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "USD",
                                            value,
                                        },
                                        description: "TretStore order",
                                        custom_id: id,
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            actions.order
                                .capture()
                                .then((ppOrder) => processOrder(ppOrder));
                        }}
                    />
                </PayPalScriptProvider>
            </Row>
        </div>
    );
});

export default OrderPage;
