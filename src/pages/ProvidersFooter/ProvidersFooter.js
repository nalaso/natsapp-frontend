import React, { useContext, useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import AppleIcon from '@material-ui/icons/Apple';
import { UserContext } from '../../components/AuthProvider/AuthProvider';
import { useHistory } from 'react-router-dom';

const ProvidersFooter = () => {
    let history = useHistory();
    const [clicked, setClicked] = useState(false)
    const {prov,setprov,setgithubloginneeded} = useContext(UserContext)
    
    const githubsignup = () => {
        setgithubloginneeded(true);
        setprov(false);
        history.push("/Github")
    }
    
    if(prov){
        return (
            <div className="providerscontainer">
                <h4>Or</h4>
                {
                    !clicked?(
                        <div className="providersicons">
                            <GitHubIcon className="proicon" onClick={githubsignup}/>
                            {/* <TwitterIcon className="proicon" />
                            <LinkedInIcon className="proicon" />
                            <InstagramIcon className="proicon" />
                            <FacebookIcon className="proicon" />
                            <EmailIcon className="proicon" />
                            <AppleIcon className="proicon" /> */}
                        </div>
                    ):(
                        <div className="providersicons">
                            <ArrowDropDownIcon className="proicon" onClick={()=>setClicked(true)}/>
                        </div>
                    )
                }
            </div>
        )
    }

    return(
        <p>.</p>
    )
}

export default ProvidersFooter
