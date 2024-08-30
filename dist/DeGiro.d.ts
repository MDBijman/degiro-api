import { DeGiroClassInterface } from './interfaces';
import { AccountConfigType, AccountDataType, CashFoundType, SearchProductResultType, GetPorfolioConfigType, SearchProductOptionsType, OrderType, CreateOrderResultType, GetOrdersConfigType, GetOrdersResultType, GetAccountStateOptionsType, AccountReportsType, AccountInfoType, GetHistoricalOrdersOptionsType, HistoricalOrdersType, FavouriteProductType, StockType, GetNewsOptionsType, NewsType, WebUserSettingType, ConfigDictionaryType, i18nMessagesType, WebSettingsType, GetPopularStocksConfigType, GetTransactionsOptionsType, TransactionType } from './types';
export declare type DeGiroLoginType = {
    username: string;
    password: string;
    oneTimePassword: string;
};
export declare class DeGiroLogin {
    private readonly username;
    private readonly password;
    private readonly oneTimePassword;
    constructor(params: DeGiroLoginType);
    login(intAccount: number): Promise<DeGiroSessionType>;
}
export declare type DeGiroSessionType = {
    jsessionId: string;
    intAccount: number;
};
/**
 * @class DeGiro
 * @description Main class of DeGiro Unofficial API.
 */
export declare class DeGiro implements DeGiroClassInterface {
    private readonly intAccount;
    private jsessionId;
    private accountConfig;
    constructor(params: DeGiroSessionType);
    getAccountConfig(): Promise<AccountConfigType>;
    getAccountData(accountConfig: AccountConfigType): Promise<AccountDataType>;
    getAccountState(options: GetAccountStateOptionsType): Promise<any[]>;
    getAccountReports(): Promise<AccountReportsType>;
    getAccountInfo(): Promise<AccountInfoType>;
    searchProduct(options: SearchProductOptionsType): Promise<SearchProductResultType[]>;
    getCashFunds(): Promise<CashFoundType[]>;
    getPortfolio(config: GetPorfolioConfigType): Promise<any[]>;
    private completePortfolioDetails;
    getFavouriteProducts(): Promise<FavouriteProductType[]>;
    getPopularStocks(config?: GetPopularStocksConfigType): Promise<StockType[]>;
    getOrders(config: GetOrdersConfigType): Promise<GetOrdersResultType>;
    getHistoricalOrders(options: GetHistoricalOrdersOptionsType): Promise<HistoricalOrdersType>;
    createOrder(order: OrderType): Promise<CreateOrderResultType>;
    executeOrder(order: OrderType, executeId: String): Promise<String>;
    deleteOrder(orderId: String): Promise<void>;
    getTransactions(options: GetTransactionsOptionsType): Promise<TransactionType[]>;
    getProductsByIds(ids: string[]): Promise<any[]>;
    getNews(options: GetNewsOptionsType): Promise<NewsType>;
    getWebi18nMessages(lang?: string): Promise<i18nMessagesType>;
    getWebSettings(): Promise<WebSettingsType>;
    getWebUserSettings(): Promise<WebUserSettingType>;
    getConfigDictionary(): Promise<ConfigDictionaryType>;
}
//# sourceMappingURL=DeGiro.d.ts.map