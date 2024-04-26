const db = require("../config/db")
const { logError, isEmptyOrNull } = require("../config/helper")

const getList = async (req, res) => {
    try {
        var {
            txt_search,
            status
        } = req.query;
        var param = {}
        var sql = "SELECT * FROM customer WHERE 1=1"
        if(!isEmptyOrNull(txt_search)){
            sql += " AND (Firstname LIKE :txt_search OR Lastname LIKE :txt_search) "
            param["txt_search"] = "%"+txt_search+"%"
        }
        if(!isEmptyOrNull(status)){
            sql += " AND Status = :status"
            param["status"] = status
        }
        const [list] = await db.query(sql,param)

        res.json({
            list : list,
            current_user_id : req.user_id
        })
    } catch (err) {
        logError("customer.getList", err, res)
    }
}

const getOne = async (req, res) => {
    try {
        const sql = "SELECT * FROM customer WHERE Id = :Id"
        const param = {
            Id: req.body.Id
        }
        const [list] = await db.query(sql, param)
        res.json({
            message: 'This is get one route.',
            data: Object.assign(...list)
        })
    } catch (err) {
        logError("customer.getOne", err, res)
    }
}

const create = async (req, res) => {
    try {
        var sql = `INSERT INTO customer
            (Firstname, Lastname, Gender, Dob, Tel, Email, Address, Status)
            VALUES (:Firstname, :Lastname,:Gender, :Dob, :Tel, :Email, :Address, :Status)`;
        var param = {
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            Gender: req.body.Gender,
            Dob: req.body.Dob,
            Tel: req.body.Tel,
            Email: req.body.Email,
            Address: req.body.Address,
            Status: req.body.Status,
            // CreteBy : req.user_id
        }
        const [data] = await db.query(sql, param);
        res.json({
            message: 'Create successfully',
            data
        })
    } catch (err) {
        logError("customer.create", err, res)
    }
}

const update = async (req, res) => {
    try {
        var sql =`UPDATE customer SET
            Firstname = :Firstname, Lastname = :Lastname, Gender = :Gender, Dob = :Dob, Tel = :Tel, Email = :Email, Address = :Address, Status = :Status
            WHERE Id = :Id`;
        var param = {
            Id: req.body.Id,
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            Gender: req.body.Gender,
            Dob: req.body.Dob,
            Tel: req.body.Tel,
            Email: req.body.Email,
            Address: req.body.Address,
            Status: req.body.Status
        }
        const [data] = await db.query(sql, param);
        res.json({
            message: (data.affectedRows != 0 ? "Update successfully" : "Not found"),
            data
        })
    } catch (err) {
        logError("customer.update", err, res)
    }
}

const remove = async (req, res) => {
    try {
        var sql = "DELETE FROM customer WHERE Id = :Id"
        var param = {
            Id: req.body.Id
        }
        const [data] = await db.query(sql, param);
        res.json({
            message: data.affectedRows != 0 ? "Delete successfully" : "Not found",
            data
        })
    } catch (err) {
        logError("customer.remove", err, res)
    }
}

module.exports = {
    getList,
    getOne,
    create,
    update,
    remove
}