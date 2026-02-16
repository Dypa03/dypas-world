import { useState } from "react";
import Header from "../myComponents/Header";
import OAuthLogin from "../myComponents/OAuthLogin";
import Footer from "../myComponents/Footer";

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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
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
            <main className="flex flex-col items-center justify-center bg-main-shade-color h-section-with-footer w-full">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-2/3">
                    <div className="w-full bg-white rounded-2xl shadow dark:border mt-16 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create your account
                            </h1>
                            <form className="space-y-3 md:space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="username">Username:</label>
                                    <input type="text" id="username" name="username" value={formData.username} required onChange={handleChange} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email:</label>
                                    <input type="text" id="email" name="email" value={formData.email} required onChange={handleChange} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password:</label>
                                    <input type="password" id="password" name="password" value={formData.password} required onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <button className="w-full text-white bg-main-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                                type="submit">Register</button>
                            </form>

                            <OAuthLogin />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}