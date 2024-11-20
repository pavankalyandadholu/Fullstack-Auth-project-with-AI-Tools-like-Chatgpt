import { useContext } from "react";
import { PostsContext } from "../../context/postContext";

const Posts = () => {
  const { posts, loading } = useContext(PostsContext); // Access posts and loading from context

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-700 mt-6 mb-4">Feed</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <p className="text-gray-800 font-medium">{post.content}</p>
              {post.mediaUrl && (
                <img
                  src={post.mediaUrl}
                  alt="Post media"
                  className="mt-2 rounded-lg max-w-full"
                />
              )}
              <div className="text-sm text-gray-500 mt-2">
                Posted at: {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts available. Be the first to post!</p>
      )}
    </div>
  );
};

export default Posts;
