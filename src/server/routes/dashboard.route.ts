import express from "express";
import {TrendManager} from "../models/trend.model";

const router = express.Router();
router.post('/', (req, res) => {

});
router.post('/home/create-trend-form', async (req, res) => {
    const {
        trendTitle,
        trendDescription,
        trendTimeCreated,
        trendTags
    } = req.body;
    try {
        const status = await TrendManager.createTrend(trendTitle, trendDescription, trendTimeCreated,trendTags);
        if (status) {
            res.status(200).json({success: true, message: 'Trend created successfully', data: {}});
        } else {
            res.status(500).json({success: false, message: 'Error creating trend'});
        }
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});
router.get('/home/get-trends', async (req, res) => {
    try {
        const trends = await TrendManager.getAllTrends();
        res.status(200).json({success: true, message: 'Trends fetched successfully', data: trends});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});
export default router;
