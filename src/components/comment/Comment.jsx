import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { fireDb, auth } from '../../firebase/FirebaseConfig';  // Import auth directly
import MyContext from '../../context/data/MyContext';
import { useNavigate } from 'react-router-dom';

const Comment = ({ setAllComment, allComment, blogPostId }) => {
  const context = useContext(MyContext);
  const { mode, getAllBlog } = context;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [quotePrice, setQuotePrice] = useState('');
  const [timeRequired, setTimeRequired] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  // Use auth directly from FirebaseConfig
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        (user) => {
          unsubscribe();
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
      // Get user UID from the authenticated user
      const userUid = user.uid;
  
      console.log('Fetching user details for UID:', userUid);
  
      // Query Firestore to get user details by UID
      const userDetailsQuery = query(collection(fireDb, 'users'), where('uid', '==', userUid));
      const userDetailsSnapshot = await getDocs(userDetailsQuery);
  
      console.log('User details snapshot:', userDetailsSnapshot.docs);
  
      if (!userDetailsSnapshot.empty) {
        const userDetailsData = userDetailsSnapshot.docs.map((doc) => doc.data());
        console.log('User details data:', userDetailsData);
        setCurrentUser(userUid); // Set the UID directly
        setUserDetails(userDetailsData[0]); // Assuming you expect only one document
      } else {
        console.log('User details not found for UID:', userUid);
      }
    } catch (error) {
      console.error('Error fetching current user details:', error);
      navigate('/adminlogin');
    }
  };
  
  
  
  
  
  
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (blogPostId) {
          // Query Firestore to get comments for the current blog post
          const commentsQuery = query(
            collection(fireDb, 'blogPost', blogPostId, 'comments')
          );
          const commentsSnapshot = await getDocs(commentsQuery);
  
          const fetchedComments = commentsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          setAllComment(fetchedComments);
        }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  // Call the fetchComments function when blogPostId changes
  fetchComments();
}, [blogPostId]);

  const addComment = async () => {
    try {
      setLoading(true);
  
      const user = await getCurrentUser();
  
      if (!user) {
        console.error('User not authenticated');
        return toast.error('Please sign in to add comments.');
      }
  
      // Fetch user details directly from Firestore
      await getCurrentUserDetails(user);
  
      if (!userDetails || !userDetails.name) {
        console.error('User details not available');
        return toast.error('User details not available');
      }
  
  
      if ( !quotePrice || !timeRequired) {
        console.error('Please fill in all fields');
        return toast.error('Please fill in all fields');
      }
  
      // const blogPostId = props.blogPostId;
      console.log(blogPostId);
  
      if (!blogPostId) {
        console.error('Invalid blog post');
        return toast.error('Invalid blog post');
      }
  
      const commentData = {
        fullName: userDetails.name,
        date: new Date().toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        commentText,
        quotePrice,
        timeRequired,
      };
  
      const docRef = await addDoc(
        collection(fireDb, 'blogPost', blogPostId, 'comments'), 
        commentData
      );
      setAllComment((prevComments) => [...prevComments, { id: docRef.id, ...commentData }]);
  
      setCommentText('');
      setQuotePrice('');
      setTimeRequired('');
  
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Error adding comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            Make Comment
          </h2>
        </div>
      <form className="mb-6">
        {/* ... existing code ... */}
        {/* <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
            shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{
              background: mode === 'dark'
                ? '#353b48'
                : 'rgb(226, 232, 240)'
            }}></div> */}

        {/* New Field: Quote your price */}
        <input
          type="text"
          placeholder="Quote your price"
          value={quotePrice}
          onChange={(e) => setQuotePrice(e.target.value)}
          className="px-0 w-full text-base border-0 rounded-lg focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 my-2 px-3 py-2"
          style={{
            background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)',
          }}
        />

        {/* New Field: Enter the amount of time required */}
        <input
          type="text"
          placeholder="Enter the amount of time required"
          value={timeRequired}
          onChange={(e) => setTimeRequired(e.target.value)}
          className="px-0 w-full text-base border-0 rounded-lg focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 my-2 px-3 py-2 "
          style={{
            background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)',
          }}
        />

        {/* Button */}
        <div className="">
          <Button
            onClick={addComment}
            style={{
              background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
              color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)',
            }}
          >
            Post comment
          </Button>
        </div>
      </form>

      {/* Display Comments */}

        <article
          className="p-6 mb-6 text-base rounded-lg "
          style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}
        >
          {allComment.map((item, index) => {
            const { fullName, date, commentText, quotePrice, timeRequired } = item;
            return (
              <div key={index}>
                <footer className="flex justify-between items-center mb-">
                  <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg ">
                    <p
                      className="inline-flex items-center mr-3 text-lg  "
                      style={{ color: mode === 'dark' ? 'black' : 'black' }}
                    >
                      {fullName}
                    </p>
                    <p className="text-sm " style={{ color: mode === 'dark' ? 'black' : 'black' }}>
                      {date}
                    </p>
                  </div>
                </footer>
                <p
                  className="text-gray-500 dark:text-gray-400 text-md"
                  style={{ color: mode === 'dark' ? 'white' : 'black' }}
                >
                  ↳ {commentText}
                  <br />
                  ↠ Quote Price: {quotePrice}
                  <br />
                  ↠ Time Required: {timeRequired}
                </p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default Comment;
