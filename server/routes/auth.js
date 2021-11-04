const Router = require('express')
const router = new Router()
const { check } = require("express-validator")
const authMiddleware = require('../middlewaree/authMiddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')
const controller = require('../controller/authController');

router.post('/registration',
    check('username', "Username can't e empty")
    .notEmpty()
    .isLength({min:4})
    .withMessage('Must be at least 4 chars long'),
    check('password', "Password must be at least 4 chars long and no more than 20")
    .isLength({min:4, max:20})
    .withMessage('Must be at least 4 chars long and no more than 20')
    /*  .matches(/\d/)
    .withMessage('Must contain one digit or more')  */,
     controller.registration)

router.post('/login', controller.login)
router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

router.patch("/login", authMiddleware, (req, res) => {
  // req.setHeader('Access-Control-Allow-Origin', '*');
  // req.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  // req.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
  controller.updateUser(req, res)
});

router.patch("/favorite/:id", (req, res) => {
    // req.setHeader('Access-Control-Allow-Origin', '*');
    // req.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    // req.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
    controller.updateFavoriteList(req, res)
});

module.exports = router
