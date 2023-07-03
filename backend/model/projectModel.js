import mongoose from "mongoose";

export const projectSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    image:{
        type:String,
        required:false
    },
    projectName:{
        type:String,
        required : [true, "Project name must required"]
    },
    desc : {
        type: String,
        required : [true, "Description must required"]
    },
    status:{
        type:String,
        required:true
    },
    githubRepoLink:{
        type:String,
        required:true,
        unique : [true, "Please provide unique github reposetory link of the project"]
    },
    liveUrl:{
        type:String,
        required:true,
        unique : [true, "Please provide unique live url of the project"]
    }
},{timestamps:true}
)


export default mongoose.model.Projects || mongoose.model("Project", projectSchema)
