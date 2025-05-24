import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
  type:String,
  required: true,
  }, 

  author: {
  type:String,
  required: true,
  },

  content:{
  type:String,
  required: true,
  },

  imageUrl: { type: String },
  publicId: { type: String },
  category: { type: String },
  tags: [String],


  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
},{ timestamps: true })

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;