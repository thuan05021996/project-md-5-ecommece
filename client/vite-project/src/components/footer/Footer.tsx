import React from 'react'
import { Row, Col } from 'antd'
import './footer.scss'
export default function Footer() {
  return (
    <div className='footer'>
    <div className='footer_1'>
        <Row>
            <Col span={6} style={{marginTop:'20px'}}>
                <div style={{fontWeight:'bold',fontSize:'18px'}}>Về sói Biển</div>
                <div>
                    <li> Giới thiệu về sói Biển</li>
                    <li> Hệ thống cửa hàng</li>
                    <li> Liên Hệ</li>
                </div>
            </Col>
            <Col span={6} style={{marginTop:'20px'}}>
                <div  style={{fontWeight:'bold',fontSize:'18px'}}>Hỗ trợ khách hàng</div>
                <div>
                    <li> Hướng dẫn mua hàng</li>
                    <li> Chính sách đổi trả</li>
                    <li> Chính sách giao hàng</li>
                </div>
            </Col>
            <Col span={6} style={{marginTop:'20px'}}>
                <div  style={{fontWeight:'bold',fontSize:'18px'}}>Tin tức</div>
                <div>
                    <li> Tin tức sự kiện</li>

                </div>
            </Col>
            <Col span={6} style={{marginTop:'20px'}}>
                <div  style={{fontWeight:'bold',fontSize:'18px'}}>Cộng đồng hỗ trợ</div>
                <div>
                    <li> Facebook</li>
                    <li> Youtube</li>
                    <li> Zalo</li>
                    <li> Gọi mua hàng</li>


                </div>
            </Col>
        </Row>
    </div>
    <div className='footer_2'>
                <div style={{marginLeft:'-160px',marginTop:'20px',}}>
                    <div style={{fontWeight:'bold',fontSize:'18px'}}>Cộng đồng hỗ trợ</div>
                    <p> Mã số doanh nghiệp: 0107522785 do </p>
                    <p>Sở Kế hoạch và Đầu Tư Thành phố Hà Nội cấp ngày 29/07/2016</p>
                    
                </div>
                <div style={{marginTop:'20px'}}>
                    <div style={{fontWeight:'bold',fontSize:'18px'}}>Cộng đồng hỗ trợ</div>
                   <p>Địa chỉ: Tầng 3, Tòa nhà 24T3 Thanh Xuân Complex, , </p>
                   <p>Số 6 Lê Văn Thiêm</p>
                   <p>Phường Thanh Xuân Trung, Quận Thanh Xuân,</p>\
                   {/* <p> Thành phố Hà Nội, Việt Nam</p> */}
                </div>
                <div style={{marginTop:'20px'}}>
                    <li> <img src='https://lh3.googleusercontent.com/jI8PMUZrs7XVfhw3PCZNpxhfuIvJm6LdngwS13r8xNQAn8b-8Ae1uAf4chidWo32Rc5bBxnSxYJG-kPGNM8dI8eIm_hfCiBk=rw-w200'></img></li>
                    <li> <img src='https://lh3.googleusercontent.com/jI8PMUZrs7XVfhw3PCZNpxhfuIvJm6LdngwS13r8xNQAn8b-8Ae1uAf4chidWo32Rc5bBxnSxYJG-kPGNM8dI8eIm_hfCiBk=rw-w200'></img></li>
                        
                </div>
    </div>  
</div>
  )
}
