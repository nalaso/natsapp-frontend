import React from 'react'
import AuthProvider from './components/AuthProvider/AuthProvider'
import Routes from "./Routes/Routes";

const AppAuthentication = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default AppAuthentication