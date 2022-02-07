import React,{useState} from 'react';
import './table.css';
import {useAuth} from '../../contexts/AuthContext';

import DeleteMember from './DeleteMember';
function Table({data,filterCity,status}) {
//   console.log(status);  
//   console.log(filterCity);  
//   console.log(data);
  const {showDeletePopup,hideDeletionPopup} = useAuth();
  const [currentId,setCurrentId] = useState(-1);
  
  function deleteHandler(index){
    // console.log(index);
    setCurrentId(index)
    hideDeletionPopup(true)     
  }
  // console.log(data[currentId]);
  
  return <div>
      {showDeletePopup && <DeleteMember deletionAccount = {data[currentId]} index={currentId}/>}
      <table>
  <tr>
    <th>Name</th>
    <th>Company</th>
    <th>Status</th>
    <th>Last Updated</th>
    <th>Notes</th>
    <th>Action</th>

  </tr>
  {data.map((user,index)=>(
    (status==="status" && filterCity.length ===0) ? 
      <tr key={index}>
        <td>{user.name.stringValue}</td>
        <td>{user.company.stringValue}</td>
        <td>{user.status.stringValue}</td>
        <td>{user.LastUpdated.stringValue}</td>
        <td>{user.notes.stringValue}</td>
        
        <td   onClick={(e)=>{deleteHandler(index)}} className="delete-icon">
        <img alt="" src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"/> 
        </td>

        
      </tr>:
      (status==="status")?
      (filterCity.includes(user.company.stringValue)) && <tr key={index}>
        <td>{user.name.stringValue}</td>
        <td>{user.company.stringValue}</td>
        <td>{user.status.stringValue}</td>
        <td>{user.LastUpdated.stringValue}</td>
        <td>{user.notes.stringValue}</td>
        
        <td  onClick={(e)=>{ deleteHandler(index)}} className="delete-icon">
        <img alt="" src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"/> 
        </td>

        
      </tr>
      :
      (filterCity.length ===0)? (status===user.status.stringValue &&
        <tr key={index}>
        <td>{user.name.stringValue}</td>
        <td>{user.company.stringValue}</td>
        <td>{user.status.stringValue}</td>
        <td>{user.LastUpdated.stringValue}</td>
        <td>{user.notes.stringValue}</td>
        
        <td  onClick={(e)=>{ deleteHandler(index)}} className="delete-icon">
        <img alt="" src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"/> 
        </td>

        
      </tr>
        
        
        )



      :
      (filterCity.includes(user.company.stringValue) && status===user.status.stringValue) && <tr key={index}>
        <td>{user.name.stringValue}</td>
        <td>{user.company.stringValue}</td>
        <td>{user.status.stringValue}</td>
        <td>{user.LastUpdated.stringValue}</td>
        <td>{user.notes.stringValue}</td>
        
        <td  onClick={(e)=>{ deleteHandler(index)}} className="delete-icon">
        <img alt="" src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"/> 
        </td>

        
      </tr>
      
    
  ))}
  
  
</table>

  </div>;
}

export default Table;
