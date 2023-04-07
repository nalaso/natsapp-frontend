import axios from "axios";

// const instance = axios.create({
//     baseURL : localStorage.getItem("isdev")==="nalasky"?("http://localhost:9000/"):process.env.REACT_APP_HEROKU_ID
// });
axios.defaults.headers.post["Content-Type"] = "application/json";

const mainAxios = axios.create({
    baseURL: localStorage.getItem("isdevjs")==="nalasky"?("http://localhost:9000/"):process.env.REACT_APP_HEROKU_ID
});

const botAxios = axios.create({
    baseURL: localStorage.getItem("isdevpy")==="nalasky"?("http://localhost:5000/"):process.env.REACT_APP_HEROKU_PYTHON_ID
    // baseURL: "http://localhost:5000/"
});
    
export {
  mainAxios,
  botAxios
};
// export default instance;