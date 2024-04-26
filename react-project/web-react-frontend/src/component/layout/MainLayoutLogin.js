
import {Outlet} from "react-router-dom"
import Logo from "../../assets/image/nit.jpeg"
const MainLayoutLogin = () => {
    return (
        <div>
           <div style={{display:"flex",minHeight:60,backgroundColor:"#eee",alignItems:'center',padding:'10px 20px'}}>
                <div style={{display:"flex"}}>
                    <img src={Logo} style={{width:50,objectFit:'contain',borderRadius:50,marginRight:10}} />
                    <div>
                        <div className='txt_brand_name'>NIT Cambodia</div>
                        <div className='txt_normal'>Build Your IT Skill</div>
                    </div>
                </div>
           </div>
           <Outlet />
        </div>
    )
}

export default MainLayoutLogin;