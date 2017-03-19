/**
 * 账户信息
 * 
 * @export
 * @class AccountInfo
 */
export class AccountInfo {
    uid: string;

    /**
     * 账户姓名
     * @type {string}
     * @memberOf AccountInfo
     */
    name: string;

    /**
     * 是否是本地账户
     * @type {Boolean}
     * @memberOf AccountInfo
     */
    local: Boolean;

    /**
     * 账户的配置信息
     * @type {Config}
     * @memberOf AccountInfo
     */
    config: Config;
}

/** 
 *账户配置信息
 * @export
 * @class Config
 */
export class Config {
    /**
     * 自动同步账户的阅读记录（需要登陆）
     * @type {boolean}
     * @memberOf Config
     */
    autoSyncReadingRecord: boolean;

    /**
     * 自动获取书架书籍的章节更新信息
     * @type {boolean}
     * @memberOf Config
     */
    autoUpdateBookInfo: boolean;

    constructor() {
        this.autoSyncReadingRecord = true;
        this.autoUpdateBookInfo = true;
    }
}

export class Book {
    uid: string;
    name: string;
    local: boolean;
    author: string;
    readPct: number;
    readingChapter: Chapter;
    updateCount: number;
    coverUrl: string;
}

export class Chapter {
    uid: string;
    name: string;
    text: string;
    vNo: Number;
    vIndex: number;
}

/**
 * 事件类型定义
 * 
 * @export
 * @enum {number}
 */
export enum EventType {
    /**
     * 本地数据加载完成事件
     */
    DB_READY,

    /**
     * 账户信息加载完成
     * 依赖于 DB_READY
     */
    Account_Loadend
}