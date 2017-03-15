import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Book, Chapter } from '../model';
import { AlertController, Platform } from 'ionic-angular';
import { SQLiteDbService } from './sqlitedb.service';

@Injectable()
export class BookService {

    constructor(
        private plt: Platform,
        public alertCtrl: AlertController,
        private dbService: SQLiteDbService
    ) {
    }
    //获取账户正在阅读的书籍，本地和远程书籍
    SheetList(): Promise<Book[]> {

        if (this.plt.is('core')) {
            let books = [
                { uuid: 'b1', name: '修真聊天群', author: '圣骑士的传说', readPct: 90, updateCount: 3 },
                { uuid: 'b2', name: '神级英雄', author: '', readPct: 0, updateCount: 0 }
            ];
            return Promise.resolve(books);
        }

        return Promise.resolve(null);
        //return this.dbService.executeSql(
        //    'select * from BookShelf as bs, Book as b where accUid = ? and bs.bookUid = b.uid',
        //    ['a1']
        //).then(data => data as Book[]);
    }

    //获取一本书的目录信息
    Catalog(book: Book): Chapter[] {
        return null;
    }

    //更新本地缓存与远程服务器之间的内容
    Refresh(): Promise<void> {
        return Promise.resolve();
    }
}