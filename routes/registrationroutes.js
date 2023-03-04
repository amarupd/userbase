const dailyController=require('../controller/registrationcont')

const drouter=require('express').Router()


drouter.post("/user",dailyController.adduser)

drouter.get("/user",dailyController.details)


module.exports=drouter;