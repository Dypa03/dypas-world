import moviesImage from  '../assets/categories/movies2.jpg'
import tvShowsImage from '../assets/categories/tv-shows.jpg'
import gamesImage from '../assets/categories/games.jpeg'
import animeImage from '../assets/categories/animes.jpg'
import mangaImage from '../assets/categories/mangas.jpg'
import comicsImage from '../assets/categories/comics.jpg'
import booksImage from '../assets/categories/books.jpg'
import albumsImage from '../assets/categories/albums.jpg'

export const categoriesData = [
    {
        "categoryName": "movie",
        "categoryTitle": "Movies",
        "categoryCoverImage": moviesImage,
        "pageLink": "movies",
        "categoryBasedMessage": "watched",
        "posterImagePrefix": "https://image.tmdb.org/t/p/w500/",
        "querySearchPrefix": "https://api.themoviedb.org/3/search/movie?query=",
        "apiKey": import.meta.env.VITE_MOVIE_API_KEY
    },
    {
        "categoryName": "tv-show",
        "categoryTitle": "TV Shows",
        "categoryCoverImage": tvShowsImage,
        "pageLink": "tv-shows",
        "categoryBasedMessage": "watched",
        "posterImagePrefix": "tv-show-",
        "apiKey": import.meta.env.VITE_TV_SHOW_API_KEY
    },

    {
        "categoryName": "game",
        "categoryTitle": "Games",
        "categoryCoverImage": gamesImage,
        "pageLink": "games",
        "categoryBasedMessage": "played",
        "posterImagePrefix": "game-",
        "apiKey": import.meta.env.VITE_GAME_API_KEY
    },

    {
        "categoryName": "anime",
        "categoryTitle": "Anime",
        "categoryCoverImage": animeImage,
        "pageLink": "anime",
        "categoryBasedMessage": "watched",
        "posterImagePrefix": "anime-",
        "apiKey": import.meta.env.VITE_ANIME_API_KEY
    },

    {
        "categoryName": "manga",
        "categoryTitle": "Manga",
        "categoryCoverImage": mangaImage,
        "pageLink": "manga",
        "categoryBasedMessage": "read",
        "posterImagePrefix": "manga-",
        "apiKey": import.meta.env.VITE_MANGA_API_KEY
    },

    {
        "categoryName": "comic",
        "categoryTitle": "Comics",
        "categoryCoverImage": comicsImage,
        "pageLink": "comics",
        "categoryBasedMessage": "read",
        "posterImagePrefix": "comic-",
        "apiKey": import.meta.env.VITE_COMIC_API_KEY
    },

    {
        "categoryName": "book",
        "categoryTitle": "Books",
        "categoryCoverImage": booksImage,
        "pageLink": "books",
        "categoryBasedMessage": "read",
        "posterImagePrefix": "book-",
        "apiKey": import.meta.env.VITE_BOOK_API_KEY
    },

    {
        "categoryName": "album",
        "categoryTitle": "Music Albums",
        "categoryCoverImage": albumsImage,
        "pageLink": "music-albums",
        "categoryBasedMessage": "listened to",
        "posterImagePrefix": "album-",
        "apiKey": import.meta.env.VITE_ALBUM_API_KEY
    }
]