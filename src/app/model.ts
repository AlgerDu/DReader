export class Book {
    uuid: string;
    name: string;
    local: boolean;
    author: string;
    readingPct: number;
    readingChapter: Chapter;
    updateCount: number;
    coverUrl: string;
}

export class Chapter {
    uuid: string;
    name: string;
    text: string;
}

export class Configer {
    autoRefreshAppOpen: boolean; //app 启动时自动刷新

    constructor() {
        this.autoRefreshAppOpen = true;
    }
}