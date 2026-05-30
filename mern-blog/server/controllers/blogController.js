const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted successfully" });
};