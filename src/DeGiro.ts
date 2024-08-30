// Import modules
import * as async from 'async'

// Import interfaces
import { DeGiroClassInterface } from './interfaces'

// Import types
import {
  AccountConfigType,
  AccountDataType,
  CashFoundType,
  SearchProductResultType,
  GetPorfolioConfigType,
  SearchProductOptionsType,
  OrderType,
  CreateOrderResultType,
  GetOrdersConfigType,
  GetOrdersResultType,
  GetAccountStateOptionsType,
  AccountReportsType,
  AccountInfoType,
  GetHistoricalOrdersOptionsType,
  HistoricalOrdersType,
  FavouriteProductType,
  StockType,
  GetNewsOptionsType,
  NewsType,
  WebUserSettingType,
  ConfigDictionaryType,
  i18nMessagesType,
  WebSettingsType,
  GetPopularStocksConfigType,
  GetTransactionsOptionsType,
  TransactionType,
} from './types'

// Import requests
import {
  loginRequest,
  getAccountConfigRequest,
  getAccountDataRequest,
  getPortfolioRequest,
  getProductsByIdsRequest,
  searchProductRequest,
  createOrderRequest,
  executeOrderRequest,
  deleteOrderRequest,
  logoutRequest,
  getOrdersRequest,
  getAccountStateRequest,
  getConfigDictionaryRequest,
  getAccountInfoRequest,
  getWebi18nMessagesRequest,
  getNewsRequest,
  getWebSettingsRequest,
  getWebUserSettingsRequest,
  getAccountReportsRequest,
  getCashFundstRequest,
  getPopularStocksRequest,
  getTransactionsRequest,
} from './api'

export type DeGiroLoginType = {
  username: string,
  password: string,
  oneTimePassword: string,
}

export class DeGiroLogin {
  private readonly username: string;
  private readonly password: string;
  private readonly oneTimePassword: string;

  constructor(params: DeGiroLoginType) {
    this.username = params.username;
    this.password = params.password;
    this.oneTimePassword = params.oneTimePassword;
  }

  async login(intAccount: number): Promise<DeGiroSessionType> {
    const loginResponse = await loginRequest({
      username: this.username,
      pwd: this.password,
      oneTimePassword: this.oneTimePassword
    });

    if (!loginResponse.sessionId) {
      throw "Undefined sessionId";
    }

    return {
      jsessionId: loginResponse.sessionId,
      intAccount: intAccount
    }
  }
}

export type DeGiroSessionType = {
  jsessionId: string,
  intAccount: number,
}

/**
 * @class DeGiro
 * @description Main class of DeGiro Unofficial API.
 */
export class DeGiro implements DeGiroClassInterface {

  /* Properties */

  // Session
  private readonly intAccount: number;
  private jsessionId: string;

  private accountConfig: AccountConfigType | undefined

  /* Constructor and generator function */

  constructor(params: DeGiroSessionType) {
    this.jsessionId = params.jsessionId;
    this.intAccount = params.intAccount;
  }

  /* Account methods */

  getAccountConfig(): Promise<AccountConfigType> {
    return new Promise((resolve, reject) => {
      getAccountConfigRequest(this.jsessionId)
        .then((accountConfig: AccountConfigType) => {
          this.accountConfig = accountConfig;
          resolve(accountConfig)
        })
        .catch(reject)
    })
  }

  getAccountData(accountConfig: AccountConfigType): Promise<AccountDataType> {
    return new Promise((resolve, reject) => {
      getAccountDataRequest(accountConfig)
        .then((accountData: AccountDataType) => {
          resolve(accountData)
        })
        .catch(reject)
    })
  }

  getAccountState(options: GetAccountStateOptionsType): Promise<any[]> {
    return getAccountStateRequest(this.intAccount, <AccountConfigType>this.accountConfig, options)
  }

  getAccountReports(): Promise<AccountReportsType> {
    return getAccountReportsRequest(this.intAccount, <AccountConfigType>this.accountConfig)
  }

  getAccountInfo(): Promise<AccountInfoType> {
    return getAccountInfoRequest(this.intAccount, <AccountConfigType>this.accountConfig)
  }

  /* Search methods */

  searchProduct(options: SearchProductOptionsType): Promise<SearchProductResultType[]> {
    return searchProductRequest(options, this.intAccount, <AccountConfigType>this.accountConfig)
  }

  /* Cash Funds methods */

  getCashFunds(): Promise<CashFoundType[]> {
    return getCashFundstRequest(this.intAccount, <AccountConfigType>this.accountConfig)
  }

  /* Porfolio methods */

  getPortfolio(config: GetPorfolioConfigType): Promise<any[]> {
    return new Promise((resolve, reject) => {
      getPortfolioRequest(this.intAccount, <AccountConfigType>this.accountConfig, config)
        .then(portfolio => this.completePortfolioDetails(portfolio, config.getProductDetails || false))
        .then(resolve)
        .catch(reject)
    })
  }

  private completePortfolioDetails(portfolio: any[], getProductDetails: boolean): Promise<any[]> {
    if (!getProductDetails) return Promise.resolve(portfolio)
    return new Promise((resolve, reject) => {
      async.map(portfolio, (position, next) => {
        if (position.positionType !== 'PRODUCT') return next(null, position)
        this.getProductsByIds([(position.id)])
          .then((product) => {
            position.productData = product[position.id]
            next(null, position)
          })
          .catch(error => next(error))
        // tslint:disable-next-line: align
      }, (error, portfolio) => {
        if (error) return reject(error)
        resolve(<any[]>portfolio)
      })
    })
  }

  /* Stocks methods */

  getFavouriteProducts(): Promise<FavouriteProductType[]> {
    return new Promise((resolve, reject) => {
      reject('Method not implemented')
    })
  }

  getPopularStocks(config: GetPopularStocksConfigType = {}): Promise<StockType[]> {
    return getPopularStocksRequest(this.intAccount, <AccountConfigType>this.accountConfig, config)
  }

  /* Orders methods */

  getOrders(config: GetOrdersConfigType): Promise<GetOrdersResultType> {
    return getOrdersRequest(this.intAccount, <AccountConfigType>this.accountConfig, config)
  }

  getHistoricalOrders(options: GetHistoricalOrdersOptionsType): Promise<HistoricalOrdersType> {
    return new Promise((resolve, reject) => {
      reject('Method not implemented')
    })
  }

  createOrder(order: OrderType): Promise<CreateOrderResultType> {
    return createOrderRequest(order, this.intAccount, <AccountConfigType>this.accountConfig)
  }

  executeOrder(order: OrderType, executeId: String): Promise<String> {
    return executeOrderRequest(order, executeId, this.intAccount, <AccountConfigType>this.accountConfig)
  }

  deleteOrder(orderId: String): Promise<void> {
    return deleteOrderRequest(orderId, this.intAccount, <AccountConfigType>this.accountConfig)
  }

  getTransactions(options: GetTransactionsOptionsType): Promise<TransactionType[]> {
    return getTransactionsRequest(this.intAccount, <AccountConfigType>this.accountConfig, options);
  }

  /* Miscellaneous methods */

  getProductsByIds(ids: string[]): Promise<any[]> {
    return getProductsByIdsRequest(ids, this.intAccount, <AccountConfigType>this.accountConfig)
  }

  getNews(options: GetNewsOptionsType): Promise<NewsType> {
    return getNewsRequest(options, this.intAccount, <AccountConfigType>this.accountConfig)
  }

  getWebi18nMessages(lang: string = 'es_ES'): Promise<i18nMessagesType> {
    return getWebi18nMessagesRequest(lang, <AccountConfigType>this.accountConfig)
  }

  getWebSettings(): Promise<WebSettingsType> {
    return getWebSettingsRequest(this.intAccount, <AccountConfigType>this.accountConfig)
  }

  getWebUserSettings(): Promise<WebUserSettingType> {
    return getWebUserSettingsRequest(this.intAccount, <AccountConfigType>this.accountConfig)
  }

  getConfigDictionary(): Promise<ConfigDictionaryType> {
    return getConfigDictionaryRequest(this.intAccount, <AccountConfigType>this.accountConfig)
  }

}
