import Blog from "../models/Blog.js";
import generateShortDesc from "../utils/generateShortDesc.js";

/* PUBLIC – All Blogs */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* PUBLIC – Single Blog */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ADMIN – Create Blog */
export const createBlog = async (req, res) => {
  try {
    const { title, category, image, fullDesc } = req.body;

    if (!fullDesc || !fullDesc[0]?.content) {
      return res.status(400).json({ message: "Blog content required" });
    }

    const shortDesc = generateShortDesc(fullDesc[0].content);

    const blog = await Blog.create({
      title,
      category,
      image,
      shortDesc,
      fullDesc,
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ADMIN – Update Blog */
export const updateBlog = async (req, res) => {
  try {
    const { title, category, image, fullDesc } = req.body;

    let updateData = {
      title,
      category,
      image,
      fullDesc,
    };

    // regenerate shortDesc if content updated
    if (fullDesc && fullDesc[0]?.content) {
      updateData.shortDesc = generateShortDesc(fullDesc[0].content);
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ADMIN – Delete Blog */
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};