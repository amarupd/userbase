const db = require("../models")
const loginUser = db.logins;
const addUser = db.registrations;
const addOtp = db.otps;
const bcrypt = require('bcryptjs')
const sequelize = require('../sequelizetempelate')
