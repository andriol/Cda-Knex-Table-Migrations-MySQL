const express = require("express");
const imageController = require("../controllers/imageController");
const router = express.Router();

router.get("/", imageController.view);
router.post("/", imageController.save);
router.get("/:id", imageController.getSingle);
router.delete("/:id", imageController.delete);

module.exports = router;
