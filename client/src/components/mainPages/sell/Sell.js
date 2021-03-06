import React, { useState, useEffect, useContext } from "react";
import path from "path";
import axios from "axios";
import { GlobalState } from "../../../globalState";
import Loading from "../utils/loading/Loading";
import Cross from "../../../icons/cross.svg";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from "react-toast-notifications";

const initialState = {
  title: "",
  price: 0,
  description: "",
  category: "",
};

function SellApp() {
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;
  const [categories] = state.categoriesAPI.categories;
  const [post, setPost] = useState(initialState);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const [posts] = state.postsAPI.posts;
  const [edit, setEdit] = useState(false);
  const [callback, setCallback] = state.postsAPI.callback;
  const [adCallback, setAdCallback] = state.adAPI.adCallback;
  const param = useParams();
  const history = useHistory();
  const { addToast } = useToasts();

  //
  const toastify = (message, type) => {
     if (type == "success"){
       addToast(message, {
         appearance: "success",
         autoDismiss: true,
       });
     }else if (type == "error"){
       addToast(message, {
         appearance: "error",
         autoDismiss: true,
       });
     }
  };

  useEffect(() => {
    if (param.id) {
      setEdit(true);
      posts.forEach((post) => {
          if (post._id === param.id) {
              setPost(post);
              setImage(post.image);
          }
      });
    } else {
      setEdit(false);
      setPost(initialState);
      setImage(false);
    }
  }, [param.id, posts]);

  //upload handler
  const handleUpload = async (e) => {
    console.log("upload function");
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let supportedType = [".jpg", ".png", ".jpeg"];
      let fileType = path.extname(file.name);

      if (!file)
        return toast.error("Kh??ng t??m th???y file ???nh", {
          style: {
            borderRadius: "0px",
            background: "#333",
            color: "#fff",
          },
        });

      if (file.size > 1024 * 1024 * 5)
        return toast.error("File ???nh qu?? l???n", {
          style: {
            borderRadius: "0px",
            background: "#333",
            color: "#fff",
          },
        });

      if (!supportedType.includes(fileType))
        return toast.error("Kh??ng h??? tr??? ?????nh d???ng n??y", {
          style: {
            borderRadius: "0px",
            background: "#333",
            color: "#fff",
          },
        });

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImage(res.data);
      console.log("image uploaded");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  //image delete handler
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/delete",
        { public_id: image.public_id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data.message);
      setLoading(false);
      setImage(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  //onchange handler
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPost({ ...post, [name]: value });
  };

  //submit handler
  const handleSubmit = async (e) => {
    let message = null;
    e.preventDefault();
    try {
      if (!image)
        return toastify("Ch??a th??m ???nh m?? t???", "error");
      // return toastNotification("please attach image", "error");
      if (edit) {
        const res = await axios.put(
          `/api/posts/${post._id}`,
          {
            ...post,
            image,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        message = res.data.message;
      } else {
        const res = await axios.post(
          "/api/posts",
          {
            ...post,
            seller_id: user._id, // doi seller_id thanh objectId c???a mongoose
            seller_name: user.name,
            student_class: user.student_class,
            major: user.major,
            phone: user.phone,
            address: user.address,
            image,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(res.data.message);
        // const addCategory = await axios.post(
        //   "/api/category",
        //   { name: product.category },
        //   {
        //     headers: {
        //       Authorization: token,
        //     },
        //   }
        // );
        // console.log(addCategory.data.message);
        // message = res.data.message;
      }
      setImage(false);
      setPost(initialState);
      setCallback(!callback);
      setAdCallback(!adCallback);
      toastify("????ng b??i th??nh c??ng", "success");
      window.location.href = '/';
      if(edit){
        history.push("/sell");
      }
      
      // history.push("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  return (
      <div className="sell_body">
          <div className="sell_product">
              <div>
                  <form onSubmit={handleSubmit}>
                      <div>
                          <h2>&bull; Th??m m???i b??i ????ng &bull;</h2>
                          <div className="underline"></div>
                      </div>
                      {/* <div className="row">
              <label htmlFor="product_id">product id</label>
              <input
                type="text"
                name="product_id"
                id="product_id"
                value={product.product_id}
                onChange={handleChange}
                disabled={edit}
              />
            </div> */}
                      <div className="row">
                          <label htmlFor="title">Ti??u ?????</label>
                          <input type="text" name="title" id="title" value={post.title} onChange={handleChange} />
                      </div>
                      <div className="row">
                          <label htmlFor="price">Gi??</label>
                          <input type="number" name="price" id="price" value={post.price} onChange={handleChange} />
                      </div>
                      <div className="row">
                          <label htmlFor="description">M?? t??? chi ti???t</label>
                          <textarea
                              type="text"
                              name="description"
                              id="description"
                              rows="5"
                              value={post.description}
                              onChange={handleChange}
                          />
                      </div>
                      <div className="row">
                          <label htmlFor="category">Ch???n danh m???c</label>
                          {/* <input
                type="text"
                name="category"
                id="category"
                value={product.category}
                onChange={handleChange}
              /> */}
                          <select name="category" id="category" value={post.category} onChange={handleChange} required>
                              <option value="">Ch???n danh m???c b??i ????ng</option>
                              {categories.map((category) => {
                                  return (
                                      <option value={category.category} key={category._id}>
                                          {category.name}
                                      </option>
                                  );
                              })}
                          </select>
                      </div>
                      <div className="upload">
                          <input type="file" name="file" id="file_upload" onChange={handleUpload} />
                          {loading ? (
                              <div className="file_img">
                                  <Loading />
                              </div>
                          ) : (
                              <div className="file_img" style={styleUpload}>
                                  <img src={image ? image.url : ''} alt="" />
                                  <span onClick={handleDelete}>
                                      <img src={Cross} alt="" />
                                  </span>
                              </div>
                          )}
                      </div>
                      {/* <div className="row">
                          <label htmlFor="condition">condition</label>
                          <input
                              type="number"
                              name="condition"
                              id="condition"
                              value={product.condition}
                              onChange={handleChange}
                          />
                      </div> */}
                      <div className="seller_desc">
                          <h2>&bull; Th??ng tin ng?????i ????ng&bull;</h2>
                          <div className="underline"></div>
                          <div>
                              <h4 className="h4">T??n - L???p Sinh Ho???t</h4>
                              <span>
                                  {user.name}, {user.student_class}-{user.major}
                              </span>
                          </div>
                          <div>
                              <h4 className="h4">?????a ch???</h4>
                              <span>{user.address}</span>
                          </div>
                          <div>
                              <h4 className="h4">S??T</h4>
                              <span>{user.phone}</span>
                          </div>
                      </div>
                      <button type="submit">
                          <span>{edit ? 'C???p nh???t' : '????ng b??i'}</span>
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default function Sell() {
  return (
    <ToastProvider >
      <SellApp />
    </ToastProvider>
  );
}
