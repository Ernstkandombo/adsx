const Report = require('../models/Report');

exports.createReport = async (req, res) => {
    try {
        const { campaignId, advertiserId, publisherId, clicks, impressions, revenue, dateRange } = req.body;

        // Create a new report
        const newReport = new Report({
            campaignId,
            advertiserId,
            publisherId,
            clicks,
            impressions,
            revenue,
            dateRange,
        });

        // Save the new report to the database
        const savedReport = await newReport.save();

        res.status(201).json(savedReport);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getReportsByCampaign = async (req, res) => {
    try {
        const { campaignId } = req.params;

        // Fetch reports for the specified campaign
        const reports = await Report.find({ campaignId }).populate('advertiserId').populate('publisherId');

        res.json(reports);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getReportsByPublisher = async (req, res) => {
    try {
        const { publisherId } = req.params;

        // Fetch reports for the specified publisher
        const reports = await Report.find({ publisherId }).populate('campaignId').populate('advertiserId');

        res.json(reports);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const { reportId } = req.params;

        // Fetch the report with the specified ID
        const report = await Report.findById(reportId).populate('campaignId').populate('advertiserId').populate('publisherId');

        res.json(report);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { clicks, impressions, revenue, dateRange } = req.body;

        // Update the report with the specified ID
        const updatedReport = await Report.findByIdAndUpdate(
            reportId,
            { clicks, impressions, revenue, dateRange },
            { new: true }
        );

        res.json(updatedReport);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        // Delete the report with the specified ID
        await Report.findByIdAndDelete(reportId);

        res.json({ message: 'Report deleted' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};