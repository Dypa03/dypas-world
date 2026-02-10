import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import MediaEntryPageComponent from './myComponents/MediaEntryPageComponent'
import Header from './myComponents/Header'
import { categoriesData } from './data/categoriesData'
import { useEffect, useState } from 'react'

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  async function checkIfLoggedIn() {
    try {
      const res = await fetch("http://localhost:8080/api/user/user-info", {
        credentials: "include"
      });
      console.log(res);
      return res.ok; 
    } catch (err) {
      console.error("Errore durante il check login:", err);
      return false;
    }
  }

  useEffect(() => {
    checkIfLoggedIn().then((loggedIn) => {
      console.log("Utente loggato?", loggedIn);
      setIsUserLoggedIn(loggedIn);
    });
  }, []);

  const categoryRoutes = categoriesData.map((categoryObject) => (
    <Route
      key={categoryObject.categoryName}
      path={`/${categoryObject.pageLink}`}
      element={<MediaEntryPageComponent categoryObject={categoryObject} />}
    />
  ))

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/login" element={<Login isUserLoggedIn={isUserLoggedIn} />} />
        <Route path="/register" element={<Register isUserLoggedIn={isUserLoggedIn} />} />
        {categoryRoutes}
      </Routes>
    </Router>
  )

  
}

export default App
