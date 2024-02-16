import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import myContext from "../../../context/data/MyContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate ,Link} from "react-router-dom";
import toast from "react-hot-toast";
import { auth, fireDb } from "../../../firebase/FirebaseConfig";
import "./adminLoginStyles.css"; // Import the CSS file with your styles
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

export default function AdminLogin() {
    const context = useContext(myContext);
    const { mode } = context;

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const linkTag = document.createElement('link');
    const [isHovered, setIsHovered] = useState(false);
    const linkStyle={
        textDecoration: 'none',color: isHovered ? 'aliceblue' : '#435a91',
      }
linkTag.rel = 'stylesheet';
linkTag.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inconsolata:wght@200..900&family=Kanit&family=Play:wght@400;700&family=Poppins:wght@400;500&family=Protest+Guerrilla&family=Protest+Strike&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Sixtyfour&family=Smooch+Sans:wght@100..900&display=swap';

document.head.appendChild(linkTag);
    useEffect(() => {
        document.body.className = 'login';
      }, []);
    
    const login = async () => {
        if (!email || !password) {
            return toast.error("All fields are required");
        }
    
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
    
            // Retrieve user data from Firebase
            const db = getFirestore();
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where('email', '==', email));
            const querySnapshot = await getDocs(q);
    
            let userType = null;
    
            querySnapshot.forEach((doc) => {
                userType = doc.data().userType;
            });
    
            console.log("userType:", userType);
    
            // Check userType and redirect accordingly (case-insensitive)
            if (userType) {
                toast.success("Login successful");
    
                localStorage.setItem("admin", JSON.stringify(result));
    
                if (userType.toLowerCase() === "freelancer") {
                    // Redirect to freelancer dashboard
                    navigate("/freelancer-dashboard");
                } else if (userType.toLowerCase() === "company") {
                    // Redirect to company dashboard
                    navigate("/dashboard");
                } else {
                    console.error("Invalid userType");
                    toast.error("Login failed");
                }
            } else {
                console.error("UserType not available");
                toast.error("Login failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed");
        }
    };
    
    
    
    
    useEffect(() => {
        // Check if there's an authenticated user and navigate to the dashboard
        const authenticatedUser = JSON.parse(localStorage.getItem("admin"));
        if (authenticatedUser) {
            console.log("Redirecting to dashboard from AdminLogin useEffect");
            navigate("/dashboard");
        }
    }, [navigate]);

    return (
        <>
        <div className="flex flex-col justify-center items-center h-screen Signup">
            {/* Card  */}
            <Card
                className="card"
                style={{
                    
                    height: '370px',
                    width: '400px',
                    
                    backgroundColor: 'rgba(255, 255, 255,0.2)',boxShadow: '1px 16px 186px -44px rgba(0,0,0,0.7)', borderRadius:'26px',color:"#162734"
                }}
            >
                {/* Top Heading  */}
                <Typography
                    variant="h4"
                    className="logintext"
                    style={{textAlign:'center',fontFamily:'Kanit',fontSize:'50px',marginTop:'40px',}}
                >
                    Login
                </Typography>
                {/* CardBody */}
                <CardBody className="card-body">
                    <form className="flex flex-col gap-4">
                        {/* First Input  */}
                        <div style={{paddingBottom:'20px'}}>
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                    color: '#2f102c',
                                }}
                            />
                        </div >
                        {/* Second Input  */}
                        <div style={{paddingBottom:'20px'}}>
                            <Input
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                }}
                            />
                        </div>
                        {/* Login Button  */}
                        <Button
                            onClick={login}
                            className="btn-login"
                            style={{
                                backgroundColor: '#2f102c',
                                border: '0',
                                fontSize: '16px',
                            }}
                        >
                            Login
                        </Button>
                    </form>
                </CardBody>
            </Card>
            <div className="w-100 text-center mt-2" style={{color:'rgba(0,2,35,255)'}}>
        Already have an account? <Link to="/login"  style={linkStyle}  onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}>Login</Link>
      </div>
        </div>
        
      </>
    );
}
