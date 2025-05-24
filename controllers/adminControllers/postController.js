import Blog from "../../models/adminModel/postSchema.js"

export const getAllBlogs= async(req,res)=>{
    try{
        //const blogs = await Blog.find().sort({ createdAt: -1 });
        const blogs= await Blog.find().sort({createdAt:-1});
        res.status(200).json(blogs)
    }catch(error){
            console.error("Error fetching blogs:", error);
            res.status(500).json({ error: 'Failed to fetch blogs' });
    }
}
export const PostBlogs= async (req,res)=>{
    try{
        const { title, content, imageUrl, imagePublicId, author,category,tags } = req.body;
          if (!title || !content || !imageUrl) {
            return res.status(400).json({ error: "Title, content, and imageUrl are required" });
        }
         const newBlog = new Blog({
            title,
            content,
            imageUrl,        
            imagePublicId,   
            author,
            category,
            tags           
        });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    }catch(error){
    console.error("Error posting blog:", error);
    res.status(500).json({ error: "Failed to post blog" });
    }
}

export const updateBlog=async (req,res)=>{
    try{
        const { id } = req.params;
        const { title, content, imageUrl, imagePublicId, author,category,tags } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content, imageUrl, imagePublicId, author,category,tags },
        { new: true, runValidators: true }
        );
         if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json(updatedBlog);
    }catch(error){
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog" });
    }
}

export const deleteBlogs=async (req,res)=>{
    try{
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
        }
        //delete image from cloudinary
        if (blog.imagePublicId) {
              await cloudinary.uploader.destroy(blog.imagePublicId);
            }
         // 3. Delete the blog from MongoDB
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog and image deleted successfully" });

    }catch(error){
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Failed to delete blog" });
    }
}

