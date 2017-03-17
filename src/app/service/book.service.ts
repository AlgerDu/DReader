import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';

import { Book, Chapter } from '../model';
import { AlertController, Platform } from 'ionic-angular';
import { SQLiteDbService } from './sqlitedb.service';
import { AccountService } from './account.service';

@Injectable()
export class BookService {
    private books: Book[];

    constructor(
        private plt: Platform,
        public alertCtrl: AlertController,
        private dbService: SQLiteDbService,
        private accountService: AccountService
    ) { }


    /**
     * 获取本地当前账户的书架信息
     * @returns {Promise<Book[]>} 
     * 
     * @memberOf BookService
     */
    public SheetList(): Promise<Book[]> {
        if (this.books.length > 0) {
            return Promise.resolve(this.books);
        }

        if (this.plt.is('core')) {
            let books = [
                { uid: 'b1', name: '修真聊天群', author: '圣骑士的传说', readPct: 90, updateCount: 3 },
                { uid: 'b2', name: '神级英雄', author: '', readPct: 0, updateCount: 0 }
            ];
            this.books = books as Book[];
            return Promise.resolve(this.books);
        }

        return this.accountService.CurrAccount().then<Book[]>((account) => {
            return this.dbService.executeSql(
                'select * from BookShelf as bs, Book as b where accUid = ? and bs.bookUid = b.uid',
                [account.uid]
            ).then((data) => {
                this.books = data;
                return this.books;
            });
        });
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