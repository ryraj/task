let express = require("express");
let router = express.Router();
let user = require("../../services/user/user");

// ==============================
// routes for user
// ==============================
router.route("/allOrder").get(user.allOrder);
router.route("/updateNoOfOrder").put(user.updateNoOfOrder);

module.exports = router;
