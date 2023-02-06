const dailyController=require('../controller/logincont')

const drouter=require('express').Router()


drouter.get("/getlogin",dailyController.details)

module.exports=drouter;