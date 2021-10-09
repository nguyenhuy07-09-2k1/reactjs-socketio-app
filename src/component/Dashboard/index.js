import React, { useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from '../../store';
import './index.css'
export default function Dashboard() {
    const { users } = useContext(StoreContext)
    const [User] = users;
    return (
        <div className="dashboard">
            
            <div className="wrap-avatar">
                <div className="avatar">
                    <img src={`${process.env.PUBLIC_URL}/assets/HinhZalo.jpg`} alt="Avatar" className="avatar-img" />
                    <FontAwesomeIcon className={User?.at(0)?.connected ? "span-online" : "span-offline"} icon={"circle"}></FontAwesomeIcon>
                </div>
            </div>

            <div className="nav-tabs">
                <div>
                    <div className="icon"><FontAwesomeIcon icon="comment-dots" /></div>
                    <div className="icon"><FontAwesomeIcon icon="address-book" /></div>
                    <div className="icon"><FontAwesomeIcon icon="bell" /></div>
                    <div className="icon"><FontAwesomeIcon icon="clipboard-check" /></div>
                </div>
                <div className="nav-tabs-button">
                    <div className="icon"><FontAwesomeIcon icon="cloud" /></div>
                    <div className="icon"><FontAwesomeIcon icon="star" /></div>
                    <div className="icon"><FontAwesomeIcon icon="cog" /></div>
                </div>
            </div>
        </div>
    )
}