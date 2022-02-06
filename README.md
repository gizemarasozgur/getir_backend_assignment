# Getir Back-End Assignment

## Overview
This API is written on node.js language and uses the MongoDB database. There is a single endpoint in this project. This endpoint fetches the data in the provided  MongoDB and returns the results in the expected from the assignment format. Moreover, this app was deployed to Heroku.

> **The libraries used in this project**
> - express
> - body-parser
> - mongoose
> - express-validator
> - dotenv
> - JEST and supertest

**Heroku deployment URL**: https://..........herokuapp.com/

## Getting Started



    $ git clone https://github.com/.......
    $ cd getir_backend_assignment
    $ npm install
    $ npm start

> **Note: You must add  "MONGO_DB_URL" and "PORT"  in the ".env" file**

# Test
Run the project tests

    $ npm test

## Validation and Test Cases
I was used **express-validator** to validate request payloads and    **Jest and supertest**  for testing framework to test this project.

**Validation cases;**

- Check the endpoint parameters values must not be null and must be in a defined format.
- Check the endDate must be greater than startDate parameters value. Also, check the startDate must be smaller than endDate parameters value.
- Check the maxCount must be greater than minCount parameters value. Also, check the minCount must be smaller than maxCount parameters value and greater than 0.
- The results returned from the endpoint should be like the examples below.

**Test cases;**

- If there is no request payload it must return that code is equal to 2
- If request payloads are not in the expected format it must  return that code is equal to 2
- If request payloads are correct but there is no available data, it must return that code is equal to 1
- If request payloads are correct and there are available data, it must return that code is equal to 0