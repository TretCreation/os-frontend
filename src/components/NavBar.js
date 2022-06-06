import React, { useContext } from 'react';
import { Context } from '..';
import { Link } from 'react-router-dom';
import { ADMIN_ROLE, ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

// import {setIsAuth} from '../store/UserStore';

const NavBar = observer(() => {
	const { user } = useContext(Context);
	const navigate = useNavigate();

	const logOut = () => {
		user.setId(undefined);
		user.setIsAuth(false);
		user.setRole("");
		localStorage.removeItem('token');
		navigate(SHOP_ROUTE);
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-primary">
				<div className="container">
					<Link className="navbar-brand fw-bold fs-5" to={SHOP_ROUTE}>
						Tret Store
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mx-auto mb-2 mb-lg-0">
							<Search />
						</ul>
						<div>
							<button onClick={() => navigate(CART_ROUTE)}>CART</button>
						</div>
						<div>
							{user.isAuth ? (
								<div>
									{user.role === ADMIN_ROLE && (<button onClick={() => navigate(ADMIN_ROUTE)}>Admin</button>)}
									<button onClick={() => logOut()}>Log out</button>
								</div>
							) : (
								<div>
									<button onClick={() => navigate(LOGIN_ROUTE)}>Sign up</button>
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
