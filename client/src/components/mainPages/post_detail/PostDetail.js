import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../globalState";
import Star from "../../../icons/star.svg";
import PostItem from "../utils/post_item/PostItem";

export default function PostDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [posts] = state.postsAPI.posts;
  const [postDetail, setPostDetail] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
      if (params.id) {
          posts.forEach((post) => {
              if (post._id === params.id) setPostDetail(post);
          });
      }
  }, [params.id, posts]);
  if (postDetail.length === 0) return null;
  return (
      <>
          <div className="product">
              <div className="detail">
                  <img src={postDetail.image.url} alt="" />
                  <div className="box-detail">
                      <div className="row">
                          <h2>{postDetail.title}</h2>
                          {/* <hr /> */}
                      </div>
                      <p className="price">{postDetail.price} VNĐ</p>
                      {/* <div className="condition">
              <span>condition- </span>
              <img src={Star} alt="" />
              <div className="rating">{productDetail.condition}</div> */}
                      {/* {productDetail.condition == "good" ? } */}
                      {/* </div> */}
                      <div className="desc">
                          <span>Mô tả:</span>
                          <p>{postDetail.description}</p>
                      </div>
                      <div className="seller-detail">
                          <p>
                              <span>Đăng bởi:</span> {postDetail.seller_name}
                              {/* ,{" "}
                {productDetail.student_class}-{productDetail.major} */}
                          </p>
                          <p>
                              <span>Địa điểm:</span> {postDetail.address}
                          </p>
                          <p>
                              <span>Số điện thoại:</span> {postDetail.phone}
                          </p>
                          <p>
                              <span>Thời gian đăng</span> {postDetail.createdAt}
                          </p>
                      </div>
                      <Link to={`/chat/${postDetail.seller_id}`} className="chat-seller">
                          Liên Hệ
                      </Link>
                      {/* Link to report */}
                      <Link to={`/chat/${postDetail.seller_id}`} className="chat-seller">
                          Report
                      </Link>
                  </div>
              </div>
          </div>
          <div className="related-products">
              <h2>Các món đồ tương tự</h2>
              <div className="products">
                  {posts.map((post) => {
                      return post.category === postDetail.category ? (
                          <PostItem key={post._id} post={post} />
                      ) : null;
                  })}
              </div>
          </div>
      </>
  );
}
