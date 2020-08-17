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
      var obj = await db.order.find({}).populate({
        path: "userId",
        select: ["name"],
      });
      var result = [];
      if (obj != "") {
        for (data of obj) {
          let noOfOrders = await db.order.countDocuments({
            userId: data.userId._id,
          });
          let averageBill = await db.order.find({ userId: data.userId._id });
          var averageBillValue = 0;
          for (sum of averageBill) {
            averageBillValue = sum.subTotal + averageBillValue;
          }
          result.push({
            id: data.userId._id,
            name: data.userId.name,
            subTotal: data.subTotal,
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
