import React, {useContext } from "react";
import { GlobalState } from "../../../globalState";
import PostItem from "../utils/post_item/PostItem";
import Loading from "../utils/loading/Loading";

export default function MyAd() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [myAd] = state.adAPI.myAd;
  const [callback, setCallback] = state.postsAPI.callback;
  
  return (
    <>
      <div className="products">
        {myAd.map((post) => {
          return (
            <PostItem
              key={post._id}
              post={post}
              token={token}
              callback={callback}
              setCallback={setCallback}
            />
          );
        })}
        {myAd.length === 0 && <Loading />}
      </div>
    </>
  );
}
