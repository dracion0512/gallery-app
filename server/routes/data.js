const express    = require("express");
const router     = express.Router();
const controller = require('../controller/dataController')
const authMiddleware = require('../middlewaree/authMiddleware')

router.get("/", authMiddleware, (req, res) => {
  // req.setHeader('Access-Control-Allow-Origin', '*');
  // req.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  // req.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
  controller.getData(req, res)
});

module.exports = router;
