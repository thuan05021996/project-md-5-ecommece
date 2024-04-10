
import { Route, Routes } from "react-router-dom";



import Home from "./pages/Home";
import ProductDetails from "./pages/productdetails/ProductDetails";
import AdminProduct from "./pages/admin/adminProduct/AdminProduct";
import AdminCate from "./pages/admin/adminCate/AdminCate";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import InfoUser from "./pages/infoUser/InfoUser";
import Cart from "./pages/Cart/Cart";
import Adminbill from "./pages/admin/AdminBill/Adminbill";
import AdminUser from "./pages/admin/adminUser/AdminUser";
import Adminchart from "./pages/admin/Chart/Adminchart";
import MyBill from "./pages/MyBill/MyBill";
import Listproducts from "./pages/Listproduct/Listproducts";
import ListproductHot from "./pages/Listproduct/ListproductHot";
import ListProductASC from "./pages/Listproduct/ListProductASC";
import ListproductDesc from "./pages/Listproduct/ListproductDesc";
import ListproductSale from "./pages/Listproduct/ListproductSale";
import Listproductnew from "./pages/Listproduct/Listproductnew";
import Fogotpassword from "./pages/fogotpassword/Fogotpassword";

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/admincate" element={<AdminCate />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/infor" element={<InfoUser />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminbill" element={<Adminbill />} />
        <Route path="/adminuser" element={<AdminUser />} />
        <Route path="/adminchart" element={<Adminchart />} />
        <Route path="/mybill" element={<MyBill />} />
        <Route path="/list" element={<Listproducts />} />
        <Route path="/listproducthot" element={<ListproductHot />} />
        <Route path="/listproductasc" element={<ListProductASC />} />
        <Route path="/listproductdesc" element={<ListproductDesc />} />
        <Route path="/listproductsale" element={<ListproductSale />} />
        <Route path="/listproductnew" element={<Listproductnew />} />
        <Route path="/fogotpassword" element={<Fogotpassword />} />

       

      </Routes>
    </>
  );
}

export default App;
