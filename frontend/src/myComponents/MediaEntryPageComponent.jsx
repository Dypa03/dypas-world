import React, { useState, useEffect } from "react";
import MediaEntryCard from "./MediaEntryCard";
import Header from "./Header"

export default function MediaEntryPageComponent(props) {
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


    useEffect(() => {
        loadEntryData();
    }, []);


    console.log(formData);
    return (
        <div className="">
            <Header/>
            <div className="bg-main-color h-auto p-20">
                <h1>{props.category} Page</h1>
                <p>This is the {props.category} page content.</p>
                { mediaEntryData.length > 0 ? (
                    mediaEntryData.map((mediaItem) => (
                        <MediaEntryCard key={mediaItem.id} mediaItem={mediaItem} />
                    ))
                ) : (
                    <p>No {props.category}s found.</p>
                )}
                </div>

                <form onSubmit={handleMediaEntrySubmit}
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
                </form>
        
        </div>
    );
}