import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_HOBBIES } from "../../utils/queries";
import { ADD_HOBBY } from "../../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import LogIn from "./LogIn";
import UserHobbies from "./UserHobbies";

const Hobbies = () => {
	const { loading, data } = useQuery(QUERY_HOBBIES);
	const hobbies = data?.hobbies || [];
	const [searchTerm, setSearchTerm] = useState("");
	const userId = Auth.getProfile().data._id;
	const [addHobby, { error }] = useMutation(ADD_HOBBY);
	if (error) {
		console.log(JSON.stringify(error));
	}
	const handleClick = async (hobbyId) => {
		try {
			await addHobby({
				variables: { userId, hobbyId },
			});
		} catch (error) {
			console.error(JSON.stringify(error));
		}
	};
	const hobbyValue = (val) => (searchTerm === "" ? val.hobbyName : val.hobbyName.toLowerCase().includes(searchTerm));
	return (
		<div className="profileBackground">
			<div className="hobbyModal">
				<Link to="/me">
					<div className="closeIcon">ⓧ</div>
				</Link>
				{Auth.loggedIn() ? (
					<>
						<h2>Search for a Hobby</h2>
						{loading ? (
							<div> Loading...</div>
						) : (
							<h5 className="hobbiesContainer">
								{hobbies.filter(hobbyValue).map(({ _id, hobbyName }) => {
									return (
										<>
											<div
												className="hobbyCard"
												key={_id}
												value={_id}
												name={hobbyName}
												onClick={() => {
													handleClick(_id);
												}}
											>
												{hobbyName}
											</div>
										</>
									);
								})}
							</h5>
						)}
						<form className="logInForm">
							<input
								className="rounded-input"
								type="text"
								id="hobbyInput"
								name="hobby"
								placeholder="Search for a Hobby"
								required={true}
								onChange={(event) => {
									setSearchTerm(event.target.value);
								}}
							/>
						</form>
						<div>
							<UserHobbies />
						</div>
						<Link to="/Me">
							<button className="secondary-btn" type="submit">
								BACK TO PROFILE
							</button>
						</Link>
						<p>
							Don't see your hobby? <br />
							<a href="mailto:AddHobby@Friender.com" target="_blank" rel="noreferrer">
								Email us, Let us know!
							</a>
						</p>
						{error && <div className="col-12 my-3 bg-danger text-white p-3">{error.message}</div>}
					</>
				) : (
					<>
						<h4 className="logInError ">You need to be logged in to see this. Use the navigation links above to sign up or log in!</h4>
						<LogIn />
					</>
				)}
			</div>
		</div>
	);
};

export default Hobbies;
