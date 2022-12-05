import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite';
import 'tw-elements';

import { Routes, Route } from 'react-router-dom';

//pages
import Home from './pages/Home';
import AchievedSkill from './pages/AchievedSkill';
import NewSkill from './pages/NewSkill';

//students
import StuHome from './pages/StuHome';
import StuAddCourse from './pages/StuAddCourse';
import StuSkills from './pages/StuSkills';
import StuCareers from './pages/StuCareers';
import StuSuggestion from './pages/StuSuggestion';
import StuFillInformation from './pages/StuFillInformation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achievedSkill" element={<AchievedSkill />} />
        <Route path="/newSkill" element={<NewSkill />} />

        <Route path="/student_home" element={<StuHome />} />
        <Route path="/student_addCourse" element={<StuAddCourse />} />
        <Route path="/student_careers" element={<StuCareers />} />
        <Route path="/student_suggestion" element={<StuSuggestion />} />
        <Route path="/student_skills" element={<StuSkills />} />
        <Route path="/student_fillInformation" element={<StuFillInformation/>} />
      </Routes>
    </div>
  );
}

export default App;
