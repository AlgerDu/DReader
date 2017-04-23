import { Injectable } from '@angular/core';

import { AlertController, Platform } from 'ionic-angular';

import { generateUUID, IsEmptyOfNull } from '../common';
import { Book, Chapter, BookSotreNvoelInfo } from '../model';

import { SQLiteDbService } from './sqlitedb.service';
import { AccountService } from './account.service';

@Injectable()
export class BookshelfService {

    /**书架中的书籍*/
    private books: Book[] = [];

    /**是否已经从数据库加载数据*/
    private isLoadFromDb: boolean = false;

    constructor(
        private plt: Platform,
        public alertCtrl: AlertController,
        private dbService: SQLiteDbService,
        private accountService: AccountService
    ) { }

    /**获取书架中的书籍列表*/
    public BookList(): Promise<Book[]> {

        //已经从数据库加载过数据，不在重新加载
        if (this.isLoadFromDb) return Promise.resolve(this.books);

        return this.LoadBookFromDb();
    }

    /**从数据库加载*/
    private LoadBookFromDb(): Promise<Book[]> {
        return this.dbService.executeSql(
            'select * from BookShelf as bs, Book as b where accUid = ? and bs.bookUid = b.uid',
            [this.accountService.CurrAccount().uid]
        ).then((data) => {
            this.books = data;
            this.isLoadFromDb = true;
            return this.books;
        });
    }

    /**向书架中添加一本书籍*/
    public Add(book: BookSotreNvoelInfo): Promise<void> {
        let b = new Book();
        b.author = book.author;
        b.name = book.name;
        b.uid = book.uid;

        this.books.push(b);

        console.log("向书架中添加书籍：" + b.name);

        return this.AddToDb(b);
    }

    /**将加入书架的信息保存到数据库中*/
    private AddToDb(book: Book): Promise<void> {
        return this.dbService.executeSql(
            'insert into BookShelf values ( ?, ?, ?, ?, ?, ?)',
            [
                this.accountService.CurrAccount().uid,
                book.uid,
                book.readPct,
                book.updateCount,
                book.refreshTime,
                0,
                0
            ]
        ).then(() => {
            return Promise.resolve();
        }).catch(() => {
            return "数据库删除失败";
        });
    }


    /**从书架中移除一本书*/
    public Remove(uid: string): Promise<void> {
        let index = -1;

        for (let b of this.books) {
            index++;
            if (b.uid == uid) {
                break;
            }
        }

        if (index > -1 && index < this.books.length) {
            console.log("从书架中移除书籍：" + this.books[index].name);
            this.books.splice(index, 1);

            return this.RemoveFromDb(uid);
        } else {
            console.log(uid + " 对应的书籍没有在书架中");
            return Promise.reject("书籍不存在");
        }
    }

    /**从数据库中删除书架书籍*/
    private RemoveFromDb(uid: string): Promise<void> {
        return this.dbService.executeSql(
            'delete from BookShelf as bs where bs.accUid = ? and bs.bookUid = ?',
            [this.accountService.CurrAccount().uid, uid]
        ).then(() => {
            return Promise.resolve();
        }).catch(() => {
            return "数据库删除失败";
        });
    }

    /**书架中是否包含某一本书籍*/
    public ContainBook(uid: string): boolean {
        let r = false;

        for (let book of this.books) {
            if (book.uid == uid) {
                r = true;
                break;
            }
        }

        return r;
    }

    /**从服务器中获取书籍中书籍的更新*/
    public Refresh(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 50);
        });
    }
}