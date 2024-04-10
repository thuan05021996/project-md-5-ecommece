import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { Footer } from "antd/es/layout/layout";
import "./cart.scss";
import { Button, Modal, message } from "antd";
import publicAxios from "../../config/pulic.axios";
// import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  `
);

const StyledInput = styled("input")(
  ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.375;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
    border-radius: 8px;
    margin: 0 8px;
    padding: 6px 12px;
    outline: 0;
    min-width: 0;
    width: 2rem;
    text-align: center;
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[700] : blue[200]
      };
    }
  
    &:focus-visible {
      outline: 0;
    }
  `
);

const StyledButton = styled("button")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    line-height: 1.5;
    border: 1px solid;
    border-radius: 999px;
    border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    width: 32px;
    height: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
      border-color: ${theme.palette.mode === "dark" ? blue[500] : blue[400]};
      color: ${grey[50]};
    }
  
    &:focus-visible {
      outline: 0;
    }
  
    &.increment {
      order: 1;
    }
  `
);

export default function () {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listCart, setListCart] = useState<any[]>([]);
  const [value, setValue] = useState<any>([]);
  // tỉnh
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [obj, setObj] = useState({
    name: "",
    phone: "",
    email: "",
  });
  console.log(listCart, "listCart");
 

  // api thành phố
  const handleGetDataCity = async () => {
    let data = await axios.get(`https://vapi.vnappmob.com/api/province/`);
    setDataCity(data.data.results);
  };
  useEffect(() => {
    handleGetDataCity();
  }, []);
  const handleCity = async (e: any) => {
    let idCity = e.target.value;
    const nameCity: any = dataCity.find(
      (item: any) => item.province_name === idCity
    );
    const numberCity = +nameCity.province_id;
    let data = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${numberCity}`
    );
    setCity(nameCity.province_name);
    setDataDistrict(data.data.results);
  };
  const handleDistrict = async (e: any) => {
    let idDistrict = e.target.value;
    const nameDistrict: any = dataDistrict.find(
      (item: any) => item.district_name == idDistrict
    );
    const districtsName = +nameDistrict.district_id;
    let data = await axios.get(
      `https://vapi.vnappmob.com/api/province/ward/${districtsName}`
    );
    setDistrict(nameDistrict.district_name);
    setDataWard(data.data.results);
  };
  // let newCart:any = [];
  //   const [valuequantity, setValuequantity] = useState(0);

  const handleChangleInput = (e: any) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };
  // lây danh sach cart của user
  const getCart = async () => {
    try {
      const res = await publicAxios.get(`/api/v1/cart/${user.id}`);
      // console.log(res)
      setListCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  // console.log(newCarts);

  const showModal = () => {
    if(newCarts.length == 0){
      message.warning("Vui lòng chọn sản phẩm để đặt hàng", 2);
      return
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    // setIsModalOpen(false);
    if(obj.name == "" || obj.phone == "" || obj.email == "" || city == "" || district == "" || ward == ""){
      message.warning("Vui lòng điền đầy đủ thông tin", 2);
      return
    }
    try {
      let d = new Date();
      let newOrder = {
        user_id: user.id,
        totalMoney: totalMoney,
        dayBill: `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`,
        // dayBill: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
  
       
        address: `${ward}-${district}-${city}`,
        name: obj.name,
        phone: obj.phone,
      }
      // console.log(newOrder.dayBill)
      // console.log(newOrder,"1111")
      const res = await publicAxios.post(`/api/v1/bill`, newOrder);
      
      let bill_details = {
        bill_id: res.data,
        listCart: newCarts,
      }
      // console.log(bill_details)
      
      await axios.post(`http://localhost:3000/api/v1/bill-details`, bill_details);
      console.log(newCarts, "newCarts");
      await axios.delete(`http://localhost:3000/api/v1/cart/deletewithcarrt`,{data:newCarts});
      message.success("Đặt hàng thành công", 1);
      getCart();
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const updatequantity = async (id: any, valuequantity: any) => {
    try {
      console.log(id, valuequantity);

      await publicAxios.put(`/api/v1/cart/${id.cart_id}`, {
        quantity: valuequantity,
      });
      message.success("Cập nhật thành công", 1);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = async (id: any, valuequantity1: any) => {
    // console.log(id,valuequantity1)
    try {
      console.log(id, valuequantity1);

      await publicAxios.put(`/api/v1/cart/${id.cart_id}`, {
        quantity: +valuequantity1,
      });
      message.success("Cập nhật thành công", 1);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };
  // Tính tổng thanh toán
 
  const handleCHECKBOX = async (e: any) => {
    if (e.target.checked == true) {
      setValue(value.filter((item: any) => item !== e.target.value));
      setValue([...value, e.target.value]);
    } else {
      setValue(value.filter((item: any) => item !== e.target.value));  
    }
  };

  let newCarts: any = [];
  for (let i = 0; i < listCart.length; i++) {
    if (value.includes(listCart[i].cart_id.toString())) {
      // console.log("11111");
      newCarts.push(listCart[i]);
    } 
  }

  // xoá 1 sản phẩm
  const handleDelete = async (id: any) => {
    if(confirm("Bạn có muốn xóa sản phẩm này ?")){
      try {
        console.log(id.cart_id);
        await publicAxios.delete(`/api/v1/cart/deleteone/${id.cart_id}`);
        message.success("Xóa thành công", 1);
        getCart();
      } catch (error) {
        console.log(error);
      }
    }
  };
  // xoá tất cả sản phảm
  const DeleteAll = async () => {
    try {
      await publicAxios.delete(`/api/v1/cart/delete/${user.id}`);
      message.success("Xóa thành công", 1);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(newCarts, "newCarts");
  // tông tiền
  // tổng tiền của đơn hàng
 
  const calculateTotal = () => {
    let total = 0;
    newCarts.forEach((cart: any) => {
      total +=  cart.cart_quantity * (cart.product_discount * cart.projectDetail_price)
    });
    return total;
  };
  const totalMoney = newCarts.reduce((acc: any, item: any) => {
    // console.log(item);
    return (
      acc +
      item.cart_quantity * (item.product_discount * item.projectDetail_price)
    );
  }, 0);

  console.log(listCart, "listCart");
  // console.log(totalMoney);
  return (
    <div>
      <Header></Header>
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
            style={{ fontSize: "26px", fontWeight: "bold", marginTop: "20px" }}
          >
            Giỏ hàng
          </div>
          <div
            onClick={DeleteAll}
            className="delete"
            style={{
              color: "rgb(0,101,69)",
              cursor: "pointer",
              marginLeft: "720px",
              marginTop: "20px",
              marginBottom: "0px",
            }}
          >
            Xoá tất cả
          </div>
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
                <div style={{ width: "50%", fontSize: "18px" }}>Sói biển</div>
                <div style={{ width: "20%", fontSize: "18px" }}>Đơn giá</div>
                <div style={{ width: "20%", fontSize: "18px", textAlign: "center" }}>Số lượng</div>
                <div>Thành tiền</div>
              </div>
              {listCart?.map((item: any) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    borderBottom: "1px solid black",
                    lineHeight: "40px",
                    //    fontWeight:'bold'
                  }}
                >
                  <div>
                    <input
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "white",
                        color: "red",
                      }}
                      value={+item.cart_id}
                      onChange={handleCHECKBOX}
                      // checked={value.includes(item.cart_id.toString())}
                      type="checkbox"
                    />
                  </div>
                  <div
                    style={{ width: "40%", fontSize: "18px", display: "flex" }}
                  >
                    <img
                      style={{
                        width: "100&",
                        height: "100px",
                        border: "1px solid  rgb(248,248,252)",
                      }}
                      src={item.img_url}
                      alt=""
                    />
                    <div style={{ marginLeft: "10px" ,width:"40%"}}>
                      <p>{item.product_name}</p>
                      <p style={{ color: "gray", fontSize: "12px" }}>
                        Đơn vị tính : {item.mass_size} {item.mass_name}
                      </p>
                    </div>
                  </div>
                  <div style={{ fontWeight: "bold", width: "20%" }}>
                    {+item.product_discount < 1 ? (
                      <div>
                        {" "}
                        Sale : { Math.floor((1 - item.product_discount) * 100)}%  -
                        {/* <p>{item.projectDetail_price}</p> */}
                        <div>
                          <del>{item.projectDetail_price}</del> &nbsp;
                          <span style={{ color: "red" }}>
                            {Math.floor(item.projectDetail_price * item.product_discount)} đ
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>{item.projectDetail_price}</div>
                    )}
                  </div>
                  <div style={{ width: "20%" }}>
                    {/* <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          border: "none",
                          marginTop: "20px",
                        }}
                      >
                        -
                      </button>
                      <p>{item.cart_quantity}</p>
                      <button
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          border: "none",
                          marginTop: "20px",
                        }}
                      >
                        +
                      </button>
                    </div> */}
                    <NumberInput
                      defaultValue={item.cart_quantity}
                      onChange={(event, newValue) =>
                        updatequantity(item, newValue)
                      }
                      onInputChange={(event) =>
                        handleInputChange(item, event.target.value)
                      }
                      min={1}
                      max={100}
                    />
                    <p
                      onClick={() => handleDelete(item)}
                      className="delete"
                      style={{
                        color: "gray",
                        fontSize: "16px",
                        marginLeft: "70px",
                        marginTop: "5px",
                      }}
                    >
                      Xoá
                    </p>
                  </div>

                  <div style={{ fontWeight: "bold" }}>
                    {Math.ceil(item.projectDetail_price *
                      item.product_discount *
                      item.cart_quantity)}
                    {/* {+item.DiscountedPrice < 1 ? item.price * item.DiscountedPrice * item.quantity : item.price * item.quantity} */}
                    đ
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="div1">
            <div
              className="div2"
              style={{
                paddingTop: "20px",
                backgroundColor: "white)",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  borderBottom: "1px solid rgb(248,248,252)",
                }}
              >
                <div style={{ width: "40%", fontSize: "20px" }}>Khuyến mãi</div>
                <div style={{ color: "blue", fontSize: "14px" }}>
                  {" "}
                  Chọn hoặc nhập mã khuyến mãi
                </div>
              </div>
              <div style={{ paddingTop: "20px", color: "gray" }}>
                Đơn hàng chưa đủ điều kiện để nhận khuyến mãi. Vui lòng mua thêm
                để áp dụng
              </div>
            </div>
            <div className="div3">
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                Thanh toán
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <div>Tổng tạm tính</div>
                <div> Tông tiềnđ</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <div>Thành tiền</div>
                <div>
                  <div
                    style={{
                      marginLeft: "110px",
                      color: "rgb(0,101,69)",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {" "}
                    {calculateTotal()} đ
                  </div>
                  <div style={{ color: "gray", fontSize: "12px" }}>
                    (đã bao gồm VAT)
                  </div>
                </div>
              </div>
              <Button
                onClick={showModal}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "rgb(0,101,69)",
                  color: "white",
                  borderRadius: "5px",
                  marginTop: "20px",
                  border: "none",
                  fontSize: "18px",
                }}
              >
                Thanh toán
                {/* <p style={{color:'white',fontSize:'12px',marginTop:'10px'}}>Bạn cần đăng nhập để thanh toán</p> */}
              </Button>

              <Modal
                title="Thanh toán"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div style={{ textAlign: "start" }}>
                  <h5>Thông tin giao hàng</h5>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      paddingLeft: "5px",
                    }}
                    name="name"
                    value={obj.name}
                    onChange={handleChangleInput}
                  />
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      paddingLeft: "5px",
                    }}
                    name="phone"
                    value={obj.phone}
                    onChange={handleChangleInput}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      paddingLeft: "5px",
                    }}
                    name="email"
                    value={obj.email}
                    onChange={handleChangleInput}
                  />
                  <select onChange={handleCity} name="" id="">
                    <option value="">Chọn thành phố</option>
                    {dataCity.map((item: any, index) => (
                      <option key={index} value={item.code}>
                        {item.province_name}
                      </option>
                    ))}
                  </select>
                  <select onChange={handleDistrict} name="" id="">
                    <option>Chọn Quận/Huyện</option>
                    {dataDistrict.map((item: any, index: any) => (
                      <option key={index} value={item.code}>
                        {item.district_name}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) => setWard(e.target.value)}
                    name=""
                    id=""
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {dataWard.map((item: any, index: any) => (
                      <option key={index}>{item.ward_name}</option>
                    ))}
                  </select>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
