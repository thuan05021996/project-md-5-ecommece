import React from "react";

export default function Fogotpassword() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        gap: "20px",
        background: "rgb(248,248,252)",
      }}
    >
      <input placeholder="Nhập email để đặt lại mật khẩu" type="text" />
      <input placeholder="Mật khẩu mới" type="text" />
      <input placeholder="Nhập lại mật khẩu" type="text" />
    </div>
  );
}
