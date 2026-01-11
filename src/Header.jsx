import React from "react";
import "./Header.css";
import logo from "../public/logo.png";
import spImg from "../public/spImg.png";
import quote from "./data/spQuotes";
const Header = ({ theme, darkMode }) => {
	// Function to get a random quote

	return (
		<div className="header">
			<div className="logo">
				<img className="logoImg" src={logo} alt="" />
			</div>
			<div className="head">
				<h1 className="title">
					RGD BACE Devotees
					<br />
					Sadhana App
				</h1>
				<div className="quoteBox">
					<div className="quote">
						{quote} <i>-Srila Prabhupada</i>
					</div>
				</div>
			</div>

			<div className="spLogo">
				<img className="spImg" src={spImg} alt="" />
			</div>
		</div>
	);
};

export default Header;
