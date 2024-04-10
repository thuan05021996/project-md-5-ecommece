import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./Mybill.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";

export default function MyBill() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [bill, setBill] = useState([]);
  const [billDetails, setBillDetails] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const getBillByUser = async () => {
    const res = await axios.get(`http://localhost:3000/api/v1/bill/${user.id}`);
    setBill(res.data);
  };

  const getBillDetai = async (id: number) => {
    try {
      // console.log(id);
      const res = await axios.get(
        `http://localhost:3000/api/v1/bill-details/${id}`
      );
      setBillDetails(res.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBillByUser();
  }, [flag]);
  console.log(bill);

  const a :any = billDetails.map((item :any) => (item.Product.projectDetails[0].img.url));
  console.log(a)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const CanelBill = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/bill/${id}`);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header></Header>
      <div>
        <div style={{ width: "100%", backgroundColor: "rgb(248,248,252)" }}>
          <div
            style={{
              padding: "0 100px",
              fontSize: "20px",
              color: "gray",
              paddingTop: "20px",
            }}
          >
            Trang chủ / Giỏ hàng
          </div>
          <div style={{ padding: "0 100px", display: "flex" }}>
            <div
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Đơn hàng của bạn
            </div>
            {/* <div className="delete" style={{color:'rgb(0,101,69)',cursor:'pointer',marginLeft:'720px',marginTop:'20px',marginBottom:'0px',}}>Xoá tất cả</div> */}
          </div>
          <div
            style={{
              padding: "20px 100px",
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div className="cart1">
              <div className="listproducts">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    borderBottom: "1px solid rgb(248,248,252)",
                    lineHeight: "40px",
                    fontWeight: "bold",
                  }}
                >
                  <div>Stt</div>

                  <div style={{ width: "18%" }}>Mã đơn hàng</div>
                  <div style={{ width: "8%", marginLeft: "-100px" }}>
                    Ngày tạo
                  </div>
                  <div>Tổng tiền</div>
                  <div>Địa chỉ</div>
                  <div>Trạng thái</div>

                  <div>Hành động</div>
                </div>
                {bill.map((item: any, index) => (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      lineHeight: "40px",
                      borderBottom: "1px solid black",
                      padding: "10px 0px",
                      justifyContent: "space-between",
                      //    fontWeight:'bold'
                    }}
                  >
                    <div style={{ fontSize: "18px", display: "flex" }}>
                      {index + 1}
                    </div>
                    <div style={{ fontWeight: "bold", width: "17%" }}>
                      <div style={{ marginRight: "10px" }}>
                        {item.id * 977622}
                        <button
                          onClick={() => getBillDetai(item.id)}
                          style={{
                            color: "white",
                            marginLeft: "10px",
                            fontSize: "14px",
                            backgroundColor: "rgb(0,101,69)",
                            borderRadius: "5px",
                            height: "30px",
                            marginTop: "5px",
                            padding: "5px 10px",
                            border: "none",
                          }}
                        >
                          xem chi tiết
                        </button>
                      </div>
                    </div>

                    <Modal
                      title="Đơn hàng của bạn"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      {billDetails.map((item: any, index) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              gap: "50px",
                              width: "100%",
                              borderBottom: "1px solid black",
                              padding: "10px 0px",
                            }}
                          >
                            <img
                              style={{ width: "100px", height: "100px" }}
                              src={item.Product.projectDetails[0].img.url}
                              alt=""
                            />
                            <div>
                              <p style={{ fontWeight: "bold" }}>
                                {item.productsName}
                              </p>
                              <p>Số lượng {item.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                    </Modal>

                    <div style={{ fontWeight: "bold", width: "8%" }}>
                      {item.created_at}
                    </div>
                    <div style={{ fontWeight: "bold", width: "8%" }}>
                      {item.total_money} đ
                    </div>
                    <div style={{ fontWeight: "bold", width: "25%" }}>
                      {item.address}
                    </div>

                    <div
                      style={{
                        fontWeight: "bold",
                        padding: "5px 1px",
                        height: "10px",
                        display: "flex",
                        color: item.status === "Huỷ" ? "red" : "green",
                      }}
                    >
                      {item.status}
                    </div>
                    <div>
                     {item.status === "Đang chờ" ?  <button
                          onClick={()=>CanelBill(item.id)}
                        style={{
                          color: "white",
                          fontSize: "14px",
                          backgroundColor: "red",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          border: "none",
                        }}
                      >
                        Huỷ đơn hàng
                      </button> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="div1">
              <img
                style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                src="https://lh3.googleusercontent.com/VlzZxoxsnPfbJmLhz9kAIpYICfGpYHk1oVH6XhuiRBg7omiJdSbj9zFXs_FuZpGEOrkbiv3YWHx3SU2auYsx9Re2wPVmgx5b=rw-w296"
                alt=""
              />
              <div className="div3">
                <img
                  style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                  src="https://lh3.googleusercontent.com/rMxqTbHpV_9S6oWdrSO3LYLG9R21IZs75D45y01XQTxrC7FEEgal0wdmiJ-AHzo3aNNrFqceBsj0JoUOxEonWiuhjD8K5fE=rw-w297"
                  alt=""
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
