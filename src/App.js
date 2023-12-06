import './App.scss';
import Home from './component/Home';
import Header from './component/Header';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return ( <Router>
    <Header/>
   <Routes>
    <Route path="/" element={<Home/>} />
   </Routes>


  </Router>
   
  );
}

export default App;
