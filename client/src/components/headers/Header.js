import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import Cart from './icons/cart.svg';
import Menu from './icons/menu.svg';
import Down from './icons/caret-down.svg';
import './Header.css';
// import CartHover from '../mainpage/cartHover/CartHover';
import { GlobalState } from '../../globalState';

export default function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    //const [cart] = state.usersApi.cart;
    const [profile, setProfile] = useState(false);
    const [menu, setMenu] = useState(false);

    const user = state.userAPI.user[0];
    useEffect(() => {
        if (user) {
            setProfile(document.querySelector('.profile'));
        }
    }, [user]);

    useEffect(() => {
        if (profile) {
            profile.addEventListener('click', function () {
                profile.classList.toggle('active');
            });
        }
    }, [profile]);

    const logoutUser = async () => {
        await axios.get('user/logout');
        localStorage.removeItem('firstLogin');
        window.location.href = '/';
    };
    const adminRoute = () => {
        return (
            <>
                <NavLink to="/dashboard" activeClassName="nav-link--active" className="nav-link" exact>
                    Thống kê
                </NavLink>
                <NavLink to="/quan-ly-danh-muc" activeClassName="nav-link--active" className="nav-link" exact>
                    Quản lý danh mục
                </NavLink>
                <NavLink to="/quan-ly-bai-dang" activeClassName="nav-link--active" className="nav-link" exact>
                    Quản lý bài đăng
                </NavLink>
            </>
        );
    };

    const userRoute = () => {
        return (
            <>
                <img
                    src={user.avatar}
                    alt="menu"
                    className="profile-image"
                ></img>
                <div className="profile-indicator"></div>
                <NavLink
                    to="/history"
                    activeClassName="nav-link--active"
                    className="nav-link "
                    exact
                >
                    Lịch sử trao đổi
                </NavLink>
                <NavLink
                    to="/"
                    activeClassName=""
                    className="nav-link "
                    exact
                    onClick={logoutUser}
                >
                    Đăng xuất
                </NavLink>
            </>
        );
    };

    useEffect(() => {
        const menu1 = document.querySelector('.menu');
        menu1.addEventListener('click', () => {
            setMenu(true);
        });
    }, []);

    return (
        <header className="header" id="header">
            <h2>
                <Link to="/" exact="true" className="logo" style={isAdmin ? { fontSize: '20px' } : {}}>
                    Đồ cũ UTE{isAdmin ? '-Admin' : ''}
                </Link>
            </h2>
            <ul className="nav">
                <li>
                    {/* <NavLink to="/" activeClassName="nav-link--active" className="nav-link" exact>
                        Trang chủ
                    </NavLink> */}
                </li>
                {isAdmin ? adminRoute() : ''}
            </ul>
            <div className="header-right">
                <button type="button" class="btn btn-success">
                    <NavLink to="/dang-bai" activeClassName="nav-link--active" className="nav-link" exact>
                        Đăng bài
                    </NavLink>
                </button>
                <NavLink to="/bai-dang-cua-toi" activeClassName="nav-link--active" className="nav-link" exact>
                    Bài đăng của tôi
                </NavLink>

                {isLogged && user ? (
                    <>
                        <div className="menu">
                            <img className="header-menu" src={Menu}></img>
                        </div>
                        {/* <div className={menu ? 'rp-menu-child active' : 'rp-menu-child'}>
                            <div className="rp-menu-child-close" onClick={() => setMenu(false)}>
                                X
                            </div>
                            <div
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    width: '100%',
                                }}
                            >
                                <NavLink to="/history" activeClassName="nav-link--active" className="nav-link " exact>
                                    Lịch sử trao đổi
                                </NavLink>
                                <NavLink to="/my_ad" activeClassName="nav-link--active" className="nav-link" exact>
                                    Bài đăng của tôi
                                </NavLink>
                                <NavLink to="/" activeClassName="" className="nav-link " exact onClick={logoutUser}>
                                    Đăng xuất
                                </NavLink>
                            </div>
                            {isAdmin ? adminRoute() : ''}
                        </div> */}
                    </>
                ) : (
                    <>
                        <div className="menu">
                            <img className="header-menu" src={Menu}></img>
                        </div>
                        {/* <div className={menu ? 'rp-menu-child active' : 'rp-menu-child'}>
                            <div className="rp-menu-child-close" onClick={() => setMenu(false)}>
                                X
                            </div>
                            <div
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    width: '100%',
                                }}
                            >
                                <div>
                                    <NavLink to="/login" className="nav-link" activeClassName="nav-link--active">
                                        Đăng nhập
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink to="/register" className="nav-link" activeClassName="nav-link--active">
                                        Đăng ký
                                    </NavLink>
                                </div>
                            </div>
                        </div> */}
                    </>
                )}
                {isLogged && user ? (
                    <div className="profile-box">
                        <div className="profile">
                            <div className="profile-name"> Chào,{user.name}</div>
                            {/* <i className="fas fa-sort-down"></i> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-caret-down"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                            </svg>
                        </div>
                        <div className="profile-child">{userRoute()}</div>
                    </div>
                ) : (
                    <div className="menu-login-sm">
                        <div>
                            <NavLink to="/dang-nhap" className="nav-link" activeClassName="nav-link--active">
                                Đăng nhập
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/dang-ky" className="nav-link" activeClassName="nav-link--active">
                                Đăng ký
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
