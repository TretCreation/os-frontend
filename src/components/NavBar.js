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
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
            <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{ backgroundColor: "#ededec" }}
            >
                <div className="container-fluid">
                    <Link
                        className="navbar-brand fw-bold fs-5"
                        to={SHOP_ROUTE}
                        style={{
                            textTransform: "uppercase",
                        }}
                    >
                        Tret Store
                    </Link>
                    <button
                        aria-controls="navbarSupportedContent"
                        data-target="#navbarSupportedContent"
                        data-toggle="collapse"
                        type="button"
                        aria-label="Toggle navigation"
                        className="navbar-toggler"
                        aria-expanded="false"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <Search />
                        <div className="me-auto my-2 my-lg-0 navbar-nav navbar-nav-scroll">
                            <div>
                                <CartWidget />
                            </div>
                            <div>
                                {user.isAuth ? (
                                    <div>
                                        {user.role === ADMIN_ROLE && (
                                            <button
                                                style={{
                                                    boxShadow: "none",
                                                }}
                                                className="btn btn-outline-dark btn-sm"
                                                onClick={() =>
                                                    navigate(ADMIN_ROUTE)
                                                }
                                            >
                                                Admin
                                            </button>
                                        )}
                                        <button
                                            style={{
                                                boxShadow: "none",
                                            }}
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={() => logOut()}
                                        >
                                            Log out
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            style={{
                                                boxShadow: "none",
                                            }}
                                            className="btn btn-outline-dark btn-sm ml-2 me-1"
                                            onClick={() =>
                                                navigate(LOGIN_ROUTE)
                                            }
                                        >
                                            Log In
                                        </button>
                                        <button
                                            style={{
                                                boxShadow: "none",
                                            }}
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
                </div>
            </nav>
        </div>
    );
});

export default NavBar;
