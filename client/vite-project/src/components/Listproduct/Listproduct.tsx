import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import { Button } from "antd";
import "./Listproduct.scss";
import axios from "axios";
import publicAxios from "../../config/pulic.axios";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function Listproduct() {
  const [listCate, setListCate] = useState([]);
  const [products, setProducts] = useState([]);
  const [productBycate, setProductBycate] = useState([]);
  const [prudctSale, setProductSale] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const navigate = useNavigate();

  const getListCate = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/category");
      setListCate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await publicAxios.get("/api/v1/project-details");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(prudctSale);
  const getproductByCategory = async () => {
    try {
      const res = await publicAxios.get("/api/v1/project-details/category/1");
      setProductBycate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const gestproductSale = async () => {
    try {
      const res = await publicAxios.get(
        `/api/v1/project-details/filter?oderby=sale`
      );
      setProductSale(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListCate();
    getProducts();
    getproductByCategory();
    gestproductSale();
  }, []);

  const idcate = productBycate.map((item: any) => item.category.id);
  //  console.log(products);

  const handleproductByCategory = async (id: any) => {
    try {
      const res = await publicAxios.get(
        `/api/v1/project-details/category/${id}`
      );
      setProductBycate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(idcate[0])
  // đi mua hàng
  const handleBuy = async (item: any) => {
    console.log(item)
    if(!user.id){
      message.error("Vui lòng đăng nhập để mua hàng ")
      return
    }
    try {
      const newCart = {
        user_id: user.id,
        product_id: item.product.id,
      };
      const res = await publicAxios.post("/api/v1/cart", newCart);
      message.success(res.data.mesage, 2);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(productBycate);
  return (
    <div style={{ padding: "0 10%", marginTop: "20px" }}>
      <div className="products">
        <div className="cate-products">
          {listCate.map((item: any) => (
            <div
              // style={{a == item.cateloryId ? {backgroundColor : "red"} : {}}}

              //  style={{a == item.cateloryId ? {backgroundColor : "red"} : {}}}

              style={{ backgroundColor: idcate[0] == item.id ? "yellow" : "" }}
              className="cate"
            >
              <img
                onClick={() => handleproductByCategory(item.id)}
                src={item.img_category}
              ></img>
              {item.name}
            </div>
          ))}
        </div>
        <div className="render-products">
          {productBycate.slice(0, 10).map((item: any, index) => (
           <div>
            {item.product.discount < 1  ?    <div className="img_sale_1">
                <p>Tiết kiệm :</p>
                <p>{Math.floor((1 - item.product.discount) * 100)} %</p>
              </div> : null}
             <Card
              key={index}
              hoverable
              style={{ width: 230, borderRadius: "none ", height: "420px" }}
              cover={
                <img
                  onClick={() => navigate(`/productdetails/${item.id}`)}
                  style={{ height: "180px" }}
                  alt="example"
                  className="hover-image"
                  src={item.img.url}
                />
              }
            >
              <Meta title={item.product.name} />
              <p style={{ color: "gray", fontSize: "12px" }}>
                Đơn vị tính : {item.mass.size} {item.mass.name}
              </p>

              <p
                style={{
                  color: "rgb(0,101,69)",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {item.price * item.product.discount} đ
              </p>
                {item.product.discount < 1 ? 
                       <div style={{ fontSize: "16px", display: "flex", gap: "10px" }}>
                       <p
                         style={{
                           color: "gray",
                           fontSize: "14px",
                           textDecoration: "line-through",
                         }}
                       >
                         {" "}
                         {item.price} đ{" "}
                       </p>
                       <p
                         style={{
                           color: "rgb(0,101,69)",
                           fontSize: "14px",
                           fontWeight: "bold",
                         }}
                       >
                         -{Math.floor((1 - item.product.discount) * 100)} %
                       </p>
                     </div> : <div style={{ fontSize: "16px", display: "flex", gap: "10px" ,marginTop: "68px"}}> </div>
                }
              <Button
                onClick={() => handleBuy(item)}
                style={{
                  color: "rgb(0,101,69)",
                  borderColor: "rgb(0,101,69)",
                  marginTop: "10px",
                  width: "190px",
                }}
              >
                Thêm vào giỏ hàng
              </Button>
            </Card>
           </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "40px" }} className="products1">
        <div style={{ textAlign: "left" }} className="cate-products1">
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            Sản phẩm Hạ giá
          </p>
        </div>
        <div className="render-products1">
          {prudctSale.map((item: any, index) => (
            <div>
              <div className="img_sale_1">
                <p>Tiết kiệm :</p>
                <p>{Math.floor((1 - item.product.discount) * 100)} %</p>
              </div>
              <Card
                key={index}
                hoverable
                style={{ width: 230, borderRadius: "none ", height: "420px" }}
                cover={
                  <img
                    style={{ height: "180px" }}
                    alt="example"
                    className="hover-image"
                    src={item.img.url}
                  />
                }
              >
                <Meta
                  // style={{color : 'red'}}
                  title={item.product.name}
                />
                <p style={{ color: "gray", fontSize: "12px" }}>
                  Đơn vị tính : {item.mass.size} {item.mass.name}
                </p>
                <p
                  style={{
                    color: "rgb(0,101,69)",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {item.price * item.product.discount} đ
                </p>
                <div style={{ fontSize: "16px", display: "flex", gap: "10px" }}>
                  <p
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      textDecoration: "line-through",
                    }}
                  >
                    {" "}
                    {item.price} đ{" "}
                  </p>
                  <p
                    style={{
                      color: "rgb(0,101,69)",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    -{Math.floor((1 - item.product.discount) * 100)} %
                  </p>
                </div>

                <Button
                  onClick={() => handleBuy(item)}
                  style={{
                    color: "rgb(0,101,69)",
                    borderColor: "rgb(0,101,69)",
                    marginTop: "10px",
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "40px" }} className="products1">
        <div style={{ textAlign: "left" }} className="cate-products1">
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>Sản phẩm Mới</p>
        </div>
        <div className="render-products1">
          {products.slice(0, 5).map((item: any, index) => (
            <Card
              key={index}
              hoverable
              style={{ width: 230, borderRadius: "none ", height: "420px" }}
              cover={
                <img
                  onClick={() => navigate(`/productdetails/${item.id}`)}
                  //   onClick={() =>
                  //     navigate(`/ProductsDetails/${item.productsid}`)
                  //   }
                  style={{ height: "180px" }}
                  alt="example"
                  className="hover-image"
                  src={item.img.url}
                />
              }
            >
              <Meta title={item.product.name} />
              <p style={{ color: "gray", fontSize: "12px" }}>
                Đơn vị tính : {item.mass.size} {item.mass.name}
              </p>

              <p
                style={{
                  color: "rgb(0,101,69)",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {item.price * item.product.discount} đ
              </p>

              <Button
                onClick={() => handleBuy(item)}
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
  );
}
