import axios from 'axios';
import React, { useContext } from 'react';
import Location from '../../../../icons/location.svg';
import PostCardButton from './PostCardButton';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalState } from '../../../../globalState';
import { formatPriceVN } from '../format/common';
import moment from 'moment';

export default function PostItem({ post, token, callback, setCallback }) {
    const state = useContext(GlobalState);
    const [adCallback, setAdCallback] = state.adAPI.adCallback;

    const deletePost = async () => {
        try {
            const delImage = await axios.post(
                '/api/delete',
                { public_id: post.image.public_id },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log('image deleted');
            const delPost = await axios.delete('/api/posts/' + post._id, {
                headers: {
                    Authorization: token,
                },
            });
            console.log('post deleted');
            setCallback(!callback);
            setAdCallback(!adCallback);
            toast.success('Xóa bài đăng thành công', {
                style: {
                    borderRadius: '0px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    return (
        <div className="product_card">
            <div>
                <Toaster />
            </div>
            <div className="product_card_head">
                <div class="ratio ratio-1x1">
                    <img src={post.image.url} alt="" className="product-img" />
                </div>
                <div className="product_box">
                    <h3>{post.title}</h3>
                    <span>{formatPriceVN(post.price)}</span>
                    <div className="seller">
                        <p>
                            {post.seller_name}, {post.student_class}-{post.major}
                        </p>
                        <p>
                            <img src={Location} alt="menu-icon" width="9" height="9" className="location-icon" />{' '}
                            {post.address}
                        </p>
                        <p>
                           {moment(post.createdAt).startOf('minute').fromNow()}
                        </p>
                    </div>
                </div>
            </div>
            <PostCardButton post={post} deletePost={deletePost} />
        </div>
    );
}
