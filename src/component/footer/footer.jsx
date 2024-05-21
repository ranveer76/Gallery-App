import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<div className="footer">
			<div className="footer-content">
				<div className="footer-section">
					<h1 className="logo-text">Gallery</h1>
					<p>
						Gallery is a platform where you can upload your photos and share them with others.
					</p>
					<div className="contact">
						<span>
							<i className="fas fa-phone"></i> &nbsp; 123-456-789
						</span>
						<span>
							<i className="fas fa-envelope"></i> &nbsp;

							<Link to="/contact">
								Contact US
							</Link>
						</span>
					</div>
				</div>
				<div className="footer-section links">
					<h2>Quick Links</h2>
					<br />
					<ul>
						<Link to="/">
							<li>Home</li>
						</Link>
						<Link to="/gallery">
							<li>Gallery</li>
						</Link>
						<Link to="/about">
							<li>About</li>
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);
}
