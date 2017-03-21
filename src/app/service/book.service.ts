import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';

import { Book, Chapter, Catalog } from '../model';
import { AlertController, Platform } from 'ionic-angular';
import { SQLiteDbService } from './sqlitedb.service';
import { AccountService } from './account.service';

@Injectable()
export class BookService {
    private books: Book[];

    private t: string = '';

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
        if (this.books != null && this.books.length > 0) {
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

        return this.dbService.executeSql(
            'select * from BookShelf as bs, Book as b where accUid = ? and bs.bookUid = b.uid',
            [this.accountService.CurrAccount().uid]
        ).then((data) => {
            this.books = data;
            return this.books;
        });
    }

    //获取一本书的目录信息
    public BookCatalog(book: Book): Catalog {
        return {
            bookUid: 'a',
            volumes: [
                {
                    vNo: 0, name: '九洲一号群', chapters: [
                        { uid: '1', name: '第一章 黄山真君和九洲一号群', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第三章 一张丹方', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 }
                    ]
                },
                {
                    vNo: 1, name: '九洲一号群', chapters: [
                        { uid: '1', name: '第一章 黄山真君和九洲一号群', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 },
                        { uid: '2', name: '第二章 且待本尊算上一卦', contentUid: 'c1', vNo: 0, vIndex: 1 }
                    ]
                }
            ]
        };
    }

    /**
     * 获取章节的内容信息
     * @param {Chapter} chapter 
     * @returns {Promise<string>} 
     * 
     * @memberOf BookService
     */
    public ChapterText(chapter: Chapter): Promise<string> {
        this.t += 'sdfdfasd'
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.t);
            }, 3000);
        });
    }

    /**
     * 获取书架书籍的更新信息
     * @returns {Promise<void>} 
     * 
     * @memberOf BookService
     */
    public Refresh(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    }
}