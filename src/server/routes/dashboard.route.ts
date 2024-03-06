import express from "express";
import {ElectionBallotManager, TrendManager} from "../models/trend.model";

const router = express.Router();
router.post('/', (req, res) => {

});
router.post('/create-trend-form', async (req, res) => {
    const {
        trendName,
        trendDescription,
        trendTimeCreated,
        trendTags,
        trendElectionBallots,
        trendShortDescription
    } = req.body;
    const trendId = await TrendManager.getNextTrendId();
    try {
        const trend = await TrendManager.createTrend(trendName, trendShortDescription, trendDescription, trendTimeCreated, trendTags);
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
    const sortType = req.query.sortType;
    const sortOrder = req.query.sortOrder;
    console.log(sortType, sortOrder);
    try {
        if (sortType && sortOrder && typeof sortType === 'string' && typeof sortOrder === 'string') {
            const trends = await TrendManager.getTrendsOrderBy(sortType, sortOrder);
            res.status(200).json({success: true, message: 'Trends fetched successfully', data: trends});
        } else {
            const trends = await TrendManager.getAllTrends();
            res.status(200).json({success: true, message: 'Trends fetched successfully', data: trends});
        }
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});
export default router;
