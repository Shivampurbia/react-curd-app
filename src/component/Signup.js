import React,{ useRef, useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import { Link ,useNavigate} from 'react-router-dom';
import {db} from '../firebase';
import { collection,doc ,setDoc} from "firebase/firestore";
import spinner from './785.gif';


function Signup() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const {signup} = useAuth();
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  async function handleSubmit(e){
    e.preventDefault();

    if(passwordRef.current.value!==confirmpasswordRef.current.value){
      setError('password not matching');
      setTimeout(()=>{
        setError('');
      },3000);
      return
      
    }

    try{
      setError('');
      setLoading(true);
      await signup(emailRef.current.value,passwordRef.current.value)
      const usersCollection = collection(db,'users');
      await setDoc(doc(usersCollection,emailRef.current.value),{})
      console.log("Account created");
      console.log(emailRef.current.value+" logged in...")
      navigate("/dashboard");
    }catch{
      setError('failed to create an account');
      setTimeout(()=>{
        setError('');
      },3000)
      
    }
    setLoading(false);
  }
  
  return <div className='container'>
            {error && <div className='alert'>{error}</div>}
            <div className="card">
              <div className='card-body'>
                <div className='title'>
                    <h2 style={{fontFamily:"revert"}}>SIGN UP</h2>
                  </div>
                <div>
                  <form className='form' onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" id="email" required ref={emailRef}></input>
                    <label>Password</label>
                    <input type="str" id="password" required ref={passwordRef}></input>
                    <label>Confirm Password</label>
                    <input type="str" id="confirmpassword" required ref={confirmpasswordRef}></input> 
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <button className='getin-botton' disabled={loading} type="submit" >{loading?<div><img alt="spinner" style={{marginRight:"6px"}} width={14} height={14} src={spinner}></img>Signing in..</div>:<div>Sign Up</div>}</button>
                    </div>
                  </form>  
                </div>   

                <div style={{display:"flex",justifyContent:"center"}}>
                  <div className='card-bottom-text'>
                     Already have an account? <Link to="/login">Log In</Link>
                  </div>
                </div>
                
              </div>
            </div>
            
            
         </div>;
}

export default Signup;
