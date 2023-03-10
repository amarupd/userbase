const db = require("../models")
const addUser = db.registrations;
const sequelize = require('../sequelizetempelate')
var CryptoJS = require("crypto-js")
const axios = require('axios')
const redis = require("redis");
const { promisify } = require('util');
const redisPort = "redis://default:ovDFb4qIVC7PoaIdIDlsaE4ymM97Aaf3@redis-12561.c264.ap-south-1-1.ec2.cloud.redislabs.com:12561"
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})

const { QueryTypes } = require('sequelize');

//var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
// const seq=oop;
const otpLogin = async (req, res) => {
    var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const mobile_number = req.body.mobile_number
    const user = await sequelize.query(`SELECT mobile_number FROM registrations WHERE mobile_number ='${mobile_number}'`,
        {
            type: QueryTypes.SELECT
        });
    let uID = user.map(item => item.mobile_number);
    const str = uID.toString();
    console.log(str);

    console.log(seq)
    // const compPasswordHash = await bcrypt.compare(password,passwordHash)
    // console.log(compPasswordHash);

    if (mobile_number == str) {
        // const url = `https://bulksms.analyticsmantra.com/sendsms/sendsms.php?username=SUNSURRYA&password=tech321&type=TEXT&sender=MMSTER&mobile=${mobile_number}&message=Use%20${seq}%20as%20OTP%20to%20login%20into%20MyMaster11&PEID=1201161650796863916&HeaderId=1205161650964871534&templateId=1207161736910206136`;
        // let response = await axios.get(url);
        // console.log(response);
        var ciphertext = CryptoJS.AES.encrypt(`${mobile_number}.${seq}`, `${seq}`).toString();
        console.log(ciphertext)
        client.setex(mobile_number, 600, `${ciphertext}`);
        res.status(200).send({ message: `otp is ${seq} sent succesfull`, data: ciphertext })
        console.log(`otp sent succesfull ${seq}`);
    }
    else {
        res.status(200).send(`${mobile_number} is not registered with us`)
        console.log(`${mobile_number} is not registered with us`);
    }

}

const otpverify = async (req, res) => {
    // const seq=otpLogin();
    // console.log('hitted otp verification');
    const mobileno = req.body.mobile_number
    // let results =client.get(`${mobileno}`);
    // console.log(`what fetched from redis is ${results}`)

    const getAsync = promisify(client.get).bind(client);
    const value = await getAsync(`${mobileno}`);
    // console.log(value);
    // console.log(`value from redis is ${value}`);

    const OTP = req.body.otp
    const passcode = req.body.hash

    if (value === passcode) {
        var bytes = CryptoJS.AES.decrypt(value, `${OTP}`);
        // console.log(`bytes is ${bytes}`);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(`original text is ${originalText}`);
        var string = originalText.split(".");
        const m = string[0];
        const otp = string[1];
        console.log(m, otp);

        if (m == mobileno && OTP == otp) {
            // const { value } = validateSignup(pass)
            // const passwordHash = await bcrypt.hash(pass, 10)
            // console.log(passwordHash);

            let employeee = await addUser.findOne({ where: { mobile_number: mobileno } })
            res.status(200).send({ meassage: 'logged in succesfully', data: employeee })
            // console.log(employeee)
        }
        else {
            res.status(400).send('invalid otp')
        }
    }


}

module.exports = {
    otpLogin,
    otpverify
}