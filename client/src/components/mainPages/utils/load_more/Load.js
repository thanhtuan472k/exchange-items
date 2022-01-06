import React, { useContext } from 'react'
import { GlobalState } from '../../../../globalState';
import './Load.css'

export default function Load() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.postsAPI.page;
    const [result] = state.postsAPI.result;
    return (
        <div className="load-more">
          {result < (page * 6) ? (
            ""
          ) : (
            <button onClick={(e) => setPage(page + 1)}>Load More</button>
          )}
        </div>
    );
}
