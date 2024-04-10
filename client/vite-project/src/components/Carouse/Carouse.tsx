import React from 'react'
import { Carousel } from 'antd';
import "./carouse.scss"

const contentStyle: React.CSSProperties = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
export default function Carouse() {
  return (
    <div className='slide'>
    <Carousel autoplay>
        <div >
        <img 
        src='https://lh3.googleusercontent.com/fsYTcdObYz7aBdf6PSgoMr6oZUGVgJhIZkPzeRV1_83gwf1sj5kQpLl50jzqbq4GAAfnbI9BiQNPzAzIM3pQtqoCS-QmwV8=rw-w1920'
        className ="content" style={contentStyle}></img>
        </div>
        <div>
        <img 
        src='https://lh3.googleusercontent.com/2Ej1WCDsGbW6NXtv73AFlQOe9XlGSog1MT-Apm4uObyZYahniYV7KhsuI6_6etreWOh7JBHaNpm0IlzSLe6PEz4TdgPAcT-h=rw-w1920'
        className ="content1" style={contentStyle}></img>
        </div>
        <div>
        <img 
        src='https://lh3.googleusercontent.com/YSyVMxLMTyyeRZnS5E-qw42g3M3FCXh3xjTMX1K8lK76OxxzpY-cJ2Kuz9JUuJ42kZsz7nc21ESlQapEK01U_8Moc0JY7M0=rw-w1920'
        className ="content2" style={contentStyle}></img>
        </div>
        <div>
        <img
        src='https://lh3.googleusercontent.com/OOUztZtG8l0BtgTTxI4KVcUEMYl4whkD46u_yt2Itad09Cv33Tp2ZZOIExQ0lEebcAUDoLX8yCnpJRY5w_EhbUk2YXT5GYAKCw=rw-w1920'
         className ="content3" style={contentStyle}></img>
        </div>
    </Carousel>
    <div className='slide_div'>
        <div><img src="https://lh3.googleusercontent.com/rMxqTbHpV_9S6oWdrSO3LYLG9R21IZs75D45y01XQTxrC7FEEgal0wdmiJ-AHzo3aNNrFqceBsj0JoUOxEonWiuhjD8K5fE=rw-w297" alt="" /></div>
        <div><img src="https://lh3.googleusercontent.com/VlzZxoxsnPfbJmLhz9kAIpYICfGpYHk1oVH6XhuiRBg7omiJdSbj9zFXs_FuZpGEOrkbiv3YWHx3SU2auYsx9Re2wPVmgx5b=rw-w296" alt="" /></div>
        <div> <img src="https://lh3.googleusercontent.com/X4csLRv_rr57DkfluBonx9ZkH9iPxI5oy4opjwsLfA008doGGCl2IxcdVCDrXJSXWThVUoEZAx0HMwe6SWE-Na5637TDAnFN=rw-w296" alt="" />3</div>
        <div> <img src="https://lh3.googleusercontent.com/p7NHn7WNkTQ77tUUx-cneoP8YB0UwVu-C83CtWmty_xU1j-loIesM1VFzX8zk6jVVxDt9j-9EBZDAzhvFp9YiB0US-CIA-0=rw-w296" alt="" />4</div>

    </div>
</div>
  )
}
