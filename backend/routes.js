const { Router } = require("express");
const { setDialogFromUser } = require("./bot");

const router = Router();

router.post("/bot", setDialogFromUser);

module.exports = router;
