import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import MediaEntryPageComponent from './myComponents/MediaEntryPageComponent'
import Header from './myComponents/Header'


function App() {
  const categoryList = ["movie", "tv-show", "anime", "game", "album", "book", "comic", "manga"]

  const categoryRoutes = categoryList.map((category) => (
    <Route
      key={category}
      path={`/${category}s`}
      element={<MediaEntryPageComponent category={category} />}
    />
  ))

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {categoryRoutes}
        
        
      </Routes>
    </Router>
  )

  
}

export default App
