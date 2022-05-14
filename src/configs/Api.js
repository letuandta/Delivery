import axios from 'axios'


axios.defaults.withCredentials = false;

export const endpoints = {
    "oauth2_info": "/oauth2_info",
    "login": "/o/token/",
    "current-user": "/users/current-user"
}

export default axios.create({
    baseURL: "http://localhost:8000/"
})