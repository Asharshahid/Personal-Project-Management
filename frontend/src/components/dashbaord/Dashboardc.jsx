import React from 'react'
import './dashboardc.css'
import { useState, useRef } from 'react';
import axios from 'axios';

function Dashboardc() {

    const projectNameRef = useRef()
    const githubLinkRef = useRef()
    const liveUrlRef = useRef()
    const descRef = useRef()


    const [status, setStatus] = useState('');
    const handleStatusChange = (newStatus) => {
      setStatus(newStatus);
    };

    const handleSubmitProject = async(e)=>{
        e.preventDefault()
        try{
          const res = await axios.post("/project",{
            projectName:projectNameRef.current.value,
            githubRepoLink:githubLinkRef.current.value,
            liveUrl:liveUrlRef.current.value,
            status,
            desc:descRef.current.value
          })
          res.data && window.location.replace("/dashboard")
        }
        catch(err){
          alert(`${err} register error try once again`)
        }
      }

  return (

    <div className='mainUsername'>
      <div className="mainUser" style={{minHeight:"500px"}}>
        <div className="userSection1">
          <h1>Create New Project</h1>
          {/* <span>Ls</span> */}
        </div>

        <form action="" className='userSection2' onSubmit={handleSubmitProject} >
          <div className="inputSection">
            <input type="text" placeholder='Project Name' ref={projectNameRef} />
          </div>
          <div className="inputSection">
            <input type="text" placeholder='Github Url' ref={githubLinkRef} />
          </div>
          <div className="inputSection">
            <input type="text" placeholder='Live Url' ref={liveUrlRef} />
          </div>
          <div className='mainDivStatusUpdate'
          style={{margin:"0px",flexDirection: "row"}}
          >
            <button style={{minWidth:"80px"}}
               className={`statusButton ${status === 'current' ? 'active' : ''}`}
               onClick={() => handleStatusChange('current')}
               disabled={status === 'current'}  > Current 
            </button>
            <button style={{minWidth:"80px"}}
               className={`statusButton ${status === 'archived' ? 'active' : ''}`}
               onClick={() => handleStatusChange('archived')}
               disabled={status === 'archived'} > Archived 
            </button>
            <button style={{minWidth:"80px"}}
               className={`statusButton ${status === 'complete' ? 'active' : ''}`}
               onClick={() => handleStatusChange('complete')}
               disabled={status === 'complete'} > Complete 
            </button>
      {/* Rest of your code */}
    </div>

          <div className="inputSection">
            <textarea name="" id="" cols="32" rows="7" ref={descRef}  placeholder='Description'
             style={{margin:"5px", outline:"none"}}
             ></textarea>
          </div>
          <div className="letgoButton">
            <button type='submit'>Create Project</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Dashboardc