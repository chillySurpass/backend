var express = require("express");
var router = express.Router();
let user = require("../models/UserModel.js");

// 获取用户信息
router.get("/userInfo", async (req, res, next) => {
  user
    .find()
    .exec()
    .then((data) => {
      res.json({
        code: "0000",
        msg: "success",
        data: data,
      });
    });
});

module.exports = router;
