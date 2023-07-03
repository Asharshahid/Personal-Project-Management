import mongoose from "mongoose";
// import jwt from 'jsonwebtoken'

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true, "Please Enter Name"],
    },
    username : {
        type: String,
        required : [true, "Please Enter Username"],
        unique : [true, "Username Exist"]
    },
    email : {
        type: String,
        required : [true, "Please Enter Email"],
        unique : [true, "Email Exist"]
    },
    password : {
        type: String,
        required : [true, "Please provide a password"],
        unique : false
    }
    // ,
    // registerDate:{
    //     type:Date,
    //     default:Date.now()
    // }
},{timestamps:true}
)


// userSchema.methods.generateAuthToken = function(){
//     try{
//         const token = jwt.sign({_id:this._id.toString()}, 'ashar123456789');

//         return token;
//     }
//     catch(err){
//         console.log(err);
//     }
// }


export default mongoose.model.Users || mongoose.model("User", userSchema)
