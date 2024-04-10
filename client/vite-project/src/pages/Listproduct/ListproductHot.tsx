
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { Card, message } from "antd";
import { Button } from "antd";
import publicAxios from '../../config/pulic.axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

export default function ListproductHot() {
    const [listproductHot, setListproductHot] = useState([])
    const [valueinput,setValueinput] = useState<number>(0)
    const [valueinput1,setValueinput1] = useState<number>(2000000)
    const navigate = useNavigate()

    // console.log(valueinput,valueinput1)
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    useEffect(() => {

       
        axios.get('http://localhost:3000/api/v1/bill-details',{params : {price : valueinput,price1 : valueinput1}}).then((res) => {
            setListproductHot(res.data)
        })
    }, [])
    const value2222 = (e : any) => {
        // setTimeout(() => {
            
        // }, 2);
        setValueinput(e.target.value)
       
    }
    const value1111 = (e : any) => {
        setValueinput1(e.target.value)
      
    }
//  console.log(listproductHot)

 const handleBuy = async (item: any) => {
    // console.log(item)
    if(!user.id){
      message.error("Vui lòng đăng nhập để mua hàng ")
      return
    }
    try {
      const newCart = {
        user_id: user.id,
        product_id: item.id,
      };
      const res = await publicAxios.post("/api/v1/cart", newCart);
      message.success(res.data.mesage, 2);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
        <div>
    <Header></Header>
    {/* <h1>Fi</h1> */}
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
              onChange={value2222}
           type="range" 
           step={50000}
           id="vol" name="vol" min="0" max="2000000"/>
              <input
              value={valueinput1}
              onChange={value1111}
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
            onClick={() => navigate('/listproducthot')}
            style={{border : '2px solid rgb(0,101,69)',padding : '10px',borderRadius : '3px',color : 'rgb(0,101,69)'}}> Bán chạy nhất</div>
          </div>
          <div style={{ display: "flex",flexWrap : 'wrap', justifyContent: "space-between" ,
          padding : '10px',gap : '10px',}}>
         {listproductHot.map((item : any,index) => (
         <div>
              <div className="img_sale_1">
           <img style={{height : '50px',width : '50px',objectFit : 'cover'  }} src="https://static.vecteezy.com/system/resources/previews/024/119/747/original/hot-item-banner-template-web-element-design-hot-product-label-vector.jpg" alt="" />
        </div>
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
                src={ item.projectDetails[0].img.url} 
              />
            }
          >
            <Meta title={item.name} />
            <p style={{ color: "gray", fontSize: "12px" }}>
              Đơn vị tính : {item.projectDetails[0].mass.size} {item.projectDetails[0].mass.name}
            </p>

            <p
              style={{
                color: "rgb(0,101,69)",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {" "}
              {item.projectDetails[0].price} đ
            </p>
            <div style={{ fontSize: "16px", display: "flex", gap: "10px" ,marginTop: "68px"}}> </div>
              
            <Button
              onClick={() => handleBuy(item)}
              style={{
                color: "rgb(0,101,69)",
                borderColor: "rgb(0,101,69)",
                // marginTop: "10px",
                width: "160px",
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </Card>
         </div>
         ))}
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
    </div>
  )
}
