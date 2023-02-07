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
    
   
    const user = await sequelize.query(`SELECT userID,password FROM logins WHERE userID ='${userID}'`,
    {
        type: QueryTypes.SELECT
    });
      
    
    let uID = user.map(item => item.userID);
    const str=uID.toString();

    let pass = user.map(item => item.password);
    const pstr=pass.toString();

    console.log(str,pstr);

    if(userID==str && password==pstr)
    {
        res.status(200).send({message:"succesfully login",data:user})
    }else if(userID!=str)
    {
        res.status(400).send({message:"user not found"})
    }
    else{
        res.status(400).send({message:"userID and password didn't match"})
    }


}





module.exports = {
    details,
    credential
}