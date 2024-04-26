const db = require("../config/db") 
const {logError,isEmptyOrNull, removeFile} = require("../config/helper");

const getList = async (req,res) => {
    try{
        var sql = "",param;
        sql = " SELECT "+
            " i.*,"+
            " CONCAT(c.Firstname,'-',c.Lastname) CustomerName,"+
            " CONCAT(e.Firstname,'-',e.Lastname ) EmployeeName,"+
            " pm.Name PaymentMathod,"+
            " os.Name OrderStatus"+
        " FROM `invoice` i  "+
        " INNER JOIN customer c on (i.CustomerId = c.Id) "+
        " INNER JOIN employee e on (i.EmployeeId = e.Id) "+
        " INNER JOIN order_payment_method pm on (i.OrderPaymentMethodId = pm.Id) "+
        " INNER JOIN order_status os on (i.OrderStatusId = os.Id) ORDER BY i.Id DESC"
        const [list] = await db.query(sql,param)
        res.json({
            list:list
        })
    }catch(err){
        logError("product.getList",err,res)
    }
}

const invoice_details =  async (req,res) =>{
    try{
        var Id = req.params.Id;
        var sql = "";
        sql = "SELECT "+
            " ivd.Id,"+
            " ivd.InvoiceId,"+
            " ivd.Qty,"+
            " ivd.Price,"+
            " ivd.Discount,"+
            " ivd.ProductId,"+
            " p.Name,"+
            " p.Image"+
        " FROM invoice_details ivd"+
        " INNER JOIN product p on (ivd.ProductId = p.Id)"+
        " WHERE ivd.InvoiceId = :Id"
        const [list] = await db.query(sql,{Id:Id})
        res.json({
            list:list
        })
    }catch(err){
        logError("product.getList",err,res)
    }
}




module.exports = {getList,invoice_details}