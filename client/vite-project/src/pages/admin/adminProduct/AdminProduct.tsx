import { useEffect, useState, useRef } from "react";

import { Modal, Drawer, message, Popconfirm } from "antd";
// import {  Popper, Typography, Paper, ClickAwayListener } from '@mui/core';

import { Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
// import "../../../components/footer/footer.scss"
import "./adminproduct.scss";

import {
  UserOutlined,
  BarsOutlined,
  ProfileOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import axios from "axios";
import Footer from "../../../components/footer/Footer";
import publicAxios from "../../../config/pulic.axios";
import privateAxios from "../../../config/private.axios";

// import ButtonSale from "../../../components/Buton/ButtonSale";

export default function AdminProduct() {
  const [listProducts, setListProducts] = useState([]);
  const [listCate, setListCate] = useState([]);
  const [listMass, setListMass] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [selectedMedia, setSelectedMedia] = useState<null>(null);
  const [flag, setflag] = useState(false);
  const [editing, setEditing] = useState(false);
  const [valueSale, setValueSale] = useState<number>();
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<any>();
  // const [isInputVisible, setInputVisible] = useState(false);

  const [newProduct, setNewProduct] = useState<any>({
    id: "",
    name: "",
    price: "",
    description: "",
    url: "",
    category_id: "",
    mass_id: "",
    orgin: "",
    img_id: "",
    product_id: "",
  });

  const [error, setError] = useState({
    name: "",
    Giá: "",
    Thôngtin: "",
    Ảnh: "",
    Loại_Sản_Phẩm: "",
    Khối_Lượng: "",
    Xuất_xứ: "",
  });

  const navigate = useNavigate();

  //  phần thêm ảnh

  const handleAddMedia = (event: any) => {
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const showModal = (item: any) => {
    setIsModalOpen(true);
    if (item) {
      // setNewProduct(item)
      // console.log(item)
      setNewProduct({
        name: item.product.name,
        price: item.price,
        description: item.product.descripstion,
        url: item.url,
        category_id: item.category.id,
        mass_id: item.mass.id,
        orgin: item.product.orgin,
        id: item.id,
        img_id: item.img.id,
        product_id: item.product.id,
      });
      setPreview(item.img.url);
      setEditing(true);
    }
  };
  // console.log(listProducts)
  // thêm sản phảm
  const handleOk = async () => {
    try {
      setEditing(false);
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

      const newproduct1 = {
        ...newProduct,
        url: media,
        price: Number(newProduct.price),
        category_id: Number(newProduct.category_id),
        id: Number(newProduct.id),
      };
   
      const res = await privateAxios.post(
        "/api/v1/project-details",
        newproduct1
      );
      console.log(res)

      setNewProduct({
        name: "",
        price: "",
        description: "",
        url: "",
        category_id: "",
        mass_id: "",
        orgin: "",
        id: "",
        img_id: "",
        product_id: "",
      });

      setPreview(null || "");
      setIsModalOpen(false);
      setflag(!flag);
    } catch (error) {
      console.log(error);
    }
  };
  // sửa sản phẩm
  const handleUpdate = async () => {
    try {
      // console.log(newProduct, "123");
      if (!selectedMedia) {
        const newproduct1 = {
          ...newProduct,
          price: Number(newProduct.price),
          category_id: Number(newProduct.category_id),
          url: preview,
          id: Number(newProduct.id),
        };
        console.log(newproduct1, "123");
        const res = await publicAxios.put(
          `/api/v1/project-details/${newproduct1.id}`,
          newproduct1
        );
        setNewProduct({
          name: "",
          price: "",
          description: "",
          url: "",
          category_id: "",
          mass_id: "",
          orgin: "",
          id: "",
          img_id: "",
          product_id: "",
        });
        setflag(!flag);
        setEditing(false);
        setPreview(null || "");
        setIsModalOpen(false);
        return;
      }

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

        const newproduct1 = {
          ...newProduct,
          url: media,
          price: Number(newProduct.price),
          category_id: Number(newProduct.category_id),
          id: Number(newProduct.id),
        };

        const res = await privateAxios.put(
          `/api/v1/project-details/${newproduct1.id}`,
          newproduct1
        );
        setNewProduct({
          name: "",
          price: "",
          description: "",
          url: "",
          category_id: "",
          mass_id: "",
          orgin: "",
          id: "",
          img_id: "",
          product_id: "",
        });
        setflag(!flag);
        setPreview(null || "");
        setEditing(false);
        setIsModalOpen(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // / phần lấy dữ liệu về map
  const getProducts = async () => {
    console.log(filter, "filter");
    try {
      const res = await publicAxios.get(
        `/api/v1/project-details?oderby=${filter}`
      );
      setListProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getListCate = async () => {
    try {
      const res = await publicAxios.get("/api/v1/category");
      setListCate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getlistMass = async () => {
    try {
      const res = await publicAxios.get("/api/v1/mass");
      setListMass(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getListCate();
    getlistMass();
  }, [flag]);

  // xoá sản phẩm
  const confirm = () => {
    message.success("Xoá sản phẩm thành công", 1);
  };

  const cancel = () => {
    message.info("Không");
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await publicAxios.delete(`/api/v1/project-details/${id}`);
      setflag(!flag);
      // messageApi.success("Đã xóa Thành công !", 1);
    } catch (error) {
      console.log(error);
    }
  };

  // lấy dữ liệu input
  const handleinput = (e: any) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };
  //  phan sale
  const handleSale = async (id: any) => {
    try {
      if (valueSale !== undefined) {
        const discount = valueSale / 100;

        const res = await publicAxios.put(`/api/v1/product/${id}`, {
          discount: discount,
        });
        message.success(res.data.mesage, 1);
        setflag(!flag);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelSale = async (id: any) => {
    try {
      const res = await publicAxios.put(`/api/v1/product/cancelSale/${id}`);
      message.success(res.data.mesage, 1);
      setflag(!flag);
    } catch (error) {
      console.log(error);
    }
  };
  // phần search
  const handleSearch = async () => {
    try {
      const res = await publicAxios.get(
        `/api/v1/project-details/search?name1=${search}`
      );
      setListProducts(res.data);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(filter);
  // phân loại sản phẩm
  const changeInputFilter = async(e: any) => {
    setFilter(e.target.value);
    console.log(filter,"1111")
  }
  const handleFilter = async () => {
    try {
      const res = await publicAxios.get(
        `/api/v1/project-details?oderby=${filter}`
      );
      setListProducts(res.data);
    } catch (error) {
      console.log(error); 
    }

  };

  useEffect(() => {
    handleFilter();
  }, [filter]);
  
  //    // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentListProducts = listProducts.slice(startIndex, endIndex);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log(currentListProducts);
  return (
    <div>
      {/* <Header></Header> */}
      <h1 style={{ textAlign: "center" }}>Quản lý sản phẩm</h1>
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
            <Link style={{ color: "black" }} to={"/AdminProduct"}>
              <li>
                <BarsOutlined
                  style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
                />
                Quản lý sản phẩm
              </li>
            </Link>

            <Link style={{ color: "black" }} to={"/AdminUser"}>
              <li>
                <UserOutlined
                  style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
                />
                Quản lý người dùng
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/AdminCatelory"}>
              <li>
                <ProfileOutlined
                  style={{ color: "rgb(0,101,69)", marginRight: "10px" }}
                />
                Quản lý danh sách sản phẩm
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/AdminBill"}>
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
          <button
            onClick={showModal}
            style={{ backgroundColor: "rgb(0,101,69)" }}
          >
            Thêm sản phẩm
          </button>

          <Modal
            title={editing == false ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
            open={isModalOpen}
            onOk={editing == false ? handleOk : handleUpdate}
            onCancel={handleCancel}
          >
            <p style={{ fontWeight: "bold" }}>Tên sản phẩm</p>
            <input
              name="name"
              onChange={handleinput}
              value={newProduct.name}
              style={{ width: "100%", height: "25px", borderRadius: "5px" }}
              type="text"
            />
            {error.name && <p>{error.name}</p>}
            <p style={{ fontWeight: "bold" }}>Loại sản phẩm</p>
            <select
              onChange={handleinput}
              name="category_id"
              value={newProduct.category_id}
              style={{ width: "100%", height: "25px", borderRadius: "5px" }}
            >
              <option value="">Chọn phân loại</option>
              {listCate.map((item: any) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
            {error.Loại_Sản_Phẩm && <p>{error.Loại_Sản_Phẩm}</p>}
            <p style={{ fontWeight: "bold" }}>Giá sản phẩm</p>
            <input
              onChange={handleinput}
              name="price"
              value={newProduct.price}
              style={{ width: "100%", height: "25px", borderRadius: "5px" }}
              type="text"
            />
            {error.Giá && <p>{error.Giá}</p>}
            <p style={{ fontWeight: "bold" }}>Nhà cung cấp </p>
            <input
              onChange={handleinput}
              name="orgin"
              value={newProduct.orgin}
              style={{ width: "100%", height: "25px", borderRadius: "5px" }}
              type="text"
            />
            {error.Xuất_xứ && <p>{error.Xuất_xứ}</p>}
            <p style={{ fontWeight: "bold" }}>Kiểu bán </p>
            <select
              onChange={handleinput}
              name="mass_id"
              value={newProduct.mass_id}
              style={{ width: "100%", height: "25px", borderRadius: "5px" }}
            >
              <option value="">Chọn khối lượng</option>
              {listMass.map((item: any) => (
                <option value={item.id}>
                  {" "}
                  {item.size}-{item.name}
                </option>
              ))}
            </select>
            {error.Khối_Lượng && <p>{error.Khối_Lượng}</p>}
            <p style={{ fontWeight: "bold" }}>Ảnh sản phẩm</p>
            <input
              onChange={handleAddMedia}
              name="img"
              value={newProduct.url}
              style={{ width: "100%", height: "25px", borderRadius: "5px" }}
              type="file"
            />
            {error.Ảnh && <p>{error.Ảnh}</p>}
            <img
              style={{ width: "100px", height: "100px" }}
              src={preview}
              alt=""
            />

            <p style={{ fontWeight: "bold" }}>Mo ta</p>
            <input
              onChange={handleinput}
              name="description"
              value={newProduct.description}
              style={{ width: "100%", height: "60px", borderRadius: "5px" }}
              type="text"
            />
            {error.Thôngtin && <p>{error.Thôngtin}</p>}
          </Modal>
          <input
            onChange={(e) => setSearch(e.target.value)}
            style={{
              marginLeft: "20px",
              width: "60%",
              border: "1px solid gray",
              borderRadius: "5px",
              padding: "7px 20px",
            }}
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên"
          />
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "rgb(0,101,69)",
              color: "white",
              padding: "7px 20px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          >
            Tìm kiếm
          </button>
          <p> Có Tổng {listProducts.length} sản phẩm</p>

          <table
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "20px",
              borderCollapse: "collapse",
              borderRadius: "5px",
            }}
          >
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Tên sản phẩm</th>
                <th>Ảnh sản phẩm</th>
                {/* <th>Xuất xứ</th> */}
                <th>
                  Giá
                  <select 
                   onChange={(e)=>changeInputFilter(e)}
                   name="" id="">
                    <option value="">Sắp xếp </option>
                    <option  value="DESC">
                      Thấp đến cao
                    </option>
                    <option value="ASC">cao - thấp</option>
                  </select>
                </th>
                <th>Số lượng</th>
                <th>
                  Loại sản phẩm
                  <select 
                   onChange={(e) => setFilter(e.target.value)}
                  name="" id="">
                    <option value="">Sắp xếp </option>
                    {listCate.map((item: any) => (
                      <option
                        
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {currentListProducts.map((item: any, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.product.name}</td>
                  <td>
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={item.img.url}
                      alt=""
                    />
                  </td>

                  <td>
                    {" "}
                    {item.price} đ
                    {item.product.discount < 1 ? (
                      <div>
                        <p style={{ color: "red" }}>
                          Đang sale {100 - item.product.discount * 100} %
                        </p>
                        <p>Còn : {item.price * item.product.discount} đ</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                  <td> {item.stock}</td>
                  <td> {item.category.name}</td>

                  <td style={{ display: "flex" }}>
                    <Popconfirm
                      title="Bạn có muốn xoá sản phẩm?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button
                        style={{
                          backgroundColor: "rgb(0,101,69)",
                          color: "white",
                          padding: "7px 20px",
                          borderRadius: "5px",
                          border: "none",
                          marginTop: "-1px",
                        }}
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        Xóa
                      </button>
                    </Popconfirm>

                    <button
                      onClick={() => showModal(item)}
                      style={{
                        backgroundColor: "rgb(0,101,69)",
                        marginLeft: "10px",
                      }}
                    >
                      Sửa thông tin
                    </button>

                    <PopupState variant="popper" popupId="demo-popup-popper">
                      {(popupState) => (
                        <div>
                          <Button
                            style={{
                              backgroundColor: "rgb(0,101,69)",
                              color: "white",
                              padding: "6px 20px",
                              borderRadius: "5px",
                              border: "none",
                              marginLeft: "10px",
                            }}
                            variant="contained"
                            {...bindToggle(popupState)}
                          >
                            sale Edit
                          </Button>
                          <Popper {...bindPopper(popupState)} transition>
                            {({ TransitionProps }) => (
                              <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                  <Typography sx={{ p: 2 }}>
                                    <p>Nhập % bạn muốn giám giá cho sản phẩm</p>
                                    <input
                                      onChange={(e) =>
                                        setValueSale(parseInt(e.target.value))
                                      }
                                      type="number"
                                    ></input>
                                    <button
                                      onClick={() =>
                                        handleSale(item.product.id)
                                      }
                                    >
                                      Cập nhật
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleCancelSale(item.product.id)
                                      }
                                    >
                                      Huỷ Sale
                                    </button>
                                  </Typography>
                                </Paper>
                              </Fade>
                            )}
                          </Popper>
                        </div>
                      )}
                    </PopupState>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
          style={{ marginTop: "20px", marginLeft: "180px" }}
          current={currentPage}
          onChange={onPageChange}
          pageSize={itemsPerPage}
          total={listProducts.length}
        />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

