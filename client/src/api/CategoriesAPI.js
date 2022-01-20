import { useState, useEffect } from 'react';
import axios from 'axios';

function CategoriesAPI() {
    const [categories, setCategories] = useState([]);
    const [callcack, setCallback] = useState(false);

    const getCategories = async () => {
        const res = await axios.get('/api/category');
        setCategories(res.data);
    };
    useEffect(() => {
        getCategories();
    }, [callcack]);

    return {
        categories: [categories, setCategories],
        callback: [callcack, setCallback],
    };
}

export default CategoriesAPI;
