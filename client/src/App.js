import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';

//pages
import Home from './pages/Home';
import AchievedSkill from './pages/AchievedSkill';
import NewSkill from './pages/NewSkill';

//students
import StuHome from './pages/StuHome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achievedSkill" element={<AchievedSkill />} />
        <Route path="/newSkill" element={<NewSkill />} />

        <Route path="/student_home" element={<StuHome />} />
      </Routes>
    </div>
  );
}

export default App;
