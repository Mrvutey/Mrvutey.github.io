const ctr_order_payment_method = require("../controller/order_payment_method.controller")
const order_payment_method = (app) => {
    app.get("/api/order_payment_method/getlist",ctr_order_payment_method.getList);
    app.post("/api/order_payment_method/create",ctr_order_payment_method.create);
    app.put("/api/order_payment_method/update",ctr_order_payment_method.update);
    app.delete("/api/order_payment_method/delete",ctr_order_payment_method.remove);
}
module.exports = order_payment_method;