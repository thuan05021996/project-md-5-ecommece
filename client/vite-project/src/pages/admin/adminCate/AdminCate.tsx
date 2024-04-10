import React from "react";
import { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import {
  UserOutlined,
  BarsOutlined,
  ProfileOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import Footer from "../../../components/footer/Footer";

import "./admincate.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import publicAxios from "../../../config/pulic.axios";

export default function AdminCate() {
  const [listCate, setListCate] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [selectedMedia, setSelectedMedia] = useState<null>(null);
  const [editing,setEditing] = useState(false);
  const [flag1, setflag1] = useState(false);
  const [newCate, setNewCate] = useState({
    id:"",
    name: "",
    img_category: "",
  });
  const [flag, setflag] = useState(false);

  // goi danh sách về
  const getListCate = async () => {
    try {
      const res = await publicAxios.get("/api/v1/category");
      setListCate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListCate();
  }, [flag1]);

//   ham chọn ảnh
const handleAddMedia = (event: any) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // modal
  const showModal = (item: any) => {
    setIsModalOpen(true);
    if (item) {
      setNewCate({
      ...newCate,name : item.name,id : item.id
        
      });
      setPreview(item.img_category);
      setEditing(true);
    }
  };
console.log(newCate,preview)
  const handleOk = async () => {
      try {
          const formData = new FormData();
          if (selectedMedia) {
              formData.append("file", selectedMedia);
            }
            formData.append("upload_preset", "my-project-md3");
            const [uploadMedia] = await Promise.all([
                axios.post(
                    "https://api.cloudinary.com/v1_1/dzprh8cvv/image/upload",
                    formData
                    ),
                ]);
                const media = uploadMedia.data.secure_url;
                const newCategory = {
                    name: newCate.name,
                    img_category: media,
                }
                
                const res = await publicAxios.post("/api/v1/category", newCategory);
                setflag1(!flag1);
                setIsModalOpen(false);
                message.success("Thêm thành công", 2);
                setNewCate({
                    name: "",
                    img_category: "",
                    id:""
                })
                setPreview(null || "");
      
    //   setListCate([...listCate, res.data]);
  }catch(error){
    console.log(error)
  }
}

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(listCate)

//   xoá
const handleDelete = async (id: number) => {
    // console.log(id)
    try {
      const res = await publicAxios.delete(`/api/v1/category/${id}`);
      setflag1(!flag1);
      message.success("Xóa thành công", 2);
    } catch (error) {
      console.log(error);
    }
  };
//   update
const update = async () => {
    try {
        if(!selectedMedia){
            const newCategory = {
                name: newCate.name,
                img_category: preview
            }
            
            console.log(newCate.id)
            const res = await publicAxios.put(`/api/v1/category/${newCate.id}`, newCategory);
            setflag1(!flag1);
            setIsModalOpen(false);
            message.success("Update thanh cong", 2);
            setNewCate({
                name: "",
                id: "",
                img_category: "",
            })
            setPreview(null || "");
        } else {
          
      if (selectedMedia) {
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
        const newCategory = {
          name: newCate.name,
          img_category: media
      }

      const res = await publicAxios.put(`/api/v1/category/${newCate.id}`, newCategory);
      setflag1(!flag1);
    
      message.success("Update thanh cong", 2);
      setNewCate({
        name: "",
        id: "",
        img_category: "",
      })
        setPreview(null || "");
        setEditing(false);
        setIsModalOpen(false);
        return;
      }
        }
    }catch (error) {
        console.log(error)
     }
  };

  return (
    <div>
      <h1 style={{ padding: "0 50px", textAlign: "center" }}>
        Quản lý Danh sách
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
                // navigate("/login");
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
          <Button
            style={{ backgroundColor: "rgb(0,101,69)" }}
            type="primary"
            onClick={showModal}
          >
            Thêm danh sách
          </Button>
          <Modal
            title={editing ? "Chinh sửa danh sách" : "Thêm danh sách"}
            open={isModalOpen}
            onOk={editing ? update : handleOk}
            onCancel={handleCancel}
          >
            <p>Nhập tên danh sách mới</p>
            <input
                onChange={(e)=>setNewCate({...newCate,name:e.target.value})}
              name="name"
                value={newCate.name}
              style={{ width: "100%", height: "25px", borderRadius: "5px" }}
              type="text"
            />
            <p>Ảnh danh sách</p>
            <input
                onChange={handleAddMedia}
              name="img_category"
                value={newCate.img_category}
              style={{ width: "100%", height: "25px", borderRadius: "5px" }}
              type="file"
            />

            <img
              style={{ width: "100px", height: "100px" }}
                src={preview}
              alt=""
            />
          </Modal>
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
              <td style={{ width: "40%" }}>Tên danh mục</td>
              <td style={{ width: "20%" }}>Ảnh danh mục</td>

              <td>Hành động</td>
            </tr>
            {listCate.map((item: any, index: number) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <th>{item.name}</th>
                  <th>
                    <img src={item.img_category} width="100px" alt="" />
                  </th>
                  <th>
                    <button
                        onClick={() => handleDelete(item.id)}
                      style={{
                        backgroundColor: "rgb(0,101,69)",
                        color: "white",
                        padding: "7px 20px",
                        borderRadius: "5px",
                        border: "none",
                        marginTop: "-1px",
                      }}
                    >
                      Xóa
                    </button>
                    <Button
                      type="primary"
                        onClick={() => showModal(item)}
                      style={{
                        backgroundColor: "rgb(0,101,69)",
                        marginLeft: "10px",
                      }}
                    >
                      Sửa thông tin
                    </Button>
                  </th>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
