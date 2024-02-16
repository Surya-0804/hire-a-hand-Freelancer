import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import MyContext from '../../../context/data/MyContext';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { fireDb, auth } from '../../../firebase/FirebaseConfig';
import { getDocs, doc, query, collection, where } from 'firebase/firestore';
import boy from "../../../../boy.png";

const FreelancerDashboard = () => {
    const context = useContext(MyContext);
    const { mode, getAllBlog, deleteBlogs } = context;
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [freelancerDetails, setFreelancerDetails] = useState(null);
    const [comments, setComments] = useState([]);

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

    const getCurrentFreelancerDetails = async (user) => {
        try {
            if (user) {
                const freelancerDetailsQuery = query(collection(fireDb, 'users'), where('uid', '==', user.uid));
                const freelancerDetailsSnapshot = await getDocs(freelancerDetailsQuery);

                if (!freelancerDetailsSnapshot.empty) {
                    const freelancerDetailsDoc = freelancerDetailsSnapshot.docs[0];
                    const freelancerDetailsData = freelancerDetailsDoc.data();
                    setCurrentUser(user);
                    setFreelancerDetails(freelancerDetailsData);

                    // Fetch and set comments associated with the freelancer from the nested collection
                    const blogPostQuery = query(collection(fireDb, 'blogPost'), where('userId', '==', user.uid));
                    const blogPostSnapshot = await getDocs(blogPostQuery);

                    const commentsData = blogPostSnapshot.docs.reduce((acc, doc) => {
                        const commentsQuery = query(collection(fireDb, 'blogPost', doc.id, 'comments'));
                        const commentsSnapshot = getDocs(commentsQuery);
                        const comments = commentsSnapshot.docs.map(commentDoc => commentDoc.data());
                        return [...acc, ...comments];
                    }, []);

                    setComments(commentsData);
                } else {
                    console.log("Freelancer details not found");
                }
            } else {
                console.log("Redirecting to login from FreelancerDashboard useEffect");
                navigate('/adminlogin');
            }
        } catch (error) {
            console.error("Error fetching current freelancer:", error);
            navigate('/adminlogin');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const user = await getCurrentUser();
            getCurrentFreelancerDetails(user);
        };

        fetchData();
    }, [navigate]);

    return (
        <Layout>
            <div className="py-10">
                <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                    <div className="left">
                        <img
                            className="w-40 h-40 object-cover rounded-full p-1"
                            src={boy}
                            alt="profile"
                        />
                    </div>
                    <div className="right">
                        <h1
                            className='font-bold text-4xl mb-2'
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                        >
                            {freelancerDetails?.name || 'Freelancer Name'}
                        </h1>
                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            className="text-lg">
                            <span>UserType :</span>{freelancerDetails?.userType || 'UserType'}
                        </h2>

                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            className="text-lg">
                            <span>Email :</span>{freelancerDetails?.email || 'Email'}
                        </h2>

                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            className="text-lg">
                            <span>Working Experience :</span>{freelancerDetails?.workingExperience || 'Working Experience'}
                        </h2>

                        <div className="flex gap-2 mt-2">
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

                {/* <div className="">
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
                                            Comment Text
                                        </th>
                                    </tr>
                                </thead>

                                {comments.length > 0 ? (
                                    <tbody>
                                        {comments.map((comment, index) => (
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
                                                    <img className='w-16 rounded-lg' src={comment.thumbnail} alt="thumbnail" />
                                                </th>
                                                <td
                                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                    className="px-6 py-4">
                                                    {comment.blogs && comment.blogs.title ? comment.blogs.title : "N/A"}
                                                </td>
                                                <td
                                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                    className="px-6 py-4">
                                                    {comment.blogs && comment.blogs.category ? comment.blogs.category : "N/A"}
                                                </td>
                                                <td
                                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                    className="px-6 py-4">
                                                    {comment.date}
                                                </td>
                                                <td
                                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                    className="px-6 py-4">
                                                    {comment.commentText}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                <h1>No Comments Found</h1>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div> */}
            </div>
        </Layout>
    );
}

export default FreelancerDashboard;
