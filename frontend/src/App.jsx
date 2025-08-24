import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import MediaEntryPageComponent from './myComponents/MediaEntryPageComponent'
import Header from './myComponents/Header'
import { categoriesData } from './data/categoriesData'


function App() {
  

  const categoryRoutes = categoriesData.map((category) => (
    <Route
      key={category.categoryName}
      path={`/${category.pageLink}`}
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
