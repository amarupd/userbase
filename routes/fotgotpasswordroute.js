const dailyController=require('../controller/forgotpassword')

const drouter=require('express').Router()

drouter.post("/enterMobileNumber",dailyController.forgot)

drouter.post("/changePassword",dailyController.otpverify)

module.exports=drouter;