const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')


router.get('/', (req, res) => {
    res.render('homepage.ejs')
})
module.exports = router;
