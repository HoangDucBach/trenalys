import express from "express";
import {ElectionBallotManager, TrendManager} from "../models/trend.model";

const router = express.Router();
router.post('/', (req, res) => {

});
router.post('/create-trend-form', async (req, res) => {
    const {
        trendTitle,
        trendDescription,
        trendTimeCreated,
        trendTags,
        trendElectionBallots
    } = req.body;
    const trendId = await TrendManager.getNextTrendId();
    try {
        const trend = await TrendManager.createTrend(trendTitle, trendDescription, trendTimeCreated, trendTags);
        for (const ballot of trendElectionBallots) {
            await ElectionBallotManager.createElectionBallot(trendId, ballot);
        }
        if (trend) {
            res.status(200).json({success: true, message: 'Trend created successfully', data: {}});
        } else {
            res.status(500).json({success: false, message: 'Error creating trend'});
        }
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.error(error);
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
