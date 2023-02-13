const dailyController=require('../controller/forgotpassword')

const drouter=require('express').Router()

drouter.post("/forgot",dailyController.forgot)

drouter.post("/otpverify",dailyController.otpverify)

module.exports=drouter;