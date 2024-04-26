const express = require("express");
const app = express();
const {sum,X,Y,PI,getGradByAge} = require("./src/global");

// register route
// app.Method("Route-name",Handler)
app.get("/",(req,res)=>{
    // varible
    // ... 
    var avg = getGradByAge(68.00)
    res.send("Grad : "+avg);
})

app.get("/api/user",(req,res)=>{
    res.send("List user");
})

app.get("/api/product",(req,res)=>{
    res.send("List product");
})

const port = 8081;
app.listen(port,()=>{
    console.log("http://localhost:"+port);
})




// var value1 = 10;
// var value2 = 15;
// var SumValue = sum(value1,value2);
// console.log(SumValue);
// console.log("Value X = "+X);
// console.log("Value Y = "+Y);
// console.log("Value PI = "+PI);
// console.log(getGradByAge(45.88))