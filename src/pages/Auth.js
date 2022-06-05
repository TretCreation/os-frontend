import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            
            navigate(SHOP_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container
            className = "d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{wight: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Login In" : "Sign up"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    /> 
                    <Form.Control
                        className="mt-2"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    {isLogin ?
                        <div className="mt-3">
                            New to TretStore? <NavLink to={REGISTRATION_ROUTE}>Create an Account</NavLink>
                        </div>
                        :
                        <div className="mt-3">
                            If you have an account, please, <NavLink to={LOGIN_ROUTE}>Log In</NavLink>
                        </div>
                    }
                    <Button className="mt-3" onClick={click}>
                        {isLogin ? "Log in" : "Sign up"}
                    </Button>
                </Form>
            </Card>

        </Container>
    );
});

export default Auth;