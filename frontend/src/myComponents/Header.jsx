import logo from '../assets/logo.png';

export default function Header() {
    return (
        <header className="">
            <a href="">
                <img src={logo} 
                alt="logo" />
            </a>

            <h1>Your World</h1>

            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <div className="user">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
        </header>
    );
}