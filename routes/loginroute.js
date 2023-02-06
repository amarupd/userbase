const dailyController=require('../controller/logincont')

const drouter=require('express').Router()


drouter.get("/getlogin",dailyController.details)

drouter.get("/credential",dailyController.credential)

module.exports=drouter;