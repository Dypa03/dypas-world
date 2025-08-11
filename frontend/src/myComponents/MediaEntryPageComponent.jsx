import React, { useState, useEffect } from "react";
import MediaEntryCard from "./MediaEntryCard";
import Header from "./Header"
import Footer from "./Footer";


export default function MediaEntryPageComponent(props) {

    props = props.category

    const [mediaEntryData, setMediaEntryData] = useState([]);

    const [searchFormData, setSearchFormData] = useState({
        title: '',
        imageUrl: '',
        category: props.categoryName,
    });

        

    const handleFormDataChange = (e) => {
        setSearchFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const handleFormDataSubmit = (e) => {
        e.preventDefault();
        fetchMediaEntries(searchFormData.title);
    };

    const loadEntryData = async () => {
        try {
            

            const response = await fetch(`http://localhost:8080/api/media-entry/get-all-by-category-user?category=${props.categoryName.toLowerCase()}`, {
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

    const handleMediaEntrySubmit = async (mediaEntryData) => {
        try {
            const response = await fetch("http://localhost:8080/api/media-entry/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                credentials: "include",
                body: JSON.stringify(mediaEntryData)                
            });

            if (response.ok) {
                alert("added successful!")
            } else {
                const errorData = await response.json()
                alert(`Error: ${errorData.message || "Failed to load media entry"}`);
                console.log(mediaEntryData)
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred while registering the mediaEntry.");
        }

    };

    const [searchResults, setSearchResults] = useState([]);

    async function fetchMediaEntries(query) {
        
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${props.apiKey}`
        }
        };

        try {
            const response = await fetch(`${props.querySearchPrefix}${query}`, options);
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


    const searchMediaEntryForm = 
        <form onSubmit={handleFormDataSubmit}
            className="bg-n-black p-4 rounded-lg shadow-md flex gap-4 justify-center items-center"
        >
            <div>
                <label htmlFor="title">Title:</label>
                <input
                className="border border-gray-300 rounded-lg p-2 text-n-black" 
                type="text" id="title" name="title" value={searchFormData.title} onChange={handleFormDataChange} required />
            </div>
            
            <button type="submit">Search</button>
        </form>

    return (
        <div className="">
            <Header/>
            <div className="bg-main-color h-auto py-20 px-80">
                <div className="welcome-message flex flex-col items-center mt-16">
                    <h1 className="text-6xl font-bold first-letter:uppercase">
                        {props.categoryName}s
                    </h1>
                    <p className="text-1xl">
                        You have {props.categoryBasedMessage}: {mediaEntryData.length}
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
                    <p>No {props.categoryName}s found.</p>
                )}
                </div>
            </div>

                {searchMediaEntryForm}
            <Footer />
            <button className="w-20 h-20 bg-secondary-color rounded-full fixed bottom-10 right-10"
            onClick={fetchMediaEntries}>It won't work for sure</button>

            <div className="search-results bg-black">
                {searchResults.length > 0 && (
                <div>
                    <h2>Search Results:</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {searchResults.map((mediaItem) => (
                            <div key={mediaItem.id}
                                className="rounded-3xl max-w-[270px] shadow-sm text-slate-900 "
                                onClick={() => 
                                    handleMediaEntrySubmit({
                                        apiMediaRecordId: mediaItem.id,
                                        category: props.categoryName,
                                        title: mediaItem.title,
                                        imageUrl: `${props.posterImagePrefix}${mediaItem.poster_path}`,
                                    })}
                                >
                                <img src={`${props.posterImagePrefix}${mediaItem.poster_path}`} 
                                    className="rounded-3xl justify-center h-66 grid object-cover w-full hover:scale-105 transition-transform duration-300"
                                    alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
            
        </div>
    );
}