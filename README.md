# Blog Backend
This Blog Backend is built using NodeJS, ExpressJS, MongoDB, Mongoose and Cloudinary.
In this Backend we provide all the CRUD operations needed for a blog.

## Features
* Get all blogs
* Get a blog by ID
* Create a new blog
* Update a blog by ID
* Delete a blog by ID

## How to get Get Started
1. Clone This Repo
```bash
```
2. Create your .env file
```env
PORT = 'Some Port Number'
DB_LOCAL = 'Your MongoDB Database Path'
CLOUD_NAME = 'YOUR CLOUDINARY CLOUD NAME'
CLOUDINARY_API_KEY = 'YOUR CLOUDINARY API KEY'
CLOUDINARY_API_SECRET = 'YOUR CLOUDINARY API SECRET'
```

3. Install all the dependencies
```bash
npm install
```

4. Start the server
```bash
npm run start
```

## Lets test the Endpoints

You can use the API on the endpoint ```/blogs```. Let's see how.

### Fetch All Blogs

```bash
GET /blogs
```

A GET request at the endpoint will fetch all the blogs from the server in JSON format.

### Fetch A Blog by ID

```bash
GET /blogs/blogId
```

A GET request at the endpoint will fetch that particular blog, if it exists.

### Create A New Blog

```bash
POST /blogs
```

A POST request with a valid body will create a new blog, and will return the response of the newly created blog.

<b> Parameters in the Request Body</b>
* blogTitle
* blogContent 
* author 
* blogImage 
* relatedLinks

<b> relatedLinks structure </b>

```json
    [
        {
            "relatedBlogId": "",
            "relatedBlogTitles": ""
        }
    ]
```

<b> Note: Use <b>form-data</b> to send the request. </b>


### Update A Blog

```bash
PUT /blogs/blogId
```

A PUT request with a valid body will update an existing blog, and will return the updated blog from the server in JSON format.

### Delete A Blog

```bash
DELETE /blogs/blogId
```

A DELETE request at the endpoint will delete that particular blog, if it exists, from the server. 


