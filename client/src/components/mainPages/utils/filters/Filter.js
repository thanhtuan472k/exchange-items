import React, { useContext } from 'react';
import { GlobalState } from '../../../../globalState';

export default function Filter() {
    const state = useContext(GlobalState);
    const [categories] = state.postsAPI.categories;
    const [category, setCategory] = state.postsAPI.category;
    const [sort, setSort] = state.postsAPI.sort;
    const [search, setSearch] = state.postsAPI.search;

    const handleClick = (e) => {
        setCategory(e.target.id);
        console.log(e.target.id);
    };

    return (
        <div className="filter">
            <div className="filter-left">
                <ul>
                    <li className="filter-category active" id="" onClick={handleClick}>
                        Tất cả
                    </li>
                    {categories.map((category) => {
                        return (
                            <li
                                className="filter-category"
                                id={'category=' + category.name}
                                key={category._id}
                                onClick={handleClick}
                            >
                                {category.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="filter-right">
                <div>
                    <input
                        className="filter-input"
                        type="text"
                        value={search}
                        placeholder="Tìm kiếm món đồ"
                        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
                    />
                </div>

                <div className="filter-lable">
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="sort=">Mới nhất</option>
                        <option value="sort=oldest">Cũ hơn</option>
                        <option value="sort=-price">Giá giảm dần</option>
                        <option value="sort=price">Giá tăng dần</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
