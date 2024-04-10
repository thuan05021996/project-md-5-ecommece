import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";

import {
  UserOutlined,
  BarsOutlined,
  ProfileOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Adminbill() {
  const [listBill, setListBill] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const getListBill = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/bill");
      setListBill(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListBill();
  }, [flag]);

//   phê duyệt
const handleUpdate = async (item : any) => {
    try {
        const res = await axios.put(`http://localhost:3000/api/v1/bill/${item.id}`)
        // alert("Đã duyệt đơn hàng")
        // setFlag(!flag)
    } catch (error) {
        console.log(error)
    }
}
  // console.log(listBill,"listBill");
  return (
    <div>
      <h1 style={{ padding: "0 50px", textAlign: "center" }}>
        Quản lý Danh sách Bill
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
              onClick={() => {
                navigate("/login");
                localStorage.removeItem("userLogin");
              }}
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
              <td style={{ width: "40%" }}>Mã đơn hàng</td>
              <td style={{ width: "40%" }}>Tên người Nhận</td>

              <td style={{ width: "20%" }}>Trạng thái</td>

              <td>Hành động</td>
            </tr>
          {
            listBill.map((item :any,index)=> {
                return   <tr key={index}>
                <th> {index + 1}</th>
                <th>{item.id *977622}</th>
                <th>{item.nameBill}</th>
  
                <th style={
                    
                    {color : item.status === "Huỷ" ? "red" : "green"}
                }
                >
                  {item.status}
                </th>
                <th>
                  <button
                    //   onClick={()=>handleDelete(item.cateloryId)}
                       onClick={()=>handleUpdate(item)}
                    style={{
                      backgroundColor: "rgb(0,101,69)",
                      color: "white",
                      padding: "7px 20px",
                      borderRadius: "5px",
                      border: "none",
                      marginTop: "-1px",
                    }}
                  >
                    Phê Duyệt
                  </button>
                </th>
              </tr>
            })
          }
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
