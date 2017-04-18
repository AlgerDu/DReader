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
        this.autoUpdateBookInfo = false;
    }
}

/**
 * 小说章节信息
 * @export
 * @class Chapter
 */
export class Chapter {
    uid: string;
    name: string;
    contentUid: string;
    vNo: Number;
    vIndex: number;
}

/**
 * 卷信息
 * @export
 * @class Volume
 */
export class Volume {
    vNo: number;
    name: string;
    chapters: Chapter[];
}

/**
 * 小说目录信息
 * @export
 * @class Catalog
 */
export class Catalog {
    bookUid: string;
    volumes: Volume[];
}

export class Book {
    uid: string;
    name: string;
    local: boolean;
    author: string;
    readPct: number;
    readingChapterUid: string;
    updateCount: number;
    coverUrl: string;
    refreshTime: Date;

    constructor() {
        this.local = false;
        this.readPct = 0;
        this.readingChapterUid = null;
        this.updateCount = 0;
        this.coverUrl = "";
        this.refreshTime = new Date();
    }
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

export class BookSotreNvoelInfo {
    uid: string;
    name: string;
    author: string;
    chapterCount: number;
}


/**
 * 上次更新小说的信息
 * 通过这个信息获取小说这段时间更新的章节数和内容
 * @export
 * @class NovelLastUpdateModel
 */
export class NovelLastUpdateModel {
    bookUid: string;


    /**
     * 上次更新这本书的时间
     * @type {Date}
     * @memberOf NovelLastUpdateModel
     */
    updateTime: Date;
}

export class NovelLastChapterModel {
    uid: string;
    volumeNo: number;
    volumeIndex: number;
    name: string;
}

/**
 * 某个时间点之后小说的更新的信息
 * @export
 * @class NovelUpdateMode
 */
export class NovelUpdateModel {
    bookUid: string;
    chapterCount: number;
    updateTime: Date;
    lastChapter: NovelLastChapterModel;
}