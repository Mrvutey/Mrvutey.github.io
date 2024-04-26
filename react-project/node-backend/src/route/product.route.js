const ctr_product = require("../controller/product.controller")
const {upload} = require("../config/helper");
const { CheckToken } = require("../controller/employee.controller");
const product = (app) => {
    app.get("/api/product/getlist",ctr_product.getList);
    app.post("/api/product/create",upload.single("image"),ctr_product.create);
    app.put("/api/product/update",upload.single("image"),ctr_product.update);
    app.delete("/api/product/delete",ctr_product.remove);
}
module.exports = product;