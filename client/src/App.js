// import logo from './logo.svg';
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/home" exact element={<HomeScreen/>} />
          <Route path="/book/:roomId" exact element={<BookingScreen/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
