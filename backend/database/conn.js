import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/Personal_Project_Management_System'
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true,
    // useFindAndModify:fasle
).then(()=>{console.log("Connection succesfully")})
.catch( (error)=>{console.log(`Connection failed ${error}`)})
