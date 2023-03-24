import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [year, setYear] = useState(2023);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(username, firstName, lastName, email, password, month, day, year);
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, firstName, lastName, email, password, month, day, year));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const generateOptions = (start, end, reverse) => {
		const options = [];
		for (let i = start; i <= end; i++) {
		  options.push(<option key={i} value={i}>{i}</option>);
		}
		if (!reverse) {
			return options;
		} else {
			return options.reverse();
		}
	  };

	return (
		<>
			<div className="signup-container">
				<div className="signup-top">
					<h1 className="signup">Sign Up</h1>
					<p className="quick-and-easy">It's quick and easy.</p>
				</div>
				<form className="signup-form" onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<div className="name-inputs">
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="First name"
							required
						/>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Last name"
							required
						/>
					</div>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
					/>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="New password"
						required
					/>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm password"
						required
					/>
					<div className="birthday-container">
						<div className="signup-dob-label">Birthday</div>
						<div className="signup-dob">
							<select id="month" value={month} onChange={(e) => setMonth(e.target.value)} className="signup-dob-select" required>
							<option value="">Month</option>
							{generateOptions(1, 12)}
							</select>
							<select id="day" value={day} onChange={(e) => setDay(e.target.value)} className="signup-dob-select" required>
							<option value="">Day</option>
							{generateOptions(1, 31)}
							</select>
							<select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="signup-dob-select" required>
							<option value="">Year</option>
							{generateOptions(1930, new Date().getFullYear(), true)}
							</select>
						</div>
					</div>
					<button className="signup-button" type="submit">Sign Up</button>
				</form>
			</div>
		</>
	);
}

export default SignupFormModal;
