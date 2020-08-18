const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const constant = require("./userConstant");
const { result } = require("underscore");

module.exports = {
  // ==============================
  //  get all order
  // ==============================
  allOrder: async (req, res) => {
    try {
      var obj = await db.order.distinct("userId", {});
      var result = [];
      if (obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
          let noOfOrders = await db.order.countDocuments({
            userId: obj[i],
          });
          let averageBill = await db.order.find({ userId: obj[i] });
          var averageBillValue = 0;
          for (sum of averageBill) {
            averageBillValue = sum.subTotal + averageBillValue;
          }
          let userName = await db.user.findOne({ _id: obj[i] });
          result.push({
            id: obj[i],
            name: userName.name,
            noOfOrders: noOfOrders,
            averageBillValue: Math.round(averageBillValue / noOfOrders),
          });
        }
        sendResponse.to_user(
          res,
          200,
          true,
          null,
          constant.orderSuccessMsg,
          result
        );
      } else {
        sendResponse.to_user(
          res,
          200,
          true,
          constant.noContentMsg,
          constant.noContentSuccessMsg,
          null
        );
      }
    } catch (e) {
      console.log(e);
      sendResponse.to_user(res, 400, false, e, constant.error);
    }
  },
  // ==============================
  //  update  order
  // ==============================
  updateNoOfOrder: async (req, res) => {
    try {
      var user = await db.user.find({});
      for (order of user) {
        let noOfOrders = await db.order.countDocuments({
          userId: order._id,
        });
        await db.user.findOneAndUpdate(
          {
            _id: order._id,
          },
          {
            $set: {
              noOfOrders: noOfOrders,
            },
          }
        );
      }
      sendResponse.to_user(
        res,
        200,
        true,
        null,
        constant.userUpdateSuccessMsg,
        null
      );
    } catch (e) {
      console.log(e);
      sendResponse.to_user(res, 400, false, e, constant.error);
    }
  },
};
