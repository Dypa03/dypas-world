import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import MediaEntryPageComponent from './myComponents/MediaEntryComponent'


function App() {
  const categoryList = ["Movie", "TV-Show", "Anime", "Video Game", "Album", "Book", "Comic", "Manga"]

  const categoryRoutes = categoryList.map((category) => (
    <Route
      key={category}
      path={`/${category.toLowerCase()}s`}
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
