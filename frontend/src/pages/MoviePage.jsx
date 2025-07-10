import React, { useState, useEffect } from "react";

export default function MoviePage() {
    const [movieData, setMovieData] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        category: 'movie',
    });

    const handleChange = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const loadMovieData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/media-entry/get-all-by-category-user-id?category=movie", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
            },
            credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                setMovieData(data);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "Failed to fetch movie data"}`);
            }
        

        } catch (error) {
            console.error("Error fetching movie data:", error);
            alert("An error occurred while fetching movie data.");
        }
    }

    const handleSubmit = async (e) => {
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
                // TODO: make it actually work lmao
                alert("added successful!")
            } else {
                const errorData = await response.json()
                alert(`Error: ${errorData.message || "Failed to login user"}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred while registering the mediaEntry.");
        }

    };


    useEffect(() => {
        loadMovieData();
    }, []);


    return (
        <div className="movie-page">
            <h1>Movie Page</h1>
            <p>This is the movie page content.</p>
            { movieData.length > 0 ? (
                <ul>
                    {movieData.map((movie) => (
                        <li key={movie.id}>
                            <h2>{movie.title}</h2>
                            <img src={movie.imageUrl} alt={movie.title} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movies found.</p>
            )}

            <form onSubmit={handleSubmit}>
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