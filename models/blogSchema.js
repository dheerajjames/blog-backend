const mongoose = require("mongoose");
const {
	validateRelatedBlogId,
} = require("../validation/blogValidation");

const blogSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
    unique: true,
  },
  author:{
      type:String, 
      required:true
  },
  createdAt: {
      type:Date,
  },
  blogTitle: {
    type: String,
    required:[true,"Blog cannot be created without content"],
    minlength:[1,"Title cannot be empty"],
    maxlength:[50,"Title too lengthy"]
  },
  blogContent: {
    type: String,
    required:[true,"Blog cannot be created without content"],
    minlength:[1,"Content cannot be empty"]
  },
  blogImage: {
    type: String,
    required: true, 
  },
  relatedLinks: 
    { 
      type:[{
            relatedBlogId: {
            type: String,
            required: true,
            validate: {
              validator: validateRelatedBlogId,
              message: "Invalid input for relatedBlogId or blog not found",
            },
          },
          relatedBlogTitles: {
            type: String,
            required:true
          }
    }],
    },
});

const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;