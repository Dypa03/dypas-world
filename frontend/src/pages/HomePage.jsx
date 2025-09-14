
import Header from "../myComponents/Header"
import Footer from "../myComponents/Footer"
import mainImage from '../assets/main-image.png'

import { categoriesData } from '../data/categoriesData'


export default function HomePage() {


  const categoriesCards = categoriesData.map((category, index) => {
    return (
      <div key={index} className="category-card hover:scale-105 transition-transform duration-300">
        <a href={`/${category.pageLink.toLowerCase()}`}>
          <img src={category.categoryCoverImage} alt={category.categoryName} 
          className="w-card h-card object-cover rounded-xl shadow-lg "
        />
        <h4 className="text-3xl font-bold text-center mt-5 hover:text-secondary-color hover:underline">
          {category.categoryTitle}</h4>
        </a>
        
      </div>
    )
    
  })

  
            
  return (
    <>
      <Header />
      <main>
        <div className="intro-section w-full h-section bg-main-shade-color flex items-center justify-around">

          <div className="intro-text flex flex-col items-start justify-center text-left gap-5 ml-52">  
            <h1 className="text-8xl font-bold mt-10 ">
              Track Your <br /> Hobbies!
            </h1>
            <p className="text-xl mt-4 text-thirdary-color">
              Within a few clicks, keep track of all the movies, shows, games, etc. <br /> that you enjoyed!
            </p>
            <button className="w-52 h-16 text-intro-font-size font-semibold bg-black bg-opacity-30 rounded-lg">
              Get Started
            </button>
          </div>

          <img src={mainImage} alt="poyo" 
            className="w-2/5 mt-16 main-image z-10"
          />
        </div>

        <div className="categories-section w-full bg-n-white text-main-black  flex flex-col items-center justify-around">
          <h3 className="mt-14 font-bold text-5xl">
            All Categories
          </h3>
          <div className="categories grid grid-cols-4 gap-10 my-14">
            {categoriesCards}
          </div>

        </div>

        
      </main>
      <Footer />
    </>
  )
}