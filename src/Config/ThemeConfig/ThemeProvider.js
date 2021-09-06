// import React, {useEffect, useState, createContext } from "react";

// export const ThemeContext = createContext(null);

// const ThemeProvider = props=>{
//   const [darkMode, setDarkMode] = useState(getInitialMode());
//   useEffect(() => {
//     localStorage.setItem("dark", JSON.stringify(darkMode));
//     document.documentElement.style.setProperty("--background-color", darkMode?"#3e484f":"whitesmoke");
//   }, [darkMode]);

//   function getInitialMode() {
//     const isReturningUser = "dark" in localStorage;
//     const savedMode = JSON.parse(localStorage.getItem("dark"));
//     const userPrefersDark = getPrefColorScheme();
//     if (isReturningUser) {
//       return savedMode;
//     } else if (userPrefersDark) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   function getPrefColorScheme() {
//     if (!window.matchMedia) return;

//     return window.matchMedia("(prefers-color-scheme: dark)").matches;
//   }

//   function setMode(){
//     setDarkMode(darkMode=>!darkMode);
//   }

//     return (
//       <ThemeContext.Provider value={{darkMode,setMode}}>
//         {props.children}
//       </ThemeContext.Provider>
//     );
// }

// export default ThemeProvider;