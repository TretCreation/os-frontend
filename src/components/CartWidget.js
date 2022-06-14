import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { CART_ROUTE } from "../utils/consts";
import { Context } from "..";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

const CartWidget = observer(() => {
    const { cart } = useContext(Context);

    return (
        cart.items > 0 && (
            <Link
                className="navbar-brand fw-bold fs-5 nav-cart"
                to={CART_ROUTE}
            >
                <FontAwesomeIcon icon={faCartArrowDown} />({cart.items} од., $
                {cart.summary})
            </Link>
        )
    );
});

export default CartWidget;
