import React, { useEffect, useState } from 'react'
import { Card, message } from 'antd';
import { Button, Flex } from 'antd';
import axios from 'axios';
import './Bestseller.scss'
import publicAxios from '../../config/pulic.axios';

const { Meta } = Card;

export default function Bestseller() {
  const [productHot, setProductHot] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const getProductHot = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/bill-details");
      setProductHot(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductHot();
  }, [])
// console.log(productHot,"1")
const handleByCart = async (item : any) => {
  console.log(item)
if(!user.id){
  message.error("Vui lòng đăng nhập để mua hàng ")
  return
}
  try {
    const newCart = {
      user_id : user.id,
      product_id : item.id
    }
   const res =  await publicAxios.post("/api/v1/cart", newCart)
    message.success(res.data.mesage,2)    
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div style={{padding: '0 10%'}}>
    <div className='bestseller'>
        <div className='bestseller_1'>
            <div className='bestseller_1_1'>Sản phẩm bán chạy</div>
            <div className='bestseller_1_2'>
         {productHot.slice(0, 4).map((item: any) => (
              
        <div>
          <div className="img_sale_1">
           <img style={{height : '50px',width : '50px',objectFit : 'cover'  }} src="https://static.vecteezy.com/system/resources/previews/024/119/747/original/hot-item-banner-template-web-element-design-hot-product-label-vector.jpg" alt="" />
        </div>
                <Card 
              hoverable
              style={{ width: 240,borderRadius:'none ',position: "unset",height : "460px" }}
              cover={<img  
                style={{height : '250px'}}
                alt="example" className='hover-image' src={item.projectDetails[0].img.url}/>}
            >
              <Meta title={item.name}   />
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
                {item.projectDetails[0].price *item.discount } đ
                {item.discount  < 1 ?   <div style={{ fontSize: "16px", display: "flex", gap: "10px" }}>
                       <p
                         style={{
                           color: "gray",
                           fontSize: "14px",
                           textDecoration: "line-through",
                         }}
                       >
                         {" "}
                         {item.projectDetails[0].price} đ{" "}
                       </p>
                       <p
                         style={{
                           color: "rgb(0,101,69)",
                           fontSize: "14px",
                           fontWeight: "bold",
                         }}
                       >
                         -{Math.floor((1 - item.discount) * 100)} %
                       </p>
                     </div> : <div style={{ fontSize: "16px", display: "flex", gap: "10px" }}> </div>
                }
              </p>
              <Button
              onClick={() => handleByCart(item)}
               style={{color : "rgb(0,101,69)",borderColor:'rgb(0,101,69)', marginTop: '10px'}}>Thêm vào giỏ hàng</Button>
          </Card>
        </div>
         ))}
                
              
      
           
               
             

            </div>
        </div> 
    </div>
</div>
  )
}
