process.env.NODE_ENV = 'test'
const server = require('../app/server.js')
const supertest = require('supertest')
const request = supertest(server);


// it checks whether request payloads are present and return error about all fields.
// So there is no need to check all request payloads separately, we can see which data has error with error array
test("No data available", async () => {

    await request
        .post("/getFilteredRecords")
        .send({}).then(async (response) => {

            expect(response.body.code).toBe("2");
        })
        .catch(err => {
            console.log(`Error ${err}`)
        });


});


// it checks whether all request payload type are correct and return error about all fields.
// So there is no need to check that all request payload type is correct, we can see which data has error with error array
test("All request payload type is wrong", async () => {

    await request
        .post("/getFilteredRecords")
        .send({
            startDate: 'a222-01-02',
            endDate: 'a222-01-*2',
            minCount: 'a',
            maxCount: 'b'
        }).then(async (response) => {

            expect(response.body.code).toBe("2");
        })
        .catch(err => {
            console.log(`Error ${err}`)
        });


});


// it checks whether request payload type is in correct value range and return error about all fields.
test("Request payloads are not in correct value range", async () => {

    await request
        .post("/getFilteredRecords")
        .send({
            startDate: '2018-01-02',
            endDate: '2017-01-02',
            minCount: -1,
            maxCount: -4
        }).then(async (response) => {

            expect(response.body.code).toBe("2");
        })
        .catch(err => {
            console.log(`Error ${err}`)
        });


});


// All request payloads are correct and there are available datas to return. So it return code=0
test("All request payloads is correct", async () => {

    await request
        .post("/getFilteredRecords")
        .send({
            startDate: '2017-01-26',
            endDate: '2018-02-02',
            minCount: 200,
            maxCount: 9000

        }).then(async (response) => {

            expect(response.body.code).toBe("0");
        })
        .catch(err => {
            console.log(`Error ${err}`)
        });


});


// All request payloads is correct but there is no available data. So it return code=1
test("All request payloads is correct but there is no available data", async () => {

    await request
        .post("/getFilteredRecords")
        .send({
            startDate: '2017-01-26',
            endDate: '2018-02-02',
            minCount: 0,
            maxCount: 1

        }).then(async (response) => {

            expect(response.body.code).toBe("1");
        })
        .catch(err => {
            console.log(`Error ${err}`)
        });


});
