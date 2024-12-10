// import logo from './logo.svg';
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/home" exact element={<HomeScreen/>} />
          <Route path="/book/:roomId/:fromDate/:toDate" exact element={<BookingScreen/>} />
          <Route path="/register" exact element={<RegisterScreen/>} />
          <Route path="/login" exact element={<LoginScreen/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
