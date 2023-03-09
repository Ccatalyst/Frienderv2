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
					<Typography variant="h4" component="h1" sx={{ m: 2 }} align="center">
						Find Connections!
					</Typography>
					<Grid xs={1} sx={{ m: "auto" }}>
						<Link to="/SignUp">
							<Button variant="contained" sx={{ my: 1 }}>
								Register
							</Button>
						</Link>
					</Grid>
				</Paper>
			</Grid>
			<Grid container xs={12}>
				<Footer />
			</Grid>
		</Grid>
	);
};
export default Homepage;
