import  { useState, useContext } from "react";
import { PostsContext } from "../../context/postContext";

const AddPost = () => {
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { addPost } = useContext(PostsContext); // Access addPost from context

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newPostData = { content, mediaUrl };

    await addPost(newPostData); // Call context function to add the post
    setContent("");
    setMediaUrl("");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Create a Post</h2>
      <form onSubmit={handlePostSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-600">
            Content
          </label>
          <textarea
            id="content"
            rows="4"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-600">
            Media URL (optional)
          </label>
          <input
            type="url"
            id="mediaUrl"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            placeholder="https://example.com/media.jpg"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Posting..." : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
