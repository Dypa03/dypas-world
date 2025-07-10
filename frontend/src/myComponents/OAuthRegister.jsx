export default function OAuthRegister() {
    const googleSignIn = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google'
    };

    /* const githubLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/github'
    };
 */

    return (
        <div>
            <h1>Register with OAuth</h1>
            <button onClick={googleSignIn}>Register with Google</button>
            {/* <button onClick={githubLogin}>Login with GitHub</button> */}
        </div>
    )

}