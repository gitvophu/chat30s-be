import { ApiResponse as ApiResponseType } from "./types";

export const apiResponse = (statusCode: number, message: string, data?: any): ApiResponseType=>{
    let response: ApiResponseType = {
        statusCode, 
        message, 
        data
    }
    return response;
}