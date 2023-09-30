import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home.jsx';
import Story from './components/Story/Story';
import Explore from './components/Explore/Explore';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Login from './components/Login/Login';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import You from './components/You/You';
import OneStory from './components/OneStory/OneStory';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route path="/story" element={<Story />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/explore" element={<Explore />}/>
          <Route path="/leaderboard" element={<LeaderBoard />}/>
          <Route path="/you" element={<You />}/>
          <Route path="/onestory" element={<OneStory/>}/>        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
