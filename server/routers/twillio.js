const express = require("express");
const { sendmessage } = require("../twillio/sendmessage"); // Destructure correctly

const router = express.Router();

router.post("/sendanyinfo", sendmessage);

module.exports = router;
