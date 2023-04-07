import React, { useContext } from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import FlareIcon from '@material-ui/icons/Flare';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MailIcon from '@material-ui/icons/Mail';
import BugReportIcon from '@material-ui/icons/BugReport';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/AuthProvider/AuthProvider';

const SideMenu = () => {
    const {currentUser,username,signout} = useContext(UserContext)

    const openurl = url => {
        var win = window.open(url+".natsapp.web.app", '_blank');
        win.focus();
    }

    return (
        <section className="menuWrap">
            <div className="menu">
                <div className="me userBg" id="smenubg">
                    <img alt="img" className="meimage" src={currentUser.photoURL} ></img>
                    
                    <div className="myinfo" id="myinfo">
                    <p className="name" id="dispname1">{currentUser.displayName}</p>
                    <p className="phone" id="usname1">@{username} </p>
                    </div>
                    
                    <Link to="/Themes">
                        <button className="cloud">
                            <FlareIcon />
                        </button>
                    </Link>
                    
                    <Link to="/Settings">
                        <button className="settings">
                            <SettingsIcon />
                        </button>
                    </Link> 
                </div>
                <nav>                    
                    <button onClick={()=>openurl("https://contact")} className="cn">
                        <MailIcon />
                        
                        <span>Contact Us(Coming soon)</span>
                    </button>

                    <button onClick={()=>openurl("https://blog")} className="cl">
                        <MenuBookIcon />
                        
                        <span><p>Blog(Coming soon)</p></span>
                    </button>
                    
                    <button onClick={()=>openurl("https://faqs")} className="faq">
                        <LiveHelpIcon />
                        
                        <span>FAQs(Coming soon)</span>
                    </button>

                    <button onClick={()=>openurl("https://donate")} className="cb">
                        <LocalAtmIcon />
                        
                        <span><p>Donate(Coming soon)</p></span>
                    </button>

                    <button onClick={()=>openurl("https://contribute")} className="cn">
                        <BugReportIcon />
                        
                        <span>Bug report(Coming soon)</span>
                    </button>
                    
                    <button onClick={signout} className="lo">
                        <ExitToAppIcon style={{color: "red"}} />
                        
                        <span>Logout</span>
                    </button>
                    
                </nav>
                
                <div className="info">
                    <p>Natsapp Web</p>
                    <p>Ver 9.0.2 b- <Link to="/about">About</Link></p>
                    <p>Developers: <a href="https://www.github.com/alanalajs">Nalasky</a></p>
                </div> 
            </div>
        </section>
    )
}

export default SideMenu
