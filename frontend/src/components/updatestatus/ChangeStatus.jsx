import { useState } from 'react';
import axios from 'axios'
import './changestatus.css'
import { useLocation } from 'react-router-dom';

function ChangeStatus() {

    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const [status, setStatus] = useState('');
    

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const updateStatus = async(id, newStatus) => {
    // Call the API to update the project status
    try{
        const res = await axios.put(`/editproject/${id}`,{
            status:newStatus
        })
        res.data && window.location.replace(`/${newStatus}`)
    }
    catch(error){
        console.log(error);
        alert("Status change failed")
    }
  };

  return (

    <div className='mainDivStatusUpdate'>
      <button
        className={`statusButton ${status === 'current' ? 'active' : ''}`}
        onClick={() => handleStatusChange('current')}
        disabled={status === 'current'}
      >
        Current
      </button>
      <button
        className={`statusButton ${status === 'archived' ? 'active' : ''}`}
        onClick={() => handleStatusChange('archived')}
        disabled={status === 'archived'}
      >
        Archived
      </button>
      <button
        className={`statusButton ${status === 'complete' ? 'active' : ''}`}
        onClick={() => handleStatusChange('complete')}
        disabled={status === 'complete'}
      >
        Complete
      </button>
      <button
      id='btn'
        className="changeStatusButton"
        onClick={() => updateStatus(id, status)}
      >
        Change Status
      </button>
      {/* Rest of your code */}
    </div>

  )
}

export default ChangeStatus