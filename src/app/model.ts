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