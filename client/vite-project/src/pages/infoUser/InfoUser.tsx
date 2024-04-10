import React, { useState } from "react";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import publicAxios from "../../config/pulic.axios";
import { Button, Modal, message } from 'antd';
import axios from "axios";

export default function InfoUser() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  //   console.log(user);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<null>(null);
  const [userinfo, setuserinfo] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });
  const [edit, setEdit] = useState<boolean>(false);

  
//   console.log(userinfo)
  const navigate = useNavigate();
  const handleAddMedia = (event: any) => {
    
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    setEdit(true);
}; 

const showModal = (user : any) => {
    setuserinfo(user)
    setIsModalOpen(true);
  };
//   console.log(userinfo)
  const handleOk = async () => {
    if(!selectedMedia){
       try {
            const res = await publicAxios.put(`/api/v1/user/${user.id}`, userinfo);
            // console.log(res.data,"11111111")
            localStorage.setItem("user", JSON.stringify(res.data));
            message.success("Cập nhật thành công", 2);
       } catch (error) {
        console.log(error)  
       }
    }
    if(selectedMedia){
        const formData = new FormData();
        formData.append("file", selectedMedia);
        formData.append("upload_preset", "my-project-md3");
        const [uploadMedia] = await Promise.all([
          axios.post(
            "https://api.cloudinary.com/v1_1/dzprh8cvv/image/upload",
            formData
          ),
        ]);
        const media = uploadMedia.data.secure_url;
        const updateUser = {
          ...userinfo,
          photo: media,
        }
        try {
            const res = await publicAxios.put(`/api/v1/user/${user.id}`, updateUser);
            // console.log(res.data,"11111111")
            localStorage.setItem("user", JSON.stringify(res.data));
            message.success("Cập nhật thành công", 2);
       } catch (error) {
        console.log(error)  
       }
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

const handlinput = (event: any) => {
  const { name, value } = event.target;
  setuserinfo({ ...userinfo, [name]: value });
}
// console.log(userinfo,"1213123")
  return (
    <div>
      <Header></Header>
      <div
        className="userInformation"
        style={{
          width: "100%",
          padding: "0 10%",
          // backgroundColor: "red",
          display: "flex",
          gap: "10px",
        }}
      >
        <div style={{ width: "20%" }}>
          <ul style={{ listStyle: "none", fontFamily: "Roboto" }}>
            <li>
              <div style={{ display: "flex", gap: "10px" }}>
                <img
                  src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                  alt=""
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
                <div style={{ marginTop: "-20px" }}>
                  <p>Tài khoản của</p>
                  <p
                    style={{
                      marginTop: "-10px",
                      fontSize: "20px",
                      fontWeight: "30px",
                    }}
                  >
                    {user.name}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  color: "rgb(0,101,69)",
                  fontWeight: "bold",
                }}
              >
                <img
                  src={user.photo}
                  alt=""
                  style={{
                    width: "20px",
                    height: " 20px",
                    borderRadius: "50%",
                  }}
                />
                <p
                  style={{
                    marginTop: "1px",
                  }}
                >
                  {" "}
                  Thông tin tài khoản
                </p>
              </div>
            </li>
            <li>
              <div style={{ display: "flex", gap: "10px" }}>
                <CalendarOutlined
                  style={{
                    width: "20px",
                    height: " 20px",
                    borderRadius: "50%",
                    marginLeft: "1px",
                  }}
                />
                <p
                  onClick={() => {
                    navigate("/MyBill");
                  }}
                  style={{
                    marginTop: "1px",
                  }}
                >
                  Quản lý đơn hàng
                </p>
              </div>
            </li>
            <li>
              <div style={{ display: "flex", gap: "10px" }}>
                <EditOutlined
                  style={{
                    width: "20px",
                    height: " 20px",
                    borderRadius: "50%",
                    marginLeft: "1px",
                  }}
                />
                <p
                  style={{
                    marginTop: "1px",
                  }}
                >
                  Sổ địa chỉ
                </p>
              </div>
            </li>
            <li style={{ borderBottom: "1px solid gray)" }}></li>
          </ul>
        </div>
        <div
          style={{
            width: "40%",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h2>Thông tin tài khoản</h2>
          <div >
          <p style={{ fontWeight: "bold" }}>
            Ảnh đại diện <i style={{ color: "red" }}> *</i>
          </p>
      
          <img 
          style={{width:'100px',height:'100px',borderRadius:'50%'}}
          src={user.photo} alt="" />

          </div>
          <p style={{ fontWeight: "bold" }}>
            Họ và tên <i style={{ color: "red" }}> *</i>
          </p>
       <p>{user.name}</p>
          <p style={{ fontWeight: "bold" }}>
            Email <i style={{ color: "red" }}> *</i>
          </p>
         <p>{user.email}</p>
          
          <p style={{ fontWeight: "bold" }}>
            Số Điện thoại <i style={{ color: "red" }}> *</i>
          </p>
         <p>{user.phone ? user.phone : "Chưa Có"}</p>
       
         <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>TÊN</p>
        <input
        onChange={handlinput}

        name="name"
        value={userinfo.name}
         type="text" />
        <p>Email</p>
        <input
        onChange={handlinput}
        name="email"
        value={userinfo.email}
         type="text" />
        <p>Số điện thoại</p>
        <input 
        onChange={handlinput}

        name="phone"
        value={userinfo.phone}
        type="text" />
        <p>Ảnh</p>
        <input 
        onChange={handleAddMedia}
        type="file" />
        <img 
        style={{width:'100px',height:'100px',borderRadius:'50%'}}
        src={preview ? preview : user.photo} alt="" />
      </Modal>
          <button
          onClick={()=>showModal(user)}
            style={{
              marginTop: "10px",
              width: "100px",
              marginLeft: "250px",
              height: "40px",
              borderRadius: "5px",
              border: "1px solid gray",
              backgroundColor: "rgb(0,101,69)",
              color: "white",
            }}
          >
            Cập nhật
          </button>
        </div>
        <div
          style={{
            width: "20%",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
            height: "150px",
          }}
        >
          <h2 style={{}}>Địa chỉ mặc định</h2>
          <div
            style={{
              textAlign: "center",
              color: "rgb(0,101,69)",
              borderTop: "1px solid gray",
            }}
          >
            <p>+ Thêm địa chỉ mới</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
