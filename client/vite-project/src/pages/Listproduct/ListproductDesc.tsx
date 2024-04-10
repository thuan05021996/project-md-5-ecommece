import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { Card, message } from "antd";
import { Button } from "antd";
import publicAxios from '../../config/pulic.axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './Listproducts.scss'

const { Meta } = Card;

export default function ListproductDesc() {
    const [valueinput,setValueinput] = useState<number>(0)
    const [valueinput1,setValueinput1] = useState<number>(2000000)
    const [listProduct,setListProduct] = useState([])
    const [filter, setFilter] = useState<any>();

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const listproducts = async () => {
      try {
        const res = await publicAxios.get( `/api/v1/project-details?oderby=DESC&min=${valueinput}&max=${valueinput1}`);
        setListProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      listproducts();
    }, []);
    console.log(listProduct)
    const handleinput = (e : any) => {
        setValueinput(e.target.value)
        const res = publicAxios.get( `/api/v1/project-details?oderby=ASC&min=${e.target.value}&max=${valueinput1}`)
        .then((res) => {
            setListProduct(res.data)
            // setValueinput(0)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const handleinput1 = (e : any) => {
        setValueinput1(e.target.value)
        const res = publicAxios.get( `/api/v1/project-details?oderby=ASC&min=${e.target.value}&max=${valueinput1}`)
        .then((res) => {
            setListProduct(res.data)
            // setValueinput1(2000000)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // if(valueinput > valueinput1){
    //     message.error("Khoảng  giá bạn tìm không  đúng",2)
    // }
console.log(listProduct)
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
  return (
    <div>
    <Header></Header>
    <h1>FilterProduct</h1>
    <div style={{ padding: "0 5%" }}>
      <div
        style={{
          // padding: "0 10% ",
          // backgroundColor: "white",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
        className="filterProduct"
      >
        <div
          style={{ width: "17%", backgroundColor: "white", padding: "10px" ,
          borderRadius : '10px',
          height : '100%'
      }}
        >
          <p style={{ fontSize: "18px",fontWeight : 'bold'}}>Khoảng giá</p>
          <p>{valueinput}-{valueinput1} vnd</p> 
          <section className="range-slider">

          <input
              value={valueinput}
              onChange={handleinput}
           type="range" 
           step={50000}
           id="vol" name="vol" min="0" max="2000000"/>
              <input
              value={valueinput1}
              onChange={handleinput1}
           type="range" 
           step={50000}
           id="vol" name="vol" min="0" max="2000000"/>
          </section>
        </div>
        <div style={{ width: "80%", backgroundColor: "white" }}>
          <div style={{ display: "flex" ,padding : '10px',gap : '10px',borderBottom : '3px solid rgb(248,248,252)'}}>
            <div
            style={{ fontSize: "16px",fontWeight : 'bold',padding : '10px'}}>Sắp xếp theo</div>
            <div 
            // onClick={() => setFilter("sale")}
            onClick={() => navigate('/listproductsale')}
            style={{border : '2px solid rgb(248,248,252)',padding : '10px',borderRadius : '3px'}}>Khuyến mãi tốt nhất</div>
            <div
            onClick={() => navigate('/listproductasc')}
             style={{border : '2px solid rgb(248,248,252)',padding : '10px',borderRadius : '3px',}}> Giá tăng dần</div>
            <div 
            // onClick={() => setFilter("DESC")}
            style={{border : '2px solid rgb(0,101,69)',padding : '10px',borderRadius : '3px',color : 'rgb(0,101,69)'}}> Giá giảm dần</div>
            <div 
            // onClick={selectNew}
            onClick={() => navigate('/listproductnew')}
            style={{border : '2px solid rgb(248,248,252)',padding : '10px',borderRadius : '3px'}}> Sản phẩm mới nhất</div>
            <div 
            onClick={()=>navigate('/listproducthot')}
            style={{border : '2px solid rgb(248,248,252)',padding : '10px',borderRadius : '3px'}}> Bán chạy nhất</div>
          </div>
          <div style={{ display: "flex",flexWrap : 'wrap', justifyContent: "space-between" ,
          padding : '10px',gap : '10px',}}>
         {listProduct.map((item : any,index) => (
            <Card
            key={index}
            hoverable
            style={{ width: 200, borderRadius: "none ", height: "420px" }}
            cover={
              <img
                onClick={() => navigate(`/productdetails/${item.id}`)}
                style={{ height: "180px" }}
                alt="example"
                className="hover-image"
                src={ item.img.url }
              />
            }
          >
            <Meta title={item.product.name}/>
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
              {item.price} đ
            </p>
            <div style={{ fontSize: "16px", display: "flex", gap: "10px" ,marginTop: "68px"}}> </div>
              
            <Button
              onClick={() => handleBuy(item)}
              style={{
                color: "rgb(0,101,69)",
                borderColor: "rgb(0,101,69)",
                marginTop: "10px",
                width: "160px",
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </Card>
         ))}
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
  )
}
