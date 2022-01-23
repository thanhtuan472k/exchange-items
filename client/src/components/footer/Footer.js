import React from 'react'
import Facebook from '../../icons/facebook.svg';
import Dribble from '../../icons/dribbble.svg';
import Linkedin from '../../icons/linkedin.svg';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>Giới thiệu</h6>
                        <p className="text-justify text-white">
                            chodocuute.com <i>CAM KẾT THỨC HIỆN TRONG THỜI GIAN NHANH NHẤT </i> Chúng em luôn luôn tận
                            dụng những gì mình có thể dùng lại được,.. Có thể là những đồ dùng cũ còn dùng tốt, có thể
                            là tài liệu của các bạn khóa trước,... và rất nhiều món đồ cũ khác. Điều đặt biệt là nó vẫn
                            dùng tốt và có thể sử dụng nhiều lần nữa, trong khi giá thành có thể rẻ hơn với thị trường.
                        </p>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Danh mục</h6>
                        <ul className="footer-links">
                            <li>
                                <a href="http://scanfcode.com/category/c-language/">Đồ điện tử</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/front-end-development/">Sách cũ</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/back-end-development/">Tài liệu - Giáo Trình</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/category/java-programming-language/">
                                    Đồ gia dụng - Nội thất
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Kết nối</h6>
                        <ul className="footer-links">
                            <li>
                                <a href="http://scanfcode.com/about/">About Us</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/contact/">Contact Us</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="http://scanfcode.com/sitemap/">Sitemap</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <hr> */}
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">
                            Copyright &copy; 2022 All Rights Reserved by
                            <a href="google.com">Tuan</a>.
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li>
                                <a href="https://facebook.com">
                                    <img src={Facebook} alt="menu-icon" width="40" height="40" />
                                </a>
                            </li>
                            <li>
                                <a href="https://dribbble.com/">
                                    <img src={Dribble} alt="menu-icon" width="40" height="40" />
                                </a>
                            </li>
                            <li>
                                <a href="https://gb.linkedin.com/">
                                    <img src={Linkedin} alt="menu-icon" width="40" height="40" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
