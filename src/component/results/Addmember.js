import React, { useState } from 'react';
import '../styles/addmember.css';
import {db} from '../../firebase'; 
import {useAuth} from '../../contexts/AuthContext';
import { doc,arrayUnion,updateDoc} from "firebase/firestore";
import spinner from './785.gif';



function Addmember() {
  const {currentUser} = useAuth();
  const d = new Date(Date.now()).toLocaleString().split(',');
  const {hideBar} = useAuth();
  const [loading,setLoading] = useState(false);  

  const [formData,setFormData] = useState({
      name:"",
      company:"",
      status:"",
      notes:"",
      LastUpdated:d[0]
  })  

  function formDataHandler(e){
    const { name, value } = e.target;
// console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });
   }

  function cancleHandler(e){
    e.preventDefault()
    hideBar(false)

  } 
   
  async function submitHandler(e){
    e.preventDefault();
    setLoading(true)
    const washingtonRef = doc(db, "users", currentUser.email);

    // Atomically add a new user to the "data" array field.
    await updateDoc(washingtonRef, {
        data: arrayUnion(formData)
    });
    
    hideBar(false)
      console.log(formData)
  }
  return <div className='adding-card'>
      <div className='adding-form'>
          <div className='adding-formdata'>
              <form onSubmit={submitHandler} className='form'>
                  <label style={{color:"black"}}>Name:</label>
                   <input required type="str" name="name" onChange={formDataHandler}></input>
                  <label style={{color:"black"}}>Company:</label>
                   <input required type="str" name="company" onChange={formDataHandler}></input>
                   <label style={{color:"black"}}>Status:</label>
                  <div style={{display:"inline"}}>
                    <input type="radio" name="status" value="Active" onChange={formDataHandler}></input>
                    <label style={{color:"black"}}>Acitve</label>
                  </div>
                  <div style={{display:"inline"}}>
                     <input required type="radio" name="status" value="Closed" onChange={formDataHandler}></input>
                     <label style={{color:"black"}}>Closed</label>
                  </div>
                      
                 
                  <label style={{color:"black"}}>Notes:</label>
                   <input type="str" name="notes" onChange={formDataHandler}></input>
                   <div className='buttons'>
                   <button onClick={cancleHandler} className="cancle-botton">cancle</button>
                   <button type='submit' className="getin-botton">{loading?<div><img alt="" style={{marginRight:"6px"}} width={14} height={14} src={spinner}></img>Adding..</div>:<div>Add</div>}</button>

                   </div>
              </form>
          </div>
      </div>
  </div>;
}

export default Addmember;
