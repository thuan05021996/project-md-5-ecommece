import React from "react";
import { Avatar, Space, Popover, message } from "antd";
import "./Header.scss";
import {
  SearchOutlined,
  BellOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Button, Modal } from "antd";
import axios from "axios";
import {
  UserOutlined,
  ProfileOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import publicAxios from "../../config/pulic.axios";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [thongbao12,setthongbao] = useState([])

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user,"11")
  const navigate = useNavigate();

  // phần modal search
  //  console.log(valueSearch)
  socket.on('productDiscount', (product) => {
    // console.log('Có sản phẩm đang giảm giá:', product);
    setthongbao(product)
    message.success(`${product.message}`,4)
    // Hiển thị thông báo giảm giá cho người dùng
    // Bạn có thể sử dụng một thư viện UI hoặc custom notification để hiển thị thông báo
  });

  const showModal = async () => {
    setIsModalOpen(true);
    try {
      const res = await publicAxios.get(
        `/api/v1/project-details/search?name1=${valueSearch}`
      );
      setResultSearch(res.data);
      setValueSearch("");
      // setResultSearch(res.data.result)
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(resultSearch,"đây là dữ liệu trong search")
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const content = (
    <div
      className="content"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Link style={{ color: "black" }} to={"/infor"}>
        <UserOutlined
          // onClick={() => navigate("/infousser")}
          style={{
            paddingLeft: "2px",
            paddingRight: "5px",
            color: "rgb(0,101,69)",
            fontSize: "20px",
          }}
        />
        Thông tin Người dùng
      </Link>
      <p onClick={() => navigate("/mybill")}>
        <ProfileOutlined
          style={{
            paddingLeft: "2px",
            paddingRight: "5px",
            color: "rgb(0,101,69)",
            fontSize: "20px",
          }}
        />
        Đơn hàng
      </p>
      <Link
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.reload();
        }}
        style={{ color: "black" }}
        to={"/login"}
      >
        {" "}
        <MenuUnfoldOutlined
          style={{
            paddingLeft: "2px",
            paddingRight: "5px",
            color: "rgb(0,101,69)",
            fontSize: "20px",
          }}
        />
        Log out
      </Link>
    </div>
  );
console.log(thongbao12)
// if(thongbao12){
//   message.success(thongbao12[0].message)
// }
  const thongbao = (
    <div
      className="content"
      style={{ display: "flex", flexDirection: "column" }}
    >

      {/* {thongbao12.map((item) =>  (
        <p>{item}</p>
      )
     
      )} */}
    </div>
  )
  return (
    <div>
      <div>
        <img
          style={{}}
          className="banner"
          src="https://lh3.googleusercontent.com/sTksPOLEngjPOEdmH_3FTaiKw8bi-efXQYD7_uwvxkSHGG1N3MmYw2qFooPNyW9PQyq3tPj0kcyMFziF5FtGZB_ZVnOHRmQ=rw-w1920"
          alt=""
        />
      </div>
      <nav className="nav1">
        <div className="nav_div1">
          <div className="nav_div2">
            <a>
              <div className="nav_div2_a1">Hệ thống cửa hàng</div>
            </a>
            <a>
              <div className="nav_div2_a2">Chính sách giao hàng</div>
            </a>
            <a>
              <div className="nav_div2_a3">Chính sách đổi trả</div>
            </a>
            <a>
              <div className="nav_div2_a4">Gọi mua hàng : 190003621</div>
            </a>
          </div>
        </div>
      </nav>
      <header>
        <div className="header_div1">
          <div className="header_div1_1">
            <div>
              <img
                onClick={() => navigate("/")}
                src="https://lh3.googleusercontent.com/ajfticE-0fQOYj7romY_LkaHdDynfR1QPdSflu74y3FSwy8EqlNqRsrCF4twLcM5twlX6wVRi4d3bOapQjpRWdW8rBFix_Rd=rw-w158"
                alt=""
              />
            </div>
            <div className="header_div1_1_2"
            onClick={() => navigate("/list")}>
              Danh mục sản phẩm
              <div className="header_dropdown">
                <ul>
                  <li>
                    <div>
                      <img src="https://lh3.googleusercontent.com/mNpYaJvcZl3Oi5yXBybdSOCs503hZSkF1iVGmXqM-PVvaPR2U0-dPvGM1HU-LfjBa9zJborLMFH2Pl4C-2NOL5aGJ8ifqf1s"></img>
                    </div>
                    <div>Độc quyền tại sói biển</div>
                  </li>
                  <li>
                    <div>
                      <img src="https://lh3.googleusercontent.com/ivkBmyPkYA_n8meVJZErFP7f1OW_C3VSmybpNIx_3D9rllq_xNXlKNwv1057Dpg6da1ewOR_gV8ZG62A7ExWlbmp-cLKCG_4qQ"></img>
                    </div>
                    <div>Deal sock mỗi ngày</div>
                  </li>
                  <li>
                    <div>
                      <img src="https://lh3.googleusercontent.com/KkVy1ZEa-cDXAIJ18rgwaIzJRJ-O-6vjVQFnqhjRcev1ZvDJQUReBoJpMbtj2rMWMLcZzKSzYaIgtDKZ4ekj9A200VKD6ImR"></img>
                    </div>
                    <div>Rau củ quả</div>
                  </li>
                  <li>
                    <div>
                      <img src="https://lh3.googleusercontent.com/uwl2it98s3aOmiPwA25VvGw6fKCPiYDy1DW7Szhqgh79H_xRYv9zxB2ublcCzPCIK_FovuiSRtyYQiLpe9mKJRmzAa7Pa6WZRA"></img>
                    </div>
                    <div>Thịt tươi sống</div>
                  </li>
                  <li>
                    <div>
                      <img src="https://lh3.googleusercontent.com/5Dd8bolWxWh0tEtpT62IyZeugwutTQuTNAJSNQgRrAhRmCvMC_dJ1jjXKAUEHxoF10HyYXu-cLPLlFaQ1Z8aviCF11s4OpB9"></img>
                    </div>
                    <div>Hàng đông lạnh</div>
                  </li>
                  <li>
                    <div>
                      <img src="https://lh3.googleusercontent.com/dhwUTi4n9xpR7kM28yoTLgmQleKxiXZVohyvL4gLrDyM0AVX9XPx9Gh6_KmFvwHex34yh5AIvC_5cgmqawt9hZGjInjs0ug"></img>
                    </div>
                    <div>Thực phẩm khô</div>
                  </li>
                  <li>
                    <div>
                      <img src="https://lh3.googleusercontent.com/EVymB6noxcgaWo-OL7nrV2aTW0fb-9KhA0x7YNF8fFmStgSMGgtpHgKNTNnytkuSdjJzDEeMyLx-f7eHdl4Uc8O5Oo3yvpFZ"></img>
                    </div>
                    <div>Thuỷ hải sản</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="header_div1_2">
            <input
              onChange={(e) => setValueSearch(e.target.value)}
              type="text"
              placeholder="Tim kiếm sản phẩm"
            />
            <Modal
              style={{ top: "40px" }}
              centered={true}
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Có {resultSearch?.length} kết quả tìm kiếm</p>
              {resultSearch?.map((item: any) => {
                return (
                  <div
                    onClick={() => navigate(`/productdetails/${item.id}`)}
                    style={{
                      display: "flex",
                      gap: "100px",
                      borderBottom: "1px solid gray",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={item.img.url}
                      alt=""
                    />
                    <p style={{ marginTop: "50px", fontSize: "16px" }}>
                      {item.product.name}
                    </p>
                    <p style={{ marginTop: "50px", fontSize: "16px" }}>
                      {" "}
                      Giá : {item.price} đ
                    </p>
                  </div>
                );
              })}
            </Modal>
            <Button type="primary" onClick={showModal}>
              <SearchOutlined className="iconSearch" />
            </Button>
            <button></button>
          </div>
          <div className="header_div1_3">
            <div className="header_div1_3_1">
              <div className="header_div1_3_1_1">
                <Popover content={content} title="Thông tin">
                  <Space direction="vertical" size={16}>
                    <Space wrap size={16}>
                      <Avatar
                        size={40}
                        icon={
                          <img
                            style={{ width: "40px", height: "40px" }}
                            // onClick={() => navigate("/UserInformation")}
                            src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                            alt=""
                          />
                        }
                      />
                    </Space>
                  </Space>
                </Popover>
              </div>
              {user ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      color: "black",
                      fontSize: "16px",
                      marginTop: "-6px",
                    }}
                  >
                    Xin chào :
                  </p>
                  <p
                    style={{
                      color: "rgb(0,101,69)",
                      fontWeight: "bold",
                      marginTop: "-5px",
                    }}
                  >
                    {user.name}
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Link
                    to="/login"
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      marginTop: "-1px",
                      fontSize: "14px",
                    }}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to={"/register"}
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      marginTop: "6px",
                      fontSize: "14px",
                    }}
                  >
                    Đăng Ký
                  </Link>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "rgb(0,101,69)",
                }}
              ></div>
              <div
                onClick={() => navigate("/cart")}
                className="header_div1_3_3"
              >
                <ShoppingCartOutlined
                  style={{ marginTop: "-10px", color: "gray" }}
                  className="cart"
                />
                <div>
                  <p
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      marginTop: "-1px",
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    Giỏ hàng của bạn
                  </p>
                  <p
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      marginTop: "-3px",
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    (0) sản phẩm{" "}
                  </p>
                </div>
                <Popover placement="bottom" content={thongbao} title="Thông báo">

                <div>
                  <p
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      marginTop: "28px",
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    (0)   Thông báo  
                  </p>
                
                </div>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
