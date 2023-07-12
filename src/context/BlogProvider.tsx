import React, { useState } from "react";
import BlogContext from "./BlogContext";

const BlogProvider = ({ children }) => {
  const [readPosts, setReadPosts] = useState<string[]>([]);

  const markPostAsRead = (id: string) => {
    setReadPosts((prevPosts) => [...prevPosts, id]);
  };
  return (
    <BlogContext.Provider value={{ readPosts, markPostAsRead }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
