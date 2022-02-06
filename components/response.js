
// We create response class
class Response{

    constructor(res, responseData) {
        this.res = res
        this.code = responseData.code
        this.message = responseData.message
        this.records = responseData.records

    }
    sendResponse(){
        switch(this.code) {

            //Process successful and there is data to return
            case 0:
                getResponse(this.res, this.code, "Success", this.records)
                break;

            //Process successful but there is not available data to return
            case 1:
                getResponse(this.res, this.code, "No available data", "")
                break;

            //Process failed due to request data errors
            case 2:
                getResponse(this.res, this.code, this.message, "")
                break;

            //Process failed due to technical errors
            case 3:
                getResponse(this.res, this.code, this.message, "")
                break;

            //Default errors
            default:
                getResponse( this.res, 3, "An unexpected error has occured","" )
        }
    }
}

const getResponse =  (res, code, message, records) => {
    return res.json({
        code: code,
        msg: message,
        records: records
    })

}


module.exports = Response
