
import Header from "../myComponents/Header"
import Footer from "../myComponents/Footer"
import mainImage from '../assets/main-image.png'


import moviesImage from  '../assets/categories/movies2.jpg'
import tvShowsImage from '../assets/categories/tv-shows.jpg'
import gamesImage from '../assets/categories/games.jpeg'
import animeImage from '../assets/categories/animes.jpg'
import mangaImage from '../assets/categories/mangas.jpg'
import comicsImage from '../assets/categories/comics.jpg'
import booksImage from '../assets/categories/books.jpg'
import albumsImage from '../assets/categories/albums.jpg'


export default function HomePage() {
  let categoriesData = [
    { name: "Movies", image:  moviesImage, pageLink: "movies" },
    { name: "TV Shows", image: tvShowsImage, pageLink: "tv-shows" },
    { name: "Games", image: gamesImage, pageLink: "games" },
    { name: "Anime", image: animeImage, pageLink: "anime" },
    { name: "Manga", image: mangaImage, pageLink: "manga" },
    { name: "Comics", image: comicsImage, pageLink: "comics" },
    { name: "Books", image: booksImage, pageLink: "books" },
    { name: "Music Albums", image: albumsImage, pageLink: "music-albums" }
  ]

  const categoriesCards = categoriesData.map((category, index) => {
    return (
      <div key={index} className="category-card hover:scale-105 transition-transform duration-300">
        <a href={`/${category.pageLink.toLowerCase()}`}>
          <img src={category.image} alt={category.name} 
          className="w-card h-card object-cover rounded-xl shadow-lg "
        />
        <h4 className="text-3xl font-bold text-center mt-5 hover:text-secondary-color hover:underline">
          {category.name}</h4>
        </a>
        
      </div>
    )
    
  })

  
            
  return (
    <>
      <Header />
      <main>
        <div className="intro-section w-full h-section bg-main-color flex items-center justify-around">

          <div className="intro-text flex flex-col items-start justify-center text-left gap-5 ml-52">  
            <h1 className="text-8xl font-bold mt-10 ">
              Track Your <br /> Hobbies!
            </h1>
            <p className="text-xl mt-4 text-secondary-color">
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

        <div className="categories-section w-full bg-n-white text-n-black  flex flex-col items-center justify-around">
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