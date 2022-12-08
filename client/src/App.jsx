import "./App.css";
import React from "react";
import {BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import Home from "./pages/Home";

function App() {
  

  return (
    <div className="App" style={{backgroundColor:"#8fb1fa", height:'100vh'}}>
      {/* App Navigation Bar */}
      <ResponsiveAppBar/>
      <Routes>      
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path='/Home' element={<Home/>} />
      </Routes>
    </div>
  );  
}


export default App;
