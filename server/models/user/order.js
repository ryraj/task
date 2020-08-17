var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  mongoosePaginate = require("mongoose-paginate"),
  ObjectId = Schema.ObjectId,
  order = new Schema(
    {
      userId: {
        type: ObjectId,
        default: null,
        ref: "user",
      },
      subTotal: {
        type: Number,
        default: 0,
      },
      date: { type: Date },
    },
    {
      timestamps: true,
    }
  );
order.plugin(mongoosePaginate);
module.exports = mongoose.model("order", order, "order");
