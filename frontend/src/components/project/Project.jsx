import React from 'react'
import './project.css'
import blogPostPic from '../../pictures/blogPostPic.jpg'
import { Link } from 'react-router-dom'


function Project({project}) {
  
  return (
    
    
    <div className="project">
      <div className="projectImage">
        <img src={blogPostPic} alt="Blog Post" />
      </div>
      <div className="projectInfo">
        <div className="projectStatusAndDate">
          <span className="type1">{project.status}</span>
          <span className="type2">{new Date(project.createdAt).toDateString()}</span>
        </div>
        <div className="projectName">
          <h3>{project.projectName}</h3>
        </div>
        <div className="threeButton">
          <Link  to={`/changestatus/${project._id}`} className="btn editBtn">Update Status</Link>
          <button className="btn" to="github.com">Github Link</button>
          <button className="btn">Live Url</button>
        </div>
        <div className="descDiv">
          <p className="postDescrpt">{project.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default Project