import {Link} from 'react-router-dom'
import './topbar.css'
import axios from 'axios'
import { useSelector, useDispatch} from 'react-redux'
import { logout } from '../../redux/action/action'

function Topbar() {

  const dispatch = useDispatch()

  const myState = useSelector((state)=> state.setTheUser)
  const user = myState.user

  const handleLogout = async(event)=>{
      event.preventDefault();
      dispatch(logout())
      try{
        const res = await axios.get("/logout")
        localStorage.removeItem("user");
        res.data && window.location.replace("/login")
  
      }catch(err){
        console.log(err)
      }
    };

  const linkStyle = {
    display: user ? 'block' : 'none',
  };
  const linkStyle2 = {
    display: user ?'none':'block',
  };
  return (
    <nav className="navbar">
        <h1>Logo</h1>
        <input type="checkbox" style={{display:"none"}} id="click"/>
        <label htmlFor="click" className="menu-btn">
            <i className="fas fa-bars"></i>
        </label>
        <ul>
            <li><Link to="/" style={linkStyle} >Dashboard</Link></li>
            <li><Link to="/current" style={linkStyle} >Curr Project</Link></li>
            <li><Link to="/archived" style={linkStyle} >Arch Project</Link></li>
            <li><Link to="/complete" style={linkStyle} >Comp Project</Link></li>
            <li><Link to="/login" style={linkStyle2} >Login</Link></li>
            <li><Link to="/register" style={linkStyle2} >Register</Link></li>
            <li><Link to="/logout" style={linkStyle} onClick={(event) => handleLogout(event)} >Logout</Link></li>

        </ul>
    </nav>
  )
}

export default Topbar;