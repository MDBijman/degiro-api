"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeGiro = exports.DeGiroLogin = void 0;
// Import modules
var async = __importStar(require("async"));
// Import requests
var api_1 = require("./api");
var DeGiroLogin = /** @class */ (function () {
    function DeGiroLogin(params) {
        this.username = params.username;
        this.password = params.password;
        this.oneTimePassword = params.oneTimePassword;
    }
    DeGiroLogin.prototype.login = function (intAccount) {
        return __awaiter(this, void 0, void 0, function () {
            var loginResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api_1.loginRequest({
                            username: this.username,
                            pwd: this.password,
                            oneTimePassword: this.oneTimePassword
                        })];
                    case 1:
                        loginResponse = _a.sent();
                        if (!loginResponse.sessionId) {
                            throw "Undefined sessionId";
                        }
                        return [2 /*return*/, {
                                jsessionId: loginResponse.sessionId,
                                intAccount: intAccount
                            }];
                }
            });
        });
    };
    return DeGiroLogin;
}());
exports.DeGiroLogin = DeGiroLogin;
/**
 * @class DeGiro
 * @description Main class of DeGiro Unofficial API.
 */
var DeGiro = /** @class */ (function () {
    /* Constructor and generator function */
    function DeGiro(params) {
        this.jsessionId = params.jsessionId;
        this.intAccount = params.intAccount;
    }
    /* Account methods */
    DeGiro.prototype.getAccountConfig = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            api_1.getAccountConfigRequest(_this.jsessionId)
                .then(function (accountConfig) {
                _this.accountConfig = accountConfig;
                resolve(accountConfig);
            })
                .catch(reject);
        });
    };
    DeGiro.prototype.getAccountData = function (accountConfig) {
        return new Promise(function (resolve, reject) {
            api_1.getAccountDataRequest(accountConfig)
                .then(function (accountData) {
                resolve(accountData);
            })
                .catch(reject);
        });
    };
    DeGiro.prototype.getAccountState = function (options) {
        return api_1.getAccountStateRequest(this.intAccount, this.accountConfig, options);
    };
    DeGiro.prototype.getAccountReports = function () {
        return api_1.getAccountReportsRequest(this.intAccount, this.accountConfig);
    };
    DeGiro.prototype.getAccountInfo = function () {
        return api_1.getAccountInfoRequest(this.intAccount, this.accountConfig);
    };
    /* Search methods */
    DeGiro.prototype.searchProduct = function (options) {
        return api_1.searchProductRequest(options, this.intAccount, this.accountConfig);
    };
    /* Cash Funds methods */
    DeGiro.prototype.getCashFunds = function () {
        return api_1.getCashFundstRequest(this.intAccount, this.accountConfig);
    };
    /* Porfolio methods */
    DeGiro.prototype.getPortfolio = function (config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            api_1.getPortfolioRequest(_this.intAccount, _this.accountConfig, config)
                .then(function (portfolio) { return _this.completePortfolioDetails(portfolio, config.getProductDetails || false); })
                .then(resolve)
                .catch(reject);
        });
    };
    DeGiro.prototype.completePortfolioDetails = function (portfolio, getProductDetails) {
        var _this = this;
        if (!getProductDetails)
            return Promise.resolve(portfolio);
        return new Promise(function (resolve, reject) {
            async.map(portfolio, function (position, next) {
                if (position.positionType !== 'PRODUCT')
                    return next(null, position);
                _this.getProductsByIds([(position.id)])
                    .then(function (product) {
                    position.productData = product[position.id];
                    next(null, position);
                })
                    .catch(function (error) { return next(error); });
                // tslint:disable-next-line: align
            }, function (error, portfolio) {
                if (error)
                    return reject(error);
                resolve(portfolio);
            });
        });
    };
    /* Stocks methods */
    DeGiro.prototype.getFavouriteProducts = function () {
        return new Promise(function (resolve, reject) {
            reject('Method not implemented');
        });
    };
    DeGiro.prototype.getPopularStocks = function (config) {
        if (config === void 0) { config = {}; }
        return api_1.getPopularStocksRequest(this.intAccount, this.accountConfig, config);
    };
    /* Orders methods */
    DeGiro.prototype.getOrders = function (config) {
        return api_1.getOrdersRequest(this.intAccount, this.accountConfig, config);
    };
    DeGiro.prototype.getHistoricalOrders = function (options) {
        return new Promise(function (resolve, reject) {
            reject('Method not implemented');
        });
    };
    DeGiro.prototype.createOrder = function (order) {
        return api_1.createOrderRequest(order, this.intAccount, this.accountConfig);
    };
    DeGiro.prototype.executeOrder = function (order, executeId) {
        return api_1.executeOrderRequest(order, executeId, this.intAccount, this.accountConfig);
    };
    DeGiro.prototype.deleteOrder = function (orderId) {
        return api_1.deleteOrderRequest(orderId, this.intAccount, this.accountConfig);
    };
    DeGiro.prototype.getTransactions = function (options) {
        return api_1.getTransactionsRequest(this.intAccount, this.accountConfig, options);
    };
    /* Miscellaneous methods */
    DeGiro.prototype.getProductsByIds = function (ids) {
        return api_1.getProductsByIdsRequest(ids, this.intAccount, this.accountConfig);
    };
    DeGiro.prototype.getNews = function (options) {
        return api_1.getNewsRequest(options, this.intAccount, this.accountConfig);
    };
    DeGiro.prototype.getWebi18nMessages = function (lang) {
        if (lang === void 0) { lang = 'es_ES'; }
        return api_1.getWebi18nMessagesRequest(lang, this.accountConfig);
    };
    DeGiro.prototype.getWebSettings = function () {
        return api_1.getWebSettingsRequest(this.intAccount, this.accountConfig);
    };
    DeGiro.prototype.getWebUserSettings = function () {
        return api_1.getWebUserSettingsRequest(this.intAccount, this.accountConfig);
    };
    DeGiro.prototype.getConfigDictionary = function () {
        return api_1.getConfigDictionaryRequest(this.intAccount, this.accountConfig);
    };
    return DeGiro;
}());
exports.DeGiro = DeGiro;
//# sourceMappingURL=DeGiro.js.map