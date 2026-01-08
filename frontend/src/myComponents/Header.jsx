import logo from '../assets/wizard-logo-rb.png';
//import home from '../assets/home-icon.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function Header(props) {
    let smallScreenSize = 1280;
    let mobileScreenSize = 640;
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < smallScreenSize);
    const [isScreenMobile, setIsScreenMobile] = useState(window.innerWidth < mobileScreenSize);
    

    useEffect(() => {
        const handleResize = () => setIsScreenSmall(window.innerWidth < smallScreenSize);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleResize = () => setIsScreenMobile(window.innerWidth < mobileScreenSize);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    

    const navigate = useNavigate();

    return (
        <header className='bg-main-white w-full sm:h-header h-16 flex items-center justify-between px-4 fixed top-0 left-0 z-40 
                             xl:px-24 lg:px-16 md:px-12 sm:px-8'>

                <div className='logo-container flex items-center   '>
                    <img src={logo} alt='Wizard Logo' 
                    className='h-12 inline' />
                        {isScreenMobile ? null :
                            <div className='flex items-start justify-center ml-2 2xl:text-t-logo font-bold 
                                sm:text-3xl  text-small-header-title'>
                                <span className='text-main-color'>
                                    Your Magic</span>
                                <span className='text-secondary-color ml-2'>
                                    World</span>
                            </div>}
                </div>
                
                {isScreenMobile ? 
                <div className='text-center text-2xl ml-2 font-bold '>
                    <span className='text-main-color'>
                        Your Magic</span>
                    <span className='text-secondary-color ml-2'>
                        World</span>
                </div> 
                
                :    
                <div className='xl:text-xl text-gray-700 lg:text-lg text-center header-text-show:block hidden'>
                    <span className='font-bold'>
                        Made by Dypa:
                    </span>
                    <span className='pl-2 font-light'>
                        made with love and procrastination
                    </span>
                </div>}

                <div className='flex items-center justify-end sm:gap-4 gap-2 2xl:w-1/5 lg:w-1/4 sm:w-1/3 w-[100px] text-lg '>
                    <button className='home-button w-[45px] sm:w-1/2 font-bold text-secondary-color p-2 rounded-lg bg-main-white hover:bg-secondary-color hover:text-main-white transition duration-300'
                            onClick={()=> window.location.href='/'}>
                            <i className='fa fa-home pr-1'></i>
                            {isScreenMobile ? null : isScreenSmall ? 'Home' : 'Homepage'}
                    </button>
                    
                    {props.isUserLoggedin ? 
                        <button className='logout-button w-[45px] sm:w-1/2 text-center font-bold text-main-color p-2 rounded-lg bg-main-white hover:bg-main-color hover:text-main-white  transition duration-300'
                        onClick={()=> navigate('/')}>
                                <i className='fa fa-user'></i>
                                {isScreenMobile ? null : 'Logout'}
                        </button>
                        :
                        <button className='login-button w-[45px] sm:w-1/2 text-center font-bold text-main-color p-2 rounded-lg bg-main-white hover:bg-main-color hover:text-main-white  transition duration-300'
                        onClick={()=> navigate('/login')}>
                                <i className='fa fa-user mr-1'></i>
                                {isScreenMobile ? null : 'Login'}
                        </button>
                    }
                    
                    
                </div>
            
        </header>
    );
}