import {Router} from "express";
const router = Router()
import * as controller from "../controller/controller.js"
import middleware from "../middleware/middleware.js";


// ###########################   POST METHOD   #########################

router.get("/home", controller.home)

// Register user
router.post("/register", controller.register)
// Login user
router.post("/login", controller.login)
// Logout user
router.get("/logout", controller.logout)
// create project
router.post("/project",middleware, controller.createproject)


// ##########################   GET METHOD FOR CURRENT PROJECT  #############################


// get all project
router.get("/getallproject/current", controller.getallprojectcurrent)
// get all project & sort
router.get("/getallproject/current/sort/:id", controller.getallprojectcurrent_sort)

// ##########################   GET METHOD FOR ARCHIVED PROJECT  #############################
// get all project 
router.get("/getallproject/archived", controller.getallprojectarchived)
// get all project & sort
router.get("/getallproject/archived/sort/:id", controller.getallprojectarchived_sort)

// ##########################   GET METHOD FOR COMPLETE PROJECT  #############################
// get all project 
router.get("/getallproject/complete", controller.getallprojectcomplete)
// get all project & sort
router.get("/getallproject/complete/sort/:id", controller.getallprojectcomplete_sort)


// Logout user
// router.get("/logout", controller.logout)
// router.get("/getpost/:id", controller.getpost)


// ##########################   PUT METHOD  ##############################

router.put("/editproject/:id",middleware, controller.editproject)

// ########################## DELETE METHOD ##############################
// router.delete("/deletepost/:id",middleware, controller.deletepost)



export default router;