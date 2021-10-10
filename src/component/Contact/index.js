import React, { useEffect, useContext, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StringCrypto from 'string-crypto';
import './index.css';
import { formatDistanceToNowStrict, parseISO } from 'date-fns'

// import { useSelector, useDispatch } from 'react-redux';
// import { usersJoin } from '../../store/action';
import { StoreContext } from '../../store';


const options = {
    salt: '2f0ijf2039j23r09j2fg45o9ng98um4o',
    iterations: 10,
    digest: 'sha512', // one of: 'blake2b512' | 'blake2s256' | 'md4' | 'md5' | 'md5-sha1' | 'mdc2' | 'ripemd160' | 'sha1' | 'sha224' | 'sha256' | 'sha3-224' | 'sha3-256' | 'sha3-384' | 'sha3-512' | 'sha384' | 'sha512' | 'sha512-224' | 'sha512-256' | 'sm3' | 'whirlpool';
};
const {
    encryptString,
    decryptString,
} = new StringCrypto(options);

export default function Contact({ socket }) {


    const [usernameAlreadySelected, setusernameAlreadySelected] = useState(false);
    const { users } = useContext(StoreContext)
    const [User, setUser] = users;

    const { select } = useContext(StoreContext);
    const [selectUser, setSelectUser] = select;
    const initReactiveProperties = (user) => {
        user.messages = [];
        user.hasNewMessages = false;
        user.countNewMessage = 0;
    };

    const onSelect = useCallback(
        (user) => {

            if (!user.self) {
                if(user.connected){
                    setSelectUser(user);
                    setusernameAlreadySelected(true);
                    user.hasNewMessages = false;
                    user.countNewMessage = 0;
                }
                else{
                    alert("Khoan dừng khoảng chừng 2s. Người ta off rùi mà nhấn quài nhớ người ta hay gì🤪🤪🤪")
                }
               
            }
            else{
                alert("Khoan dừng khoảng chừng 2s. Ai đâu mà tự nhắn với chính mình🥴🥴")
            }
        },
        [setSelectUser],
    )

    // console.log(selectUser)
    useEffect(() => {


        const password = "HuyCute!@#755&^EWsd@#";
        const encryptKeyUsername = encryptString("username", password);
        // const encryptKeySessionId = encryptString("sessionID", password);

        const sessionID = localStorage.getItem("sessionID");
        const username = sessionStorage.getItem("username");

        console.log(encryptKeyUsername, "=encryptKeyUsername")
        if (sessionID && username) {

            console.log(username, "=usernameSession")
            setusernameAlreadySelected(true);
            socket.auth = { sessionID, username: decryptString(username, password) };
            socket.connect();
        }

        socket.on("session", ({ sessionID, id, username }) => {
            console.log("username session", username)
            // attach the session ID to the next reconnection attempts
            socket.auth = { sessionID, username };
            // store it in the localStorage
            localStorage.setItem("sessionID", sessionID);

            sessionStorage.setItem("username", encryptString(username, password));
            // save the ID of the user
            socket.id = id;
        });

        socket.on("users", (users) => {
            console.log("usersServer", users)

            users.forEach((user) => {
                for (let i = 0; i < User.slice().length; i++) {
                    const index = User.slice().findIndex(users => users.id === user.id);
                    if (index > -1) {
                        let addNewUser = User.slice();
                        addNewUser[index].connected = user.connected;
                        setUser([...addNewUser]);
                        return;
                    }
                }
                user.self = user.id === socket.id;
                initReactiveProperties(user);
                setUser(pre => [...pre, user]);
            });
            let addNewUser = users.slice();
            addNewUser.forEach((user) => {
                user.self = user.id === socket.id;
                console.log(user, "= userContact")
                initReactiveProperties(user);
            });
            setUser([...users])

        })

        socket.on("user connected", (user) => {
            const index = User.slice().findIndex(users => users.id === user.id);
            if (index > -1) {
                let existingUser = User.slice();
                existingUser[index].connected = true;
                setUser([...existingUser]);
                return;
            }

            initReactiveProperties(user);
            let newState = User.slice();
            newState.push(user);
            setUser([...newState]);
        });
        console.log("m in ra hông")

        socket.on("connect", () => {
            const index = User.slice().findIndex(user => user.self);
            if (index > -1) {
                let userDis = User.slice();
                userDis[index].connected = true;
                setUser([...userDis]);
            }
        });

        socket.on('disconnect', () => {

            const index = User.slice().findIndex(user => user.self);
            if (index > -1) {
                let userDis = User.slice();
                userDis[index].connected = false;
                setUser([...userDis]);
            }
        })

        socket.on("user disconnected", (id) => {
            const index = User.slice().findIndex(user => user.id === id);
            if (index > -1) {
                let userDis = User.slice();
                userDis[index].connected = false;
                setUser([...userDis]);
            }

        });
        socket.on("connect_error", (error) => {
            if (error.message === 'invalid username') {
                setusernameAlreadySelected(false);
            }
        })



        return () => {
            socket.off("users");
            socket.off("user connected");
            socket.off("connect_error");
            socket.off("user disconnected");
        }
    }, [socket, setUser, User]);

    console.log("Users: ", User)


    return (
        <div className="contact">
            <div className="contact-search-input">
                <div className="form-search">
                    <div className="wrap-form-search">
                        <form id="form-search" action="">
                            <input id="search" autoComplete="off" placeholder="Tìm kiếm" />
                        </form>
                    </div>

                    <div className="add-user-group-btn">
                        <div className="icon-header"><FontAwesomeIcon icon="user-plus" /></div>
                        <div className="icon-header"><FontAwesomeIcon icon="users" /></div>
                    </div>
                </div>

                <div className="contact-classify">
                    <div className="classNameify"><span>Phân loại</span></div>
                    <div className="expand-classify">
                        <div className="wrap-classify">
                            <div className="div-classify">Tất cả</div>
                            <div className="div-classify">Bạn bè</div>
                            <div className="div-classify">Nhóm</div>
                            <div className="div-classify">Gia đình</div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="contact-user">
                {User && [].concat(User).sort((a, b) => {
                    if (a.self) return -1;
                    if (b.self) return 1;
                    if (a.username < b.username) return -1;
                    return a.username > b.username ? 1 : 0;
                }).map((user) => (
                    <div key={user.id} className={`wrap-contact-user ${selectUser?.id === user.id && "selected-user"}`} onClick={() => onSelect(user)}>
                        <div className={user.connected ? "avatar-online" : "avatar-offline"}>
                            {/* <img src={`${process.env.PUBLIC_URL}/assets/KhanhZalo.jpg`} alt="Avatar" className="avatar-img" /> */}
                        </div>
                        <div className="info-contact">
                            <div className="info-contact-wrap">
                                <div className="user-self">
                                    <span className="span-username">{`${user.username} ${user.self ? "(your self)" : ''}`}</span>
                                    <span className="timestamp">{user.messages.at(-1) && formatDistanceToNowStrict(parseISO(user.messages.at(-1)?.timestamp))}</span>
                                </div>
                                {
                                    <div className="user-other">
                                        <div className="truncate">{user.messages.at(-1) && user.messages.at(-1).username + ": "} {user.messages.at(-1) && user.messages.at(-1).message}  </div>
                                        {user.hasNewMessages && <span className="badge">{user.countNewMessage <= 5 ? user.countNewMessage : "5+"}</span>}
                                    </div>
                                }

                            </div>

                        </div>

                    </div>

                ))}

            </div>
        </div>
    )
} 