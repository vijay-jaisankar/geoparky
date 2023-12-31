import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import supabase from "../config/supabaseClient";


import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = (props) => {
	const navigate = useNavigate();

	async function signOutUser() {
		// setSession(null);
		const { error } = await supabase.auth.signOut();
		sessionStorage.removeItem("token");
		navigate("/login");
	}

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">GeoParky</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Map</Nav.Link>
						<Nav.Link href="/findcar">Find Car</Nav.Link>
                        <Nav.Link href="https://geoparky.streamlit.app/">DangerZones</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link href="/profile">Profile</Nav.Link>
						<Nav.Link to={"/login"} onClick={signOutUser}>
							Sign Out
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;