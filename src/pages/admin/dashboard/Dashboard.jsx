import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/data/MyContext';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { fireDb, auth } from '../../../firebase/FirebaseConfig'; // Adjust the import path accordingly

const Dashboard = () => {
    console.log("Dashboard component rendered");

    const context = useContext(myContext);
    const { mode, getAllBlog, deleteBlogs } = context;
    const navigate = useNavigate();
    let [currentUser, setCurrentUser] = useState(null);

    const logout = () => {
        localStorage.clear("admin");
        navigate("/");
    };


    const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
            }, error => {
                reject(error);
            });
        });
    };

    useEffect(() => {
        const checkCurrentUser = async () => {
            try {
                const user = await getCurrentUser();
                console.log("Effect - Current User:", user);

                if (!user) {
                    console.log("Redirecting to login from Dashboard useEffect");
                    navigate('/adminlogin');
                } else {
                    setCurrentUser(user);
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
                // Handle error or redirect to login as needed
                navigate('/adminlogin');
            }
        };

        checkCurrentUser();
    }, [getCurrentUser, navigate]);

    // Log the length of getAllBlog and currentUser
    console.log("getAllBlog Length:", getAllBlog.length);
    console.log("currentUser:", currentUser);

    // Check if currentUser is defined before accessing its properties
    const filteredBlogs = currentUser
        ? getAllBlog.filter(blog => blog.userId === currentUser.uid)
        : [];

    console.log("Filtered Blogs:", filteredBlogs);

    return (
        <Layout>
            <div className="py-10">
                <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                    <div className="left">
                        <img
                            className="w-40 h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                            src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                            alt="profile"
                        />
                    </div>
                    <div className="right">
                        <h1
                            className='text-center font-bold text-2xl mb-2'
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                        >
                            Kamal Nayan Upadhyay
                        </h1>

                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            className="font-semibold">
                            Software Developer
                        </h2>
                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            className="font-semibold">knupadhyay784@gmail.com
                        </h2>
                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            className="font-semibold">
                            <span>Total Blog : </span>  15
                        </h2>
                        <div className="flex gap-2 mt-2">
                            <Link to={'/createblog'}>
                                <div className="mb-2">
                                    <Button
                                        style={{
                                            background: mode === 'dark'
                                                ? 'rgb(226, 232, 240)'
                                                : 'rgb(30, 41, 59)',
                                            color: mode === 'dark'
                                                ? 'black'
                                                : 'white'
                                        }}
                                        className='px-8 py-2'
                                    >
                                        Create Blog
                                    </Button>
                                </div>
                            </Link>
                            <div className="mb-2">
                                <Button
                                    onClick={logout}
                                    style={{
                                        background: mode === 'dark'
                                            ? 'rgb(226, 232, 240)'
                                            : 'rgb(30, 41, 59)',
                                        color: mode === 'dark'
                                            ? 'black'
                                            : 'white'
                                    }}
                                    className='px-8 py-2'
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr
                    className={`border-2
                    ${mode === 'dark'
                        ? 'border-gray-300'
                        : 'border-gray-400'}`}
                />

                <div className="">
                    <div className='container mx-auto px-4 max-w-7xl my-5'>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                            <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    style={{
                                        background: mode === 'dark'
                                            ? 'white'
                                            : 'rgb(30, 41, 59)'
                                    }}
                                    className="text-xs ">
                                    <tr>
                                        <th
                                            style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                            scope="col"
                                            className="px-6 py-3">
                                            S.No
                                        </th>
                                        <th
                                            style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                            scope="col"
                                            className="px-6 py-3">
                                            Thumbnail
                                        </th>
                                        <th
                                            style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                            scope="col"
                                            className="px-6 py-3">
                                            Title
                                        </th>
                                        <th
                                            style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                            scope="col"
                                            className="px-6 py-3">
                                            Category
                                        </th>
                                        <th
                                            style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                            scope="col"
                                            className="px-6 py-3">
                                            Date
                                        </th>
                                        <th
                                            style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                            scope="col"
                                            className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                {filteredBlogs.length > 0 ? (
                                    <tbody>
                                    {filteredBlogs.map((item, index) => {
                                            console.log("Blog Item:", item);
                                            const { thumbnail, date, blogs, id } = item;

                                            return (
                                                <tr
                                                    key={index}
                                                    className=" border-b-2"
                                                    style={{
                                                        background: mode === 'dark'
                                                            ? 'rgb(30, 41, 59)'
                                                            : 'white'
                                                    }}
                                                >
                                                    <td
                                                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                        className="px-6 py-4">
                                                        {index + 1}.
                                                    </td>

                                                    <th
                                                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                        scope="row"
                                                        className="px-6 py-4 font-medium ">
                                                        <img className='w-16 rounded-lg' src={thumbnail} alt="thumbnail" />
                                                    </th>

                                                    {/* Adjusted rendering logic for Title and Category */}
                                                    <td
                                                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                        className="px-6 py-4">
                                                        {blogs && blogs.title ? blogs.title : "N/A"}
                                                    </td>

                                                    <td
                                                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                        className="px-6 py-4">
                                                        {blogs && blogs.category ? blogs.category : "N/A"}
                                                    </td>

                                                    <td
                                                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                        className="px-6 py-4">
                                                        {date}
                                                    </td>

                                                    <td
                                                        onClick={() => deleteBlogs(id)}
                                                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                        className="px-6 py-4">
                                                        <button
                                                            className='px-4 py-1 rounded-lg text-white font-bold bg-red-500'>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                <h1>Not Found</h1>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
