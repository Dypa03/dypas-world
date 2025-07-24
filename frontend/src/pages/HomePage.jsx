
import Header from "../myComponents/Header"
import mainImage from '../assets/main-image.png' // Assuming you have a main image for the homepage


export default function HomePage() {
  
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

        <div className="categories-section w-full bg-n-white h-section flex items-center justify-around absolute z-20">

        </div>
      </main>
    </>
  )
}