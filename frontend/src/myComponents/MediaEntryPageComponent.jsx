import React, { useState, useEffect } from "react";
import MediaEntryCard from "./MediaEntryCard";
import Header from "./Header"
import Footer from "./Footer";


export default function MediaEntryPageComponent(props) {
    const categoryBasedMessage = {
        "movie": "watched",
        "tv-show": "watched",
        "anime": "watched",
        "game": "played",
        "album": "listened to",
        "book": "read",
        "comic": "read",
        "manga": "read",
    }

    const [mediaEntryData, setMediaEntryData] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        category: props.category,
    });

    const handleChange = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const loadEntryData = async () => {
        try {
            

            const response = await fetch(`http://localhost:8080/api/media-entry/get-all-by-category-user?category=${props.category.toLowerCase()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
            },
            credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                setMediaEntryData(data);
            } else {
                const errorData = await response.json();
                console.log(`Error: ${errorData.message || "Failed to fetch entry data"}`);
            }

        } catch (error) {
            console.error("Error fetching entry data:", error);
        }
    }

    const handleMediaEntrySubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/media-entry/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("added successful!")
            } else {
                const errorData = await response.json()
                alert(`Error: ${errorData.message || "Failed to load media entry"}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred while registering the mediaEntry.");
        }

    };

    const [searchResults, setSearchResults] = useState([]);

    async function searchMovies(query) {
        const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
        };

        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=Avatar`, options);
            const data = await response.json();
            console.log(data);
            setSearchResults(data.results);
        } catch (error) {
            console.error(error);
        }

        
    }

    useEffect(() => {
        loadEntryData();
    }, []);




    return (
        <div className="">
            <Header/>
            <div className="bg-main-color h-auto py-20 px-80">
                <div className="welcome-message flex flex-col items-center mt-16">
                    <h1 className="text-6xl font-bold first-letter:uppercase">
                        {props.category}s
                    </h1>
                    <p className="text-1xl">
                        You have {categoryBasedMessage[props.category]}: {mediaEntryData.length}
                    </p>
                    <button className="text-white focus:outline-none focus:ring-4 mt-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-black bg-opacity-30 w-40">
                        Add New
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-10">
                { mediaEntryData.length > 0 ? (
                    mediaEntryData.map((mediaItem) => (
                        <MediaEntryCard key={mediaItem.id} mediaItem={mediaItem} />
                    ))
                ) : (
                    <p>No {props.category}s found.</p>
                )}
                </div>
            </div>

                {/* <form onSubmit={handleMediaEntrySubmit}
                    className="bg-n-black"
                >
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">Image:</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                    </div>
                    <button type="submit">Add Media Entry</button>
                </form> */}
            <Footer />
            <button className="w-20 h-20 bg-secondary-color rounded-full fixed bottom-10 right-10"
            onClick={searchMovies}>It won't work for sure</button>

            <div className="search-results bg-black">
                {searchResults.length > 0 && (
                <div>
                    <h2>Search Results:</h2>
                    <ul>
                    {searchResults.map((movie) => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                    </ul>
                </div>
                )}
            </div>
            
        </div>
    );
}