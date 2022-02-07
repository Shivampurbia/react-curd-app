import React,{useState} from 'react';
import {useAuth} from '../contexts/AuthContext'
import {Link} from 'react-router-dom';
import './styles/dashboard.css';
import Results from './results/Results';
function Dashboard() {
  
  const [error,setError] = useState('');
  const {currentUser,logout} = useAuth();

  async function handleLogout(e){
    setError('')
    try{
      await logout();
      console.log('logout successfully')
      
    }catch{
      setError("failed to logout")
    }
  }
  
  return <div>
    <div className='header'>
      <div className='header-body'>
        {error && alert(error)}
        <div style={{display:"flex",alignItems:"center"}}>
          <strong>{currentUser.email}</strong>
        </div>
        <Link className='link' to="/Login">
          <button className='logout-botton' onClick={handleLogout}>Logout</button>
        </Link>
      </div>
    </div>

    <Results></Results>

    
  </div>;
}

export default Dashboard;
