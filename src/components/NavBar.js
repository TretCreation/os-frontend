import React, { useContext } from "react";
import { Context } from "..";
import { Link } from "react-router-dom";
import {
    ADMIN_ROLE,
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import CartWidget from "./CartWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setId(undefined);
        user.setIsAuth(false);
        user.setRole("");
        localStorage.removeItem("token");
        navigate(SHOP_ROUTE);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-5" to={SHOP_ROUTE}>
                        Tret Store
                    </Link>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <Search />
                        </ul>
                        <div>
                            <CartWidget />
                        </div>
                        <div>
                            {user.isAuth ? (
                                <div>
                                    {user.role === ADMIN_ROLE && (
                                        <button
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={() =>
                                                navigate(ADMIN_ROUTE)
                                            }
                                        >
                                            Admin
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => logOut()}
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="btn btn-outline-dark btn-sm ml-2 me-1"
                                        onClick={() => navigate(LOGIN_ROUTE)}
                                    >
                                        Log In
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() =>
                                            navigate(REGISTRATION_ROUTE)
                                        }
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
});

export default NavBar;
