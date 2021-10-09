import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function SplitChat() {
    return (
        <div className="split-info-chat">
            <div className="header-split">
                <span >Thông tin hội thoại</span>
            </div>
            <div className="wrap-split">
                <div className="avatar-split">
                    <img src={`${process.env.PUBLIC_URL}/assets/KhanhZalo.jpg`} alt="Avatar" className="avatar-img" />
                    <div className="user-split mt-1">
                        <span className="span-username ml-3 font-large">Nguyễn Khánh</span>
                        <span className="ml-1 font-large"><FontAwesomeIcon icon="pen-square" /></span>
                    </div>
                </div>

                <div className="chat-setting-general">
                    <div className="list-reminder p-1"><FontAwesomeIcon icon="clock" /><span className="ml-1">Danh sách nhắn
                        hẹn</span></div>
                    <div className="add-group p-1"><FontAwesomeIcon icon="users" /><span className="ml-1">3 nhóm chung</span></div>
                    <div className="create-group-with p-1"><FontAwesomeIcon icon="users" /><span className="ml-1">Thêm nhóm
                        với người này</span></div>
                </div>

                <div className="img-video-split">
                    <div className="wrap-header-video-split d-flex flex-row w-100 p-1 ">
                        <span className="title-video-split  my-auto">
                            Ảnh/Video
                        </span>
                    </div>
                    <div className="contain-video-img d-flex flex-column w-100">
                        <div className="wrap-contain-img-video d-flex flex-row w-100">
                            <div className="contain-img-video-first d-block bg-info"></div>
                            <div className="contain-img-video-second d-block bg-primary"></div>
                            <div className="contain-img-video-third d-block bg-success"></div>
                        </div>
                        <div className="see-all-img-video d-block w-100 bg-info">
                            <span>Xem tất cả</span>
                        </div>

                    </div>

                </div>

                <div className="file-split p-1">
                    <div className="wrap-header-file-split d-flex flex-row w-100">
                        <span className="title-file-split  my-auto">
                            File
                        </span>
                    </div>
                    <div className="contain-file d-flex flex-column ">
                        <div className="wrap-contain-file">
                            <div className="contain-file-layout ">
                                <div className="file-layout_thumbs-container bg-danger"></div>
                                <div className="file-layout_right-container">
                                    <div className="file-layout-top-container">
                                        <span>file-nghien-cuu.ppt</span>
                                    </div>
                                    <div className="file-layout-bot-container d-flex flex-row">
                                        <div>1.13MB</div>
                                        <span className="ml-auto d-block">12/07/2021</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contain-file-layout">
                                <div className="file-layout_thumbs-container bg-success"></div>
                                <div className="file-layout_right-container">
                                    <div className="file-layout-top-container">
                                        <span>file-nghien-cuu.xlsx</span>
                                    </div>
                                    <div className="file-layout-bot-container d-flex flex-row">
                                        <div>4.32MB</div>
                                        <span className="ml-auto d-block">05/07/2021</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contain-file-layout ">
                                <div className="file-layout_thumbs-container bg-info"></div>
                                <div className="file-layout_right-container">
                                    <div className="file-layout-top-container">
                                        <span>file-nghien-cuu.docx</span>
                                    </div>
                                    <div className="file-layout-bot-container d-flex flex-row">
                                        <div>2.37MB</div>
                                        <span className="ml-auto d-block">01/07/2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="see-all-file d-block w-100 bg-info">
                            <span>Xem tất cả</span>
                        </div>
                    </div>

                </div>

                <div className="link-split">
                    <div className="wrap-header-link-split d-flex flex-row w-100 ">
                        <span className="title-link-split  my-auto">
                            Link
                        </span>
                    </div>
                    <div className="contain-link d-flex flex-column">
                        <div className="wrap-contain-link">
                            <div className="contain-link-layout ">
                                <div className="link-layout_thumbs-container bg-danger"></div>
                                <div className="link-layout_right-container">
                                    <div className="link-layout-top-container">
                                        <span>Programming Book</span>
                                    </div>
                                    <div className="link-layout-bot-container d-flex flex-row">
                                        <a className="text-reset" href="drive.google.com">drive.google.com</a>
                                        <span className="ml-auto d-block">07/2021</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contain-link-layout">
                                <div className="link-layout_thumbs-container bg-success"></div>
                                <div className="link-layout_right-container">
                                    <div className="link-layout-top-container">
                                        <span>Laptop Acer Aspire 3 A315 58 50YY i5 1135G7/8GB/512GB/Win10 (NX.AM0SV.004)
                                        </span>
                                    </div>
                                    <div className="link-layout-bot-container d-flex flex-row">
                                        <a className="text-reset" href="www.thegioididong.com">www.thegioididong.com</a>
                                        <span className="ml-auto d-block">07/2021</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="see-all-link d-block w-100 bg-info">
                            <span>Xem tất cả</span>
                        </div>
                    </div>
                </div>

                <div className="setting-other-split">
                    <div className="wrap-header-setting-split d-flex flex-row w-100 ">
                        <span className="title-setting-split  my-auto">
                            Setting
                        </span>
                    </div>
                    <div className="wrap-content-setting">
                        <div className="auto-remove-message p-1 font-large">
                        <FontAwesomeIcon icon="stopwatch" />
                            <span className="ml-1">Tin nhắn tư xoá</span>
                        </div>
                        <div className="report-bad p-1 font-large">
                        <FontAwesomeIcon icon="exclamation-triangle" />
                            <span className="ml-1">Báo xấu</span>
                        </div>
                        <div className="hide-story p-1 font-large">
                        <FontAwesomeIcon icon="eye-slash" />
                            <span className="ml-1">Ẩn cuộc trò chuyện</span>
                        </div>
                        <div className="delete-history p-1 font-large text-danger">
                        <FontAwesomeIcon icon="trash" />
                            <span className="ml-1">Xoá lịch sử trò chuyện</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}