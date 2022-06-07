import axios from "axios"

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`
})

service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  if (storedToken) {
    config.headers = { Authorization: `Bearer ${storedToken}` };
  }
  return config;
});

const getProfileService = () => {
  return service.get("/profile")
}

const editProfileService = (userUpdate) => {
  return service.patch("/profile", userUpdate)
}

const uploadService = (uploadForm) => {
  return service.post("/uploader", uploadForm)
}

export {
  getProfileService,
  editProfileService,
  uploadService
}