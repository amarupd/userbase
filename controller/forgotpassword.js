const db = require("../models")
const { validateSignup } = require('../validato')
const loginU = db.logins;
const regist = db.registrations;
const bcrypt = require('bcryptjs')
const axios=require('axios')
const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelizetempelate')
var CryptoJS = require("crypto-js")
const redis = require("redis");
const { promisify } = require('util');
const redisPort = "redis://default:ovDFb4qIVC7PoaIdIDlsaE4ymM97Aaf3@redis-12561.c264.ap-south-1-1.ec2.cloud.redislabs.com:12561"
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})
/************************************************************************************************************************************** */

const forgot = async (req, res) => {
    var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const mobile = req.body.mobile_number
    // const url = `https://bulksms.analyticsmantra.com/sendsms/sendsms.php?username=SUNSURRYA&password=tech321&type=TEXT&sender=MMSTER&mobile=${mobile}&message=Use%20${seq}%20as%20OTP%20to%20login%20into%20MyMaster11&PEID=1201161650796863916&HeaderId=1205161650964871534&templateId=1207161736910206136`;
    // let response = await axios.get(url);
    // console.log(response);
    // console.log(`value   hvgcnbdfb   of otp is ${seq}`);
    console.log(`Your otp for changing password is ${seq} do not share it with anyone`);
    var ciphertext = CryptoJS.AES.encrypt(`${mobile}.${seq}`, `${seq}`).toString();
    client.setex(mobile,600, `${ciphertext}`);
    const user = await regist.findOne({ where: { mobile_number: mobile } })
    console.log(user)
    if (!user) {
        res.status(400).send({ message: 'mobile number is not registered please signup' })
    }
    else {
        // Encrypt

        console.log(ciphertext)
        res.status(200).send({ message:`otp sent succesfull ${seq}`,data:ciphertext})

    }

}

const otpverify = async (req, res) => {
    // console.log(`value of otp is ${seq}`);
    const mobileno = req.body.mobile_number
    const OTP = req.body.enter_otp
    const pass = req.body.password
    // let value =client.get(`${mobileno}`,(err,value)=>{
        
    //     return value;
    // });

    const getAsync = promisify(client.get).bind(client);
    const value = await getAsync(`${mobileno}`);
    // console.log(value);
    // console.log(`value from redis is ${value}`);
    var bytes = CryptoJS.AES.decrypt(value,`${OTP}`);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    var string = originalText.split(".");
    // console.log(`string is ${string}`)
    const m = string[0];
    const otp = string[1];
    console.log(m, otp);
    
    if (m == mobileno && otp == OTP) {
        const { value } = validateSignup(pass)
        const passwordHash = await bcrypt.hash(pass, 10)
        console.log(`hashed password is :- ${passwordHash}`);

        let employee = await regist.update({ password: passwordHash, confirm_password: passwordHash }, { where: { mobile_number: mobileno } })
        let employeee = await regist.findOne({ where: { mobile_number: mobileno } })
        const userid = await sequelize.query(`SELECT userID FROM registrations WHERE mobile_number =${mobileno}`,
            {
                type: QueryTypes.SELECT
            })
        let mappedArray = userid.map(item => item.userID);
        const str = mappedArray.toString();
        console.log(str)
        let loginpasscode = await loginU.update({ password: passwordHash }, { where: { userID: str } })   // this is for login table in mysql
        res.status(200).send({ meassage: 'password is changed succesfully', data: employeee })
        console.log(employee)
        console.log(value);
    }
    else {
        res.status(400).send('invalid otp')
    }
}
module.exports = {
    forgot,
    otpverify
}