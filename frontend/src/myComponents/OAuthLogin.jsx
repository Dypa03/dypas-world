export default function OAuthLogin() {
    const googleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google'
    };
/* 
    const githubLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/github'
    }; */


    return (
        <div>
            <button onClick={googleLogin}
                className="w-full text-white bg-secondary-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Enter with Google</button>
            {/* <button onClick={githubLogin}>Login with GitHub</button> */}
        </div>
    )

}