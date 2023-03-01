import React from "react";
import { BsLinkedin } from "react-icons/bs";

const FooterSocial = () => {
	return (
		<div>
			<h3>SOCIAL</h3>
			<div>
				<a href="https://www.linkedin.com/in/matthew-todor-a9185062/" target="_blank" rel="noreferrer">
					<p className="footerSocialInline">
						Matthew Todor
						<BsLinkedin />
					</p>
				</a>
			</div>
		</div>
	);
};

export default FooterSocial;
