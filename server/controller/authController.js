const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const secret = process.env.SECRET

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  static async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Registration error", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "A user with the same name already exists " });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, password: hashPassword });
      await user.save();
      const token = generateAccessToken(user._id, user.roles);
      return res.status(200).json({ 
        token, 
        username, 
        favorite: user.favorite, 
        message: "User registered successfully", 
      });
    } catch (errors) {
      console.log(errors);
      res.status(400).json({ message: "Registration error", errors });
    }
  }

  static async login(req, res) {
    try {
      console.log(secret)
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} is not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Invalid password` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, username, favorite: user.favorite });
    } catch (errors) {
      console.log(errors);
      res.status(400).json({ message: "Login error", errors });
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (errors) {
      console.log(errors);
    }
  }

  static async updateFavoriteList(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const {id: requestID} = req.params
      if (!token) return res.status(402).json({ message: "User in not signed in" })
      const decodedData = jwt.verify(token, secret)
      if (!decodedData) return res.status(402).json({ message: "User in not signed in" })
      let {id} = decodedData
      let user = await User.findOne({ _id: id })
      if (!user) return res.status(400).json({ message: "User is not found" });
      user.favorite.includes(requestID)
      ? user.favorite.splice(user.favorite.indexOf(requestID), 1) 
      : user.favorite.push(requestID)
      user.save()
      res.status(201).json({ message: "List is successfully updated"})
    } catch (errors) {
      console.error(errors)
      return res.status(402).json({ errors })
    }     
  }

  static async updateUser(req, res) {
    try {
      if (req.body.user) {
        let {user, data} = req.body
        let userDB = await User.findOne({ username: user.username })
        const validPassword = bcrypt.compareSync(data.currentPassword, userDB.password);
        if (!validPassword) {
          return res.status(400).json({ message: `Invalid password` });
        }
        if (!!data.password) userDB.password = bcrypt.hashSync(data.password, 7);
        if (!!data.username) userDB.username = data.username;
        userDB.save()
        return res.status(200).json({
          username: userDB.username,
        })
      }
    } catch(e) {
      console.error(e)
      return res.status(402).json({ err: e })
    }
  }
}

module.exports = authController;
