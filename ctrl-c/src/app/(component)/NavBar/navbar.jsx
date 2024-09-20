"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faUser,
	faCog,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/app/(component)/NavBar/navbar.module.css";
import { useAuth } from "@/app/(context)/auth";
import { auth } from "../Firebase/firebase";
import { doSignOut } from "../Firebase/auth";

// links on navbar
const links = [
	{ title: "Homepage", path: "/" },
	{ title: "Game", path: "/pong" },
	{ title: "Journal", path: "/journal" },
];

const NavLink = ({ item }) => {
	const pathName = usePathname();

	return (
		<Link
			href={item.path}
			className={`${styles.link} ${
				pathName === item.path && styles.active
			}`}
		>
			{item.title}
		</Link>
	);
};

const Navbar = () => {
	const [open, setOpen] = useState(false);
	// Profile dropdown state
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);
	const menuRef = useRef();
	const { userLoggedIn } = useAuth();
	const user = auth.currentUser;

	// Close profile dropdown if clicked outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setProfileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.logo}>Blank Web</div>

			{/* Desktop Links */}
			<div className={styles.links}>
				{links.map((link) => (
					<NavLink item={link} key={link.title} />
				))}

				{/* Profile Picture */}
				<div className={styles.profileContainer} ref={menuRef}>
					<div
						className={styles.menuTrigger}
						onClick={() => setProfileMenuOpen(!profileMenuOpen)}
					>
						<Image
							src="/profile.jpg"
							alt="Profile Picture"
							width={50}
							height={50}
							className={styles.heroImg}
						/>
					</div>

					{/* Dropdown menu */}
					{profileMenuOpen && (
						<div className={styles.dropdownMenu}>
							<h3>
								{user.displayName}
								<br />
								<span>{user.email}</span>
							</h3>
							<ul>
								<li className={styles.dropdownItem}>
									<FontAwesomeIcon icon={faUser} />
									<a href="#">My Profile</a>
								</li>
								<li className={styles.dropdownItem}>
									<FontAwesomeIcon icon={faSignOutAlt} />
									<a href="/" onClick={doSignOut}>
										Logout
									</a>
								</li>
								<li className={styles.dropdownItem}>
									<FontAwesomeIcon icon={faCog} />
									<a href="#">Settings</a>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			{/* Hamburger Icon for mobile view */}
			<div
				className={styles.menuIcon}
				onClick={() => setOpen((prev) => !prev)}
			>
				<FontAwesomeIcon icon={faBars} />
			</div>

			{/* Mobile Links */}
			{open && (
				<div className={styles.mobileLinks}>
					{links.map((link) => (
						<NavLink item={link} key={link.title} />
					))}
				</div>
			)}
		</div>
	);
};

export default Navbar;
