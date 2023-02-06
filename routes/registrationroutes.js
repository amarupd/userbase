const dailyController=require('../controller/registrationcont')

const drouter=require('express').Router()


drouter.post("/adduser",dailyController.adduser)

drouter.get("/getdetails",dailyController.details)

module.exports=drouter;