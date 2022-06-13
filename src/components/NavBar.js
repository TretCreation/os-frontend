import React, { useContext } from "react";
import { Context } from "..";
import { Link } from "react-router-dom";
import { ADMIN_ROLE, ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import CartWidget from "./CartWidget";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
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
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand
					className="navbar-brand fw-bold fs-5"
					href={SHOP_ROUTE}
					style={
						{
							// textTransform: "uppercase",
						}
					}
				>
					Tret Store
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Search />
					<CartWidget />
					{user.isAuth ? (
						<div>
							{user.role === ADMIN_ROLE && (
								<Button
									variant="outline-success"
									// style={{
									// 	boxShadow: "none",
									// }}
									className="btn btn-outline-dark btn-sm"
									onClick={() => navigate(ADMIN_ROUTE)}
								>
									Admin
								</Button>
							)}
							<Button
								variant="outline-success"
								// style={{
								// 	boxShadow: "none",
								// }}
								className="btn btn-outline-dark btn-sm"
								onClick={() => logOut()}
							>
								Log out
							</Button>
						</div>
					) : (
						<div>
							<Button
								variant="outline-success"
								// style={{
								// 	boxShadow: "none",
								// }}
								className="btn btn-outline-dark btn-sm ml-2 me-1"
								onClick={() => navigate(LOGIN_ROUTE)}
							>
								Log In
							</Button>
							<Button
								variant="outline-success"
								// style={{
								// 	boxShadow: "none",
								// }}
								className="btn btn-outline-dark btn-sm"
								onClick={() => navigate(REGISTRATION_ROUTE)}
							>
								Sign Up
							</Button>
						</div>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
});

export default NavBar;
