import React, { useContext } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {ChatOpenContext} from '../../../Hooks/IsChatOpen/IsChatopen';

const TopBar = ({props,cuid}) => {
	const {changemobclick,friendprof} = useContext(ChatOpenContext)

    return (
        <div className="topBar">
			<div className="rightSide">
				{/* <button className="tbButton search">
				      <SearchIcon />
				</button> */}
				{
					cuid!==props.uid && props.id!=="admin" && props.id!=="chatbot" &&(
						<button className="tbButton otherOptions" id="otheroption" onClick={friendprof}>
							<MoreVertIcon />
						</button>
					)
				}
			</div>
			
			<div className="leftSide">
				<div id="backbtn">
					<button className="tbButton" id="back" onClick={()=>{changemobclick()}}>
						<ArrowBackIcon />
					</button>	
				</div>
				{
					props.chattype === "group" ?(
						<div id="grtoppanel">
							<div>
								<p className="chatName" id="groupName">{props.grname}</p>
								{/* <p className="chatStatus chatstatusof" id="groupstatusof">Dead</p>
								<p className="chatStatus chatstatuson" id="groupstatuson">Active</p> */}
							</div>
							<div>
								<p className="chatName" id="groupid">@{props.grid}</p>
								<p className="chatName" id="groupmem">{props.mem} members</p>
							</div>
						</div>
					):(
						<div id="frtoppanel">
							<div>
								<p className="chatName" id="chatName">{props.name}</p>
								{props.status?(
									<p className="chatStatus chatstatuson" id="chatstatuson">Online</p>
								):(
									<p className="chatStatus chatstatusof" id="chatstatusof">Offline</p>
								)}
							</div>
							<div>
								<p className="chatName" id="chatusname">@{props.id}</p>
							</div>
						</div>
					)
				}
			</div>
		</div>
    )
}

export default TopBar
