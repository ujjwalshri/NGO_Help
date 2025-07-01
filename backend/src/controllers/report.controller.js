import Report from '../models/Report.model.js';


export const addReport = async(req, res)=>{
    try{
        console.log("Adding report:", req.body);
        const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized, year } = req.body;

        // Validate input
        if (!ngoId || !month || !peopleHelped || !eventsConducted || !fundsUtilized || !year) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new report
        const newReport = new Report({
            ngoId,
            month,
            peopleHelped,
            eventsConducted,
            fundsUtilized,
            year
        });

        // Save the report to the database
        await newReport.save();

        res.status(201).json({ message: "Report added successfully", report: newReport });
    }catch(error){
        console.error("Error adding report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getDashboardData = async (req, res) => {
    try {
        const { month, year } = req.query;

        // Create match condition based on month and year
        const matchCondition = {};
        if (month) matchCondition.month = month;
        if (year) matchCondition.year = parseInt(year);

        const aggregateResult = await Report.aggregate([
            { $match: matchCondition },
            {
                $group: {
                    _id: null,
                    totalPeopleHelped: { $sum: "$peopleHelped" },
                    totalEvents: { $sum: "$eventsConducted" },
                    totalFundsUtilized: { $sum: "$fundsUtilized" },
                    ngosCount: { $addToSet: "$ngoId" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalPeopleHelped: 1,
                    totalEvents: 1,
                    totalFundsUtilized: 1,
                    totalNGOs: { $size: "$ngosCount" }
                }
            }
        ]);

        const dashboardData = aggregateResult[0] || {
            totalPeopleHelped: 0,
            totalEvents: 0,
            totalFundsUtilized: 0,
            totalNGOs: 0
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Dashboard aggregation error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching dashboard data',
            error: error.message 
        });
    }
};