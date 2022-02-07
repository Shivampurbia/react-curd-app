import React,{useState} from 'react';  
import { doc,arrayRemove,updateDoc } from "firebase/firestore";
import {useAuth} from '../../contexts/AuthContext';
import '../styles/deletemember.css' 
import {db} from '../../firebase'; 
import spinner from './785.gif';



function DeleteMember({deletionAccount, index}) {
    console.log(index)
    console.log(deletionAccount)
    const {currentUser} = useAuth();
    const { hideDeletionPopup} = useAuth();
    const [loading,setLoading] = useState(false);  


    const delRef = doc(db, "users",currentUser.email );
    const deleteThisOne = {
        LastUpdated:deletionAccount.LastUpdated.stringValue,
        company:deletionAccount.company.stringValue,
        name:deletionAccount.name.stringValue,
        notes:deletionAccount.notes.stringValue,
        status:deletionAccount.status.stringValue
    }
    async function deleteButtonHandler(){
        setLoading(true)    
        // Atomically remove a region from the "regions" array field.
        await updateDoc(delRef, {
            data: arrayRemove(deleteThisOne)
        });
        console.log("deleted!!!")
        hideDeletionPopup(false)
    }
    function cancleButtonHandler(){
        hideDeletionPopup(false)
    }

    
  return <div >
      <div  className='delete-card'>
         <div className='delete-body'>
             <div className='delete-data'>
                 <div style={{display:"flex",justifyContent:"center"}}>
                    <h2>Sure to Delete?</h2>
                 </div>
                 <div style={{display:"flex",justifyContent:"center"}}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"1.5rem"}}>
                        <h3>{deletionAccount.name.stringValue}</h3>
                        <h3>{deletionAccount.company.stringValue}</h3>

                    </div>
                 </div>
                
                 
                 <div style={{display:"flex",justifyContent:"space-around",paddingBottom:"1rem"}}>
                     <button onClick={cancleButtonHandler} className='cancle-botton'>cancel</button>
                     <button onClick={deleteButtonHandler} className='getin-botton'>{loading?<div><img alt="" style={{marginRight:"6px"}} width={14} height={14} src={spinner}></img>Deleting..</div>:<div>Delete</div>}</button>
                 </div>
             </div>
         </div>
      </div>
      

  </div>;
}

export default DeleteMember;
