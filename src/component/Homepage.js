import React from 'react';
import { Link} from 'react-router-dom';
import './styles/homepage.css';
import moonwalk from './93809-moon.gif'
function Homepage() {
  return <div className='container' >
      <div className='card'>
              <div className='card-body'>
                     Welcome to React App
              </div> 
              <div> 
                     <img alt="logo" width={120} height={120} src={moonwalk}></img>
              </div>
              <div className='card-bottom'>
                     <Link className='link' to="/login">
                            <button className='getin-botton'>
                            Log In
                            </button>
                     </Link>
                     
                     <Link className='link' to="/signup">
                            <button className='getin-botton'>
                            Sign Up
                            </button>
                     </Link>
                     
              </div>
      </div>   
      

  </div>;
}

export default Homepage;
