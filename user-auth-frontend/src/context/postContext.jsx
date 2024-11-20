import  { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create Context
export const PostsContext = createContext();

// Context Provider
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // Global posts state
  const [loading, setLoading] = useState(false);

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
          toast.error("You must be logged in to view posts.");
          setLoading(false);
          return;
        }
        
        const response = await axios.get("http://localhost:5000/api/posts/my-posts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("called", response.data)
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error.message);
      toast.error("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new post
  const addPost = async (newPostData) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You must be logged in to add a post.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        newPostData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newPost = response.data.post;
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the top
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error adding post:", error.response?.data || error.message);
      toast.error("Failed to create post.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostsContext.Provider value={{ posts, loading, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};
