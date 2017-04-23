import { Injectable } from '@angular/core';

import { Book, Chapter, Content, NovelCatalogQueryModel } from '../model';

import { SQLiteDbService } from './sqlitedb.service';
import { WebsiteService } from './website.service';

@Injectable()
export class ReadBookService {

    constructor(
        private dbService: SQLiteDbService,
        private websiteService: WebsiteService
    ) { }

    /**获取书籍的章节信息*/
    public LoadCatalog(book: Book): Promise<number> {
        if (book.chapters.length > 0) {
            return this.LoadServerCatalog(book, 10);
        } else {
            return this.LoadDBCatalog(book)
                .then((count) => {
                    if (count == 0) {
                        return this.LoadServerCatalog(book, 10);
                    } else {
                        return count;
                    }
                });
        }
    }

    /**加载书籍缓存在本地数据库中的目录*/
    private LoadDBCatalog(book: Book): Promise<number> {
        return Promise.resolve(0);
    }

    /**加载书籍服务端的章节目录*/
    private LoadServerCatalog(book: Book, queryCount: number): Promise<number> {
        let index = book.chapters.length;

        let lastChapter: Chapter = null;

        if (index > 0) {
            lastChapter = book.chapters[index - 1];
        }

        let query = index > 0
            ? new NovelCatalogQueryModel(book.uid, 1, 1)
            : new NovelCatalogQueryModel(book.uid, lastChapter.volumeNo, lastChapter.volumeIndex);

        query.backwardCount = queryCount;

        return this.websiteService.NovelCatalog(query)
            .then((reault) => {

                return Promise.resolve(0);
            })
            .catch(() => {
                Promise.reject(0);
            });
    }

    /**加载章节内容*/
    public LoadChapterText(chapter: Chapter): Promise<Content> {
        return null;
    }
}