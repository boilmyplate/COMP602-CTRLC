"use client";

import React, { useState } from "react";
import styles from "@/app/(component)/Signup/signup.module.css";
import { useAuth } from "@/app/(context)/auth";
import { useRouter } from "next/navigation";
import { doCreateUserWithEmailAndPassword } from "../Firebase/auth";

const Signup = () => {
	// State variables to handle username, email, password, registration status, and error messages
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// Extract userLoggedIn state from the authentication context
	const { userLoggedIn } = useAuth();
	// useRouter for redirecting
	const router = useRouter();

	// Function to check for invalid words in the username
	const containsInvalidWords = (username) => {
		// List of inappropriate words that should not be included in the username
		const invalidWords = ["fuck", "dick", "bastard", "bitch"];
		return invalidWords.some((word) =>
			username.toLowerCase().includes(word)
		);
	};

	// Function to check if the email format is valid
	const isValidEmail = (email) => {
		console.log("in isValid email" + email); // For debugging
		// regex for validating email format
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	};

	// Function to check if the password is strong enough
	const isValidPassword = (password) => {
		// Password should be at least 6 characters long and contain letters and numbers
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
		return passwordRegex.test(password);
	};

	// Function to handle form submission and user registration
	const onSubmit = async (e) => {
		e.preventDefault(); // Prevents page refresh on form submission
		setErrorMessage(""); // Clear previous error messages
		console.log(email);

		// Validate email format
		if (!isValidEmail(email)) {
			setErrorMessage(
				"Invalid email format. Please enter a valid email."
			);
			return;
		}

		// Validate password strength
		if (!isValidPassword(password)) {
			setErrorMessage(
				"Password must be at least 6 characters long and contain both letters and numbers."
			);
			return;
		}

		// Validate username for invalid words
		if (containsInvalidWords(username)) {
			setErrorMessage(
				"Username contains inappropriate words. Please try another."
			);
			return;
		}

		try {
			setIsRegistering(true);
			await doCreateUserWithEmailAndPassword(username, email, password);
			router.push("/");
		} catch (error) {
			setErrorMessage("Invalid Username or Email or Password");
		} finally {
			setIsRegistering(false);
		}
	};

	return (
		<div className={styles.background}>
			{userLoggedIn && router.push("/home")}
			<div className={styles.BlueBox}>
				<div>
					<title>Sign Up</title>
				</div>

				<div className={styles.WhiteBox}>
					<h1 className={styles.heading}>Sign Up</h1>
					{errorMessage && (
						<div className={styles["error-message"]}>
							{errorMessage}
						</div>
					)}
					{/* Username Input Field */}
					<div className={styles["label-input-container"]}>
						<label>Username </label>
						<input
							className={styles.inputs}
							type="text"
							placeholder="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					{/* Email Input Field */}
					<div className={styles["label-input-container"]}>
						<label>Email </label>
						<input
							className={styles.inputs}
							type="email"
							placeholder="name@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					{/* Password Input Field */}
					<div className={styles["label-input-container"]}>
						<label>Password</label>
						<input
							className={styles.inputs}
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{/* Submit Button */}
					<button
						className={styles.SignupButton}
						onClick={onSubmit}
						disabled={isRegistering}
					>
						Sign Up
					</button>
					{/* Link to return to login page */}
					<div className={styles.links}>
						<a href="/">Back to login</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
