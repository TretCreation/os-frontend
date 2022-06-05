import React, { useContext } from 'react';
import { Context } from '..';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import { ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import Search from './Search';

// import {setIsAuth} from '../store/UserStore';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-primary">
                <div class="container">
                    <Link class="navbar-brand fw-bold fs-5" to={SHOP_ROUTE}>Tret Store</Link> 
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                            <Search/>
                        </ul>
                        <div>
                        <button onClick={() => navigate(CART_ROUTE)}>CART</button>
                        </div>
                        <div>
                            {user.isAuth ?
                                <div>
                                    <button onClick={() => navigate(ADMIN_ROUTE)}>Admin</button>
                                    <button onClick={() => logOut()}>Log out</button>
                                </div>
                                :
                                <div>
                                    <button onClick={() => navigate(LOGIN_ROUTE)}>Sign up</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
});

export default NavBar;