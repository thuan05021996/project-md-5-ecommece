import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import {  Input, Space, message } from 'antd';
import publicAxios from '../../config/pulic.axios';
import { useNavigate } from 'react-router-dom';
import Footer from "./../../components/footer/Footer"
import Header from '../../components/header/Header';
import "./login.scss"
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { Button, Modal } from 'antd';


export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emai, setEmail] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const data= {
        email: emai

      }
      await publicAxios.post("/mail/fogot-password", data);
      message.success("Vui lòng kiểm tra email để đặt lại mật khẩu", 3);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error)
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

    // configfibaes
    const firebaseConfig = {
        apiKey: "AIzaSyC4Z-DIR_wQzHbYuLnb8vFgf3wqCQ1x0ao",
        authDomain: "test3-adf7e.firebaseapp.com",
        projectId: "test3-adf7e",
        storageBucket: "test3-adf7e.appspot.com",
        messagingSenderId: "24802173039",
        appId: "1:24802173039:web:1816626c60f6ef5a742d9a"
      };

      // Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);

// Lấy đối tượng auth từ Firebase
const auth = getAuth();
// Tạo một provider cho đăng nhập bằng Google
const provider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result)
      const user = result.user;
      const userGoogle = {
        name: user.displayName,
        email: user.email,
        password: user.uid
      }

      const res = await publicAxios.post(
        "/api/v1/auth/loginGoogle",
        userGoogle
      )
      console.log(res.data)
     if(res.data.data.active === false){
      message.error("Tài khoản đã bị khoá", 2)
     }else{
      localStorage.setItem("token", JSON.stringify(res.data.token))
      localStorage.setItem("user", JSON.stringify(res.data.data))
      message.success("Đăng nhập thành công", 2)
      navigate("/")
     } 
      if(res.data.data.role === "admin") navigate("/adminproduct")
      else navigate("/")
      
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

    const navigate = useNavigate();
const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email chưa đúng định dạng")
        .required("Không được để trống"),
      password: Yup.string()
        .min(8, "Nhập nhiều hơn 8 kí tự")
		.max(20, "không đợc quá 20kys tự")
		.matches(/[0-9]/, 'Mật khẩu phải chứa 1 số')
        .required("Không được để trống"),
      
    }),

    onSubmit: async (values, { resetForm }) => {
        // console.log(values,"12312312")
      try {
            const res = await publicAxios.post(
              "/api/v1/auth/login",
              values
            )
            // console.log(res.data)
            if(res.data.data.role === "admin") navigate("/adminproduct")
            if(res.data.data.role === "user"){
                if(res.data.data.active === false){
                    message.error("Tài khoản đang bị khoá. Vui lòng liên hệ với admin để biết thêm chi tiết", 3)
                }
                else{
                    message.success(res.data.message,3)
                    localStorage.setItem("token", JSON.stringify(res.data.token))
                    localStorage.setItem("user", JSON.stringify(res.data.data))
                    navigate("/")
                }
            }
      } catch (error : any) {
        message.error(error.response.data.message,3)
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
            <h3>Đăng nhập</h3>
            <form onSubmit={formik.handleSubmit} method="post">
            <Space direction="vertical">
          
                <Input style={{ width: 350 , height: 40 }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="email"
                    id='email'

                    type="text" />
                     {formik.errors.email && formik.touched.email && (
                        <p style={{ color: "red",fontSize:'14px' }}>{formik.errors.email}</p>
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
                     </Space>
                <div style={{display:'flex',justifyContent:'space-between', gap:'10px', marginTop:'10px'}}>
                        <button type='submit'> Đăng nhập </button>
                        <button>Đăng ký</button>
                </div>
            </form>
            
        </div>
        <div className='check'>
            <i
            // onClick={fotgotPassword}
            onClick={showModal}
             style={{fontSize:'14px',marginLeft:'20px'}}>Bạn quên mật khẩu ?</i>
             <p style={{fontWeight:'bold',fontSize:'18px'}}>Đăng nhập bằng :  <img 
                onClick={signInWithGoogle}
            style={{width:'15px',height:'15px', marginLeft:'10px',marginTop:'20px'}}
            src='https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_960_720.png'></img></p>
              
            {/* <button onClick={signInWithGoogle}>Đăng nhập bằng google</button> */}
           
        </div>
        <Modal title="Bạn quên mật khẩu " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Chúng tôi sẽ gửi cho bạn đường dẫn thiết lập lại password  vào email của bạn !</p>
        <input
        placeholder='Nhập địa chỉ email'
         onChange={(e) => setEmail(e.target.value)}
         type="text" name="" id="" />
      </Modal>
        </div>



    </div>
    <Footer></Footer>
   </div>
  )
}
