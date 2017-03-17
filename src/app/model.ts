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
}

/** 
 *账户配置信息
 * @export
 * @class Config
 */
export class Config {
    autoRefreshOnAppOpen: boolean;

    constructor() {
        this.autoRefreshOnAppOpen = true;
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
    DB_READY
}