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
        categoryName: "movie",
        categoryTitle: "Movies",
        categoryCoverImage: moviesImage,
        pageLink: "movies",
        categoryBasedMessage: "watched",

        querySearchPrefix: "https://api.themoviedb.org/3/search/movie?query=",
        headers: {
            "accept": 'application/json',
            "Authorization": `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`
        },

        searchDataResultAdapter: function searchDataResultAdapter(searchEntryData) {
            return searchEntryData.results
        },

        mediaEntryFromApiAdapter: function mediaEntryFromApiAdapter(searchEntryItem) {
            const mediaEntry = {
                apiMediaRecordId: searchEntryItem.id,
                title: searchEntryItem.title,
                category: "movie",
                imageUrl: `https://image.tmdb.org/t/p/w500${searchEntryItem.poster_path}`,
                adult: searchEntryItem.adult,
                imagePosterSuffix: searchEntryItem.poster_path
            }
            
            return mediaEntry
        },
    },
    {
        categoryName: "tv-show",
        categoryTitle: "TV Shows",
        categoryCoverImage: tvShowsImage,
        pageLink: "tv-shows",
        categoryBasedMessage: "watched",

        querySearchPrefix: "https://api.themoviedb.org/3/search/tv?query=",
        headers: {
            "accept": 'application/json',
            "Authorization": `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`
        },

        searchDataResultAdapter: function searchDataResultAdapter(searchEntryData) {
            return searchEntryData.results
        },

        mediaEntryFromApiAdapter: function mediaEntryFromApiAdapter(searchEntryItem) {
            const mediaEntry = {
                apiMediaRecordId: searchEntryItem.id,
                title: searchEntryItem.name,
                category: "tv-show",
                imageUrl: `https://image.tmdb.org/t/p/w500${searchEntryItem.poster_path}`,
                adult: searchEntryItem.adult,
                imagePosterSuffix: searchEntryItem.poster_path
            }
            
            return mediaEntry
        },
    },

    {
        categoryName: "game",
        categoryTitle: "Games",
        categoryCoverImage: gamesImage,
        pageLink: "games",
        categoryBasedMessage: "played",
        
        
    },

    {
        categoryName: "anime",
        categoryTitle: "Anime",
        categoryCoverImage: animeImage,
        pageLink: "animes",
        categoryBasedMessage: "watched",
        
        querySearchPrefix: "https://api.jikan.moe/v4/anime?q=",
        headers: {
            "accept": 'application/json',
            "Content-Type": "application/json"
        },

        searchDataResultAdapter: function searchDataResultAdapter(searchEntryData) {
            return searchEntryData.data
        },

        mediaEntryFromApiAdapter: function mediaEntryFromApiAdapter(searchEntryItem) {
            const mediaEntry = {
                apiMediaRecordId: searchEntryItem.mal_id,
                title: searchEntryItem.title_english,
                category: "anime",
                imageUrl: searchEntryItem.images.jpg.image_url,
                adult: false,
                imagePosterSuffix: searchEntryItem.images.jpg.image_url
            }
            
            return mediaEntry
        },

    },

    {
        categoryName: "manga",
        categoryTitle: "Manga",
        categoryCoverImage: mangaImage,
        pageLink: "mangas",
        categoryBasedMessage: "read",
        
        querySearchPrefix: "https://api.jikan.moe/v4/manga?q=",
        headers: {
            "accept": 'application/json',
            "Content-Type": "application/json"
        },

        searchDataResultAdapter: function searchDataResultAdapter(searchEntryData) {
            return searchEntryData.data
        },

        mediaEntryFromApiAdapter: function mediaEntryFromApiAdapter(searchEntryItem) {
            const mediaEntry = {
                apiMediaRecordId: searchEntryItem.mal_id,
                title: searchEntryItem.title_english,
                category: "manga",
                imageUrl: searchEntryItem.images.jpg.image_url,
                adult: false,
                imagePosterSuffix: searchEntryItem.images.jpg.image_url
            }
            
            return mediaEntry
        },
    },

    {
        categoryName: "comic",
        categoryTitle: "Comics",
        categoryCoverImage: comicsImage,
        pageLink: "comics",
        categoryBasedMessage: "read",
        posterImagePrefix: "comic-",
        apiKey: import.meta.env.VITE_COMIC_API_KEY
    },

    {
        categoryName: "book",
        categoryTitle: "Books",
        categoryCoverImage: booksImage,
        pageLink: "books",
        categoryBasedMessage: "read",
        posterImagePrefix: "book-",
        apiKey: import.meta.env.VITE_BOOK_API_KEY
    },

    {
        categoryName: "album",
        categoryTitle: "Music Albums",
        categoryCoverImage: albumsImage,
        pageLink: "music-albums",
        categoryBasedMessage: "listened to",
        posterImagePrefix: "album-",
        apiKey: import.meta.env.VITE_ALBUM_API_KEY
    }
]