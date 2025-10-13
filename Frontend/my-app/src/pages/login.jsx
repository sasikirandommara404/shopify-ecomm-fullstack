import { useRef,useState } from 'react';
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import {loginUser,updateUserInfo} from '../slice/slice.jsx'
import { Navigate } from 'react-router-dom';

const Login = ({onClose}) => {
  const ref = useRef();
  const closeModel = (e) => {
    if(e.target === ref.current){
      onClose()
    }
  };
  const [user, setUser] = useState('')
  const [pass,setPass] = useState('')

  const loginfunction = async ()=>{
    try{
      const login = await axios.post('http://localhost:5000/api/user/login',
        {
          email:user,
          password:pass
        }, 
      )
      console.log(login.data.data)
      
      

    }catch(err){
      

    }
    
  }
  
  
  return (
    <div 
      ref={ref} 
      onClick={closeModel} 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.5)",
        /* Backdrop filter with fallback */
        WebkitBackdropFilter: 'blur(3px)',
        backdropFilter: 'blur(3px)',
        display: "flex",
        WebkitBoxPack: "center",
        MsFlexPack: "center",
        justifyContent: "center",
        WebkitBoxAlign: "center",
        MsFlexAlign: "center",
        alignItems: "center",
        zIndex: 1050,
        padding: "1rem",
      }}
    >
      <div 
        className="bg-white rounded shadow-lg position-relative" 
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "1.5rem",
          maxHeight: "90vh",
          overflowY: "auto",
          /* Add smooth scrolling for Safari */
          WebkitOverflowScrolling: "touch"
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className='btn-close position-absolute' 
          style={{top: "1rem", right: "1rem"}} 
          aria-label="Close"
        >
        </button>
    
        <h2 className="text-center mb-2 fw-bold fs-4">Welcome to Shopfy</h2>
        <p className="mb-3 text-center text-muted small">Please login to your account</p>
        
        <div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label small">
              Username
            </label>
            <input 
              type="text" 
              id="email" 
              placeholder='Enter username' 
              className="form-control"
              onChange = {(e)=>setUser(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label small">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder='Enter password' 
              className="form-control"
              onChange={(e)=>setPass(e.target.value)}
            />
          </div>
          
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="remember"/>
            <label htmlFor="remember" className="form-check-label small">Remember me</label>
          </div>
          
          <button className="btn btn-primary w-50 py-2" onClick={loginfunction}>Sign In</button>
          
          <div className="text-center mt-2">
            <a href="#" className="text-decoration-none small" onClick={(e) => e.preventDefault()}>
              Forgot Password?
            </a>
          </div>
          
          <hr className="my-3"/>
          
          <div className="text-center">
            <p className="text-muted mb-0 small">
              Don't have an account? <a href="#" className="text-decoration-none fw-semibold" onClick={(e) => e.preventDefault()}>Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;