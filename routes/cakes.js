const express = require("express");
const cakeController = require("../controllers/cakeController");
const router = express.Router();

router.get("/", cakeController.view);
router.post("/", cakeController.save);
router.get("/:id", cakeController.getSingle);
router.put("/:id", cakeController.update);
router.delete("/:id", cakeController.delete);

module.exports = router;
