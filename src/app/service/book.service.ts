import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Book, Chapter } from '../model';
import { AlertController } from 'ionic-angular';
import { SQLiteDbService } from './sqlitedb.service';

@Injectable()
export class BookService {

    constructor(
        public alertCtrl: AlertController,
        private dbService: SQLiteDbService
    ) {
    }
    //获取账户正在阅读的书籍，本地和远程书籍
    SheetList(): Promise<Book[]> {
        return this.dbService.executeSql(
            'select * from BookShelf as bs, Book as b where accUid = ? and bs.bookUid = b.uid',
            ['a1']
        ).then(data => data as Book[]);
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