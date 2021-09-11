const errorHandler = {
    notFound : (res,message)=>{
        return res.status(404).json(message);
    },
    badRequest : (res,message)=>{
        return res.status(400).json(message);
     },
    serverError : (res,message)=>{
        return res.status(500).json(message);
    },
}

module.exports = {
    errorHandler,
};