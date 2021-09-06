import React, {useState,useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../components/AuthProvider/AuthProvider";
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

        <p className={darkMode ? "dark-mode-ter textacc" : "light-mode-ter textacc"}>
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