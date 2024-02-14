// App.jsx
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import AllBlogs from './pages/allBlogs/AllBlogs';
import NoPage from './pages/nopage/NoPage';
import CreateBlog from './pages/admin/createBlog/CreateBlog';
import BlogInfo from './pages/blogInfo/BlogInfo';
import AdminLogin from './pages/admin/adminLogin/AdminLogin';
import Dashboard from './pages/admin/dashboard/Dashboard';
import { Toaster } from 'react-hot-toast';
import MyState from './context/data/myState';


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
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/createblog" element={<CreateBlog />} />
                        <Route path="/*" element={<NoPage />} />
                    </Routes>
                    <Toaster />
                </Router>
            </MyState>
        </div>
    );
}

export default App;
