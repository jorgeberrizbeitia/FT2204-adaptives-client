import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getProfileService } from "../../services/profile.services"


function Profile() {

  const [ user, setUser ] = useState(null)

  const navigate = useNavigate()
  
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const response = await getProfileService()
      setUser(response.data)
    } catch(err) {
      navigate("/login")
    }
  }

  if (!user) {
    return <h3>...Loading</h3>
  }

  return (
    <div>
      <h1>Welcome: {user.name}</h1>
      <h3>Email: {user.email}</h3>
      <img src={user.profilePic} alt="pic" />
    </div>
  )
}

export default Profile