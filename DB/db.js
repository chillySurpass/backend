/**
 *
 * @param {*} success
 * @param {*} fail
 */
const { DBHOST, DBPORT, DBNAME } = require("../config.js");

module.exports = function (success, fail) {
  if (typeof fail !== "function") {
    console.log("链接失败！");
  }

  const mongo = require("mongoose");

  mongo.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  mongo.connection.once("open", () => {
    console.log("连接成功~~");
    success();
  });

  mongo.connection.on("error", () => {
    console.log("连接失败~~");
    fail();
  });
};
