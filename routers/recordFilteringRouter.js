require('./../app/server')
const {body, validationResult} = require('express-validator');
const Response = require("./../components/response");
const recordApi = require("./../api/recordsApi")

module.exports = (app) => {
    app.post('/getFilteredRecords',

        body('startDate').exists().withMessage('Start date is required')
            .if(body('startDate').exists()).isDate({format: 'YYYY-MM-DD'}).withMessage("Please ensure you entered a valid start date in format 'YYYY-MM-DD'.'")
            .if(body('startDate').isDate({format: 'YYYY-MM-DD'})).custom((value, {req}) => {


            if (value > req.body.endDate) {
                throw new Error('Start date must be before or equal end date');
            } else {
                return true;
            }


        }),
        body('endDate').exists().withMessage('End date is required')
            .if(body('endDate').exists()).isDate({format: 'YYYY-MM-DD'}).withMessage("Please ensure you entered a valid start date in format 'YYYY-MM-DD")
            .if(body('endDate').isDate({format: 'YYYY-MM-DD'})).custom((value, {req}) => {

            if (value < req.body.startDate) {
                throw new Error('End date must be after or equal start date');
            } else {
                return true;
            }


        }),
        body('minCount').exists().withMessage('Min count is required')
            .if(body('minCount').exists()).isInt().withMessage("Please ensure you entered a valid min count. Value must be a number")
            .if(body('minCount').isInt()).custom((value, {req}) => {


            if (value > req.body.maxCount || value < 0) {
                throw new Error('Min count must be a number less than or equal max count and greater than or equal 0  ');
            } else {
                return true;
            }


        }),
        body('maxCount').exists().withMessage('Max count is required')
            .if(body('maxCount').exists()).isInt().withMessage("Please ensure you entered a valid max count. Value must be a number.")
            .if(body('maxCount').isInt()).custom((value, {req}) => {


            if (value < req.body.minCount) {
                throw new Error('Max count must be a number greater than or equal  min count.');
            } else {
                return true;
            }


        }),

        (req, res) => {

            const errors = validationResult(req);


            if (!errors.isEmpty()) {
                console.log(JSON.stringify(errors))
                new Response(res, {code: 2, message: errors.array()}).sendResponse()

            } else {
                recordApi.getFilteredRecords(req, res);

            }


        }
    );
}