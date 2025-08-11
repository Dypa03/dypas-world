export const categoriesData = [
    {
        "categoryName": "movie",
        "categoryBasedMessage": "watched",
        "posterImagePrefix": "https://image.tmdb.org/t/p/w500/",
        "querySearchPrefix": "https://api.themoviedb.org/3/search/movie?query=",
        "apiKey": import.meta.env.VITE_MOVIE_API_KEY
    },
    {
        "categoryName": "tv-show",
        "categoryBasedMessage": "watched",
        "posterImagePrefix": "tv-show-",
        "apiKey": import.meta.env.VITE_TV_SHOW_API_KEY
    },
    {
        "categoryName": "anime",
        "categoryBasedMessage": "watched",
        "posterImagePrefix": "anime-",
        "apiKey": import.meta.env.VITE_ANIME_API_KEY
    },
    {
        "categoryName": "game",
        "categoryBasedMessage": "played",
        "posterImagePrefix": "game-",
        "apiKey": import.meta.env.VITE_GAME_API_KEY
    },
    {
        "categoryName": "album",
        "categoryBasedMessage": "listened to",
        "posterImagePrefix": "album-",
        "apiKey": import.meta.env.VITE_ALBUM_API_KEY
    },
    {
        "categoryName": "book",
        "categoryBasedMessage": "read",
        "posterImagePrefix": "book-",
        "apiKey": import.meta.env.VITE_BOOK_API_KEY
    },
    {
        "categoryName": "comic",
        "categoryBasedMessage": "read",
        "posterImagePrefix": "comic-",
        "apiKey": import.meta.env.VITE_COMIC_API_KEY
    },
    {
        "categoryName": "manga",
        "categoryBasedMessage": "read",
        "posterImagePrefix": "manga-",
        "apiKey": import.meta.env.VITE_MANGA_API_KEY
    }
]