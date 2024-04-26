const db = require("../config/db") 
const {logError,isEmptyOrNull, removeFile} = require("../config/helper");

const initInfo = async (req,res) => {
    try{
        const [payment_method] = await db.query("Select * FROM order_payment_method")
        const [customer] = await db.query("Select Id, CONCAT(firstname,' ',lastname,' ', Tel) AS Name FROM customer")
        res.json({
            payment_method: payment_method,
            customer : customer
        })
    }catch(err){
        logError("product.getList",err,res)
    }
}

const searchProduct = async (req,res) => {
    try{
        var {
            txt_search // product id code
        } = req.query;
        if(isEmptyOrNull(txt_search)){
            res.json({
                list: []
            })
            return false
        }
        var sql = "SELECT * FROM product WHERE Status = 1 "
        var sqlWher = "";
        var param = {}
        if(!isEmptyOrNull(txt_search)){
            sqlWher += " AND Id = :txt_search"
            param["txt_search"] = txt_search
        }
        sql = sql + sqlWher;
        const [list] = await db.query(sql,param)
        res.json({
            list: list,
            user_that_requst : req.user_id
        })
    }catch(err){
        logError("product.getList",err,res)
    }
}

const findOrderQtyById = () => {

}

const checkout = async (req,res)=>{
    var con = await db.getConnection();
    try{
        await con.beginTransaction();
        var {
           CustomerId,
           PaymentMethodId,
           TotalPaid,
           Product, // [{},{}]
        } = req.body;
        var message = {}; 
        if(isEmptyOrNull(CustomerId)){
            message.CustomerId = "CustomerId required!"
        }
        if(isEmptyOrNull(PaymentMethodId)){
            message.PaymentMethodId = "PaymentMethodId required!"
        }
        if(Product.length == 0){
            message.Product = "Please Add Product to order!"
        }
        if(Object.keys(message).length > 0){
            res.json({
                error:true,
                message:message
            })
            return false;   
        }
        var TotalQty=0;
        var idProduct = []
        Product.map((item,index)=>{
            idProduct.push(item.Id)
            TotalQty += item.QtyOrder;
        })
        idProduct.join(",").toString();
        var sqlFindProductOrder = "SELECT * FROM Product WHERE Id IN (:idProduct) "
        const [data] = await db.query(sqlFindProductOrder,{idProduct:idProduct});

        var TotalAmount =0;
        data.map((item,index)=>{
            var QtyOrderTmp = 0
            Product.map((item1,index1)=>{
                if(item.Id == item1.Id){
                    QtyOrderTmp = Number(item1.QtyOrder);
                    Product[index].Price = Number(item.Price);
                    Product[index].QtyOrder = Number(item1.QtyOrder);
                    Product[index].Discount = Number(item.Discount);
                }
            })
            var DisPrice = (QtyOrderTmp * Number(item.Price)) * Number(item.Discount)/100
            TotalAmount += ( (QtyOrderTmp * Number(item.Price)) - DisPrice);
        })
        var sqlInvoice = "INSERT INTO invoice "+
        " (CustomerId,EmployeeId,OrderStatusId,OrderPaymentMethodId,TotalQty,TotalAmount,TotalPaid) "+
        " VALUES "+
        " (:CustomerId,:EmployeeId,:OrderStatusId,:OrderPaymentMethodId,:TotalQty,:TotalAmount,:TotalPaid) ";
        var OrderStatusId = TotalPaid < TotalAmount ? 3 : 4
        var sqlInvoiceParam = {
            CustomerId : CustomerId,
            EmployeeId : req.user_id,// req.user_id,
            OrderStatusId : OrderStatusId,
            OrderPaymentMethodId:PaymentMethodId,
            TotalQty:TotalQty,
            TotalAmount:TotalAmount,
            TotalPaid:TotalPaid
        }
        var [dataInvoice] = await db.query(sqlInvoice,sqlInvoiceParam); // create invoice

        Product.map( async (item,index)=>{
            // insert data to invoice details
            var sqlInvoiceDetails = " INSERT INTO invoice_details "+
            " (InvoiceId,ProductId,Qty,Price,Discount) "+
            " VALUES "+
            " (:InvoiceId,:ProductId,:Qty,:Price,:Discount) ";
            var sqlInvoiceDetailsParam = {
                InvoiceId : dataInvoice.insertId,
                ProductId : item.Id,
                Qty : item.QtyOrder,
                Price : item.Price,
                Discount : item.Discount,
            }
            var [sqlInvoiceDetails] = await db.query(sqlInvoiceDetails,sqlInvoiceDetailsParam)

            // restok in product 
            var sqlProductStock = " UPDATE product SET Qty=(Qty-:QtyOrder) WHERE Id = :Id "
            var sqlProductStockParam = {
                QtyOrder : item.QtyOrder,
                Id : item.Id,
            }
            var [sqlProductStock] =  await db.query(sqlProductStock,sqlProductStockParam)
        })
        await con.commit();
        res.json({
            message : "Order Success",
        })
    }catch(err){
        await con.rollback();
        logError("pos.checkout",err,res)
    }
}


module.exports = {initInfo, checkout,searchProduct}