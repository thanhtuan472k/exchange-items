import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ToastProvider, useToasts } from 'react-toast-notifications';

function RegisterApp() {
    const { addToast } = useToasts();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        student_class: '',
        major: '',
        phone: '',
        address: '',
        gender: '',
    });

    //toast notification
    const toastify = (message, type) => {
        if (type == 'success') {
            addToast(message, {
                appearance: 'success',
                autoDismiss: true,
            });
        } else if (type == 'error') {
            addToast(message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    };

    //change handler
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    //submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/user/register', { ...user });
            console.log(res);
            localStorage.setItem('firstLogin', true);
            window.location.href = '/';
        } catch (e) {
            toastify(e.response.data.message, 'error');
        }
    };
    return (
        <div className="login-body">
            <div className="login-page">
                <h2>Đăng ký</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="input-div">
                        <input
                            type="text"
                            name="username"
                            placeholder="Nhập vào username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-div">
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập vào email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    {/* <small>
              <b className="info">i</b> Nhập email[@gmail.com]
            </small> */}
                    <div className="input-div">
                        <input
                            type="password"
                            name="password"
                            placeholder="Nhập vào password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-div">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nhập vào tên sinh viên"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-div">
                        <input
                            type="text"
                            name="student_class"
                            placeholder="Nhập vào lớp sinh hoạt"
                            value={user.student_class}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-div">
                        <input
                            type="text"
                            name="major"
                            placeholder="Nhập vào chuyên ngành học"
                            value={user.major}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-div">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Nhập vào số điện thoại"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-div">
                        <input
                            type="text"
                            name="address"
                            placeholder="Nhập vào địa chỉ"
                            value={user.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <label class="" for="">
                            Nam
                        </label>
                        <input className="" type="radio" name="gender" value="Nam" onChange={handleChange} />
                        <label class="" for="">
                            Nữ
                        </label>
                        <input type="radio" name="gender" value="Nữ" onChange={handleChange} />
                        <label class="" for="">
                            Khác
                        </label>
                        <input type="radio" name="gender" value="Khác" onChange={handleChange} />
                    </div>
                    {/* <div className="input-div"> 
            <select name="gender" id="gender">
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select> */}
                    {/* </div> */}

                    <div className="row">
                        <button type="submit">Đăng ký</button>
                        <button>
                            <Link to="/login">Đăng nhập</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Register() {
    return (
        <ToastProvider>
            <RegisterApp />
        </ToastProvider>
    );
}
