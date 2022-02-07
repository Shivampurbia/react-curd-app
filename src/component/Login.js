import React,{ useRef, useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import './styles/loginpage.css';
import spinner from './785.gif';

function Login() {
    
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const {login} = useAuth();
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  async function handleSubmit(e){
    e.preventDefault();

    try{
      setError('');
      setLoading(true);
      await login(emailRef.current.value,passwordRef.current.value)
      console.log(emailRef.current.value+" logged in...")
      navigate("/dashboard");
    }catch{
      setError('wrong password or email id');
      setTimeout(()=>{
        setError('');
      },3000)
      setLoading(false);
    }
    
  }

  
  
  
  return <div className='container'>
            {error && <div className='alert'>{error}</div>} 
            <div className="card">
              <div className='card-body'>
                <div className='title'>
                  <h2 style={{fontFamily:"revert"}}>LOGIN</h2>
                </div>
                <div>
                  <form className='form' onSubmit={handleSubmit}>
                    <label className='label'>Email:</label>
                    <input type="email" id="email" required ref={emailRef}></input>
                    <label className='label'>Password:</label>
                    <input type="str" id="password" required ref={passwordRef}></input>
                    <div style={{display:"flex",justifyContent:"center"}}>
                       <button className='getin-botton' disabled={loading} type="submit" >{loading?<div><img alt="" style={{marginRight:"6px"}} width={14} height={14} src={spinner}></img>Logging..</div>:<div>Log In</div>}</button>
                    </div>
                  </form>
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                  <div className='card-bottom-text'>
                    Need an account? <Link to="/signup">Sign Up</Link>
                  </div>
                </div>
                
              </div>
            </div>
            
         </div>;
}

export default Login;

