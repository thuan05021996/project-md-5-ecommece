import React from 'react'
import "./register.scss"
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { useFormik } from "formik";
import { useState } from 'react';
import * as Yup from 'yup';
import { InfoCircleOutlined } from '@ant-design/icons'

import { Button, Input, Space, message } from 'antd';
import axios from 'axios';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import publicAxios from '../../config/pulic.axios';

export default function Register() {
    const [check, setCheck] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = React.useState(true);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .min(5, "Cần nhiều hơn 5 kí tự")
            .max(20, "Không được nhập quá 20 kí tự")
            .required("Không được để trống"),
          email: Yup.string()
            .email("email chưa đúng định dạng")
            .required("Không được để trống"),
       
            phone: Yup.string()
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Không đúng định dạng sdt')
            .required('Nhập số điện thoại'),
    
          password: Yup.string()
            .min(8, "Nhập nhiều hơn 8 kí tự")
            .max(20, "không đợc quá 20kys tự")
            .matches(/[0-9]/, 'Mật khẩu phải chứa 1 số')
            .required("Không được để trống"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
            .required("Không được để trống"),
        }),
    
        onSubmit: async (values, { resetForm }) => {
        //   console.log(values)
      try {
        const result = await publicAxios.post("/api/v1/auth/register", values);
    //   console.log(result.data.data.status === 200);

    if(result.data.message === "Bạn đã đăng ký thành công "){
        navigate("/login")
       message.success(result.data.message,2);
    }else{
      message.error(result.data.message,2);
    }
      } catch (error) {
        console.log(error);
      }
          resetForm();
        },
      });
  return (
    <div>
      <Header></Header>
      <div className='register'>
        <div className='register-m'>

        <div className='from'>
            <h2> Chào mừng bạn đến với Công ty cổ phần Sói Biển Trung Thực!</h2>
            <p>Sử dụng số điện thoại của bạn để đăng ký, đăng nhập tài khoản của bạn</p>
            <h3>Đăng ký</h3>
            <form onSubmit={formik.handleSubmit} method="post">
            <Space direction="vertical">
                <Input style={{ width: 350 , height: 40 ,color: 'black' }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Tên người dùng"
                    id='name'
                    type="text" />
                     {formik.errors.name && formik.touched.name && (
                    <p style={{ color: "red",fontSize:'14px' }}>{formik.errors.name}</p>
                    )}
                <Input style={{ width: 350 , height: 40 }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="email"
                    id='email'

                    type="text" />
                     {formik.errors.email && formik.touched.email && (
                        <p style={{ color: "red",fontSize:'14px' }}>{formik.errors.email}</p>
                        )}
                <Input style={{ width: 350 , height: 40 }}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    placeholder="Số điện thoại"
                    id='phone'
                    type="text" />
                     {formik.errors.phone && formik.touched.phone && (
                    <p style={{ color: "red",fontSize:'14px' }}>{formik.errors.phone}</p>
                    )}
                <Input.Password style={{ width: 350 , height: 40 }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Mật khẩu"
                    id='password'
                    type="password" />
                     {formik.errors.password && formik.touched.password && (
                    <p style={{ color: "red",fontSize:'14px' }}>{formik.errors.password}</p>
                    )}
                <Input.Password  style={{ width: 350 , height: 40 }}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    placeholder="Nhập lại mật khẩu"
                    id='confirmPassword'
                    type="password" />
                     {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                    <p style={{ color: "red" ,fontSize:'14px'}}>{formik.errors.confirmPassword}</p>
                    )}
                     </Space>
            <div style={{display:'flex',justifyContent:'space-between', gap:'10px', marginTop:'10px'}}>
                    <button type='submit'> Đăng ký </button>
                    <button>Đăng nhập</button>
            </div>
            {/* <Space direction="vertical">
      <Input.Password placeholder="input password" />
      
    </Space> */}
            </form>
           

        </div>
        <div className='check'>
            <p className='p1'> 
            <InfoCircleOutlined style={{color: 'red', marginLeft: '-5px'}}/>
                Vui lòng xác nhận thông tin điều khoản sử dụng, chính sách bảo mật và chính sách thành viên</p>
            <div>
                <input type="checkbox" checked={check} />
                <p> <i style={{color: 'red'}}>*</i>   Bằng việc đánh dấu vào ô này, Tôi xác nhận đã đọc và đồng ý với <strong> Chính sách bảo mật</strong> và <strong>Chính sách thẻ thành viên</strong> của Sói Biển, bao gồm quyền thu thập, sử dụng, và tiết lộ dữ liệu cá nhân của tôi theo pháp luật quy định.</p>
            </div>
        </div>
        </div>



    </div>
    <Footer></Footer>
    </div>
  )
}
