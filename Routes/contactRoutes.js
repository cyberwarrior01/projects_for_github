const express = require("express");
const {getcontacts, getcontact , createcontact , updatecontact , deletecontact} = require("../Controllers/contactController");
const router = express.Router();

router.route("/").get(getcontacts);
router.route("/").post(createcontact);
router.route("/:id").get(getcontact);
router.route("/:id").put(updatecontact);
router.route("/:id").delete(deletecontact);

module.exports = router;
