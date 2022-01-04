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
  const [product, setProduct] = useState(initialState);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const [products] = state.productsAPI.products;
  const [edit, setEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;
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
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImage(product.image);
        }
      });
    } else {
      setEdit(false);
      setProduct(initialState);
      setImage(false);
    }
  }, [param.id, products]);

  //upload handler
  const handleUpload = async (e) => {
    console.log("upload function");
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let supportedType = [".jpg", ".png", ".jpeg"];
      let fileType = path.extname(file.name);

      if (!file)
        return toast.error("Không tìm thấy file ảnh", {
          style: {
            borderRadius: "0px",
            background: "#333",
            color: "#fff",
          },
        });

      if (file.size > 1024 * 1024 * 5)
        return toast.error("File ảnh quá lớn", {
          style: {
            borderRadius: "0px",
            background: "#333",
            color: "#fff",
          },
        });

      if (!supportedType.includes(fileType))
        return toast.error("Không hỗ trợ định dạng này", {
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
    setProduct({ ...product, [name]: value });
  };

  //submit handler
  const handleSubmit = async (e) => {
    let message = null;
    e.preventDefault();
    try {
      if (!image)
        return toastify("Chưa thêm ảnh mô tả", "error");
      // return toastNotification("please attach image", "error");
      if (edit) {
        const res = await axios.put(
          `/api/products/${product._id}`,
          {
            ...product,
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
          "/api/products",
          {
            ...product,
            seller_id: user._id, // doi seller_id thanh objectId của mongoose
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
      setProduct(initialState);
      setCallback(!callback);
      setAdCallback(!adCallback);
      toastify(message, "success");
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
                          <h2>&bull; Thêm mới bài đăng &bull;</h2>
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
                          <label htmlFor="title">Tiêu đề</label>
                          <input type="text" name="title" id="title" value={product.title} onChange={handleChange} />
                      </div>
                      <div className="row">
                          <label htmlFor="price">Giá</label>
                          <input type="number" name="price" id="price" value={product.price} onChange={handleChange} />
                      </div>
                      <div className="row">
                          <label htmlFor="description">Mô tả chi tiết</label>
                          <textarea
                              type="text"
                              name="description"
                              id="description"
                              rows="5"
                              value={product.description}
                              onChange={handleChange}
                          />
                      </div>
                      <div className="row">
                          <label htmlFor="category">Chọn danh mục</label>
                          {/* <input
                type="text"
                name="category"
                id="category"
                value={product.category}
                onChange={handleChange}
              /> */}
                          <select
                              name="category"
                              id="category"
                              value={product.category}
                              onChange={handleChange}
                              required
                          >
                              <option value="">Chọn danh mục bài đăng</option>
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
                          <h2>&bull; Thông tin người đăng&bull;</h2>
                          <div className="underline"></div>
                          <div>
                              <h4 className="h4">Tên - Lớp Sinh Hoạt</h4>
                              <span>
                                  {user.name}, {user.student_class}-{user.major}
                              </span>
                          </div>
                          <div>
                              <h4 className="h4">Địa chỉ</h4>
                              <span>{user.address}</span>
                          </div>
                          <div>
                              <h4 className="h4">SĐT</h4>
                              <span>{user.phone}</span>
                          </div>
                      </div>
                      <button type="submit">
                          <span>{edit ? 'Update' : 'Đăng bài'}</span>
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
