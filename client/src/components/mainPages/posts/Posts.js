import React, { useContext } from "react";
import { GlobalState } from "../../../globalState";
import PostItem from "../utils/post_item/PostItem";
import { Container } from "../utils/loading/Loading";
import Filter from "../utils/filters/Filter";
import ImageSlider from "../utils/slider/Slider";
import { SliderData } from "../utils/slider/SliderData";
import Load from "../utils/load_more/Load";
import Modal from "../utils/modal/Modal";
import { useState } from "react";

export default function Posts() {
  const state = useContext(GlobalState);
  const [posts] = state.postsAPI.posts;
  const [token] = state.token;
  const [callback, setCallback] = state.postsAPI.callback;
  const [adCallback, setAdCallback] = state.adAPI.adCallback;
  const [loading, setloading] = state.postsAPI.loading;
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Filter />
      {/* <ImageSlider SliderData={SliderData} /> */}
      {loading ? (
        <Container />
      ) : (
        <div className="products">
          {posts.map((post) => {
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
        </div>
      )}
      {/* <Container /> */}
      <Load />
    </>
  );
}
