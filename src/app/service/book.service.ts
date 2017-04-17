import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';

import { Book, Chapter, Catalog, BookSotreNvoelInfo } from '../model';
import { AlertController, Platform } from 'ionic-angular';
import { SQLiteDbService } from './sqlitedb.service';
import { AccountService } from './account.service';
import { generateUUID, IsEmptyOfNull } from '../common';

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
                { uid: 'b1', name: '修真聊天群', author: '圣骑士的传说', readPct: 90, updateCount: 3, readingChapterUid: '' },
                { uid: 'b2', name: '神级英雄', author: '', readPct: 0, updateCount: 0, readingChapterUid: '' }
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


    /**
     * 像书架中添加一本书籍
     * @param {BookSotreNvoelInfo} book 
     * 
     * @memberOf BookService
     */
    public AddBook(book: BookSotreNvoelInfo) {
        let b = new Book();
        b.author = book.author;
        b.name = book.name;
        b.uid = book.uid;

        this.books.push(b);

        console.log("向书架中添加书籍：" + b.name);
    }

    public RemoveBook(book: BookSotreNvoelInfo) {
        let index = -1;

        for (let b of this.books) {
            index++;
            if (b.uid == book.uid) {
                break;
            }
        }

        if (index > -1) {
            this.books.splice(index, 1);
        }

        console.log("从书架中移除书籍：" + book.name);
    }

    public ContainBook(uid: string): Promise<boolean> {
        let r = false;

        for (let book of this.books) {
            if (book.uid == uid) {
                r = true;
                break;
            }
        }

        return new Promise((resolve, reject) => {
            console.log("书架中是否包含书籍：" + r);
            resolve(r);
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
     * 获取书籍的第一章
     * @param {Book} book 
     * @returns {Promise<Chapter>} 
     * 
     * @memberOf BookService
     */
    public ToReadChapter(book: Book): Promise<Chapter> {
        if (this.plt.is('core')) {
            let c = new Chapter();
            c.uid = generateUUID();
            c.name = '测试第一章';
            return Promise.resolve<Chapter>(c);
        }

        if (IsEmptyOfNull(book.readingChapterUid)) {

        } else {
            return this.Chapter(book.readingChapterUid);
        }
    }

    /**
     * 根据 uid 加载章节信息
     * 
     * @param {string} uid 
     * @returns {Promise<Chapter>} 
     * 
     * @memberOf BookService
     */
    public Chapter(uid: string): Promise<Chapter> {
        if (this.plt.is('core')) {
            let c = new Chapter();
            c.uid = generateUUID();
            c.name = '测试第 ' + uid + ' 章';
            return Promise.resolve<Chapter>(c);
        }
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
            }, 50);
        });
    }
}