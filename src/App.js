import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from "./auth/loginPage";
import SignupPage from "./auth/SignupPage";
import Success from "./auth/SuccessPage";
import NotLoggedInPage from "./auth/NotLoggedInPage";
import FindCar from "./components/FindCar";
import ProfilePage from "./auth/ProfilePage";


function App() {
	const [token, setToken] = useState(false);

	if (token) {
		sessionStorage.setItem("token", JSON.stringify(token));
	}

	useEffect(() => {
		if (sessionStorage.getItem("token")) {
			let data = JSON.parse(sessionStorage.getItem("token"));
			setToken(data);
		}
	}, []);

	return (
		<Router>
			<Routes>
				{token ? <Route path="/" element={<Success token={token} />}></Route> : <Route path="/error" element={<NotLoggedInPage></NotLoggedInPage>}></Route>}
				<Route path="/login" element={<Login setToken={setToken} />}></Route>
                <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
                {token ? <Route path="/findcar" element={<FindCar token={token} />}></Route> : <Route path="/error" element={<NotLoggedInPage></NotLoggedInPage>}></Route>}
                {token ? <Route path="/profile" element={<ProfilePage token={token}></ProfilePage>}></Route>: <Route path="/error" element={<NotLoggedInPage></NotLoggedInPage>}></Route>}
			</Routes>
		</Router>
	);
}

export default App;