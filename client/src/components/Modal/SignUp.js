import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { TextField, RadioGroup, FormLabel, FormControl, FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const Signup = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		description: "",
		city: "",
		age: !null,
		password: "",
		confirmPassword: "",
		photo: "",
		matches: [],
	});

	const [createUser, { error, data }] = useMutation(CREATE_USER);
	if (error) {
		console.error(JSON.stringify(error));
	}
	const handleChange = (e) => {
		let value = e.target.value;
		const name = e.target.name;
		if (name === "age") {
			value = parseInt(value);
		}
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		if (formData.confirmPassword !== formData.password) {
			alert("Your passwords do not match. Please confirm and try again.");
			error.message = "Your passwords do not match. Please confirm and try again.";
		} else {
			try {
				const { data } = await createUser({
					variables: { ...formData },
				});
				Auth.login(data.createUser.token);
			} catch (e) {
				console.error(JSON.stringify(e));
			}
		}
	};
	return (
		<Grid container className=" signUpBackground">
			<Grid
				className="signUpContainer signUpModal"
				sx={{ borderWidth: 4, borderStyle: "solid", borderImage: "linear-gradient(0deg, #8068b1, #54b9a3) 1" }}
			>
				<Link to="/">
					<div className="closeIcon">ⓧ</div>
				</Link>
				<h2>Sign Up</h2>
				<div className="formWrapper">
					{data ? (
						<Navigate to="/me" />
					) : (
						<form className="signUpForm" onSubmit={handleFormSubmit}>
							<TextField
								label="First Name"
								type="text"
								id="firstName"
								name="firstName"
								placeholder="First Name"
								required
								value={formData.firstName}
								onChange={handleChange}
							/>
							<TextField
								label="Last Name"
								type="text"
								id="lastName"
								name="lastName"
								placeholder="Last Name"
								required
								value={formData.lastName}
								onChange={handleChange}
							/>
							<br />
							<TextField
								label="Email"
								type="email"
								id="email"
								name="email"
								placeholder="E-Mail"
								required
								value={formData.email}
								onChange={handleChange}
							/>
							<TextField label="City" type="text" id="city" name="city" placeholder="City" required value={formData.city} onChange={handleChange} />
							<br />
							<TextField label="Age" type="number" id="age" name="age" placeholder="Age" required value={formData.age} onChange={handleChange} />
							<FormControl>
								<FormLabel id="gender-radio-buttons-group-label">Gender</FormLabel>
								<RadioGroup aria-labelledby="gender-radio-buttons-group-label" defaultValue="Male" name="gender-buttons-group" row>
									<FormControlLabel value="Male" control={<Radio />} label="Male" />
									<FormControlLabel value="Female" control={<Radio />} label="Female" />
									<FormControlLabel value="Other" control={<Radio />} label="Other" />
								</RadioGroup>
							</FormControl>
							<TextField
								fullWidth
								label="Description"
								id="description"
								name="description"
								placeholder="Tell us about yourself!"
								required
								value={formData.description}
								onChange={handleChange}
								multiline
								maxRows={3}
							/>
							<br />
							<TextField
								label="Password"
								autoComplete="new-password"
								type="password"
								id="password"
								name="password"
								placeholder="password"
								required
								value={formData.password}
								onChange={handleChange}
							/>
							<br />
							<TextField
								label="Confirm Password"
								autoComplete="new-password"
								type="Password"
								id="confirmPassword"
								name="confirmPassword"
								placeholder="confirm Password"
								required
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
							<br />
							<TextField
								label="add photo"
								type="url"
								name="photo"
								id="photo"
								onChange={handleChange}
								value={formData.photo}
								placeholder="Add Photo"
							/>
							<div className="div10 photo-container rounded-input">{formData.photo && <img src={formData.photo} alt="profile pic preview" />}</div>
							<button className="primary-btn" type="submit">
								Submit
							</button>
						</form>
					)}
					{error && <div className="primary-btn">{error.message}</div>}
				</div>
				<h6>Already have an account?</h6>
				<Link to="/LogIn">
					<h6>LOG IN</h6>
				</Link>
				<br />
				<h6 className="text-light">By clicking submit you agree to Friender's® terms of service</h6>
			</Grid>
		</Grid>
	);
};

export default Signup;
