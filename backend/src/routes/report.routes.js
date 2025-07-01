import express from 'express';
import { addReport, getDashboardData } from '../controllers/report.controller.js';
import { protect } from '../controllers/auth.controller.js';


const router  = express.Router();

router.post('/report', addReport);
router.get('/dashboard',protect,  getDashboardData);


export default router;