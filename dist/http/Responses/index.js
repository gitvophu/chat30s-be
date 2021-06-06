"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
var apiResponse = function (statusCode, message, data) {
    var response = {
        statusCode: statusCode,
        message: message,
        data: data
    };
    return response;
};
exports.apiResponse = apiResponse;
//# sourceMappingURL=index.js.map