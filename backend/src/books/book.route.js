const express = require("express");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
} = require("./book.controller");

const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

router.post("/create-book", verifyAdminToken, postABook);
router.get("/", getAllBooks); // this now includes search
router.get("/:id", getSingleBook);
router.put("/edit/:id", verifyAdminToken, UpdateBook);
router.delete("/:id", verifyAdminToken, deleteABook);

module.exports = router;
