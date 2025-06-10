import { useEffect, useState } from "react"
import axios from "axios"
import Header from "../myComponents/Header"


export default function HomePage() {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/user/user-info", {withCredentials: true})
    .then(response => {
      setUserData(response.data)
    })
    .catch(error => {
      console.error('Error: ', error)
    })
  }, [])
  

  return (
    <>
      <Header />
      <main>
        {userData ? <h1>Hi {userData.name}! </h1> : <p>Loading...</p>

        }
        
      <button onClick={console.log(userData)}>miao</button>
      </main>
    </>
  )
}