import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import MyContext from '../../../context/data/MyContext';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { fireDb, auth } from '../../../firebase/FirebaseConfig';
import { getDoc, doc, query, collection, where,getDocs } from 'firebase/firestore';

const Dashboard = () => {
    const context = useContext(MyContext);
    const { mode, getAllBlog, deleteBlogs } = context;
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const logout = () => {
        localStorage.clear("admin");
        navigate("/");
    };

    const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(
                (user) => {
                    unsubscribe();
                    console.log('Current user:', user);
                    resolve(user);
                },
                (error) => {
                    console.error('Error in onAuthStateChanged:', error);
                    reject(error);
                }
            );
        });
    };

    const getCurrentUserDetails = async (user) => {
        try {
            if (user) {
                const userDetailsQuery = query(collection(fireDb, 'users'), where('uid', '==', user.uid));
                const userDetailsSnapshot = await getDocs(userDetailsQuery);

                if (!userDetailsSnapshot.empty) {
                    const userDetailsDoc = userDetailsSnapshot.docs[0];
                    const userDetailsData = userDetailsDoc.data();
                    setCurrentUser(user);
                    setUserDetails(userDetailsData);
                } else {
                    console.log("User details not found");
                }
            } else {
                console.log("Redirecting to login from Dashboard useEffect");
                navigate('/adminlogin');
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
            navigate('/adminlogin');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const user = await getCurrentUser();
            getCurrentUserDetails(user);
        };

        fetchData();
    }, [navigate]);

    const filteredBlogs = currentUser
        ? getAllBlog.filter(blog => blog.userId === currentUser.uid)
        : [];

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
                            {userDetails?.companyName || userDetails?.name ||'Company Name'}
                        </h1>

                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            className="font-semibold">
                            {userDetails?.userType || 'User Type'}
                        </h2>
                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            className="font-semibold">{userDetails?.email || 'Email'}
                        </h2>
                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            className="font-semibold">
                            <span>Total Blog : </span>  {filteredBlogs.length}
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
