import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';

//pages
import Home from './pages/Home';
import AchievedSkill from './pages/AchievedSkill';
import NewSkill from './pages/NewSkill';

//students
import ST_Home from './pages/ST_Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achievedSkill" element={<AchievedSkill />} />
        <Route path="/newSkill" element={<NewSkill />} />

        {/* for students */}
        <Route path="/student_home" element={<ST_Home />} />
      </Routes>
    </div>
  );
}

export default App;
