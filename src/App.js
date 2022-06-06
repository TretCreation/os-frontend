import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/NavBar";
import { check } from "./http/userAPI";

const App = observer(() => {
	const { user } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		check()
			.then((data) => {
				user.setIsAuth(true);
				user.setId(data.id);
				user.setRole(data.role);
				user.setEmail(data.email);
			})
			.catch((e) => console.error(e.message))
			.finally(() => setLoading(false));
	}, [user]);

	if (loading) {
		return <Spinner animation={"grow"} />;
	}

	return (
		<BrowserRouter>
			<Navbar />
			<AppRouter />
		</BrowserRouter>
	);
});

export default App;
