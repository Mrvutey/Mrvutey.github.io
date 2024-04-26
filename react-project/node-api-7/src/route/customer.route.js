const customer_controller = require("../controller/customer.controller");
const { CheckToken } = require("../controller/employee.controller");
const customer = (app) => {
    app.get("/api/customer/getlist", CheckToken(), customer_controller.getList);
    app.get("/api/customer/getone",CheckToken(),  customer_controller.getOne);
    app.post("/api/customer/create",CheckToken(),  customer_controller.create);
    app.put("/api/customer/update",CheckToken(),  customer_controller.update);
    app.delete("/api/customer/delete",CheckToken(),  customer_controller.remove);
}
module.exports = customer;