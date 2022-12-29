import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite';
import 'tw-elements';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'


import { Routes, Route } from 'react-router-dom';

//pages
import Home from './pages/Home';
import AchievedSkill from './pages/AchievedSkill';
import NewSkill from './pages/NewSkill';

//students
import StuHome from './pages/StuHome';
import StuCareers from './pages/StuCareers';
import StuCareerInfo from './pages/StuCareerInfo';
import StuSuggestion from './pages/StuSuggestion';
import StuFillInformation from './pages/StuFillInformation';
import StuUser from './pages/StuUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achievedSkill" element={<AchievedSkill />} />
        <Route path="/newSkill" element={<NewSkill />} />

        <Route path="/student_home" element={<StuHome />} />
        <Route path="/student_careers" element={<StuCareers />} />
        <Route path="/student_careers/:id" element={<StuCareerInfo />} />
        <Route path="/student_suggestion" element={<StuSuggestion />} />
        <Route path="/student_fillInformation" element={<StuFillInformation/>} />
        <Route path="/student_user" element={<StuUser/>} />
      </Routes>
    </div>
  );
}

export default App;
