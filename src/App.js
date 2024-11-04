import logo from './logo.svg';
import './App.css';
import MainHomePage from './component/Navbar';
import LoginDashbord from './adminlogin/LoginDashbord';
import AdminPanel from './adminPanel/AdminPanel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/LoginDashbord" element={<LoginDashbord />} />
          <Route path="/MainHomePage" element={<MainHomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
