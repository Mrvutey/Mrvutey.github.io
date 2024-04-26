
import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {Outlet, useNavigate} from "react-router-dom"
import { getUser, isLogin, logout } from '../../config/helper';
import Logo from "../../assets/image/nit.jpeg"
import ProfileImage from "../../assets/image/profile.jpg"
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Dashboard', '/', <PieChartOutlined />),
  getItem('Customer', 'customer', <DesktopOutlined />),
  getItem('Employee', 'employee', <DesktopOutlined />),
  getItem('POS', 'POS', <DesktopOutlined />),
  getItem('Invoice', 'invoice', <DesktopOutlined />),
  getItem('Product', 'Product', <TeamOutlined />, [
    getItem('Product', 'product'),
    getItem('Category', 'category'),
  ]),
  getItem('Purchase', 'purchase', <UserOutlined />, [
    getItem('Purchase Items', 'purchase1'),
    getItem('Delivery Tracking', 'purchase2')
  ]),
  getItem('Report', 'Report', <UserOutlined />, [
    getItem('Order', 'order'),
    getItem('Sale by cateory', 'sale-by-category'),
    getItem('Sale by customer', 'sale-by-customer')
  ]),
  getItem('System', 'system', <UserOutlined />, [
    getItem('Order Status', 'order-status'),
    getItem('Payment method', 'payment-method'),
    getItem('Role', 'role'),
  ]),
 
  getItem('Logout', 'logout', <DesktopOutlined />),
];

const App = () => {
    const user = getUser();
    const navigate = useNavigate();
    useEffect(()=>{
      if(!isLogin()){
        navigate("/login")
      }
    },[])

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClickMenu = (event) => {
    if(event.key == "logout"){
      logout();
      return;
    }
    navigate(event.key);
  }

  if(!user){
      return null;
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider 
        style={{
          // overflow: 'auto',
          // height: '100vh',
          // position: 'fixed',
          // left: 0,
          // top: 0,
          // bottom: 0,
        }}
          collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
      >
        <div></div>
        <div className="demo-logo-vertical" />
        <div
           style={{
            position: 'sticky',
            // left:  collapsed? 80: 200,
            right:0,
            top: 0,
            zIndex:10
          }}
        >
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline" 
            items={items} 
            onClick={onClickMenu}
          />
        </div>
      </Sider>
      <Layout
        style={{
          // marginLeft:200 //collapsed? 80: 200 ,
        }}
      >
        <div
          style={{
            position: 'sticky',
            // left:  collapsed? 80: 200,
            right:0,
            top: 0,
            zIndex:10
          }}
        >
          <div style={{display:"flex",justifyContent:'space-between',padding:"10px 15px",backgroundColor:'#FFF'}}>
            <div style={{display:"flex"}}>
              <img src={Logo} style={{width:45,objectFit:'contain',borderRadius:40,marginRight:10}} />
              <div>
                <div className='txt_title'>NIT Cambodia</div>
                <div className='txt_normal'>Build Your IT Skill</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <div>
                <div className='txt_normal'>{user?.Firstname}-{user?.Lastname}</div>
                <div className='txt_normal' style={{fontSize:12,textAlign:'right'}}>Admin</div>
              </div>
              <img src={ProfileImage} style={{width:40,objectFit:'contain',borderRadius:20,marginLeft:10}} />
            </div>
          </div>
        </div>

        <Content
          style={{
            margin: '0 0px',
            overflow: 'initial',
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 10,
              minHeight: 360,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
           <Outlet/>
          </div>
        </Content>
       
      </Layout>
    </Layout>
  );
};
export default App;


// import {Outlet,Link,useNavigate, json} from "react-router-dom"
// import { getUser, isLogin, logout } from "../../config/helper";
// import { useEffect } from "react";

// const MainLayout = () => {
//     const user = getUser();
    
//     const navigate = useNavigate();
//     useEffect(()=>{
//         if(!isLogin()){
//             navigate("/login")
//         }
//     },[])
    
//     const onClickHome = () => {
//         // window.location.href="" //refresh page
//         navigate("") // no refresh page
//     }

//     const onClickLogin = () => {
//         // window.location.href="login" 
//         navigate("login")
//     }

//     const onClickRegister = () => {
//         // window.location.href="login" 
//         navigate("register")
//     }

//     const onLogout = () => {
//         logout();
//     }

//     if(!user){
//         return null;
//     }

//     return (
//         <div>
//             <div style={{backgroundColor:"pink",height:80}}>
//                 <div>Brand Name</div>
//                 <div>UserInfo : {user?.Id}-{user?.Firstname}-{user?.Lastname}</div>
//                 <button onClick={onLogout}>Logout</button>
//             </div>
//             <Link to={"/"}>
//                 <button>Home</button>
//             </Link>
//             <Link to={"login"}>
//                 <button>Login</button>
//             </Link>
//             <Link to={"register"}>
//                 <button>Reigster</button>
//             </Link>

//             <a href="/">Home</a>
//             <a href="login">Login</a>
//             <a href="register">Reigster</a>

//             <button onClick={onClickHome}>Btn Home</button>
//             <button onClick={onClickLogin}>Btn Login</button>
//             <button onClick={onClickRegister}>Btn Register</button>


//             <div style={{padding:10,minHeight:600}}>
//                 <Outlet />
//             </div>
//         </div>
//     )
// }

// export default MainLayout;