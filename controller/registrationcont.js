const db = require("../models")
const addUser = db.registrations;
const sequelize = require('../sequelizetemplate')


const { QueryTypes } = require('sequelize');



/********************************************************************************************** */
const adduser = async (req, res) => {
    // const id = req.body.id
    
    let info = {
        fullname: req.body.fullname,
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        userID: req.body.userID,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    }
const password=req.body.password;
const confirm_password=req.body.confirm_password;
if(password==confirm_password)
{
    const emp = await addUser.create(info)
    // await Timestamp.update({ punchIN: sequelize.literal('CURRENT_TIMESTAMP') })
    res.status(200).send(emp)
}

    // const emp = await addUser.create(info)
    // // await Timestamp.update({ punchIN: sequelize.literal('CURRENT_TIMESTAMP') })
    // res.status(200).send(emp)
}

/********************************************************************************************************************************************** */

// const punchout = async (req, res) => {
//     const id = req.body.empID
//     const date = await sequelize.query(`SELECT CURDATE() as today`,
//     {
//         type: QueryTypes.SELECT
//     });
//     let mapArray = date.map(item => item.today);
//     const st = mapArray.toString();
//     console.log(st);
//     await Timestamp.update({ punchOUT: sequelize.literal('CURRENT_TIMESTAMP') }, { where: { empID: id, date: st } })
//     // await Timestamp.update({ total_working_hour: sequelize.query(`SELECT TIMEDIFF(punchOUT, punchIN) from mymaster11.timestamp11s`) }, { where: { empID: id } })
//     const punchi = await sequelize.query(`SELECT punchIN FROM timestamps WHERE empID =${id}`,
//         {
//             type: QueryTypes.SELECT
//         });
//     const puncho = await sequelize.query(`SELECT punchOUT FROM timestamps WHERE empID =${id}`,
//         {
//             type: QueryTypes.SELECT
//         });
//     const punchou = await sequelize.query(`SELECT TIMEDIFF(punchOUT, punchIN) as totaltime FROM timestamps WHERE empID =${id} `,
//         {
//             type: QueryTypes.SELECT
//         });
//     res.status(200).send({ message: "thank you", data: puncho })
//     let mappedArray = punchou.map(item => item.totaltime);
//     const str = mappedArray.toString();

//     console.log(str);

//     if (punchi != 'NULL' || puncho != 'NULL') {
//         await Timestamp.update({ missed_punch: 0 }, { where: { empID: id } })  /// yaha update karna h dimaaag lagao yhi pe date wala karna h
//     } else {
//         await Timestamp.update({ missed_punch: 1 }, { where: { empID: id } }) /// yaha update karna h dimaaag lagao yhi pe date wala karna h
//     }


//     await Timestamp.update({ total_working_hour: str }, { where: { empID: id } })

// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const details = async (req, res) => {
    let times = await addUser.findAll({})
    res.status(200).send(times)
}



module.exports = {
    adduser,
    punchout,
    details

}