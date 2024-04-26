const ctr_order_status = require("../controller/order_status.controller")
const order_status = (app) => {
    app.get("/api/order_status/getlist",ctr_order_status.getList);
    app.post("/api/order_status/create",ctr_order_status.create);
    app.put("/api/order_status/update",ctr_order_status.update);
    app.delete("/api/order_status/delete",ctr_order_status.remove);
}
module.exports = order_status;