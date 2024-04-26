const db = require("../config/db") 
const {logError,isEmptyOrNull, removeFile} = require("../config/helper");

const getList = async (req,res) => {
    try{
        var {
            txt_search,
            status,
            category_id
        } = req.query;
        var sql = "SELECT * FROM product WHERE 1=1 "
        var sqlWher = "";
        var param = {}
        if(!isEmptyOrNull(txt_search)){
            sqlWher += " AND Name LIKE :txt_search"
            param["txt_search"] = "%"+txt_search+"%"
        }
        if(!isEmptyOrNull(status)){
            sqlWher += " AND Status = :status"
            param["status"] = status;
        }
        if(!isEmptyOrNull(category_id)){
            sqlWher += " AND CategoryId = :category_id"
            param["category_id"] = category_id;
        }
        sql = sql + sqlWher;
        const [list] = await db.query(sql,param)
        const [category] = await db.query("SELECT * FROM category ")
        res.json({
            list: list,
            category : category
        })
    }catch(err){
        logError("product.getList",err,res)
    }
}

const create = async (req,res)=>{
    // CategoryId,Name ,Description, Qty, Price, Discount, Image, Status
    try{
        var {
            CategoryId,
            Name,
            Description,
            Qty,
            Price,
            Discount,
            Status
        } = req.body;
        var Image = null;
        if(req.file){
            Image = req.file.filename //get image name for store in image column in db
        }
        var message = {}; // empty object
        if(isEmptyOrNull(Name)){
            message.Name = "Name required!"
        }
        if(isEmptyOrNull(Qty)){
            message.Qty = "Qty required!"
        }
        if(isEmptyOrNull(Price)){
            message.Price = "Price required!"
        }
        if(Object.keys(message).length > 0){
            res.json({
                error:true,
                message:message
            })
            return false;   
        }
        var sql = "INSERT INTO product (CategoryId, Name ,Description, Qty, Price, Discount, Image, Status) VALUES (:CategoryId, :Name, :Description, :Qty, :Price, :Discount, :Image, :Status)";
        var param = {
            CategoryId,
            Name,
            Description,
            Qty,
            Price,
            Discount,
            Image,
            Status
        }
        const [data] = await db.query(sql,param);
        res.json({
            data:data,
            message : "Product save successfully!"
        })
    }catch(err){
        logError("product.create",err,res)
    }
}

const update = async (req,res) => {
    try{
        var {
            Id,
            CategoryId,
            Name,
            Description,
            Qty,
            Price,
            Discount,
            Status
        } = req.body;
        var Image = null;
        if(req.file){
            Image = req.file.filename // change image | new image
        }else{
            Image = req.body.PreImage // get Old image
        }
        var message = {}; // empty object
        if(isEmptyOrNull(Id)){
            message.Id = "Id required!"
        }
        if(isEmptyOrNull(Name)){
            message.Name = "Name required!"
        }
        if(isEmptyOrNull(Qty)){
            message.Qty = "Qty required!"
        }
        if(isEmptyOrNull(Price)){
            message.Price = "Price required!"
        }
        if(Object.keys(message).length > 0){
            res.json({
                error:true,
                message:message
            })
            return false;   
        }
        var param = {
            Id,
            CategoryId,
            Name,
            Description,
            Qty,
            Price,
            Discount,
            Status,
            Image
        }
        const [dataInfo] = await db.query("SELECT * FROM product WHERE Id=:Id",{Id:Id});
        if(dataInfo.length > 0){
            var sql = "UPDATE product SET CategoryId=:CategoryId, Name=:Name ,Description=:Description, Qty=:Qty, Price=:Price, Discount=:Discount, Image=:Image, Status=:Status WHERE Id = :Id";
            const [data] = await db.query(sql,param);
            if(data.affectedRows){
                if(req.file && !isEmptyOrNull(req.body.Image)){
                    await removeFile(req.body.Image) // remove old file
                }
            }
            res.json({
                message: (data.affectedRows != 0 ? "Update success" : "Not found"),
                data:data
            })
        }else{
            res.json({
                message: "Not found",
                error:true
            })
        }
    }catch(err){
        logError("product.update",err,res)
    }
}

const remove = async (req,res)=>{
    try{
            var param = {
                Id : req.body.Id
            }
            const [dataInfo] = await db.query("SELECT * FROM product WHERE Id=:Id",param);
            if(dataInfo.length > 0){
                var sql = "DELETE FROM product WHERE Id = :Id"
                const [data] = await db.query(sql,param);
                if(data.affectedRows){
                    // if delete success then unlink|remove file
                    // filename?
                    await removeFile(dataInfo[0].Image) // Get image from 
                }
                res.json({
                    message: data.affectedRows != 0 ? "Remove success" : "Not found",
                    data:data
                })
            }else{
                res.json({
                    message:  "Not found",
                    error:true
                }) 
            }
            
    }catch(err){
        logError("product.remove",err,res)
    }
}
module.exports = {getList, create, update, remove}