const indexRouter= require('express').Router()
const client= require('./client')
const calendar= require('./calendar')
const office= require('./office')
const security= require('./securities')
const admin = require('./admin')


indexRouter.use("/client", client)
indexRouter.use("/calendar", calendar)
indexRouter.use("/office", office)
indexRouter.use("/security", security)
indexRouter.use("/", admin)

module.exports= indexRouter
