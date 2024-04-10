import React, { useEffect, useState } from "react";
import "./Productdetails.scss";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { Button, message } from "antd";
import { Card } from "antd";
import { Rate } from "antd";
import { useParams } from "react-router-dom";
import publicAxios from "../../config/pulic.axios";
import { red } from "@mui/material/colors";
import { set } from "firebase/database";

const { Meta } = Card;

export default function ProductDetails() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // console.log(user)

  const [projectDetail, setProjectDetail] = useState<any>([]);
  const [productBycate, setProductBycate] = useState<any>([]);
  const [coment, setComent] = useState<any>();
  const [rating, setRating] = useState<any>();
  const [listCmtByProduct, setListCmtByProduct] = useState<any>([]);
  const [avgRating, setAvgRating] = useState<any>();
  const [edit,setEdit] = useState(false)
  const [idcmt,setIdCmt] = useState<any>()
  const [flag,setflag] = useState(false)

  // console.log(coment, "123");
  // console.log(rating, "123");

  const getProductDetails = async () => {
    try {
      const res = await publicAxios.get(`/api/v1/project-details/${id}`);
      setProjectDetail(res.data.results);
      setProductBycate(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  const getListCmTbyProduct = async () => {
    try {
      const res = await publicAxios.get(`/api/v1/comment/list/${id}`);
      // console.log(res)
      setListCmtByProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAvgRating = async () => {
    try {
      const res = await publicAxios.get(`/api/v1/comment/ratingavg/${id}`);
      // console.log(res,"đây là aveg")
      setAvgRating(res.data.rating);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
    getListCmTbyProduct();
    getAvgRating();
  }, [flag]);
  // console.log(avgRating);

  // comtent adđ
  const addComment = async () => {
    if(!user.id){
      message.error("Vui lòng đăng nhập để bình luận", 3);
      return
    }
    if (coment && rating) {
      const comment = {
        comment: coment,
        rating: rating,
        user: user.id,
        projectDetails: id,
      };
      try {
        const res = await publicAxios.post(`/api/v1/comment`, comment);
        message.success("Đã thêm đánh giá của bạn", 3);
        setflag(!flag);
        setComent('');
        setRating(0)
        // console.log(res)
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Vui lòng điền đầy đủ thông tin", 3);
    }
  };

  //  cmt sửa
  const handleUpdateCMT = async (cmt: any) =>{
    console.log(cmt)
    setComent(cmt.content)
    setRating(+cmt.rating)
    setIdCmt(cmt.id)
    setEdit(true)
  }
  // console.log(idcmt)
  const handleUpdate = async () =>{
    try {
      await publicAxios.put(`/api/v1/comment/${idcmt}`, {
        comment: coment,
        rating: rating
      })
      setflag(!flag)
      setEdit(false)
      message.success("Đã cập nhật đánh giá", 3)
      setComent('')
      setRating(0)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteCMT = async (id: any) =>{
    try {
      await publicAxios.delete(`/api/v1/comment/${id}`)
      setflag(!flag)
      message.success("Đã xóa đánh giá", 3)
    } catch (error) {
      console.log(error)
    }
  }
// mua hang
const handleBuy = async (item : any) => {
  console.log(item)
  if(!user.id){
    message.error("Vui lòng đăng nhập để mua hàng",2)
    return
  }
  try {
    const newCart = {
      user_id : user.id,
      product_id : item.product.id,
      
    }
   const res =  await publicAxios.post("/api/v1/cart", newCart)
    message.success(res.data.mesage,2)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div>
      <Header></Header>
      <div style={{ width: "100%", backgroundColor: "rgb(248,248,252)" }}>
        {projectDetail.map((item: any) => (
          <div style={{ padding: "0 100px" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "gray",
              }}
            >
              Trang chủ/{item.product.name}
              {/* {item.productsName} */}
            </p>
            <div className="product-details">
              <div style={{ display: "flex", gap: "20px" }} className="details">
                <div style={{ width: "30%", height: "400px", padding: "30px" }}>
                  <img
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                    src={item.img.url}
                    alt=""
                  />
                  <p style={{ marginTop: "20px", fontWeight: "bold" }}>
                    ĐÁNH GIÁ TRUNG BÌNH :{" "}
                  </p>
                  <Rate value={avgRating} />
                </div>
                <div style={{ width: "50%", padding: "10px" }}>
                  <div>
                    <p
                      style={{
                        fontSize: "26px",
                        fontWeight: "bold",
                        marginBottom: "30px",
                      }}
                    >
                      Tên sản phẩm : {item.product.name}
                    </p>
                    <p>Thương hiệu : {item.product.orgin}</p>
                    <p>Gia bán : {item.price} đ</p>
                    <p>Khối lượng : {item.mass.size} kg</p>
                    <p style={{ fontWeight: "bold" }}> Mô tả sản phẩm : </p>
                    <p>{item.product.descripstion}</p>
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid rgb(0,101,69)",
                      paddingTop: "20px",
                    }}
                  >
                    <Button
                      onClick={() => handleBuy(item)}
                      style={{
                        backgroundColor: "rgb(0,101,69)",
                        borderColor: "rgb(0,101,69)",
                        color: "white",
                        width: "230px",
                        height: "50px",
                      }}
                    >
                      Mua
                    </Button>
                    <Button
                      onClick={() => handleBuy(item)}

                      style={{
                        color: "rgb(0,101,69)",
                        borderColor: "rgb(0,101,69)",
                        width: "230px",
                        marginLeft: "10px",
                        height: "50px",
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </div>
              </div>
              <div className="div2">
                <div className="div3">
                  <div className="div3_1">
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                      src="https://storage.googleapis.com/teko-gae.appspot.com/media/image/2021/12/3/20211203_f6358030-aafe-477b-8553-dae5fddca5c7.png"
                      alt=""
                    />
                    <p
                      style={{
                        marginLeft: "10px",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Sói Biển
                    </p>
                    {/* <CheckOutlined /> */}
                  </div>
                </div>
                <div className="div4" style={{ padding: "20px" }}>
                  <div>
                    <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Chính sách giao hàng{" "}
                    </p>
                    <p>
                      <i
                        style={{
                          color: "rgb(0,101,69)",
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                        className="fa-solid fa-shield-halved"
                      ></i>
                      Thực phẩm an toàn
                    </p>
                    <p>
                      <img
                        style={{ marginRight: "10px" }}
                        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e %3cpath fill='%23006545' d='M16.112 13.458v-3.019L12.982 12v3.337l3.13-1.878zm-3.692-2.43l3-1.495-3.84-1.926-3 1.496 3.84 1.925zm-.56 4.392V12l-3.972-1.99v3.42l3.972 1.99zm5.317-6.14c.038.075.047.16.057.234v4.261c0 .197-.103.384-.272.486l-4.252 2.542c-.159.103-.364.113-.533.029L7.075 14.28c-.187-.093-.309-.29-.309-.505V9.093c.01-.084.019-.159.056-.243.01-.009.02-.009.02-.018.018-.02.027-.038.046-.056.037-.057.093-.103.159-.14.009-.01.018-.029.028-.029l4.252-2.13c.159-.075.336-.075.495 0l5.103 2.55.028.029c.066.037.122.084.159.15l.047.046c0 .01.01.019.018.028zm-13.26 8.908l-.408 2.14c-.069.354-.41.587-.766.519-.355-.067-.588-.41-.52-.765l.723-3.785c.066-.343.389-.573.735-.525l3.955.56c.358.051.607.383.557.741-.052.357-.383.607-.74.555l-2.586-.366c1.56 2.307 4.208 3.737 7.133 3.737 4.78 0 8.692-3.912 8.692-8.691 0-.361.293-.654.654-.654.361 0 .654.293.654.654 0 5.502-4.498 10-10 10-3.281 0-6.267-1.57-8.083-4.12zM20.083 5.12l.408-2.14c.069-.355.41-.587.766-.52.355.068.588.411.52.766l-.723 3.784c-.065.343-.389.574-.735.525l-3.955-.56c-.358-.05-.607-.383-.557-.74.052-.357.383-.607.74-.556l2.586.367C17.573 3.738 14.925 2.308 12 2.308 7.22 2.308 3.308 6.221 3.308 11c0 .36-.292.654-.654.654-.361 0-.654-.293-.654-.654C2 5.498 6.498 1 12 1c3.281 0 6.267 1.57 8.083 4.12z'/%3e%3c/svg%3e"
                        alt=""
                      />
                      Miễn phí đổi trả tới 72h
                    </p>
                    <p>
                      <img
                        style={{ marginRight: "10px" }}
                        src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'> <path fill='%23006545' d='M12.822 16.756h-.777c-.362 0-.654-.293-.654-.654V5.308H2.654c-.361 0-.654-.292-.654-.654C2 4.293 2.293 4 2.654 4h9.39c.362 0 .655.293.655.654v2.208h5.07c.3 0 .561.204.634.495l.643 2.57 2.592 1.297c.222.11.362.337.362.585v4.293c0 .361-.293.654-.654.654h-2.924v.061c0 1.547-1.253 2.8-2.8 2.8s-2.8-1.253-2.8-2.8v-.061zm1.388-.424c-.052.152-.08.315-.08.485 0 .824.668 1.492 1.492 1.492s1.492-.668 1.492-1.492c0-.17-.028-.333-.08-.485l-.01-.025c-.208-.573-.757-.982-1.402-.982-.645 0-1.194.41-1.403.982-.003.009-.005.017-.009.025zm-1.031-.885c.48-.853 1.394-1.43 2.443-1.43 1.05 0 1.964.577 2.443 1.43h2.627v-3.234l-2.5-1.25c-.171-.085-.296-.241-.343-.426l-.591-2.367h-4.56v7.277h.48zm-3.996-4.292c.361 0 .654.293.654.654 0 .361-.293.654-.654.654H5.248c-.362 0-.654-.293-.654-.654 0-.361.292-.654.654-.654h3.935zm0 3.577c.361 0 .654.293.654.654 0 .362-.293.654-.654.654h-.984c-.361 0-.654-.292-.654-.654 0-.361.293-.654.654-.654h.984zM3.28 8.886c-.361 0-.654-.293-.654-.654 0-.362.293-.655.654-.655h5.903c.361 0 .654.293.654.655 0 .36-.293.654-.654.654H3.28zm12.28.776v.777h.778c.36 0 .654.293.654.654 0 .362-.293.655-.654.655h-1.431c-.362 0-.655-.293-.655-.655v-1.43c0-.362.293-.655.655-.655.36 0 .654.293.654.654z'/></svg>"
                        alt=""
                      />
                      Giao hàng tận nơi
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ width: "auto", height: "auto" }}
              className="products_jion"
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  padding: "30px",
                  borderBottom: "1px solid rgb(0,101,69)",
                }}
              >
                Bình luận
              </div>
              <div style={{ padding: "30px", display: "flex", gap: "10px" }}>
                <div>
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    src={user.photo}
                  />
                </div>
                <div
                  style={{
                    borderBottom: "1px solid rgb(0,101,69)",
                    // width: "1200px",
                    height: "150px",
                  }}
                >
                  {/* <p>Tên người dùng</p> */}
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {" "}
                    @{user.name}
                  </p>
                  <input
                    onChange={(e) => setComent(e.target.value)}
                    value={coment}
                    placeholder="Thêm bình luận ...."
                    style={{
                      width: "1160px",
                      height: "30px",
                      borderBottom: "1px solid rgb(0,101,69)",
                      outline: "none",
                      // borderRadius: "5px",
                      border: "none",
                      paddingLeft: "10px",
                    }}
                    type="text"
                    name=""
                    id=""
                  />
                  
                  <Rate
                  // defaultValue={10}  
                   onChange={(value: number) => setRating(value)}></Rate>
               {edit ? <button   
               onClick={handleUpdate}
               style={{
                      color: "WHITE",
                      border: "1px solid rgb(0,101,69)",
                      backgroundColor: "rgb(0,101,69)",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      // marginRight: "-100px",
                    }}> Cập nhật </button> :    <button
                    onClick={addComment}
                    style={{
                      color: "WHITE",
                      border: "1px solid rgb(0,101,69)",
                      backgroundColor: "rgb(0,101,69)",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      // marginRight: "-100px",
                    }}
                  >
                    Xác nhận
                  </button>}
                </div>
              </div>

              {listCmtByProduct.map((item: any) => {
                return (
                  <div
                    style={{ padding: "30px", display: "flex", gap: "10px" }}
                  >
                    <div>
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        src={item.user.photo}
                      />
                    </div>
                    <div
                      className="cmt"
                      style={{
                        marginTop: "-10px",
                        height: "150px",
                        borderBottom: "1px solid rgb(0,101,69)",
                        width: "1160px",
                      }}
                    >
                      <p style={{ fontWeight: "bold" }}>{item.user.email}</p>
                      <p style={{ fontFamily: "Roboto" }}>
                        {item.content}
                        {/* nôi dung */}
                      </p>

                      <Rate value={item.rating} ></Rate>
                      {user.name === item.user.name ? (
                        <div className="update_cmt">
                          <button
                          onClick={()=>handleUpdateCMT(item)}
                            style={{
                              marginRight: "10px",
                              color: "rgb(0,101,69)",
                              border: "1px solid rgb(0,101,69)",
                            }}
                          >
                            sửa
                          </button>
                          <button
                          onClick={()=>handleDeleteCMT(item.id)}
                          >xoá</button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="products_jion">
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  padding: "30px",
                  borderBottom: "1px solid rgb(0,101,69)",
                }}
              >
                Các sản phẩm liên quan
              </div>
              <div style={{ padding: "1px" }} className="products_jion_item">
                {productBycate.map((item: any) => (
                  <Card
                    hoverable
                    style={{ width: 215, borderRadius: "none " }}
                    cover={
                      <img
                        style={{ height: "200px" }}
                        alt="example"
                        className="hover-image"
                        src={item.img.url}
                      />
                    }
                  >
                    <Meta
                      title={item.product.name}
                      description={`Giá : ${item.price} đ`}
                    />
                    <Button
                      style={{
                        color: "rgb(0,101,69)",
                        borderColor: "rgb(0,101,69)",
                        marginTop: "10px",
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}
