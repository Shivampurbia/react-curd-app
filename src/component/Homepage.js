import React from 'react';
import { Link} from 'react-router-dom';
import './styles/homepage.css';
import moonwalk from './93809-moon.gif'
function Homepage() {
  return <div className='container' >
      <div className='card'>
              <div className='card-body'>
                     Welcome to React curd App
              </div> 
              <div> 
                     <img alt="logo" width={120} height={120} src={moonwalk}></img>
              </div>
              <div className='card-bottom'>
                     <button className='getin-botton'>
                            <Link className='link' to="/login">Log In</Link>
                     </button>
                     <button className='getin-botton'>
                            <Link className='link' to="/signup">Sign Up</Link>
                     </button>
              </div>
      </div>   
      

  </div>;
}

export default Homepage;
