import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(false);
    const [callback, setCallback] = useState(false);


    // Get user
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios('/user/info', {
                        headers: {
                            Authorization: token,
                        },
                    });
                    setIsLogged(true);
                    if (res.data.role === 1) {
                        setIsAdmin(true);
                    }
                    setUser(res.data);
                    console.log(res.data);
                } catch (error) {
                    console.log('here login');
                    alert(error.response.data.message);
                }
            };
            getUser();
        }
    }, [token, isAdmin, isLogged]);

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        user: [user, setUser],
        callback: [callback, setCallback]
    };
}
