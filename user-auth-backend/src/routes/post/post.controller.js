import Post from "./post.model.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    console.log("reached")
    const { content, mediaUrl } = req.body;
    const userId = req.user.id; // Assuming `req.user` is set after authentication

    const newPost = await Post.create({
      content,
      mediaUrl,
      author: userId,
    });

    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating post." });
  }
};

// Fetch posts for the feed
export const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` is set after authentication
    const followedUserIds = req.user.following; // Assuming `req.user.following` exists

    const posts = await Post.find({ author: { $in: followedUserIds } })
      .populate("author", "username profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching posts." });
  }
};

// Like or unlike a post
export const likePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { action } = req.body; // "like" or "unlike"
    const userId = req.user.id;
 
    if (action === "like") {
      await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });
    } else if (action === "unlike") {
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
    } else {
      return res.status(400).json({ success: false, message: "Invalid action." });
    }

    res.status(200).json({ success: true, message: `Post ${action}d successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating post." });
  }
};

// Edit a post
export const editPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { content, mediaUrl } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post || post.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized action." });
    }

    post.content = content || post.content;
    post.mediaUrl = mediaUrl || post.mediaUrl;
    post.updatedAt = new Date();

    await post.save();

    res.status(200).json({ success: true, message: "Post updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating post." });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post || post.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized action." });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ success: true, message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting post." });
  }
};
