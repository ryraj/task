var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  mongoosePaginate = require("mongoose-paginate"),
  ObjectId = Schema.ObjectId,
  user = new Schema(
    {
      name: {
        type: String,
      },
      noOfOrders: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );
user.plugin(mongoosePaginate);
module.exports = mongoose.model("user", user, "user");
