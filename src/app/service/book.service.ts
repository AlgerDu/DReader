import { Injectable } from '@angular/core';
import { Book, Chapter } from '../model';

@Injectable()
export class BookService {
    private books: Book[];

    constructor() {
        this.books = [];

        let tmp = new Book();
        tmp.uuid = '0';
        tmp.name = '修真聊天群';
        this.books.push(tmp);

        tmp = new Book();
        tmp.uuid = '1';
        tmp.name = '神级英雄';
        this.books.push(tmp);
    }

    //获取账户正在阅读的书籍，本地和远程书籍
    SheetList(): Book[] {
        return this.books;
    }

    //获取一本书的目录信息
    Catalog(book: Book): Chapter[] {
        return null;
    }
}