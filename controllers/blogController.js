const uniqid = require("uniqid");
const dotenv = require('dotenv');
const sendResponse = require("../controllers/responses/sendResponse");
const Blog = require("../models/blogSchema");
const { errorHandler } = require("../controllers/responses/errorResponse");
const {getImageURI}=require("../middleware/upload");
const {uploader}=require("../config/cloudinary");

dotenv.config({path:"./config.env"});

const getAllBlogs = async (req,res,next)=>{
    try{
        let data = Blog.find()
        if(!data){
            next(errorHandler.notFound(res,`Data not found.`));
            return
          }
          return sendResponse({res:res,statusCode:200,message:"Data fetched",data:await data});
    }
    catch(err){
        next(errorHandler.serverError(res,err))
    }
    
} 

const getBlogById = async(req,res,next)=>{
    try{
        let {blogId}=req.params;
        let data = await Blog.findOne({blogId:blogId});
        if(!data){
            next(errorHandler.notFound(res,`The Blog ID ${req.params.blogId} was not found.`))
            return;
        }
        return sendResponse({res:res,statusCode:200,message:"Data fetched",data:await data});
    }
    catch(err){
        next(errorHandler.serverError(res,err))
    }
    
  
  }

  const createBlog = async (req, res, next) => {
    let blogImage = undefined;
   
    let{author,blogTitle,blogContent,relatedLinks}=req.body;
    try{
        if(process.env.STORAGE == "database" && req.file){
            let file = (await getImageURI(req)).content;
            blogImage = (await uploader.upload(file)).url;
        }
        else{
            blogImage= req.file.originalname
        }
        let data = await Blog.create({
            blogId:uniqid(),
            author:author,
            blogTitle:blogTitle,
            blogContent:blogContent,
            createdAt:Date.now(),
            blogImage:blogImage ,
            relatedLinks:JSON.parse(relatedLinks),
        });
        if(!data){
            next(errorHandler.notFound(`The Blog ID ${req.params.blogId} not found.`));
            return;
        }
        return sendResponse({res:res,statusCode:201,message:"Data created",data: data});
    }
    catch(err){
        next(errorHandler.badRequest(res,"Provide all the keys"));
      }
    
}

const deleteBlog = async (req, res, next) => {
    try{

        let deletedBlog = await Blog.findOneAndDelete({blogId: req.params.blogId});
        if(!deletedBlog){
            next(errorHandler.notFound(`The Blog ID ${req.params.blogId} not found.`));
            return;
        }
        return sendResponse({res:res,statusCode:204});

    }catch(err){
        next({});

    }
}


const updateBlog = async (req, res, next) => {
    let updateKeys = ['blogTitle', 'blogContent', 'author', 'relatedLinks'];
    const updates = {};
    try{
	Object.keys(req.body).forEach((key) => {
		if (updateKeys.includes(key)) {
            if(key === 'relatedLinks'){
                updates[key] = JSON.parse(req.body[key]);    
                return;
            }
			updates[key] = req.body[key];
		}
	});

       if(process.env.STORAGE === "database" && req.file){
            let file = (await getImageURI(req)).content;
            blogImage = (await uploader.upload(file)).url;
            updates.blogImage = blogImage;
        }
       else{
            updates.blogImage = req.file.originalname;     
       }
        let data = await Blog.findOneAndUpdate({blogId: req.params.blogId}, updates, {
            new: true,
            runValidators: true
        });
        if(!data){
            next(errorHandler.notFound(res,`${req.params.blogId} not found`));
            return
        }

    return sendResponse({res:res,statusCode:200,message:"Data updated",data: data});
    }
    catch(err){
        if(err.name === 'ValidationError'){
            next(errorHandler.badRequest(res,err.message));
            return;
        }
        next(errorHandler.notFound(res, err.message));
    }

}

 module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    deleteBlog,
    updateBlog,
}