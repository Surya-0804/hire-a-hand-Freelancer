import React from "react";
// import { BsTwitter } from "react-icons/bs";
// import { SiLinkedin } from "react-icons/si";
// import { BsYoutube } from "react-icons/bs";
// import { FaFacebookF } from "react-icons/fa";
import "./Footer.css"
import logo from "../../../logo.png"

function Footer() {
  return (
    <footer>
<div className="footer">
  <div className="logo">
    <img className="footerimg" src={logo} alt=""></img>
  </div>
<div className="row">
HIRE-A-HAND

<ul>
<li><a href="#">Contact us</a></li>
<li><a href="#">GDSC</a></li>
<li><a href="#">Vishnu Institute of Technology</a></li>
<li><a href="#">Terms & Conditions</a></li>
<li><a href="#">Career</a></li>
</ul>
</div>

<div className="abouthim" style={{fontFamily:'Play',fontSize:'1rem',marginTop:'70px',color:'grey',marginRight:'60px'}}>
We are the dedicated team, 'Init-to Winit,' passionately collaborating on the innovative 'Hire-a-Hand' project at Vishnu Institute of Technology. Committed to excellence, our diverse skills and shared vision drive us to create a platform that seamlessly connects skilled individuals with those seeking assistance. 
</div>
</div>
</footer>
  );
}

export default Footer;