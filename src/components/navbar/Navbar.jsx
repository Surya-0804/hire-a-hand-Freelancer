import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";
import boy from "../../../boy.png";
import building from "../../../buildings.png";
import "./Navbarstyle.css";
import SearchDialog from "../searchDialog/SearchDialog";

export const Menuitems = [
    {
        title: "Home",
        url: "/home",
        cName: "nav-links",
        icon: "fa-solid fa-house-user",
      },
      {
        title: "About",
        url: "/About",
        cName: "nav-links",
        icon: "fa-solid fa-circle-info",
      },
      {
        title: "Posting",
        url: "/allblogs",
        cName: "nav-links",
        icon: "fa-solid fa-briefcase",
      },
      {
        title: "Contact",
        url: "/#footer",
        cName: "nav-links",
        icon: "fa-solid fa-address-book",
      },
      {
        title: "Login",
        url: "/adminlogin",
        cName: "nav-links",
        icon: "fa-solid fa-address-book",
      },
    ];
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("admin"));
    const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("admin"));
        const uid = userData?.user?.uid;

        if (uid) {
          const db = getFirestore();
          const usersCollectionRef = collection(db, 'users');
          const querySnapshot = await getDocs(query(usersCollectionRef, where('uid', '==', uid)));

          if (!querySnapshot.empty) {
            const userDocSnapshot = querySnapshot.docs[0];
            const userData = userDocSnapshot.data();
            const userType = userData.userType;

            setUserType(userType);
          } else {
            console.error("User document not found for UID:", uid);
          }
        } else {
          console.error("UID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserType();
  }, []);
  const handleLogout = () => {
    // Implement logout logic here
    // For example, clear localStorage and update state
    localStorage.removeItem("admin");
    setIsLoggedIn(false);
  };
  const getDashboardLink = () => {
    if (userType && userType.toLowerCase() === "freelancer") {
      return "/freelancer-dashboard";
    } else if (userType && userType.toLowerCase() === "company") {
      return "/dashboard";
    } else {
      return "/adminlogin";
    }
  };

  return (
    
    <div className="nav" style={{ position: 'sticky', top: '0', backgroundColor: '#333'}}>
    <nav className="Navbaritems">
      <Link to="/"><h1 className="navbar-logo">Hire-a-Hand</h1></Link>
      <ul className="nav-menu">
        {Menuitems.map((item, index) => (
          (item.title === "Login" && isLoggedIn) ? null : (
            <li key={index} className="li">
              <Link className={item.cName} to={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
            
          )
        ))}
        <SearchDialog style={{marginRight:"20px", marginLeft:"10px"}}  />
       {isLoggedIn && (
  <li className="li">
    <Link to={getDashboardLink()}>
      {getDashboardLink() === "/freelancer-dashboard" ? (
        <img
          src={boy}
          alt="Freelancer"
          className="dashboard-image p-0.5 text-red-500 w-10 h-10"
        />
      ) : (
        <img
          src={building}
          alt="Company"
          className="dashboard-image p-0.5 text-red-500 w-10 h-10"
        />
      )}
    </Link>
  </li>
)}

      </ul>
    </nav>
  </div>
);
};

export default Navbar;
