import { useState } from "react";
import Header from "../myComponents/Header";
import OAuthLogin from "../myComponents/OAuthLogin";



export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // TODO: make it actually work lmao
                alert("login successful!")
            } else {
                const errorData = await response.json()
                alert(`Error: ${errorData.message || "Failed to register user"}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred while registering the user.");
        }

    };


    return (
        <div className="login-page">
            <Header />
            <main>
                <h1>Login Page</h1>
                <form  onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit">Login</button>
                </form>

                <OAuthLogin />
            </main>
        </div>
    )
}