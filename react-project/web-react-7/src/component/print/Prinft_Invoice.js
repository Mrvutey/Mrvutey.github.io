import React from "react";

export const Prinft_Invoice = React.forwardRef((props, ref) => {
    const image = "";
    const brand_name = "";
    const order_info = {

    }
    const order_item = [
      {
        id:1,
        name:"Macbook Pro 2021",
        price :2200,
        qty : 1,
        discount : 0,
      },
      {
        id:1,
        name:"Macbook Pro 2022",
        price :2600,
        qty : 2,
        discount : 0,
      }
    ]
    return (
      <div ref={ref} style={{padding:15,paddingTop:25}} id='element-to-download-as-pdf'>
        <div style={{display:'flex',justifyContent:'space-between',borderBottom:"1px solid ",marginBottom:20,paddingBottom:10}}>

        <div style={{display:'flex',flexDirection:'row'}}>
          <div>
            <img
              width={50}
              src={require("../../assets/image/nit.jpeg")}
            />
             <img
              width={50}
            //   src={"https://zandokh.com/image/catalog/banner/2024/collection/Life-style.jpg"}
            //   src={{
            //     ir
            //   }}
            />
          </div>
          <div style={{marginLeft:15}}>
            <div style={{fontWeight:'bold',fontSize:16}}>NIT COFFE</div>
            <div>Your Choice</div>
          </div>
        </div>

        <div style={{textAlign:"right",alignItems:'flex-end'}}>
          <div>Invoice Date : 01/01/2024</div>
          <div>Create By : Mr. Boren</div>
          <div>Customer : General</div>
        </div>

        </div>
        <div style={{fontSize:18,fontWeight:'bold',textAlign:'center',paddingBottom:10}}>Invoice</div>
        <div>
          <table style={{width:'100%'}}>
            <thead>
              <tr style={{borderBottom:"1px solid #eee",marginBottom:5}}>
                <th>Id</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th style={{textAlign:'right'}}>Total</th>
              </tr>
            </thead>
            <tbody>
             {order_item.map((item,index)=>(
              <tr style={{borderBottom:"1px solid #eee",marginBottom:5}}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
                <td style={{textAlign:'right'}}>{item.qty * item.price}</td>
              </tr>
             ))}
            </tbody>
          </table>
          <div style={{display:"flex",justifyContent:'flex-end',alignItems:'flex-end',marginTop:25}}>
            <div>
              <div style={{display:'flex'}}>
                <div style={{width:130,textAlign:'right'}}>Sub Total :</div>
                <div style={{width:60,textAlign:'right'}}>200$</div>
              </div>
              <div style={{display:'flex'}}>
                <div style={{width:130,textAlign:'right'}}>Discount :</div>
                <div  style={{width:60,textAlign:'right'}}>0</div>
              </div>
              <div style={{display:'flex'}}>
                <div style={{width:130,textAlign:'right'}}>Tax :</div>
                <div  style={{width:60,textAlign:'right'}}>0</div>
              </div>
              <div style={{display:'flex'}}>
                <div style={{width:130,textAlign:'right',fontWeight:'bold'}}>Total :</div>
                <div style={{width:60,textAlign:'right',fontWeight:'bold'}}>200$</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
});