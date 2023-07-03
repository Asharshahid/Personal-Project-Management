// Import statements
import express from 'express'
import "./database/conn.js";
const port=  process.env.PORT || 7000;
import router from './router/route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// Middlewire
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(router)

app.get("/",(req,res)=>{
    res.send("worked successfully")
})

// HTTP GET REQUEST
// app.get("/", (req,res)=>{
//     const token = jwt.sign({_id:"646d07504e0efe77241e2b1f"}, 'ashar123456789');
//     res.cookie('jwt', token, {
        // expires:new Date(Date.now()+10000),
        // httpOnly: true, // Cookie accessible only by the server
        // secure: true, // Send the cookie only over HTTPS (required for Chrome in production)
        // sameSite: 'lax', // Restrict cookie to same-site requests
        // maxAge: 86400, // Cookie expiration time in seconds (e.g., 24 hours)
        // path: '/' // Cookie accessible from all paths
    //   });
    
    // res.cookie("jwt",token,{
                    // expires:new Date(Date.now()+5000),
                    // httpOnly:true
                // })
//     res.status(201).json(" This is home tab")
// })



// START SERVER

app.listen(port, ()=>{
    console.log(`Server connected at http://localhost:${port}`);
})