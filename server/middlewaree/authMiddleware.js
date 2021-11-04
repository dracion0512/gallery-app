const jwt = require('jsonwebtoken')
const User = require('../models/User')
const secret = process.env.SECRET


module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            req.body.message = "Пользователь не авторизован"
        }
        const decodedData = jwt.verify(token, secret)
        if (decodedData) {
            let {id} = decodedData
            let findUser = async() => { 
                let user = await User.findOne({ _id: id }) 
                let {username, favorite} = user

                return {username, favorite}
            }
            findUser()
            .then(data => {
                req.body.user = data
                next()
            })
        }
    } catch (e) {
        req.body.err = 'invalid token'
        next()
    }
};
