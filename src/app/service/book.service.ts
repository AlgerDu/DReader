import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Book, Chapter } from '../model';
import { AlertController } from 'ionic-angular';

@Injectable()
export class BookService {
    private books: Book[];

    constructor(
        public alertCtrl: AlertController
    ) {
        this.books = [];

        let tmp = new Book();
        tmp.uuid = '0';
        tmp.name = '修真聊天群';
        tmp.author = '圣骑士的传说';
        tmp.readingPct = 90;
        tmp.updateCount = 3;
        this.books.push(tmp);

        tmp = new Book();
        tmp.uuid = '1';
        tmp.name = '神级英雄';
        tmp.readingPct = 0;
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

    //更新本地缓存与远程服务器之间的内容
    Refresh(): Promise<void> {
        this.books[0].updateCount = 4;

        return Promise.resolve();
    }
}