const express = require('express');
const blogRouter = require('./routes/blogRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers ,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method")
    next();
});

app.use("/blogs",blogRouter)

module.exports = app;