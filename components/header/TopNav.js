import React from "react";
import Image from "next/image";
import style from '../../styles/custom.module.css'
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu, toggleSideMenu } from '../../redux/menuSlice'
import { useRouter } from 'next/router';
import { logout, reset } from '../../redux/auth/authSlice'
import { resetUser } from '../../redux/userSlice'
import { toast } from "react-toastify";

const TopNav = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { userName } = useSelector(state => state.user);

    const menuToggle = () => {
        dispatch(toggleMenu())
    }
    const sideMenuToggle = () => {
        dispatch(toggleSideMenu())
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(resetUser())
        router.replace('/')
        toast.warn("Logout Successfully")
    }

    return (
        <>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className={`navbar-brand brand-logo mr-5 ${style.center}`}>
                        {/* <img src="/images/logo1.jpg" className="mr-2" alt="logo" /> */}
                        <Image src="/images/logo1.jpg" width={100} height={100} alt="logo" />
                        E-commerce
                    </a>
                    <a className="navbar-brand brand-logo-mini">
                        <Image src="/images/logo1.jpg" width={150} height={150} alt="logo" />
                        {/* <img src="../../assets/images/logo.jpeg" alt="logo" /> */}
                    </a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button
                        className="navbar-toggler navbar-toggler align-self-center"
                        type="button"
                        onClick={sideMenuToggle}
                    >
                        <span className="icon-menu"></span>
                    </button>
                    <ul className="navbar-nav mr-lg-2">
                        <li className="nav-item nav-search d-none d-lg-block">
                            <div className="input-group">
                                <div
                                    className="input-group-prepend hover-cursor"
                                    id="navbar-search-icon"
                                >
                                    <span className="input-group-text" id="search">
                                        <i className="icon-search"></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="navbar-search-input"
                                    placeholder="Search now"
                                    aria-label="search"

                                />
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown mr-1">
                            <h5>Hello {userName}</h5>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link count-indicator dropdown-toggle"
                                id="notificationDropdown"
                                href="#"
                                data-toggle="dropdown"
                            >
                                <i className="icon-bell mx-0"></i>
                                <span className="count"></span>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                                aria-labelledby="notificationDropdown"
                            >
                                <p className="mb-0 font-weight-normal float-left dropdown-header">
                                    Notifications
                                </p>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-success">
                                            <i className="ti-info-alt mx-0"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">
                                            Application Error
                                        </h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Just now
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-warning">
                                            <i className="ti-settings mx-0"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">
                                            Settings
                                        </h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Private message
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-info">
                                            <i className="ti-user mx-0"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">
                                            New user registration
                                        </h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            2 days ago
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item nav-profile dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                data-toggle="dropdown"
                                id="profileDropdown"
                            >
                                <img src="/images/man.png" alt="profile" />
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                                aria-labelledby="profileDropdown"
                            >
                                <a className="dropdown-item">
                                    <i className="ti-settings text-primary"></i>
                                    Settings
                                </a>

                                <a className="dropdown-item" onClick={handleLogout}>
                                    <i className="ti-power-off text-primary"></i>
                                    Logout
                                </a>

                            </div>
                        </li>
                        <li className="nav-item nav-settings d-none d-lg-flex">
                            <div className="nav-link" >
                                <i className="icon-ellipsis"></i>
                            </div>
                        </li>
                    </ul>
                    <button
                        className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                        type="button"
                        onClick={menuToggle}
                    >
                        <span className="icon-menu"></span>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default TopNav;
