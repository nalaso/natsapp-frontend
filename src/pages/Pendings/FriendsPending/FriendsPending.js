import React, { useContext } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { FireContext } from '../../../Config/Firebase/Firebase';
import { UserContext } from '../../../components/AuthProvider/AuthProvider';
import FrReqSent from './FrReqSent';
import FrReqReceived from './FrReqReceived';
import { RequestPendingContext } from '../../../Hooks/Pendings/Pendings';
import { PendingStatusContext } from '../../../Hooks/Pendings/PendingsStatus';
import FrSentStatus from './FrSentStatus';

const FriendsPending = () => {
    const {db} = useContext(FireContext)
    const {currentUser,username} = useContext(UserContext)
    const {requestssend,requestsreceived,removerequestsend,removerequestreceived} = useContext(RequestPendingContext)
    const {requestssendstatus,removerequeststatus} = useContext(PendingStatusContext)

    return (
        <section className="Frrec">

            <section className="configSect">
            
                <p className="confTitle configtitle">
                    <Link to="/Friends/Add">
                        <button className="tbButton" id="backfrr">
                            <ArrowBackIcon />
                        </button>
                    </Link>
                Friends Request Pending
                </p>
            </section>

            <section className="configSect">
                <p className="configTitle">Request Received</p>
                <div className="reqbox" id="frreqrbx">
                    {
                        requestsreceived.map(request=>(
                            <FrReqReceived key={request.frname} request={request} username={username} uid={currentUser.uid} db={db} removerequestreceived={removerequestreceived}/>
                        ))
                    }
                </div>
            </section>

            <section className="configSect">
                <p className="configTitle">Request Sent</p>
                <div className="reqbox" id="frreqsbx">
                    {
                        requestssend.map(request=>(
                            <FrReqSent key={request.frname} request={request} username={username} uid={currentUser.uid} db={db} removerequestsend={removerequestsend}/>
                        ))
                    }
                </div>
            </section>

            <section className="configSect">
                <p className="configTitle">Request Sent Status</p>
                <div className="reqbox" id="frreqsstabx">
                    {
                        requestssendstatus.map(status=>(
                            <FrSentStatus key={status.frname} status={status} username={username} uid={currentUser.uid} db={db} removerequeststatus={removerequeststatus} />
                        ))
                    }
                </div>
            </section>

        </section>
    )
}

export default FriendsPending
