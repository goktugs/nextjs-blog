import React from "react";

const BlogContext = React.createContext({
  readPosts: [] as string[],
  markPostAsRead: (id: string) => {},
});

export default BlogContext;
