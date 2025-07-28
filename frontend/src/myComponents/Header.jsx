import logo from '../assets/wizard-logo-rb.png';
//import home from '../assets/home-icon.svg';

export default function Header() {
    async function checkUserLogin() {
        try {
            const response = await fetch("http://localhost:8080/api/user/user-info", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            
            if (response.redirected && response.url.includes('/login')) {
                console.log("User is NOT logged in - redirected to login");
                return { loggedIn: false };
            }
    
            if (response.status === 401) {
                console.log("User is NOT logged in - 401 Unauthorized");
                return { loggedIn: false };
            }
    
            if (response.ok) {
                const userInfo = await response.json();
                console.log("User IS logged in:", userInfo);
                return { loggedIn: true, userInfo };
            }
    
            console.log("Unexpected response:", response.status);
            return { loggedIn: false };
    
        } catch (error) {
            console.error("Error checking login status:", error);
            return { loggedIn: false };
        }
      }
    
    
    checkUserLogin().then(result => {
        if (result.loggedIn) {
            console.log("Welcome back!", result.userInfo);
        } else {
            console.log("Please log in");
        }
    });


    return (
        <header className='bg-n-white w-full h-header flex items-center justify-between px-56 absolute top-0 left-0 z-50 '
                onClick={() => window.location.href = '/'}>

                <div className='logo-container flex items-center text-t-logo font-bold '>
                    <img src={logo} alt='Wizard Logo' 
                    className='h-12 inline' />
                    
                        <span className='text-main-color pl-4'>
                            Your Magic</span>
                        <span className='text-secondary-color pl-2'>
                            World</span>
                
                </div>
                
                <div className='text-xl  text-gray-700'>
                    <span className='font-bold'>
                        Made by Dypa:
                    </span>
                    <span className='pl-2 font-light'>
                        made with love and procrastination
                    </span>
                </div>

                <div className='flex items-center justify-end gap-4 w-1/5'>
                    <button className='w-1/2 text-lg text-secondary-color p-2 rounded-lg bg-n-white hover:bg-secondary-color hover:text-n-white transition duration-300'
                            onClick={()=> window.location.href='/'}>
                            <i className='fa fa-home pr-1'></i>
                            <span className='text-gray-700 ml-1 font-bold hover:text-n-white transition duration-300'>Homepage</span>
                    </button>
                    <button className='login-button w-1/2 text-lg text-secondary-color p-2 rounded-lg bg-n-white hover:bg-secondary-color hover:text-n-white transition duration-300'
                            onClick={() => window.location.href='/login'}>
                            <i className='fa fa-user pr-1'></i>
                            Login
                    </button>
                </div>
            
        </header>
    );
}