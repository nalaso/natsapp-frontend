import axios from "axios";

const instance = axios.create({
    baseURL : localStorage.getItem("isdev")==="nalasky"?("http://localhost:9000/"):process.env.REACT_APP_HEROKU_ID
});

export default instance;