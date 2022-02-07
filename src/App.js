import Signup from './component/Signup';
import Login from './component/Login';
import {AuthProvider} from './contexts/AuthContext';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Homepage from './component/Homepage';
import React from 'react'
function App() {
  return (
    
      <div>
          <Router>
          
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<Homepage/>}></Route>
                <Route exact path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/Login" element={<Login/>}></Route>
              </Routes>
            </AuthProvider>
          </Router>
          
      </div>

    
      
    
  );
}

export default App;
