import React from "react";
// import Footer from "./Footer";
import Navbar from "../../components/navbar/Navbar";
import "./About.css";
import Layout from "../../components/layout/Layout";


function About() {
    return (
       <Layout>
        <>
            <div className="body">
                <div className="about">
                <center><h1>About Us</h1></center>
                <p>Welcome to <b>Hire-A-Hand</b>, the premier platform for freelancers and clients to connect, collaborate, and succeed together in the dynamic world of freelancing. <br /><br />
                    At <b>Hire-A-Hand</b>, we believe in empowering individuals to pursue their passions, showcase their talents, and thrive in the gig economy. Whether you're a seasoned freelancer looking for your next project or a business seeking top-tier talent, our platform provides the tools and resources to make your freelancing journey a success. <br /> <br />
                    As freelancing continues to redefine the traditional work landscape, we're dedicated to building a vibrant community where freelancers can find meaningful opportunities, expand their networks, and achieve their professional goals. Our platform offers a diverse range of projects spanning across industries such as graphic design, web development, writing, marketing, consulting, and more, ensuring that there's something for everyone. <br /><br />
                    For clients, <b>Hire-A-Hand</b> serves as a trusted marketplace to access a global talent pool, streamline project management, and drive business growth. Whether you're a small startup or a Fortune 500 company, our platform connects you with skilled freelancers who can deliver exceptional results on time and within budget. <br /><br />
                    What sets <b>Hire-A-Hand</b> apart is our commitment to fostering transparency, trust, and collaboration. We provide robust communication tools, secure payment systems, and dedicated support to ensure a seamless experience for both freelancers and clients. Our mission is to create a thriving ecosystem where freelancers can thrive professionally and clients can achieve their goals with confidence. <br /><br />
                    Join us today and be a part of the future of work. Whether you're freelancing full-time, pursuing a side hustle, or seeking freelance talent for your projects, <b>Hire-A-Hand</b> is here to support you every step of the way.</p>
                </div>
                <div className="faq">
                <center><h1>Frequently Asked Questions</h1></center>
                    <h3 className="que">1.What is freelancing?</h3>
                    <div className="ans"><p>Freelancing is a work arrangement where individuals offer their skills and services to clients on a project basis, typically without a long-term commitment to any single employer.</p></div>
                    <br /><br />
                    <h3 className="que">2.How does freelancing work?</h3>
                    <div className="ans"><p>Freelancers create profiles showcasing their expertise and skills on freelancing platforms. Clients post projects they need help with, and freelancers submit proposals outlining their approach, timeline, and pricing. Once hired, freelancers complete the project and receive payment.</p></div>
                    <br />
                    <h3 className="que">3.What types of projects can I find on this platform?</h3>
                    <div className="ans"><p>Our platform offers a wide range of projects across various industries, including graphic design, web development, writing, marketing, consulting, and more.</p></div>
                    <br /><br />
                    <h3 className="que">4.How do I get paid as a freelancer?</h3>
                    <div className="ans"><p>Payment methods vary depending on the platform and client preferences. Common methods include direct bank transfers, PayPal, Stripe, and milestone payments through the freelancing platform</p></div>
                    <br /><br />
                    <h3 className="que">5.How do I ensure payment security as a freelancer?</h3>
                    <div className="ans"><p>We recommend using our platform's built-in payment system to ensure secure transactions. Additionally, consider working with clients who have positive reviews and a verified payment history.</p></div>
                
                </div>
            </div>
        </>
        </Layout>
    );
}

export default About;
