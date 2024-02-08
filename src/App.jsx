import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import NoPage from "./pages/nopage/NoPage";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import MyState from "./context/data/myState";
import { Toaster } from "react-hot-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
function App() {
  return (
    <div>
      <MyState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/allblogs" element={<AllBlogs />} />
            <Route path="/bloginfo/:id" element={<BlogInfo />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/dashboard" element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/createblog" element={
              <ProtectedRouteForAdmin>
                <CreateBlog/>
              </ProtectedRouteForAdmin>
            } />
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <Toaster/>
        </Router>
      </MyState>
    </div>
  )
}

export default App

export const ProtectedRouteForAdmin = ({ children }) => {
  const auth = getAuth();  // Import getAuth from Firebase

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to the login page if the user is not authenticated
        navigate('/adminlogin');
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, [auth]);

  return children;
};