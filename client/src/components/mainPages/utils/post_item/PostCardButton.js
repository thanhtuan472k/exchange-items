import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../globalState";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../modal/Modal";

export default function PostCardButton({ post, deletePost }) {
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;
  const [openModal, setOpenModal] = useState(false);
  return (
      <div className="row_btn">
          {/* <div>
        <Toaster/>
      </div> */}
          {post.seller_id === user?._id ? (
              <>
                  <Link id="btn_buy" to={`/edit_post/${post._id}`}>
                      Sửa
                  </Link>
                  <Link id="btn_delete" to="#!" onClick={() => setOpenModal(true)}>
                      Xóa
                  </Link>
              </>
          ) : (
              <>
                  <Link id="btn_buy" to="#!">
                      Trao Đổi
                  </Link>
                  <Link id="btn_view" to={`/details/${post._id}`}>
                      Chi Tiết
                  </Link>
              </>
          )}
          <Modal open={openModal} deletePost={deletePost} onClose={() => setOpenModal(false)} />
      </div>
  );
}
