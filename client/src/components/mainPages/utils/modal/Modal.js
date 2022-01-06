import React from 'react'
import Delete from './delete.png'
import './Modal.css'

export default function Modal({open, onClose, deletePost}) {
    if(!open) return null;
    return (
      <>
        <div className="overlay"></div>
        <div className="modal" >
          <img src={Delete} alt="" />
          <h3 style={{fontFamily: "Poppins"}}>
            Bạn muốn xóa bài đăng này?
          </h3>
          <div className="button">
            <button onClick={onClose}>Hủy</button>
            <button className="delete" onClick={() => {
              onClose()
              deletePost();
            }}>Xóa</button>
          </div>
        </div>
      </>
    );
}
