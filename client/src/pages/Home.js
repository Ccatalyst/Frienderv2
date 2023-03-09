import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Paper, Typography } from "@mui/material";

const Homepage = () => {
	return (
		<Grid container>
			<Grid xs={11} md={6} sx={{ m: "auto" }}>
				<Paper>
					<Typography variant="h4" component="h1">
						Find Connections!
					</Typography>
					<Link to="/SignUp">
						<Button variant="contained">Register</Button>
					</Link>
				</Paper>
			</Grid>
			<Grid xs={12}>
				<Footer />
			</Grid>
		</Grid>
	);
};
export default Homepage;
