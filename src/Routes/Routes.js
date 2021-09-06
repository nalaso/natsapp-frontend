import React,{useContext } from "react";
import SignUp from '../pages/Auth/Signup/SignUp';
import SignIn from '../pages/Auth/SignIn/SignIn';
import Home from '../pages/Home/Home'
import DirectChatList from "../Hooks/DirectChatList/DirectChatList";
import { UserContext } from "../components/AuthProvider/AuthProvider";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AddFriend from "../pages/AddFriend/AddFriend";
import AddGroup from "../pages/AddGroup/AddGroup";
import FriendsPending from "../pages/Pendings/FriendsPending/FriendsPending";
import GroupsPending from "../pages/Pendings/GroupsPending/GroupsPending";
import IsChatopen from "../Hooks/IsChatOpen/IsChatopen";
import GroupChatList from "../Hooks/GroupChatList/GroupChatList";
import CreateGroup from "../pages/CreateGroup/CreateGroup";
import SideMenu from "../pages/SideMenu/SideMenu";
import Settings from "../pages/Settings/Settings";
import ThemeSelector from "../pages/ThemeSelector/ThemeSelector";
import ChangeProfile from "../pages/ChangeProfile/ChangeProfile";
import GenerateLink from "../pages/GenerateLink/GenerateLink";
import InviteLink from "../pages/InviteLink/InviteLink";
import InviteLinkConfirmation from "../pages/InviteLink/InviteLinkConfirmation";
import PathListener from "../Hooks/PathListener/PathListener";
import Isauthlink from "../Hooks/Isauthlink/Isauthlink";
import Pendings from "../Hooks/Pendings/Pendings";
import PendingsStatus from "../Hooks/Pendings/PendingsStatus";
import ChatNotification from "../Hooks/ChatNotification/ChatNotification";
import GroupDetails from "../pages/GroupDetails/GroupDetails";
import ProvidersFooter from "../pages/ProvidersFooter/ProvidersFooter";
import GithubLogin from "../pages/Auth/GithubLogin/GithubLogin";

const Routes = () => {
  const {isrealuser,currentUser} = useContext(UserContext);

  const deeproute =(props) => {
    if(props.location.pathname==="/"){
      return (
        <></>
      )
    }else{
      return (
        <Redirect to="/" />
      )
    }
  }

  return(<>
      {
        currentUser && isrealuser?(
            <DirectChatList>
              <GroupChatList>
                <Pendings>
                  <PendingsStatus>     
                    <ChatNotification>
                      <IsChatopen>
                        <Router>
                          <Isauthlink />
                          <Home />
                          <PathListener />
                          <Switch>
                            <Route path="/Friends">
                                <AddFriend />
                                <Route exact path="/Friends/Pendings" component={FriendsPending} />
                            </Route>
                            <Route path="/Groups">
                                <AddGroup />
                                <Route exact path="/Groups/Create" component={CreateGroup} />
                                <Route exact path="/Groups/Pendings" component={GroupsPending} />
                            </Route>
                            <Route exact path="/SideMenu" component={SideMenu} />
                            <Route exact path="/Settings" component={Settings} />
                            <Route exact path="/GenerateLink" component={GenerateLink} />
                            <Route exact path="/ChangeProfile" component={ChangeProfile} />
                            <Route exact path="/Themes" component={ThemeSelector} />
                            <Route path={["/Friend/Profile","/user/:id/details"]} component={InviteLinkConfirmation} />
                            <Route path="/Group/:id/details" component={GroupDetails} />
                            <Route exact path="/invitefriend/:link" render={props=>{return(<InviteLink {...props}/>)}} />
                            <Route path="/" component={deeproute} />
                        </Switch>
                        </Router>
                      </IsChatopen>
                    </ChatNotification> 
                  </PendingsStatus> 
                </Pendings>
              </GroupChatList>
            </DirectChatList>
        ):(
          <Router>
              <Switch>
                  <Route path="/Github" component={GithubLogin} />
                  <Route path="/SignIn" component={SignIn} />
                  <Route path={["/SignUp","/"]} component={SignUp} />
              </Switch>
              <ProvidersFooter />
          </Router>
        )
      }
  </>)
}

export default Routes;