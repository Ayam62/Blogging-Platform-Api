import express from "express"
import { deleteBlogs, getAllBlogs, PostBlogs, updateBlog } from "../../controllers/adminControllers/postController.js";
import { protect } from "../../middlewares/authMiddlwares/auth.middleware.js";

const postRouter=express.Router();

postRouter.use(protect)
postRouter.get("/",getAllBlogs)
postRouter.post("/post",PostBlogs)
postRouter.put("/update/:id",updateBlog)
postRouter.delete("/delete/:id",deleteBlogs)


export default postRouter