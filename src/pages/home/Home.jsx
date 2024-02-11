import React, { useEffect, useContext } from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/heroSection/HeroSection';
import BlogPostCard from '../../components/blogPostCard/BlogPostCard';
import Loader from '../../components/loader/Loader';
import MyContext from '../../context/data/MyContext';

const Home = () => {
  const context = useContext(MyContext);
  const { getAllBlog, loading, setAllBlog, fetchBlogData } = context;

  useEffect(() => {
    console.log('Home component mounted');

    window.scrollTo(0, 0);

    // Fetch blog data only if it hasn't been fetched before
    // if (getAllBlog.length === 0 && !loading) {
    //   console.log('Fetching blog data...');
    //   fetchBlogData()
    //     .then((data) => {
    //       // Update the context with the fetched data
    //       setAllBlog(data);
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching blog data:', error);
    //     });
    // }

    // The dependency array should be empty to ensure the effect runs only once
  }, []); // <-- Empty dependency array

  console.log('Rendering Home component');

  return (
    <Layout>
      <HeroSection />
      {/* {loading ? (
        <Loader />
      ) : (
        <div>
          {getAllBlog.length > 0 ? (
            getAllBlog.map((blog) => ( */}
              <BlogPostCard /*key={blog.id} blog={blog}*/ />
            {/* ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      )} */}
    </Layout>
  );
};

export default Home;
