import logo from '../assets/wizard-logo-rb.png';
//import home from '../assets/home-icon.svg';

export default function Header() {
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