import User from '../model/userModel.js'
import Project from '../model/projectModel.js'
// import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// GET HOME

export async function home(req, res){
    try{

        res.status(201).send("Worked succuesfully")
    }
    catch(error){
        res.status.send(`Catch error ${error}`)
    }
}


// ------------------- POST REQUEST -------------------

export async function register(req, res){
    try {
        // res.send("Router post worked")
        const {username,email,password,name}= req.body;
        // Check Username & Email Already Exist
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const newUser = new User({ username, email, password, name });
        await newUser.save();  
        res.send(newUser);
    } 
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
    

// ### LOGIN USER

export async function login(req, res){
    try{
        const {email,password} = req.body;
        const existUser = await User.findOne({email})
        if(existUser){
            if(existUser.password===password){
                // const token1 = await existUser.generateAuthToken();
                const token = await jwt.sign({_id:existUser._id}, 'ashar12345');
                res.cookie("jwt",token,{
                    // expires:new Date(Date.now()+5000),
                    httpOnly:true
                })
                // const verify1 = jwt.verify(token1,'ashar123456789');
                // const verify = jwt.verify(token,'ashar123456789');

                res.status(201).send(existUser)
            }
            else{
                res.status(501).send("Invalid details")
            }   
        }
        else{
            res.status(501).send("Invalid details")
        } 
    } 
    catch(error){
        res.status(500).send(error)
    }
}

 // LOGOUT USER

 export async function logout(req,res){
    try{
        const token = res.clearCookie("jwt");
        res.status(200).json("Yes token delete")
    }
    catch(err){
        res.status(404).send(err)
    }
}


//### CREATE POST

export async function createproject(req, res){
    try{
        const {projectName,desc,status,githubRepoLink,liveUrl} = req.body;
        const token = req.header("jwt") || req.cookies.jwt;
        const verify = jwt.verify(token,'ashar12345');
        const findUser = await User.findOne({_id:verify._id})
        const newProject = new Project({
            userId:findUser._id,
            projectName,
            desc,
            status,
            githubRepoLink,
            liveUrl
        })
        await newProject.save()
        res.status(201).send(newProject)
    }
    catch(error){
        res.status(500).send("error")
    }
}



//                        ------------------- GET REQUEST -------------------



//  CURRENT PROJECT ---------------------------------

        // Find Current Project By User ID 
export async function getallprojectcurrent(req, res){
    try{
        const token = req.header("jwt") || req.cookies.jwt;
        const verify = jwt.verify(token,'ashar12345');
        const getAllProjectCurrent = await Project.find({userId:verify._id,status:"current"})
        res.status(201).send(getAllProjectCurrent)
    }
    catch(error){
        res.status(404).send(`Catch error ${error}`)
    }
}

        // Find Current Project By User ID & SORT
export async function getallprojectcurrent_sort(req, res){
    try{
        const name=req.params.id
        const filter = name.toString()
        const token = req.header("jwt") || req.cookies.jwt;
        const verify = jwt.verify(token,'ashar12345');
        if(filter=="NTO"){
            const getAllProjectCurrentSort_newToOld = await Project.find({userId:verify._id,status:"current"}).sort({createdAt:1})
            res.status(201).send(getAllProjectCurrentSort_newToOld)
        }
        else if(filter=="OTN"){
            const getAllProjectCurrentSort_oldToNew = await Project.find({userId:verify._id,status:"current"}).sort({createdAt:-1})
            res.status(201).send(getAllProjectCurrentSort_oldToNew)
        }
        else if(filter=="AZ"){
            const getAllProjectCurrentSort_AZ = await Project.find({userId:verify._id,status:"current"}).sort({projectName:1})
            res.status(201).send(getAllProjectCurrentSort_AZ)
        }
        else if(filter=="ZA"){
            const getAllProjectCurrentSort_ZA = await Project.find({userId:verify._id,status:"current"}).sort({projectName:-1})
            res.status(201).send(getAllProjectCurrentSort_ZA)
        }
        else{
            try{
                const getAllProjectCurrentSort_projectName = await Project.find({userId:verify._id,status:"current",projectName:filter})
                res.status(201).send(getAllProjectCurrentSort_projectName)
            }
            catch{
                const getAllProjectCurrentSort_NTO = await Project.find({userId:verify._id,status:"current"}).sort({createdAt:1})
                res.status(201).send(getAllProjectCurrentSort_NTO)
            }
        }
        
    }
    catch(error){
        res.status(404).send(`Catch error ${error}`)
    }
}


// ARCHIVED PROJECT ---------------------------------


        // Find Archived Project By User ID 
        export async function getallprojectarchived(req, res){
            try{
                const token = req.header("jwt") || req.cookies.jwt;
                const verify = jwt.verify(token,'ashar12345');
                const getAllProjectArchived = await Project.find({userId:verify._id,status:"archived"})
                res.status(201).send(getAllProjectArchived)
            }
            catch(error){
                res.status(404).send(`Catch error ${error}`)
            }
        }
        
                // Find Archived Project By User ID & SORT
        export async function getallprojectarchived_sort(req, res){
            try{
                const name=req.params.id
                const filter = name.toString()
                const token = req.header("jwt") || req.cookies.jwt;
                const verify = jwt.verify(token,'ashar12345');
                if(filter=="NTO"){
                    const getAllProjectArchivedSort_newToOld = await Project.find({userId:verify._id,status:"archived"}).sort({createdAt:1})
                    res.status(201).send(getAllProjectArchivedSort_newToOld)
                }
                else if(filter=="OTN"){
                    const getAllProjectArchivedSort_oldToNew = await Project.find({userId:verify._id,status:"archived"}).sort({createdAt:-1})
                    res.status(201).send(getAllProjectArchivedSort_oldToNew)
                }
                else if(filter=="AZ"){
                    const getAllProjectArchivedSort_AZ = await Project.find({userId:verify._id,status:"archived"}).sort({projectName:1})
                    res.status(201).send(getAllProjectArchivedSort_AZ)
                }
                else if(filter=="ZA"){
                    const getAllProjectArchivedSort_ZA = await Project.find({userId:verify._id,status:"archived"}).sort({projectName:-1})
                    res.status(201).send(getAllProjectArchivedSort_ZA)
                }
                else{
                    try{
                        const getAllProjectArchivedSort_projectName = await Project.find({userId:verify._id,status:"archived",projectName:filter})
                        res.status(201).send(getAllProjectArchivedSort_projectName)
                    }
                    catch{
                        const getAllProjectArchivedSort_NTO = await Project.find({userId:verify._id,status:"archived"}).sort({createdAt:1})
                        res.status(201).send(getAllProjectArchivedSort_NTO)
                    }
                }
                
            }
            catch(error){
                res.status(404).send(`Catch error ${error}`)
            }
        }


// COMPLETE PROJECT ---------------------------------


        // Find Complete Project By User ID 
        export async function getallprojectcomplete(req, res){
            try{
                const token = req.header("jwt") || req.cookies.jwt;
                const verify = jwt.verify(token,'ashar12345');
                const getAllProjectComplete = await Project.find({userId:verify._id,status:"complete"})
                res.status(201).send(getAllProjectComplete)
            }
            catch(error){
                res.status(404).send(`Catch error ${error}`)
            }
        }
        
                // Find Archived Project By User ID & SORT
        export async function getallprojectcomplete_sort(req, res){
            try{
                const name=req.params.id
                const filter = name.toString()
                const token = req.header("jwt") || req.cookies.jwt;
                const verify = jwt.verify(token,'ashar12345');
                if(filter=="NTO"){
                    const getAllProjectCompleteSort_newToOld = await Project.find({userId:verify._id,status:"complete"}).sort({createdAt:1})
                    res.status(201).send(getAllProjectCompleteSort_newToOld)
                }
                else if(filter=="OTN"){
                    const getAllProjectCompleteSort_oldToNew = await Project.find({userId:verify._id,status:"complete"}).sort({createdAt:-1})
                    res.status(201).send(getAllProjectCompleteSort_oldToNew)
                }
                else if(filter=="AZ"){
                    const getAllProjectCompleteSort_AZ = await Project.find({userId:verify._id,status:"complete"}).sort({projectName:1})
                    res.status(201).send(getAllProjectCompleteSort_AZ)
                }
                else if(filter=="ZA"){
                    const getAllProjectCompleteSort_ZA = await Project.find({userId:verify._id,status:"complete"}).sort({projectName:-1})
                    res.status(201).send(getAllProjectCompleteSort_ZA)
                }
                else{
                    try{
                        const getAllProjectCompleteSort_projectName = await Project.find({userId:verify._id,status:"complete",projectName:filter})
                        res.status(201).send(getAllProjectCompleteSort_projectName)
                    }
                    catch{
                        const getAllProjectCompleteSort_NTO = await Project.find({userId:verify._id,status:"complete"}).sort({createdAt:1})
                        res.status(201).send(getAllProjectCompleteSort_NTO)
                    }
                }
                
            }
            catch(error){
                res.status(404).send(`Catch error ${error}`)
            }
        }







// ------------------- PUT REQUEST -------------------

// Find Project By Project ID and Update 
export async function editproject(req, res){
    try{
        const projectId = req.params.id;
        const token = req.header("jwt") || req.cookies.jwt;
        const verify = jwt.verify(token,'ashar12345');
        const findProject = await Project.findById(projectId)
        if(findProject.userId.toString()===verify._id){
            const updateProject = await Project.findByIdAndUpdate({_id:projectId},{$set:req.body},{new:true})
            res.status(201).send({UpdateProject:"yes", updateProject})
        }else{
            res.json("This post is not your , you can't update it.")
        }
    }
    catch(error){
        res.status(404).send(`Catch error ${error}`)
    }
}


