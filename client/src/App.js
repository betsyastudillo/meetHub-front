// import logo from './logo.svg';
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import BookingScreen from "./Screens/BookingScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import AdminScreen from "./Screens/AdminScreen";
import LandingScreen from "./Screens/LandingScreen";

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
          <Route path='/admin' exact element={<AdminScreen/>}/>
          <Route path="/" exact Component={LandingScreen}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
