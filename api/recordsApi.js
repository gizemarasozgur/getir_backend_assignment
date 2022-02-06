const Response = require("./../components/response");
const RecordModel = require("./../models/recordModel")

exports.getFilteredRecords = (req, res) => {

    const {startDate, endDate, minCount, maxCount} = req.body

    const filteredRecords = RecordModel.aggregate([
        {
            //Since it will be more efficient to find totalCount after data filtering by date, First date filtering was done.
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                }
            }

        },
        {
            //selecting expected parameters
            $project: {
                _id: 0,
                key: '$key',
                createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalCounts: {
                    $sum: '$counts'
                }
            }
        },
        {
            //filtering data by totalCounts
            $match: {
                totalCounts: {
                    $gte: minCount,
                    $lte: maxCount
                }
            }
        }
    ]);


    filteredRecords.then((records) => {
        if (records.length > 0) {
            new Response(res, {code: 0, records: records}).sendResponse()

        } else {
            new Response(res, {code: 1}).sendResponse()
        }
    }).catch((error) => {
        new Response(res, {code: 3, message: error.message}).sendResponse()
    })

};

