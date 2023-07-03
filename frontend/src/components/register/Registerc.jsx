import '../login/loginc.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Registerc() {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmitRegister = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post("/register",{
        name,
        username,
        email,
        password
      })
      res.data && window.location.replace("/login")
    }
    catch(err){
      setError(true)
      console.log(err);
      alert(`${error} register error try once again`)
    }
  }

  return (
    <div className='mainUsername'>
      <div className="mainUser">
        <div className="userSection1">
          <h1>WELCOME!</h1>
          <span>Let's Connect With Us</span>
        </div>

        <form action="" className='userSection2' onSubmit={handleSubmitRegister}>
          <div className="inputSection">
            <input type="text" placeholder='Name' onChange={e=>{setName(e.target.value)}} />
          </div>
          <div className="inputSection">
            <input type="text" placeholder='Username' onChange={e=>{setUsername(e.target.value)}} />
          </div>
          <div className="inputSection">
            <input type="text" placeholder='Email' onChange={e=>{setEmail(e.target.value)}} />
          </div><div className="inputSection">
            <input type="password" placeholder='Password' onChange={e=>{setPassword(e.target.value)}} />
          </div>
          <div className="letgoButton">
            <button type='submit'>Register</button>
          </div>
          <div className="registerButtonSection">
            <span>Already registered ?<Link className='button' to="/login">Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registerc