const router= require('express').Router()
const apiRoutes = require('./api')

router.use('/api', apirRoutes)

module.export = router