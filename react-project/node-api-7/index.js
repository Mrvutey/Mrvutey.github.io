const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.json()); // allow json
app.use(cors({ // origin 'http://localhost:3000' has been blocked by
    "origin": "*",
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}))

app.get("/",(req,res)=>{
    res.send("Hello Express");
})

const role = require("./src/route/role.route") 
const category = require("./src/route/category.route") 
const order_payment_method = require("./src/route/order_payment_method.route") 
const order_status = require("./src/route/order_status.route") 
const customer = require("./src/route/customer.route") 
const employee = require("./src/route/employee.route") 
const product = require("./src/route/product.route") 
const pos = require("./src/route/pos.route") 
const invoice = require("./src/route/invoice.route") 


role(app); 
category(app);
order_payment_method(app);
order_status(app);
customer(app);
employee(app);
product(app);
pos(app);
invoice(app);

const port = 8081;
app.listen(port,()=>{
    console.log("http://localhost:"+port)
})



