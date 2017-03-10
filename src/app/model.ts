export class Book {
    uuid: string;
    name: string;
    chapters: Chapter[];
}

export class Chapter {
    uuid: string;
    name: string;
    text: string;
}