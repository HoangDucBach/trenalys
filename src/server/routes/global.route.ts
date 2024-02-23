import express from "express";

const router = express.Router();
router.post('/', async (req, res) => {
    res.status(200).json({success: true, message: 'Welcome to Trenalys', data: {}});
});
export default router;