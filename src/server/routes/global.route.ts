import express from "express";
import {TrendManager} from "../models/trend.model";
import {UserManager} from "../models/user.model";

const router = express.Router();
router.post('/', async (req, res) => {
    // res.redirect('/login');
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
            trend.electionBallots.map((ballot: any) => {
                ballot.isVoted = votedElectionBallots.some((votedBallot: any) => votedBallot.id === ballot.id);
            });
            if (trend.length === 0) {
                res.status(404).json({success: false, message: 'Trend not found'});
            } else {
                res.status(200).json({success: true, message: 'Trend fetched successfully', trend});
            }
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal server error'});
            console.error(error);
        }
    }

});
export default router;