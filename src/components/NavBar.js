import React, { useContext } from "react";
import { Context } from "..";
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
import { Navbar, Container, Button } from "react-bootstrap";

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
        <div
            style={{
                backgroundColor: "#eae9e7",
            }}
        >
            <Navbar bg="" expand="lg">
                <Container
                    fluid
                    className="container"
                    style={{
                        margin: "0 auto",
                    }}
                >
                    <Navbar.Brand
                        className="navbar-brand fw-bold fs-5 test"
                        href={SHOP_ROUTE}
                        style={{
                            textTransform: "uppercase",
                        }}
                    >
                        Tret Store
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Search />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "baseline",
                            }}
                        >
                            <CartWidget />

                            {user.isAuth ? (
                                <>
                                    {user.role === ADMIN_ROLE && (
                                        <Button
                                            variant="outline-success"
                                            style={{
                                                boxShadow: "none",
                                                width: "6rem",
                                                height: "2.3rem",
                                                marginRight: "0.5rem",
                                            }}
                                            className="btn btn-outline-dark btn-sm btn-nav"
                                            onClick={() =>
                                                navigate(ADMIN_ROUTE)
                                            }
                                        >
                                            Admin
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline-success"
                                        style={{
                                            boxShadow: "none",
                                            width: "6rem",
                                            height: "2.3rem",
                                        }}
                                        className="btn btn-outline-dark btn-sm btn-nav"
                                        onClick={() => logOut()}
                                    >
                                        Log out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="outline-success"
                                        style={{
                                            boxShadow: "none",
                                            width: "6rem",
                                            height: "2.3rem",
                                            marginRight: "0.5rem",
                                        }}
                                        className="btn btn-outline-dark btn-sm ml-2 btn-nav"
                                        onClick={() => navigate(LOGIN_ROUTE)}
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        style={{
                                            boxShadow: "none",
                                            width: "6rem",
                                            height: "2.3rem",
                                        }}
                                        className="btn btn-outline-dark btn-sm btn-nav"
                                        onClick={() =>
                                            navigate(REGISTRATION_ROUTE)
                                        }
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;
