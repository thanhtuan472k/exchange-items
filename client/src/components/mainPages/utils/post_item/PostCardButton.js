import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../globalState';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../modal/Modal';

export default function PostCardButton({ post, deletePost }) {
    const state = useContext(GlobalState);
    const [user] = state.userAPI.user;
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="d-flex justify-content-center align-content-center pb-4">
            {/* <div>
        <Toaster/>
      </div> */}
            {post.seller_id === user?._id ? (
                <>
                    <Link className="btn btn-primary me-2" to={`/edit_post/${post._id}`}>
                        Sửa
                    </Link>
                    <Link className="btn btn-secondary me-2" to="#!" onClick={() => setOpenModal(true)}>
                        Xóa
                    </Link>
                </>
            ) : (
                <>
                    <Link to="#!" className="btn btn-primary me-2">
                        Trao Đổi
                    </Link>

                    <Link className="btn btn-secondary ms-2" to={`/details/${post._id}`}>
                        Chi Tiết
                    </Link>
                </>
            )}
            <Modal open={openModal} deletePost={deletePost} onClose={() => setOpenModal(false)} />
        </div>
    );
}
