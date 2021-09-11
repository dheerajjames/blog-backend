const Blog = require("../models/blogSchema");
const mongoose = require("mongoose");
async function validateRelatedBlogId() {
  return await mongoose.model("blogs").exists({ blogId: this.relatedBlogId });
}

module.exports = {
  validateRelatedBlogId,
};
