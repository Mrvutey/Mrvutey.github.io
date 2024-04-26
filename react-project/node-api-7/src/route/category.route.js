
const controller = require("../controller/category.contoller")
const category = (app) => {
    app.get("/api/category",controller.getList)
    app.post("/api/category/getone",controller.getOne)
    app.post("/api/category",controller.create)
    app.put("/api/category",controller.update)
    app.delete("/api/category",controller.remove)
}
module.exports = category;