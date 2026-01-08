
import Header from "../myComponents/Header"
import Footer from "../myComponents/Footer"
import mainImage from '../assets/main-image.png'
import Cookies from "js-cookie";

import { categoriesData } from '../data/categoriesData'


export default function HomePage(props) {

  const categoriesCards = categoriesData.map((category, index) => {
    return (
      <div key={index} className="category-card sm:w-card w-[300px] hover:scale-105 transition-transform duration-300">
        <a href={props.isUserLoggedIn ?  `/${category.pageLink.toLowerCase()}` : "/login"}>
          <img src={category.categoryCoverImage} alt={category.categoryName} 
          className="w-full h-card object-cover rounded-xl shadow-lg "
        />
        <h4 className="text-3xl font-bold text-center mt-5 hover:text-secondary-color hover:underline">
          {category.categoryTitle}</h4>
        </a>
        
      </div>
    )
    
  })

  
            
  return (
    <>
      <Header isUserLoggedIn={props.isUserLoggedIn} />
      <main>
        <div className="intro-section w-full sm:h-section h-[70vh] bg-main-shade-color flex items-center justify-around">

          <div className="intro-text flex flex-col items-center sm:items-start justify-center text-center sm:text-left gap-6 sm:gap-4 xl:ml-52 lg:ml-40 md:ml-24 sm:ml-12 xl:max-w-[500px] lg:max-w-[400px] md:max-w-[250px] sm:max-w-[200px] w-4/5">  
            <h1 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-4xl text-6xl font-bold mt-10 ">
              Track Your <br /> Hobbies!
            </h1>
            <p className="text-xl mt-4 text-thirdary-color">
              Within a few clicks, keep track of all the movies, shows, games, etc. that you enjoyed!
            </p>
            <button onClick={() => {
              return props.isUserLoggedIn ? window.location.href = '/#categories' : window.location.href = '/login'
            }} 
            className="xl:w-52 md:w-40 sm:w-32 w-52 h-16 xl:text-intro-font-size md:text-xl sm:text-base font-semibold text-intro-font-size bg-black bg-opacity-30 rounded-lg">
              Get Started
            </button>
          </div>

          <img src={mainImage} alt="poyo" 
            className="w-2/5 min-w-[400px] mt-16 main-image z-10 hidden sm:block"
          />
        </div>

        <div id="categories" className="categories-section w-full bg-n-white text-main-black  flex flex-col items-center justify-around">
          <h3 className="mt-14 font-bold text-5xl">
            All Categories
          </h3>
          <div className="categories md:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex flex-col items-center sm:gap-10 gap-16 my-14">
            {categoriesCards}
          </div>

        </div>

        
      </main>
      <Footer />
    </>
  )
}