import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { editProfileService, getProfileService, uploadService } from "../../services/profile.services"

function ProfileEdit() {

  const [ name, setName ] = useState(null)
  const [ email, setEmail ] = useState(null)
  const [ image, setImage ] = useState()

  const navigate = useNavigate()

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {

    try {
      const response = await getProfileService()
      setName(response.data.name)
      setEmail(response.data.email)
      setImage(response.data.profilePic)

    } catch (error) {
      navigate("/error")
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userUpdate = {
      name,
      email,
      image
    }

    try {
      await editProfileService(userUpdate)
      navigate("/profile")
    } catch (err) {
      navigate("error")
    }
  }

  const handleImageChange = async(e) => {

    console.log(e.target.files[0])

    const uploadForm = new FormData()
    uploadForm.append("image", e.target.files[0])

    try {

      const response = await uploadService(uploadForm)
      setImage(response.data)

    } catch {
      navigate("/error")
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

      <label>Name:</label>
        <input 
          type="name" 
          name="name" 
          value={name} 
          onChange={handleNameChange} 
        />

      <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={handleEmailChange} 
        />

        <label htmlFor="image">Imagen</label>
        <input type="file" name="image" onChange={handleImageChange} />

        

        <button type="submit">Update</button>

      </form>

      <img src={image} alt="profile-pic" width={100}/>

    </div>
  )
}

export default ProfileEdit