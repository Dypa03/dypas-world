import moviesImage from  '../assets/categories/movies2.jpg'
import tvShowsImage from '../assets/categories/tv-shows.jpg'
import gamesImage from '../assets/categories/games_cooming_soon.png'
import animeImage from '../assets/categories/animes.jpg'
import mangaImage from '../assets/categories/mangas.jpg'
import comicsImage from '../assets/categories/comics_cooming_soon.png'
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
            "Authorization": `Bearer ${import.meta.env.VITE_MOVIE_SHOW_API_KEY}`
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
                imagePosterSuffix: searchEntryItem.poster_path,
                releaseDate: searchEntryItem.release_date,
                author: ""
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
            "Authorization": `Bearer ${import.meta.env.VITE_MOVIE_SHOW_API_KEY}`
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
                imagePosterSuffix: searchEntryItem.poster_path,
                releaseDate: searchEntryItem.release_date,
                author: ""
            }
            
            return mediaEntry
        },
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
                imagePosterSuffix: searchEntryItem.images.jpg.image_url,
                releaseDate: searchEntryItem.aired.string,
                author: ""
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
                imagePosterSuffix: searchEntryItem.images.jpg.image_url,
                releaseDate: searchEntryItem.published.string,
                author: searchEntryItem.authors[0].name
            }
            
            return mediaEntry
        },
    },

    {
        categoryName: "book",
        categoryTitle: "Books",
        categoryCoverImage: booksImage,
        pageLink: "books",
        categoryBasedMessage: "read",
        
        querySearchPrefix: `https://openlibrary.org/search.json?title=`,

        headers: {
            "accept": 'application/json',
        },

        searchDataResultAdapter: function searchDataResultAdapter(searchEntryData) {
            return searchEntryData.docs
        },

        mediaEntryFromApiAdapter: function mediaEntryFromApiAdapter(searchEntryItem) {
            const mediaEntry = {
                apiMediaRecordId: searchEntryItem.cover_i,
                title: searchEntryItem.title,
                category: "book",
                imageUrl: `https://covers.openlibrary.org/b/id/${searchEntryItem.cover_i}-L.jpg` ,
                adult: false,
                imagePosterSuffix: searchEntryItem.cover_i,
                releaseDate: `${searchEntryItem.first_publish_year}`,
                author: "author_name" in searchEntryItem ? searchEntryItem.author_name[0] : ""
            }
            
            return mediaEntry
        },
    },

    {
        categoryName: "album",
        categoryTitle: "Music Albums",
        categoryCoverImage: albumsImage,
        pageLink: "music-albums",
        categoryBasedMessage: "listened to",
        
        querySearchPrefix: `https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${import.meta.env.VITE_MUSIC_API_KEY}&format=json&album=`,
        headers: {
            "accept": 'application/json',
        },

        searchDataResultAdapter: function searchDataResultAdapter(searchEntryData) {
            return searchEntryData.results.albummatches.album
        },

        mediaEntryFromApiAdapter: function mediaEntryFromApiAdapter(searchEntryItem) {
            const mediaEntry = {
                apiMediaRecordId: searchEntryItem.mbid,
                title: searchEntryItem.name,
                category: "album",
                imageUrl: searchEntryItem.image[3]['#text'],
                adult: false,
                imagePosterSuffix: searchEntryItem.image[3]['#text'],
                author: searchEntryItem.artist,
                releaseDate: null
            }
            
            return mediaEntry
        },
    },

    {
        categoryName: "game",
        categoryTitle: "Games",
        categoryCoverImage: gamesImage,
        pageLink: "",
        categoryBasedMessage: "played",
        
        querySearchPrefix: "https://api.rawg.io/api/games?search=",
        headers: {
            "accept": 'application/json',
            "Authorization": `Bearer ${import.meta.env.VITE_GAME_API_KEY}`,
            "Content-Type": "application/json"
        },
        
        searchDataResultAdapter: function searchDataResultAdapter(searchEntryData) {
            return searchEntryData.results
        },

        mediaEntryFromApiAdapter: function mediaEntryFromApiAdapter(searchEntryItem) {
            const mediaEntry = {
                apiMediaRecordId: searchEntryItem.id,
                title: searchEntryItem.name,
                category: "game",
                imageUrl: `https://image.tmdb.org/t/p/w500${searchEntryItem.poster_path}`,
                adult: searchEntryItem.adult,
                imagePosterSuffix: searchEntryItem.poster_path
            }
            
            return mediaEntry
        }
    },

    {
        categoryName: "comic",
        categoryTitle: "Comics",
        categoryCoverImage: comicsImage,
        pageLink: "",
        categoryBasedMessage: "read",
        querySearchPrefix: `https://comicvine.gamespot.com/api/search/?api_key=${import.meta.env.VITE_COMIC_API_KEY}&format=json&resources=volume&query=`,

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
                category: "comic",
                imageUrl: searchEntryItem.images.jpg.image_url,
                adult: false,
                imagePosterSuffix: searchEntryItem.images.jpg.image_url,
            }
            
            return mediaEntry
        },
    }
]