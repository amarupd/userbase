const dailyController=require('../controller/forgotpassword')

const drouter=require('express').Router()

drouter.post("/enterMobileNumber",dailyController.forgot)

//drouter.post("/changePassword",dailyController.otpverify)

drouter.put("/enterMobileNumber",dailyController.otpverify)

module.exports=drouter;