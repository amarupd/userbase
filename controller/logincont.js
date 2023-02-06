const db = require("../models")
const loginUser = db.logins;
const sequelize = require('../sequelizetempelate')


const { QueryTypes } = require('sequelize');

const details = async (req, res) => {
    let times = await loginUser.findAll({})
    res.status(200).send(times)
}

const credential = async (req, res) => {
    const userID = req.body.userID
    const password = req.body.password
    
   
    const user = await sequelize.query(`SELECT userID FROM logins WHERE userID =${userID}`,
    {
        type: QueryTypes.SELECT
    });
    const pass = await sequelize.query(`SELECT password FROM logins WHERE userID =${userID}`,
    {
        type: QueryTypes.SELECT
    });
    console.log(user,pass);
    // res.status(200).send({message:"thank you",data:punchi})
    // let mappedArray = punchou.map(item => item.totaltime);
    // const str=mappedArray.toString();


}





module.exports = {
    details,
    credential
}