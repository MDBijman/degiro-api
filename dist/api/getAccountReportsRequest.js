"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountReportsRequest = void 0;
// Import debug console log
var utils_1 = require("../utils");
// Import utils functions
var generateReportURIFromID_1 = require("../utils/generateReportURIFromID");
// Importamos constantes
var enums_1 = require("../enums");
var GET_ACCOUNT_REPORTS_PATH = enums_1.DEGIRO_API_PATHS.GET_ACCOUNT_REPORTS_PATH;
function getAccountReportsRequest(intAccount, accountConfig) {
    return new Promise(function (resolve, reject) {
        var requestOptions = {
            headers: {
                Cookie: "JSESSIONID=" + accountConfig.data.sessionId + ";",
            },
            credentials: 'include',
            referer: 'https://trader.degiro.nl/trader/',
        };
        // Do the request to get a account config data
        var uri = "" + accountConfig.data.paUrl + GET_ACCOUNT_REPORTS_PATH + "?intAccount=" + intAccount + "&sessionId=" + accountConfig.data.sessionId;
        utils_1.debug("Making request to " + uri);
        utils_1.fetch(uri, requestOptions)
            .then(function (res) { return res.json(); })
            .then(function (res) {
            utils_1.debug('Response:\n', JSON.stringify(res, null, 2));
            var data = res.data;
            data = data.map(function (report) { return (__assign(__assign({}, report), { uri: generateReportURIFromID_1.generateReportURIFromID(report.id, intAccount, accountConfig) })); });
            resolve(data);
        })
            .catch(reject);
    });
}
exports.getAccountReportsRequest = getAccountReportsRequest;
//# sourceMappingURL=getAccountReportsRequest.js.map