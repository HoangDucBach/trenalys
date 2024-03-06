import express from "express";
import {ElectionBallotManager, TrendManager} from "../models/trend.model";
import {UserManager} from "../models/user.model";
import {ElectionBallot} from "../controllers/object.controller";

const router = express.Router();
router.post('/', async (req, res) => {
    res.status(200).json({success: true, message: 'Welcome to Trenalys', data: {}});
});
router.get('/trend/:id', async (req, res) => {
    const trendId = req.params.id || req.body.id || req.query.id || req.headers['x-id'];
    const userGmail = req.query.gmail;
    if (userGmail && typeof userGmail === 'string') {
        try {
            const user = await UserManager.getUserByGmail(userGmail);
            let trend = await TrendManager.getTrendById(trendId);
            const votedElectionBallots = await UserManager.getAllVotedElectionBallots(trendId, userGmail);
            trend.electionBallots.map((ballot: ElectionBallot) => {
                ballot.isVoted = votedElectionBallots.some((votedBallot: any) => votedBallot.id === ballot.id);
            });
            res.status(200).json({success: true, message: 'Trend fetched successfully', trend});
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal server error'});
            console.error(error);
        }
    }

});
router.post('/trend/:id/vote', async (req, res) => {
    const trendId = req.params.id || req.body.id || req.query.id || req.headers['x-id'];

    const userGmail = req.query.gmail;
    const electionBallotId = req.query.electionBallotId;

    const isVoted = req.body.isVoted;

    if (userGmail && typeof userGmail === 'string' && electionBallotId && typeof electionBallotId === 'string') {
        try {
            const voted = await UserManager.userCheckElectionBallot(userGmail, electionBallotId, isVoted);
            const electionBallot = await ElectionBallotManager.getElectionBallotById(electionBallotId);
            if (voted) {
                res.status(200).json({success: true, message: 'Voted successfully', electionBallot});
            } else {
                res.status(500).json({success: false, message: 'Error voting'});
            }
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal server error'});
            console.error(error);
        }
    }
});
router.put('/trend/:id/update', async (req, res) => {
    const trend = req.body.trend;
    try {
        const status = await TrendManager.updateTrend(trend);
        if (status) {
            res.status(200).json({success: true, message: 'Trend updated successfully'});
        } else {
            res.status(500).json({success: false, message: 'Error updating trend'});
        }
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.error(error);
    }
});
router.post('/profile/change', async (req, res) => {
    const gmail = req.body.gmail;
    const password = req.body.password;
    try {
        const status = await UserManager.changePassword(gmail, password);
        if (status) {
            res.status(200).json({success: true, message: 'Password changed successfully'});
        } else {
            res.status(500).json({success: false, message: 'Error changing password'});
        }
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
        console.error(error);
    }
});
export default router;