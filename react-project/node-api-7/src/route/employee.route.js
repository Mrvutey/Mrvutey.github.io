const employee_controller = require("../controller/employee.controller")
const {CheckToken} = require("../controller/employee.controller")
const employee = (app) => {
    app.get("/api/employee/getlist", employee_controller.getList);
    app.get("/api/employee/getone", employee_controller.getOne);
    app.post("/api/employee/create", employee_controller.create);
    app.post("/api/employee/setPassword", employee_controller.setPassword);
    app.post("/api/employee/login", employee_controller.login);
    app.post("/api/refresh_token",employee_controller.refresh_token);
    
    app.put("/api/employee/update", employee_controller.update);
    app.delete("/api/employee/delete", employee_controller.remove);
}
module.exports = employee;


// 11
// 12
// 13 



// 1 2 3 
// 0 10 20
// (page - 1) * 10 
// 1 = > 0
// 2 = > 10
// 3 = > 20