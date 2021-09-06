import React,{useContext} from 'react'
import { UserContext } from '../../components/AuthProvider/AuthProvider';
import FriendMenu from '../../components/FriendMenu/FriendMenu';
import RightPanelPre from '../../components/rightPanel/RightPanelPre';
import {ChatOpenContext} from '../../Hooks/IsChatOpen/IsChatopen';
import IsMobile from '../../Hooks/IsMobile/IsMobile';
import LeftPanel from "./../../components/leftPanel/LeftPanel"
import RightPanel from "./../../components/rightPanel/RightPanel"
import IsGroup from "./../../Hooks/IsGroup/IsGroup";
import "./light.css"

const Home = () => {
    const {isOpen,chatdet,isFrdetopen,mobchatclick} = useContext(ChatOpenContext)
    const {currentUser,username} = useContext(UserContext)
    const {isMobile} = IsMobile();

    return (
        <IsGroup>
            <div className='HomeSection'>
                {
                    isMobile?(
                        !mobchatclick?(
                            <LeftPanel />
                        ):(
                            <RightPanel props={chatdet} cuid={currentUser.uid} cuname={username}/>
                        )
                    ):(<>
                        <LeftPanel />
                        {
                            isOpen?(
                                <RightPanel props={chatdet} cuid={currentUser.uid} cuname={username}/>
                            ):(
                                <RightPanelPre />
                            )
                        }
                    </>)
                }
            </div>
            {
                isFrdetopen && (
                    <FriendMenu props={chatdet} cuid={currentUser.uid} username={username}/>
                )
            }
        </IsGroup>
    )
}

export default Home
