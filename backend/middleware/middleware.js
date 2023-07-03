import jwt from "jsonwebtoken"


const middleware = (req, res, next)=>{

    try{
        const token = req.header("jwt") || req.cookies.jwt ;
        const verify = jwt.verify(token, "ashar12345");
        next();
    }catch(error){
        res.send(`Catch error is ${error}`)
    }
}

export default middleware;