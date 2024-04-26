
// register role route
const role_controler = require("../controller/role.controller")
const role = (app) => {
    // app.method("route_name",call_back_functin);
    app.get("/api/role/getlist",role_controler.getList);
    app.post("/api/role/create",role_controler.create);
    app.put("/api/role/update",role_controler.update);
    app.delete("/api/role/delete",role_controler.remove);
}

module.exports = role;