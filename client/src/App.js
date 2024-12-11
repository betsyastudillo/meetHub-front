// import logo from './logo.svg';
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

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
          <Route path="/profile" exact element={<ProfileScreen/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
