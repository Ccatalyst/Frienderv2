import React from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Auth from "../../utils/auth";
import Grid from "@mui/material/Grid";

const Nav = () => {
	return (
		<Grid container>
			<nav className="navInline">
				<div className="logoContainer">
					<h1>
						<Link to="/">
							<TiThMenuOutline /> Friender{" "}
						</Link>
					</h1>
				</div>
				<div className="inline">
					{Auth.loggedIn() ? (
						<>
							<Link to="/me">
								<Button variant="contained" value="View Profile" type="button">
									Profile
								</Button>
							</Link>
							<Link to="/">
								<Button
									variant="contained"
									value="Logout"
									onClick={() => {
										Auth.logout();
									}}
									type="button"
								/>
							</Link>
						</>
					) : (
						<>
							<Link to="/LogIn">
								<Button variant="contained" value="LogIn" type="button">
									Log In
								</Button>
							</Link>
							<Link to="/SignUp">
								<Button variant="contained" value="Signup" type="button">
									Register
								</Button>
							</Link>
						</>
					)}
				</div>
			</nav>
		</Grid>
	);
};

export default Nav;
