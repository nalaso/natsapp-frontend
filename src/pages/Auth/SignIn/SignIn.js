import React, {useState,useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../components/AuthProvider/AuthProvider";
import { mainAxios } from "../../../Config/axios/axios";
import { FireContext } from "./../../../Config/Firebase/Firebase";
import './SignIn.css';

const SignIn = () => {
    const [darkMode] = useState(true);
    const {auth} = useContext(FireContext);
    const {setAuthlink} = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        email = email+"@natsapp.in";
        auth.signInWithEmailAndPassword(email, password).then(()=>{
          setAuthlink("newuser");
        }).catch(error => {
        setError(error.message);
          console.error("Error signing in with password and email", error);
        });
    };

    const generateCustomerToken = (event) => {
        event.preventDefault();
        console.log("generate");
        let td = new Date().getTime()
        let uri = "https://faogamma.web.app/Accounts/Redirect?origin=natsapp&type=prod&t="+td
        window.open(uri,"_self")
    };
      
    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
      
        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
          setPassword(value);
        }
    };

  return (
    <div className={darkMode ? "dark-mode-ter container" : "light-mode-ter container"}>
    <div className="form-structor"> 
    <div className="signup">
      <h2 className={darkMode ? "dark-mode-ter form-title" : "light-mode-ter form-title"}>Sign In</h2>
      <div className="form-holder">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
          <input
            type="email"
            className="input"
            name="userEmail"
            value={email}
            placeholder="username"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <input
            type="password"
            className="input"
            name="userPassword"
            value={password}
            placeholder="Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
        </div>  
        <button
            className="submit-btn"
            onClick={event => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >Sign in
        </button>
        <h5 className="textacc" style={{paddingTop:"10px"}}>Or</h5>
        <button
            className="submit-btn"
            onClick={event => {
              generateCustomerToken(event);
            }}
          >Sign in using Nalasky id
        </button>

        <p className={darkMode ? "dark-mode-ter textacc" : "light-mode-ter textacc"} style={{paddingTop:"5px"}}>
          <br/>Don't have an account?<br/>{" "}
          <Link to="/SignUp" className="textsignin">
            Sign up here
          </Link>{" "}
        </p>
    </div>
    </div>
    </div>
  );
};

export default SignIn;