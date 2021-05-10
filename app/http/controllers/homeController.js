
class homeController {
    index(req, res) {
        res.render("./index")
    }
}

module.exports = new homeController();