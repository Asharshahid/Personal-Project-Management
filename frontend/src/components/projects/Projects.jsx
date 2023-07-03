import './projects.css'
import Project from '../project/Project'
import axios from 'axios'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom'

function Projects() {

  const [projects, setProjects] = useState([])
  const myState = useSelector((state)=> state.setTheUser)
  const user = myState.user
  useEffect(() => {
    const fetchData = async () => {
      if (user && window.location.href === "http://localhost:3000/current") {
        try {
          const res = await axios.get("/getallproject/current");
          setProjects(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      else if (user && window.location.href === "http://localhost:3000/archived") {
        try {
          const res = await axios.get("/getallproject/archived");
          setProjects(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      else if (user && window.location.href === "http://localhost:3000/complete") {
        try {
          const res = await axios.get("/getallproject/complete");
          setProjects(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      else{
        console.log("Wrong path");
      }
    };
    fetchData();
  }, [user]);


  // SORTING CODE OR FILTER FUNCTION
  const handleSorting = async (value,event) => {
    event.preventDefault();
    if (user && window.location.href === "http://localhost:3000/current") {
      try {
        const currentStr = "/getallproject/current/sort/"+value;
        const res = await axios.get(currentStr);
        setProjects(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    else if (user && window.location.href === "http://localhost:3000/archived") {
      try {
        const archivedStr = "/getallproject/archived/sort/"+value;
        const res = await axios.get(archivedStr);
        setProjects(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    else if (user && window.location.href === "http://localhost:3000/complete") {
      try {
        const completeStr = "/getallproject/complete/sort/"+value;
        const res = await axios.get(completeStr);
        setProjects(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    else{
      console.log("Wrong path");
    }
  };

  // Search project by name code
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    const SearchName = event.target.value.toString()
    setSearchValue(SearchName)
  };

  return (
    <div className='mainProjectDiv'>
      <div className="twoBtnSection">
      <div className="sortingBtnDiv">
        <Link className='btn AZ'  onClick={(event) => handleSorting('AZ', event)}>AZ</Link>
        <Link className='btn ZA'  onClick={(event) => handleSorting('ZA', event)}>ZA</Link>
        <Link className='btn NTO' onClick={(event) => handleSorting('NTO', event)}>NTO</Link>
        <Link className='btn OTN' onClick={(event) => handleSorting('OTN', event)}>OTN</Link>
      </div>
      <div className="searchProjectByName">
        <input type="text" value={searchValue}
        onChange={handleInputChange}  
        style={{display:"inline-block"}} 
        className="search-input" 
        placeholder="Project name..." />
        <Link className="search-button" onClick={(event) => handleSorting(searchValue, event)}>
         Search
        </Link>
       </div>
      </div>
      <div className='projects'>
      {projects.map( (p)=>(
        <Project project={p} key={p._id} />
      )).reverse()}
    </div>
    </div>
  )
}

export default Projects