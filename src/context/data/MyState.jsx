// MyState.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import MyContext from './MyContext';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDb } from '../../firebase/FirebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function MyState(props) {
    const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }

    //* search state
    const [searchkey, setSearchkey] = useState('');

    //* loading state
    const [loading, setloading] = useState(false);

    //* getAllBlog State 
    const [getAllBlog, setGetAllBlog] = useState([]);

    //* getAllBlogs Function
    function getAllBlogs() {
        setloading(true);
        try {
            const q = query(
                collection(fireDb, "blogPost"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let blogArray = [];
                QuerySnapshot.forEach((doc) => {
                    blogArray.push({ ...doc.data(), id: doc.id });
                });

                setGetAllBlog(blogArray)
                console.log(blogArray)
                setloading(false)
            });
            return () => data;
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = getAllBlogs(); // Call the function and store the unsubscribe function
    
        // Cleanup function to unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []);
    

    // Blog Delete Function 
    const deleteBlogs = async (id) => {
        try {
            await deleteDoc(doc(fireDb, "blogPost", id));
            getAllBlogs();
            // Assuming you have 'toast' imported for displaying messages
            // toast.success("Blogs deleted successfully");
        } catch (error) {
            console.log(error)
        }
    }

    // Function to get the current user
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe to prevent memory leaks

      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    }, (error) => {
      reject(error);
    });
  });
};
    const fetchBlogData = async () => {
        try {
            const q = query(
                collection(fireDb, "blogPost"),
                orderBy('time')
            );
            const querySnapshot = await getDocs(q);

            const blogArray = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            return blogArray;
        } catch (error) {
            console.error('Error fetching blog data:', error);
            throw error; // Propagate the error to the caller
        }
    };

    const contextValue = {
        mode,
        toggleMode,
        searchkey,
        setSearchkey,
        loading,
        setloading,
        getAllBlog,
        setAllBlog: setGetAllBlog,
        deleteBlogs,
        getCurrentUser,
        fetchBlogData,
    };

    return (
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState;
