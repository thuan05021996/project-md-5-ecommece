
import {
    UserOutlined,
    BarsOutlined,
    ProfileOutlined,
    ShopOutlined,
  } from "@ant-design/icons";
  import { Link, useNavigate } from "react-router-dom";
import Footer from '../../../components/footer/Footer';
import"../adminCate/admincate.scss"
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import React, { useEffect } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function Adminchart() {
    const [data1,setData]=React.useState([])

    const navigate = useNavigate()

    const getdata = async()=>{
        const res = await axios.get("http://localhost:3000/api/v1/bill/chart")
        setData(res.data.recentTotalBills)
    }
    useEffect(()=>{
        getdata()
    },[])
   console.log(data1)
   const options = {   
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Doanh thu 7 ngày gần nhất (vnd)',
      },
    },
  };

const labels = data1.map((item : any) => {
  const date = new Date(item.ngay);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
} ) ;
const date = labels.reverse();
// console.log("HHH",labels)
 const data = {
    labels,
    datasets: [
      {
        label: 'Ngày',
        data: data1.map((item : any) =>  item.tong_hoa_don).reverse(),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
     
    
    ],
}
  return (
    <div>
      <h1 style={{ padding: "0 50px", textAlign: "center" }}>
        Theo doi doanh thu  
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
            <Link style={{color : "black"}} to={"/adminproduct"}>
          <li>
              <BarsOutlined
                style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
              />
              Quản lý sản phẩm
            </li></Link>

           <Link style={{color : "black"}} to={"/adminuser"}>
            <li>
                <UserOutlined
                    style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
                />
                Quản lý người dùng
                </li>
           </Link>
           <Link style={{color : "black"}} to={"/admincate"}>
           <li>
              <ProfileOutlined
                style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
              />
              Quản lý danh sách sản phẩm
            </li></Link>
            <Link  style={{color : "black"}} to={"/adminbill"}>
            <li style={{ borderBottom: "1px solid rgb(0,101,69)" }}>
              <ShopOutlined
                style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
              />
              Quản lý đơn hàng
            </li></Link>
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
             
             <Bar options={options} data={data} />
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
