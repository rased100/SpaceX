import React from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import ItemComponent from './Pages/Home/ItemComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:itemId" element={<ItemComponent />} />
      </Routes>
    </div>
  );
}

export default App;
