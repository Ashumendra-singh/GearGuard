import Request from '../model/userRequest.model.js';


const raiseRequest = async (req, res) => {
    try {
        const { assetId, title, description, scheduleDate } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }
        if (!assetId || !title || !description) {
            return res.status(400).json({ message: 'Asset, title, and description are required.' });
        }

        const request = await Request.create({
            user: req.userId,
            equipment: assetId,
            title,
            description,
            scheduleDate,
        });

        return res.status(201).json({
            message: 'Request raised successfully.',
            request,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const acceptRequest = async (req, res) => {
    try {
        const { requestId } = req.body;// techniocian

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }
        if (!requestId) {
            return res.status(400).json({ message: 'Request ID is required.' });
        }

        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found.' });
        }
        if (request.assigned && request.assigned.toString() !== req.userId) {
            return res.status(400).json({ message: 'Request already assigned.' });
        }

        request.assigned = req.userId;
        request.status = 'in-progress';
        await request.save();

        return res.status(200).json({
            message: 'Request accepted successfully.',
            request,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const getRequests = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const { status, scope = 'owned' } = req.query;
        const filter = scope === 'assigned' ? { assigned: req.userId } : { user: req.userId };

        if (status) {
            filter.status = status;
        }

        const requests = await Request.find(filter)
            .populate('user', 'name email')
            .populate('equipment')
            .populate('assigned', 'name email')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Requests fetched successfully.',
            requests,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const updateRequestStatus = async (req, res) => {
    try {
        const { requestId } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }
        if (!requestId) {
            return res.status(400).json({ message: 'Request ID and status are required.' });
        }


        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        request.status = 'completed';

        await request.save();

        return res.status(200).json({
            message: 'Request status updated successfully.',
            request,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export { getRequests, updateRequestStatus, raiseRequest, acceptRequest };
    