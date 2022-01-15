import React, { useContext } from "react";
import { GlobalState } from "../../../../globalState";

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
    <div className="filter_menu bg-dark">
      <div className="filter-row">
        <span id="" onClick={handleClick}>
          All
        </span>
        {categories.map((category) => {
          return (
            <span
              className="cat"
              id={"category=" + category.name}
              key={category._id}
              onClick={handleClick}
            >
              {category.name}
            </span>
          );
        })}
      </div>
      <div className="search-box">
        <input
          type="text"
          value={search}
          placeholder="Tìm kiếm món đồ"
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
        <div className="sort">
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
