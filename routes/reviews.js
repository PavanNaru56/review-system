const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review_controller');
//router.get('/done/:id',reviewController.doneReview);
router.post("/create/:id",reviewController.submitReview);

module.exports = router;