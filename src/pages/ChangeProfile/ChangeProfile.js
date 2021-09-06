import React, { useContext } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { UserContext } from '../../components/AuthProvider/AuthProvider'
import ChangeAvatar from './ChangeAvatar/ChangeAvatar'
import ChangeEmail from './ChangeEmail/ChangeEmail'
import ChangeName from './ChangeName/ChangeName'
import ChangePassword from './ChangePassword/ChangePassword'
import { Link } from "react-router-dom";

const ChangeProfile = () => {
    const {currentUser} = useContext(UserContext)

    return (
        <section className="Profconfig" style={{border: "grey 2px solid"}}>
            <section className="configSect" style={{textAlign:"left"}}>
                <p className="confTitle configtitle">
                    <Link to="/Settings">
                        <button className="tbButton" id="backfrr">
                            <ArrowBackIcon />
                        </button>
                    </Link>
                Edit Profile</p>
            </section>
            {
                currentUser.isAnonymous?(
                    <ChangeName />
                ):(<>
                    <ChangeAvatar />
                    <ChangeName />
                    <ChangeEmail />
                    <ChangePassword />
               </> )
            }
        </section>
    )
}

export default ChangeProfile
