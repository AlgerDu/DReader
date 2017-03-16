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

export class Configer {
    autoRefreshAppOpen: boolean; //app 启动时自动刷新

    constructor() {
        this.autoRefreshAppOpen = true;
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
    DB_READY
}