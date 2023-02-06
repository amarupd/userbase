const db = require("../models")
const loginUser = db.logins;

const details = async (req, res) => {
    let times = await loginUser.findAll({})
    res.status(200).send(times)
}




module.exports = {
    details
}