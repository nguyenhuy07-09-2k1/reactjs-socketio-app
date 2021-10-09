import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import './index.css'
import { to_Decrypt, to_Encrypt } from "../../ase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from '../../store';
export default function Content({ socket }) {

    const [text, setText] = useState("");

    const { users } = useContext(StoreContext)
    const [User, setUser] = users;

    const { select } = useContext(StoreContext);
    const [selectUser, setSelectUser] = select;

    console.log("socket", socket)
    useEffect(() => {

        socket.on("private message", (data) => {
            //decypt the message
            const ans = to_Decrypt(data.message, data.username);

            for (let i = 0; i < User.slice().length; i++) {
                const user = User.slice()[i];
                const fromSelf = socket.id === data.from;
                if (user.id === (fromSelf ? data.to : data.from)) {

                    user.messages.push({
                        message: ans,
                        fromSelf: false,
                        username: data.username,
                        timestamp: data.timestamp
                    })

                    if (user !== selectUser) {
                        user.hasNewMessages = true;
                        user.countNewMessage++;
                    }
                    let AddNewMessUser = User.slice();
                    AddNewMessUser[i] = { ...user };
                    setUser([...AddNewMessUser]);
                    break;
                }
            }

            console.log(ans);
            console.log(data, "=message")
            console.log(User, "=Users");

        });

        return () => {

            socket.off("private message");
        }

    }, [socket, selectUser, setUser, User]);

    const sendData = useCallback(
        (e) => {
            e.preventDefault();
            if (text !== "") {
                const ans = to_Encrypt(text);
                if (selectUser) {

                    socket.emit("private message", { message: ans, to: selectUser.id });
                    let newSelect = Object.assign({}, selectUser);
                    newSelect.messages.push({
                        message: text,
                        fromSelf: true,
                        username: socket.auth.username,
                        timestamp: new Date().toISOString(),
                    })
                    setSelectUser({ ...newSelect });
                    setText("");
                }
                else{
                    alert("Khoan chờ khoản chừng 2s. Bạn chưa chọn ai đó để nhắn cùng 😜😜");
                }
                //encrypt the message here

            }
        }, [socket, selectUser, setSelectUser, text]);


    const renderMess = selectUser?.messages && selectUser.messages.map((i, index) =>
        <div key={index}
            className={`${i.fromSelf ? 'your-message' : 'other-people'}`} >

            <div className="avatar-message">
                {/* <img className="avatar-message" src={`${process.env.PUBLIC_URL}/assets/HinhZalo.jpg`} alt="Avatar user"></img> */}
            </div>

            <div className={`${i.fromSelf ? 'div-message' : 'other-div-message'}`}>
                <span className={`${i.fromSelf ? 'span-message-user' : 'other-span-message-user'}`}> {!i.fromSelf ? i.username : i.username}</span>
                <span >{i.message}</span>
            </div>

        </div>
    )

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [selectUser, User]);

    console.log(selectUser, "selectUser");
    // console.log(user.find(user => user.id === selectUser.id), "IdselectUser");

    return (
        <div className="content">

            <div className="headerContent">
                {
                    selectUser?.id && <div className="wrap-content-user">
                        <div className={selectUser.connected ? "avatar-online" : "avatar-offline"}>
                            {/* <img src={process.env.PUBLIC_URL + "/assets/KhanhZalo.jpg"} alt="Avatar" className="avatar-img" /> */}
                        </div>

                        <div className="info-content-header">
                            <span className="span-username">{selectUser.username}</span>
                            <div id="status" >{selectUser.connected ? "Đang hoạt động" : "Ngoại tuyến"}</div>
                        </div>

                    </div>
                }
                <div className="header-btn">
                    <div className="icon-header"><FontAwesomeIcon icon="users" /></div>
                    <div className="icon-header"><FontAwesomeIcon icon="search" /></div>
                    <div id="split-icon-btn" className="icon-header"><FontAwesomeIcon icon="columns" /></div>
                </div>
            </div>
            <div className="wrap-message" >
                {renderMess}
                <div ref={messagesEndRef} />
            </div>

            <div className="utility">
                <div className="icon-utility"><FontAwesomeIcon icon="laugh-wink" /></div>
                <div className="icon-utility"><FontAwesomeIcon icon="image" /></div>
                <div className="icon-utility"><FontAwesomeIcon icon="paperclip" /></div>
                <div className="icon-utility"><FontAwesomeIcon icon="crop-alt" /></div>
                <div className="icon-utility"><FontAwesomeIcon icon="address-card" /></div>
                <div className="icon-utility"><FontAwesomeIcon icon="clock" /></div>
            </div>
            <div className="message-form">
                <form id="form" action="" onSubmit={(e) => sendData(e)}>
                    <input
                        id="input"
                        autoComplete="off"
                        value={text}
                        // onKeyDown={ }
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Nhập tin nhắn ..." />
                    <div className="chat-input-btn">
                        <button type="button" className="icon-chat-input-btn"><FontAwesomeIcon icon="comment-medical" /></button>
                        <button type="button" className="icon-chat-input-btn"><FontAwesomeIcon icon="tired" /></button>
                        <button type="button" className="icon-chat-input-btn">@</button>
                        <button type="submit" className="icon-chat-input-btn-submit"><FontAwesomeIcon icon="paper-plane" /></button>
                    </div>

                </form>
            </div>

        </div>

    )
}