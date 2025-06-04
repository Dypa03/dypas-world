import Header from "../myComponents/Header";


export default function Login() {
    return (
        <div className="login-page">
            <Header />
            <main>
                <h1>Login Page</h1>
                <form action="/login" method="POST">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </main>
        </div>
    )
}