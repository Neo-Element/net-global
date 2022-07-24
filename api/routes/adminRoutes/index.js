const indexRouter= require('express').Router()
const client= require('./client')
const calendar= require('./client')
const office= require('./client')
const security= require('./client')


indexRouter.use("/client", client)
indexRouter.use("/calendar", calendar)
indexRouter.use("/office", office)
indexRouter.use("/security", security)

module.exports= indexRouter
