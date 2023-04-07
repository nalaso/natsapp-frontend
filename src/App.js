import React from 'react';
// import ThemeProvider from './Config/ThemeConfig/ThemeProvider';
import ApiProvider from "./Config/Firebase/Firebase";
import AppAuthentication from "./AppAuthentication";
// import "./App.css"

function App() {
  return (
    <div className="app disable-select">
      {/* <ThemeProvider> */}
        <ApiProvider>
          <AppAuthentication/>
        </ApiProvider>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;