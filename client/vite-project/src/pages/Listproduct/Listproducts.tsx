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

export default function Listproducts() {
    const [valueinput,setValueinput] = useState<number>(0)
    const [valueinput1,setValueinput1] = useState<number>(2000000)
    const [listProduct,setListProduct] = useState([])
    const [filter, setFilter] = useState<any>();

    const navigate = useNavigate();

    const listproducts = async () => {
      try {
        const res = await publicAxios.get( `/api/v1/project-details?oderby=${filter}`);
        setListProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      listproducts();
    }, [filter]);


    

  
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
              onChange={(e) => {
                  setValueinput(parseInt(e.target.value))
              }}
           type="range" 
           step={50000}
           id="vol" name="vol" min="0" max="2000000"/>
              <input
              value={valueinput1}
              onChange={(e) => {
                  setValueinput1(parseInt(e.target.value))
              }}
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
            // onClick={() => setFilter("ASC")}
             style={{border : '2px solid rgb(248,248,252)',padding : '10px',borderRadius : '3px'}}> Giá tăng dần</div>
            <div 
            // onClick={() => setFilter("DESC")}
            onClick={() => navigate('/listproductdesc')}
            style={{border : '2px solid rgb(248,248,252)',padding : '10px',borderRadius : '3px'}}> Giá giảm dần</div>
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
            <Meta title="ten" />
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
              // onClick={() => handleBuy(item)}
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
