import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import {
  UserOutlined,
  BarsOutlined,
  ProfileOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import "../adminCate/admincate.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

export default function AdminUser() {
  const [listUser, setlistUser] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  // lấy danh sach user
  const getuser = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/user");
    setlistUser(res.data);
  };
  useEffect(() => {
    // setlistUser(getuser());
    getuser();
  }, [flag]);
  console.log(listUser);

  const handleBand = async (id: number) => {
    // console.log(id)
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/user/${id}`
      );
      setFlag(!flag);
      message.success(res.data.message, 3);
    //   alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 style={{ padding: "0 50px", textAlign: "center" }}>
        Quản lý Người dùng
      </h1>
      <div style={{ padding: "0 50px", display: "flex", gap: "20px" }}>
        <div style={{ width: "20%" }}>
          <ul style={{ listStyle: "none" }}>
            <li
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
                marginTop: "-20px",
              }}
            >
              Admin
            </li>
            <Link style={{ color: "black" }} to={"/adminproduct"}>
              <li>
                <BarsOutlined
                  style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
                />
                Quản lý sản phẩm
              </li>
            </Link>

            <Link style={{ color: "black" }} to={"/adminuser"}>
              <li>
                <UserOutlined
                  style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
                />
                Quản lý người dùng
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/admincate"}>
              <li>
                <ProfileOutlined
                  style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
                />
                Quản lý danh sách sản phẩm
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/adminbill"}>
              <li style={{ borderBottom: "1px solid rgb(0,101,69)" }}>
                <ShopOutlined
                  style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
                />
                Quản lý đơn hàng
              </li>
            </Link>
            <Link  style={{color : "black"}} to={"/adminchart"}>
            <li style={{ borderBottom: "1px solid rgb(0,101,69)" }}>
              <ShopOutlined
                style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
              />
              Theo dõi doanh thu
            </li></Link>

            <li
              // onClick={LogOut}

              style={{ borderBottom: "1px solid rgb(0,101,69)" }}
            >
              <ShopOutlined
                style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
              />
              Log out
            </li>
          </ul>
        </div>
        <div
          style={{
            width: "70%",
            fontFamily: "Roboto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "20px",
              borderCollapse: "collapse",
              borderRadius: "5px",
            }}
          >
            <tr>
              <td>Stt</td>
              <td style={{ width: "40%" }}>Tên người dùng</td>
              <td style={{ width: "20%" }}>Trạng thái</td>

              <td>Hành động</td>
            </tr>

            {listUser.map((item: any, index) => (
              <tr>
                <th>{index + 1}</th>
                <th>{item.name}</th>
                <th style={{ color: item.active ? "green" : "red" }}>
                  {+item.active ? "Hoạt động" : "Bị Cấm"}
                </th>
                <th>
                  <button
                    onClick={() => handleBand(item.id)}
                    style={{
                      backgroundColor: item.active ? "red" : "green",
                      color: "white",
                      padding: "7px 20px",
                      borderRadius: "5px",
                      border: "none",
                      marginTop: "-1px",
                      width: "100px",
                    }}
                  >
                    {item.active == 1 ? "Khoá" : "Mở khoá"}
                  </button>
                </th>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
