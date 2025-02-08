import './App.css';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Profile1 from './example';
import UploadForm from './Upload';
import EditProfile from './component/EditProfile';

function App() {
  
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile1" element={<Profile1/>}/>
          <Route path="/upload" element={<UploadForm/>}/>
          <Route path="/edit" element={<EditProfile/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
