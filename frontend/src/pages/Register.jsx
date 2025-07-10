import { useState } from "react";
import Header from "../myComponents/Header";
import OAuthRegister from "../myComponents/OAuthRegister";

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value // Update the selected event field with its value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/user/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*" // Allow CORS for all origins
                },
                body: JSON.stringify(formData) // Convert formData to JSON string
                });
            
                if (response.ok) {
                    alert("User registered successfully!");
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message || "Failed to register user"}`);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                alert("An error occurred while registering the user.");
            }
    };


    return (
        <div className="register-page">
            <Header />
            <main>
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={formData.username} required onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" value={formData.email} required onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} required onChange={handleChange}/>
                    </div>
                    <button type="submit">Register</button>
                </form>

                <OAuthRegister />
            </main>
        </div>
    )
}