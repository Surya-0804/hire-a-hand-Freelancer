import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { FiArrowRight } from "react-icons/fi";
import "./Home.css";
import png1 from "./png1.png";
import png2 from "./png2.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Footer from "../../components/footer/Footer"


const Home = () => {
  const workInfoData = [
    {
      // cName: PickMeals,
      title: "Post",
      text: "Clients post projects or jobs they need to be completed. They provide details such as project description, budget, deadline, and required skills. This information helps freelancers understand the scope of the project and decide whether to apply.",
    },
    {
      //cName: ChooseMeals,
      title: "Bid",
      text: "Bidding in freelancing involves freelancers submitting proposals in response to clients' project listings. Freelancers pitch their skills, experience, and approach to the project, while clients review proposals and select the best fit. Successful collaboration follows with clear communication, milestone completion, and payment release upon project completion. ",
    },
    {
      //cname: DeliveryMeals,
      title: "Hire",
      text: "The hiring process on a freelancing platform involves clients posting job descriptions, freelancers submitting proposals, shortlisting candidates, negotiating terms, awarding projects, managing the project's progress, reviewing and approving work, releasing payment, and providing feedback and ratings. Effective communication and professionalism are vital for success.",
    },
  ];
  const handleLearnMore = () => {
    window.location.href = '/about'; // Redirect using window.location
  };
  const GetStarted = () => {
    window.location.href = 'https://hack-a-tron-igqd.vercel.app/signup'; // Redirect using window.location
  };
  return (
    <>
    <div><Navbar /></div>
    <div className="home-container">
      
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={png1} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading" >
            Freelance
          </h1>
          <p className="primary-text" >
          Freelancing offers freedom and flexibility, allowing individuals to work on diverse projects from anywhere. It provides opportunities for higher earnings and personal growth, but requires self-discipline and proactive management of workload and finances.
          </p><br /><br />
          <button className="secondary-button" onClick={GetStarted}>
            Get Started <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src="#" alt="" />
        </div>
      </div>
    </div>


    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={png2} alt="" />
      </div>
      <div className="about-section-image-container">
        {/* <img src={AboutBackgroundImage} alt="" /> */}
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading" style={{marginLeft:"13%"}}>Know About Us</p>
        <h1 className="primary-aboutheading" style={{marginLeft:"13%"}}>
        Freelancing: where passion meets profession, and freedom reigns supreme.
        </h1>
        <p className="primary-text" style={{marginLeft:"13%"}}>
        Welcome to Hire-A-Hand, the premier platform for freelancers and clients to connect, collaborate, and succeed together in the dynamic world of freelancing.
<br />
        </p>
        <p className="primary-text" style={{marginLeft:"13%"}}>
        At Hire-A-Hand, we believe in empowering individuals to pursue their passions, showcase their talents, and thrive in the gig economy. Whether you're a seasoned freelancer looking for your next project or a business seeking top-tier talent, our platform provides the tools and resources to make your freelancing journey a success.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button" onClick={handleLearnMore}>Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>


    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-workheading">Work</p>
        <h1 className="primary-workmainheading">How It Works</h1>
        <p className="primary-worktext">
        Freelancing involves individuals offering their specialized skills and services to clients or businesses on a project basis. Freelancers find opportunities, submit proposals, collaborate with clients to complete projects, and receive payment upon completion. Success in freelancing relies on skills, professionalism, effective communication, and building a positive reputation.        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <i className={data.cName}></i>
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* footer */}
    <Footer />
    </>
  )
}

export default Home;
